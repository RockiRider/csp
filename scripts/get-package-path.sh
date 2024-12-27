#!/bin/bash

# Check if the package name is passed as an argument
if [ -z "$1" ]; then
  echo "Error: Package name is required as an argument."
  exit 1
fi

PACKAGE_NAME=$1

# Use pnpm list with depth -1 and output JSON
PACKAGE_PATH=$(pnpm list --depth=-1 --json -r | jq -r --arg PACKAGE_NAME "$PACKAGE_NAME" '.[] | select(.name == $PACKAGE_NAME) | .path')

# Check if the package was found
if [ -z "$PACKAGE_PATH" ]; then
  echo "Error: Package '$PACKAGE_NAME' not found."
  exit 1
fi

# Output the path to the package
echo "$PACKAGE_PATH"