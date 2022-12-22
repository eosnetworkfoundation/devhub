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
ee npm --version
if [[ ! -z "$DEVHUB_BACKEND_API" ]]; then
    ee 'printf "$DEVHUB_BACKEND_API" | wc -c'
    ee 'curl -fsSL "$DEVHUB_BACKEND_API/test"'
    echo
else
    printf '\e[93mWARNING: DEVHUB_BACKEND_API is not defined!\e[0m\n'
    echo '::warning title=DevHub Backend API Endpoint Missing::DEVHUB_BACKEND_API is not defined!'
fi
# init
ee pushd frontend
ee yarn --frozen-lockfile
# generate static site
ee yarn generate --fail-on-error
# pack dist folder
ee 'tar -czf dist.tar.gz dist/*'
echo 'Done! - frontend-build.sh'
