#!/bin/bash

# Disallowed packages (packages to ignore for publishing)
DISALLOWED_PACKAGES=("@repo/eslint-config" "@repo/tests" "@repo/typescript-config")

# Get changed packages using Turbo
CHANGED_PACKAGES=$(turbo build --filter="./packages/*" --filter=[HEAD^1] --dry-run=json | jq -r '.packages[]')

# Filter out disallowed packages
ALLOWED_CHANGED_PACKAGES=()
for package in $CHANGED_PACKAGES; do
  if [[ ! " ${DISALLOWED_PACKAGES[*]} " == *" $package "* ]]; then
    ALLOWED_CHANGED_PACKAGES+=("$package")
  fi
done

# Output the allowed changed packages as a comma-separated list
echo "${ALLOWED_CHANGED_PACKAGES[*]}" | tr ' ' ','