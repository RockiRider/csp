#!/bin/bash

select_package() {
  echo "Select a package to release:"
  options=("vite-plugin-csp-guard" "csp-toolkit" "Quit")
  select package in "${options[@]}"; do
    case $package in
      "vite-plugin-csp-guard"|"csp-toolkit")
        echo "Selected package: $package"
        PACKAGE_NAME=$package
        break
        ;;
      "Quit")
        echo "Exiting."
        exit 0
        ;;
      *)
        echo "Invalid option. Try again."
        ;;
    esac
  done
}

select_version() {
  echo "Select version type:"
  options=("major" "minor" "patch" "beta" "alpha" "Quit")
  select version in "${options[@]}"; do
    case $version in
      "major"|"minor"|"patch"|"beta"|"alpha")
        echo "Selected version: $version"
        SEMVER=$version
        break
        ;;
      "Quit")
        echo "Exiting."
        exit 0
        ;;
      *)
        echo "Invalid option. Try again."
        ;;
    esac
  done
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
  select_package
  select_version
  run_deploy
}

main