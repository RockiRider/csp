#!/bin/bash

select_package() {
  echo "Enter the package to release (e.g., vite-plugin-csp-guard or csp-toolkit):"
  read -r PACKAGE_NAME
  if [[ "$PACKAGE_NAME" != "vite-plugin-csp-guard" && "$PACKAGE_NAME" != "csp-toolkit" ]]; then
    echo "Invalid package. Exiting."
    exit 1
  fi
  echo "Selected package: $PACKAGE_NAME"
}

select_version() {
  echo "Enter the version type (major, minor, patch, beta, alpha):"
  read -r SEMVER
  case $SEMVER in
    "major"|"minor"|"patch"|"beta"|"alpha")
      echo "Selected version: $SEMVER"
      ;;
    *)
      echo "Invalid version type. Exiting."
      exit 1
      ;;
  esac
}

check_branch() {
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  if [[ "$CURRENT_BRANCH" != "main" ]]; then
    echo "Error: not on 'main' branch."
    exit 1
  fi

  if ! git diff-index --quiet HEAD --; then
    echo "Error: There are uncommitted changes."
    exit 1
  fi

  if [ "$(git log origin/$CURRENT_BRANCH..HEAD)" != "" ]; then
    echo "Error: There are unpushed commits."
    exit 1
  fi
}

update_version() {
  if ! [ -x "$(command -v pnpm)" ]; then
    echo 'Error: PNPM is not installed.' >&2
    exit 1
  fi

  # Handle pre-release versions
  if [[ "$SEMVER" == "beta" || "$SEMVER" == "alpha" ]]; then
    cd "./packages/$PACKAGE_NAME" || exit
    pnpm version prerelease --preid="$SEMVER"
    cd - || exit
  else
    cd "./packages/$PACKAGE_NAME" || exit
    pnpm version $SEMVER
    cd - || exit
  fi
}

get_new_version() {
  PACKAGE_JSON="./packages/$PACKAGE_NAME/package.json"

  if ! [ -f "$PACKAGE_JSON" ]; then
    echo "Error: $PACKAGE_JSON doesn't exist."
    exit 1
  fi

  local VERSION=$(node -pe "require('$PACKAGE_JSON').version")
  echo "$VERSION"
}

publish_package() {
  cd "./packages/$PACKAGE_NAME" || exit
  pnpm publish --access public
  cd - || exit
}

run_deploy() {
  check_branch
  update_version
  publish_package
}

main() {
  check_branch
  select_package
  select_version
  run_deploy
}

main