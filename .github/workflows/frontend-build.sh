#!/bin/bash
set -eo pipefail

function ee()
{
    echo "$ $*"
    eval "$@"
}

exec 9>&1 # enable tee to write to STDOUT as a file
# print debugging code
ee node --version
ee yarn --version
ee npm --version
if [[ ! -z "$DEVHUB_BACKEND_API" ]]; then
    ee 'printf "$DEVHUB_BACKEND_API" | wc -c'
    export BACKEND_UP="$(ee 'curl -fsSL "$DEVHUB_BACKEND_API/test"' | tee >(cat - >&9))"
    echo
    if [[ "$BACKEND_UP" == 'true' ]]; then
        echo 'DevHub backend API up!'
    else
        printf '\e[93mWARNING: Failed to connect to DevHub backend API!\e[0m\n'
        echo '::warning title=Failed to Connect to DevHub Backend API::Failed to connect to DevHub backend API!'
    fi
else
    printf '\e[93mWARNING: DEVHUB_BACKEND_API is not defined!\e[0m\n'
    echo '::warning title=DevHub Backend API Endpoint Missing::DEVHUB_BACKEND_API is not defined!'
fi
# init
ee pushd frontend
ee yarn --frozen-lockfile
# generate static site
ee yarn generate --fail-on-error
# add metadata
echo 'Packing website metadata into distribution.'
cat package.json | jq -c \
    --arg actor "$GITHUB_ACTOR" \
    --arg branch "$(git branch --show-current)" \
    --arg build "$GITHUB_RUN_NUMBER" \
    --arg build_id "$GITHUB_RUN_ID" \
    --arg commit "$(git rev-parse HEAD)" \
    --arg email "$(git log -n 1 --pretty=format:%ae)" \
    --arg ref_type "$GITHUB_REF_TYPE" \
    --arg repo "$GITHUB_SERVER_URL/$GITHUB_REPOSITORY" \
    --arg tag "$(git --no-pager tag --points-at HEAD)" \
    --arg triggering_actor "$GITHUB_TRIGGERING_ACTOR" \
    '.git += {
        $actor,
        branch: ($branch | if . == "" then null else . end),
        build: ($build | tonumber),
        build_id: ($build_id | tonumber),
        build_url: ($repo + "/actions/runs/" + $build_id),
        $commit,
        $email,
        $ref_type,
        $repo,
        tag: ($tag | if . == "" then null else . end),
        $triggering_actor
    }' > dist/package.json
ee 'cat package.json | jq .git'
# pack dist folder
ee 'tar -czf dist.tar.gz dist/*'
echo 'Done! - frontend-build.sh'
