#!/bin/bash

# Inputs
from=$1
to=$2
packages=$3

# Filter changed packages
changed_packages=()

for package in $packages; do
  # Get the package path using pnpm
  PACKAGE_PATH=$(pnpm list --depth=-1 --json -r | jq -r --arg PACKAGE_NAME "$package" '.[] | select(.name == $PACKAGE_NAME) | .path')

  # Check if the path exists
  if [[ -d "$PACKAGE_PATH" ]]; then
    # Check for version changes in the package.json
    diff_output=$(git diff --unified=0 --no-prefix --color=never --output-indicator-new=~ "$from".."$to" -- "$PACKAGE_PATH/package.json" | grep "^[~]" || true)

    if [[ $diff_output == *"\"version\":"* ]]; then
      changed_packages+=("$package")
    fi
  fi
done

# Output the changed packages as a JSON array
printf '%s\n' "${changed_packages[@]}" | jq -R -s 'split("\n") | map(select(. != ""))'