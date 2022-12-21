#!/bin/bash
set -eo pipefail

function ee()
{
    echo "$ $*"
    eval "$@"
}

echo 'Finding newest matrix artifact.'
ee 'ls -la'
export DIST_DL_FOLDER="$(find . -maxdepth '1' -name 'dist*' -type 'd' | sort -r | head -n '1')"
echo "Identified \"$DIST_DL_FOLDER\" as the matrix build output from the most recent nodeJS version."
ee "pushd '$DIST_DL_FOLDER'"
ee 'ls -la'
ee 'tar -xzf dist.tar.gz'
ee 'pushd dist'
ee 'ls -la'
ee 'aws --version'
echo 'Done! - frontend-publish.sh'