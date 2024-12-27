#!/bin/bash

# Inputs
from=$1
to=$2
packages_input=$3

# Parse the input string into a JSON array using jq
# The input should already be a valid JSON string representing an array
packages=$(echo "$packages_input" | jq -r '.[]')

# Filter changed packages
changed_packages=()

for package in $packages; do
  # Get the package path using pnpm
  PACKAGE_PATH=$(pnpm list --depth=-1 --json -r | jq -r --arg PACKAGE_NAME "$package" '.[] | select(.name == $PACKAGE_NAME) | .path')

  # Check if the path exists
  if [[ -d "$PACKAGE_PATH" ]]; then
    # Check for version changes in the package.json
    diff_output=$(git diff "$from".."$to" -- "$PACKAGE_PATH/package.json" || true)
    
    # Check if the diff contains a version change
    if [[ $diff_output == *"\"version\":"* ]]; then
      changed_packages+=("$package")
    fi
  fi
done

# Output the changed packages as a JSON array
echo "${changed_packages[@]}" | jq -R 'split(" ") | map(select(length > 0)) | @json' | jq -r .