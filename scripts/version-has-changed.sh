#!/bin/bash

# Inputs
from=$1
to=$2
packages=$3

# Filter changed packages
changed_packages=()

for package in $packages; do
  # Get the package path (assumes get-package-path.sh returns the path)
  path=$(./scripts/get-package-path.sh "$package")

  # Check for version changes in the package.json
  diff_output=$(git diff --unified=0 --no-prefix --color=never --output-indicator-new=~ "$from".."$to" -- "$path/package.json" | grep "^[~]" || true)

  if [[ $diff_output == *"\"version\":"* ]]; then
    changed_packages+=("$package")
  fi
done

# Output the changed packages as a JSON array
printf '%s\n' "${changed_packages[@]}" | jq -R -s 'split("\n") | map(select(. != ""))'