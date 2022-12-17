#!/bin/bash
set -eo pipefail

function ee()
{
    echo "$ $*"
    eval "$@"
}

# print debugging code
ee node --version
ee yarn --version
if [[ ! -z "$DEVHUB_BACKEND_API" ]]; then
    ee 'printf "$DEVHUB_BACKEND_API" | wc -c'
else
    printf '\e[93mWARNING: DEVHUB_BACKEND_API is not defined!\e[0m\n'
fi
# init
ee pushd frontend
ee yarn --frozen-lockfile
# generate static site
ee yarn generate
# pack dist folder
ee tar -cvf dist.tar.gz dist/*
echo 'Done! - frontend.sh'
