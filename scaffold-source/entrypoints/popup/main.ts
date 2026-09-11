import './style.css';
import { PLATFORM_IDS, type ExtensionSettings } from '@/lib/settings';
import { loadSettings, saveSettings } from '@/lib/settings-storage';

const settingIds = ['enabled', ...PLATFORM_IDS] as const;
const controls = Object.fromEntries(settingIds.map((id) => [id, requireCheckbox(id)])) as Record<(typeof settingIds)[number], HTMLInputElement>;
const status = requireElement('status');
let currentSettings: ExtensionSettings | undefined;

void initialize();

async function initialize(): Promise<void> {
  setControlsDisabled(true);
  try {
    currentSettings = await loadSettings();
    render(currentSettings);
    status.textContent = currentSettings.enabled ? '已启用' : '已暂停全部直达';
  } catch (error) {
    console.error('读取设置失败', error);
    status.textContent = '读取设置失败，请重新打开插件';
    return;
  } finally {
    setControlsDisabled(false);
    if (currentSettings) render(currentSettings);
  }
  for (const id of settingIds) controls[id].addEventListener('change', () => void persist(id));
}

async function persist(id: (typeof settingIds)[number]): Promise<void> {
  if (!currentSettings) return;
  const previous = currentSettings;
  const next = { ...currentSettings, [id]: controls[id].checked };
  currentSettings = next;
  render(next);
  status.textContent = '正在保存…';
  setControlsDisabled(true);
  try {
    await saveSettings(next);
    status.textContent = next.enabled ? '设置已保存' : '已暂停全部直达';
  } catch (error) {
    console.error('保存设置失败', error);
    currentSettings = previous;
    render(previous);
    status.textContent = '保存失败，已恢复原设置';
  } finally {
    setControlsDisabled(false);
    if (currentSettings) render(currentSettings);
  }
}

function render(settings: ExtensionSettings): void {
  for (const id of settingIds) controls[id].checked = settings[id];
  for (const id of PLATFORM_IDS) controls[id].disabled = !settings.enabled;
}

function setControlsDisabled(disabled: boolean): void {
  for (const id of settingIds) controls[id].disabled = disabled;
}

function requireCheckbox(id: string): HTMLInputElement {
  const element = document.querySelector<HTMLInputElement>(`#${id}`);
  if (!element) throw new Error(`Missing checkbox: ${id}`);
  return element;
}

function requireElement(id: string): HTMLElement {
  const element = document.querySelector<HTMLElement>(`#${id}`);
  if (!element) throw new Error(`Missing element: ${id}`);
  return element;
}
