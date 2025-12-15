#!/usr/bin/env bash
set -euo pipefail

# Local Node.js wrapper so the project can run even if the system Node version is too old.
# It downloads Node.js into ./.node/ (gitignored) on first use and then executes the given command.

NODE_VERSION="${NODE_VERSION:-22.12.0}"
BASE_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"

os="$(uname -s | tr '[:upper:]' '[:lower:]')"
arch="$(uname -m)"

case "$arch" in
  x86_64|amd64) arch="x64" ;;
  aarch64|arm64) arch="arm64" ;;
  *) echo "Unsupported architecture: $arch" >&2; exit 1 ;;
esac

case "$os" in
  linux|darwin) ;;
  *) echo "Unsupported OS: $os" >&2; exit 1 ;;
esac

node_root="$BASE_DIR/.node/node-v$NODE_VERSION-$os-$arch"
node_bin="$node_root/bin"

ensure_node() {
  if [ -x "$node_bin/node" ]; then
    return 0
  fi

  mkdir -p "$BASE_DIR/.node"
  tmp_dir="$(mktemp -d)"
  trap 'rm -rf "$tmp_dir"' EXIT

  archive="node-v$NODE_VERSION-$os-$arch.tar.xz"
  url="https://nodejs.org/dist/v$NODE_VERSION/$archive"

  echo "Downloading Node.js v$NODE_VERSION ($os-$arch)..." >&2
  curl -fsSL "$url" -o "$tmp_dir/$archive"
  tar -xJf "$tmp_dir/$archive" -C "$tmp_dir"

  rm -rf "$node_root"
  mv "$tmp_dir/node-v$NODE_VERSION-$os-$arch" "$node_root"
}

ensure_node

export PATH="$node_bin:$PATH"

if [ "${1:-}" = "--print-path" ]; then
  echo "$node_bin"
  exit 0
fi

if [ $# -eq 0 ]; then
  echo "Usage: scripts/node22.sh <command...>" >&2
  exit 2
fi

exec "$@"

