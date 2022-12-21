#!/bin/bash
set -eo pipefail

function ee()
{
    echo "$ $*"
    eval "$@"
}

ee 'aws --version'
echo 'Finding newest matrix artifact.'
ee 'ls -la'
export DIST_DL_FOLDER="$(find . -maxdepth '1' -name 'dist*' -type 'd' | sort -r | head -n '1')"
echo "Identified \"$DIST_DL_FOLDER\" as the matrix build artifact from the most recent nodeJS version, unpacking."
ee "pushd '$DIST_DL_FOLDER'"
ee 'tar -xzf dist.tar.gz'
ee 'pushd dist'
echo 'Packing website metadata into distribution.'
cat ../../frontend/package.json | jq -c \
    --arg actor "$GITHUB_ACTOR" \
    --arg branch "$(git branch --show-current)" \
    --arg build "$GITHUB_RUN_NUMBER" \
    --arg build_id "$GITHUB_RUN_ID" \
    --arg commit "$(git rev-parse HEAD)" \
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
        $ref_type,
        $repo,
        tag: ($tag | if . == "" then null else . end),
        $triggering_actor
    }' > package.json
ee 'cat package.json | jq .git'
ee 'ls -la'
echo 'Uploading website distribution to Amazon S3.'
ee 'aws s3 sync "." "s3://$S3_BUCKET" --delete --dryrun'
echo 'Done! - frontend-publish.sh'
