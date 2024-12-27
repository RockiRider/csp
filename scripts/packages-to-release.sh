#!/bin/bash

# Disallowed packages (packages to ignore for publishing)
DISALLOWED_PACKAGES=("@repo/eslint-config" "@repo/tests" "@repo/typescript-config")

# Get changed packages using Turbo
CHANGED_PACKAGES=$(turbo build \
  --filter="./packages/*" \
  --filter='!./apps/*' \
  --filter='[HEAD^1]' \
  --dry-run=json | jq -r '.packages[]' | sed 's|^//||')

# Filter out disallowed packages
ALLOWED_CHANGED_PACKAGES=()
for package in $CHANGED_PACKAGES; do
  if [[ ! " ${DISALLOWED_PACKAGES[*]} " == *" $package "* ]]; then
    ALLOWED_CHANGED_PACKAGES+=("$package")
  fi
done

# Join the array into a space-separated string, then use jq to create a JSON array
echo "${ALLOWED_CHANGED_PACKAGES[@]}" | jq -R 'split(" ") | map(select(length > 0))'