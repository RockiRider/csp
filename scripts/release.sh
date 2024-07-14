#!/bin/bash

PACKAGE_NAME=$1
SEMVER=$2

check_branch() {
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  if [[ "$CURRENT_BRANCH" != "main" ]]; then
    echo "Error: not on 'main' branch."
    exit 1
  fi

  if ! git diff-index --quiet HEAD --; then
    echo "Error: There are uncommitted changes"
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

  if [ -z "$SEMVER" ]; then
    echo "Error: No version supplied. Please enter 'major/minor/patch'"
    exit 1
  fi

  if [[ "$SEMVER" != "major" && "$SEMVER" != "minor" && "$SEMVER" != "patch" ]]; then
    echo "Error: Invalid version. Please enter 'major/minor/patch'"
    exit 1
  fi

  # Change directory to the package's directory before running pnpm version
  cd "./packages/$PACKAGE_NAME" || exit
  pnpm version $SEMVER
  # Return to the original directory after updating the version
  cd - || exit
}

get_new_version() {
  DIR=$(node -e "console.log(require('path').resolve(process.env.PWD).replace(/\\\\/g, '/'))")
  
  PACKAGE_JSON="$DIR/packages/$PACKAGE_NAME/package.json"

  if ! [ -x "$(command -v node)" ]; then
    echo "Error: Node.js is not installed" >&2
    exit 1
  fi

  if ! [ -f "$PACKAGE_JSON" ]; then
    echo "Error: $PACKAGE_JSON doesn't exist"
    exit 1
  fi

  local VERSION=$(node -pe "require('$PACKAGE_JSON').version")

  echo "$VERSION"
}

commit_and_push() {
  VERSION="$(get_new_version)"
  BRANCH_NAME="release/$PACKAGE_NAME-v$VERSION"
  git checkout -b "$BRANCH_NAME"
  pnpm install --frozen-lockfile
  git add .
  git commit -m"$PACKAGE_NAME-$VERSION"
  git push --set-upstream origin "$BRANCH_NAME"
}

run_deploy() {
  check_branch
  update_version
  commit_and_push
}

run_deploy