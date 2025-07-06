#!/usr/bin/env bash
# convert-all-to-webp-q100.sh  (macOS / Linux)

quality=100

find . -type f \( -iname '*.png'  -o -iname '*.jpg'  -o -iname '*.jpeg' \
                 -o -iname '*.gif' -o -iname '*.tiff' -o -iname '*.bmp'  \
                 -o -iname '*.avif' -o -iname '*.heic' \) -print0 |
while IFS= read -r -d '' img; do
  base="${img%.*}"
  out="${base}.webp"
  [[ -f "$out" ]] && { echo "Skip $img (déjà converti)"; continue; }

  printf '→ %s\n' "$out"

  # 1) 'magick' lit n’importe quel format  → flux PNG 24 bits sur stdout
  # 2) 'cwebp' lit --stdin et encode WebP qualité 100
  magick "$img" PNG:- | cwebp --stdin -q "$quality" -alpha_q 100 -o "$out"
done