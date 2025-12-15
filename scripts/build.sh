#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

"$HERE/node22.sh" npm ci
rm -rf "$HERE/../.angular/cache" || true
"$HERE/node22.sh" npm run build

