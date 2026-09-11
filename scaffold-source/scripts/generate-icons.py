from __future__ import annotations

import binascii
import struct
import zlib
from pathlib import Path

SIZES = (16, 32, 48, 96, 128)
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "icon"


def chunk(kind: bytes, data: bytes) -> bytes:
    checksum = binascii.crc32(kind + data) & 0xFFFFFFFF
    return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", checksum)


def rgba(size: int, x: int, y: int) -> tuple[int, int, int, int]:
    margin = max(1, size // 16)
    if not (margin <= x < size - margin and margin <= y < size - margin):
        return 0, 0, 0, 0
    tone = (x + y) / max(1, 2 * size - 2)
    base = (int(38 - 18 * tone), int(88 - 34 * tone), int(218 - 63 * tone), 255)
    stroke = max(1.2, size * 0.07)
    diagonal = abs(x - y) <= stroke
    outer, inner = size * 0.17, size * 0.085
    cap1 = (x - size * 0.31) ** 2 + (y - size * 0.28) ** 2 <= outer**2
    cap2 = (x - size * 0.69) ** 2 + (y - size * 0.72) ** 2 <= outer**2
    hole1 = (x - size * 0.31) ** 2 + (y - size * 0.28) ** 2 < inner**2
    hole2 = (x - size * 0.69) ** 2 + (y - size * 0.72) ** 2 < inner**2
    return (255, 255, 255, 255) if (diagonal or cap1 or cap2) and not (hole1 or hole2) else base


def write_icon(size: int) -> None:
    rows = []
    for y in range(size):
        row = bytearray([0])
        for x in range(size):
            row.extend(rgba(size, x, y))
        rows.append(bytes(row))
    header = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", header)
    png += chunk(b"IDAT", zlib.compress(b"".join(rows), 9)) + chunk(b"IEND", b"")
    (OUTPUT / f"{size}.png").write_bytes(png)


OUTPUT.mkdir(parents=True, exist_ok=True)
for icon_size in SIZES:
    write_icon(icon_size)
