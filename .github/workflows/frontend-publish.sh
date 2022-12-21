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
    }' > package.json
ee 'cat package.json | jq .git'
ee 'ls -la'
echo 'Uploading website distribution to Amazon S3.'
export S3_SYNC='aws s3 sync "." "s3://$S3_BUCKET" --delete'
if [[ "$DRY_RUN" != 'false' ]]; then
    export S3_SYNC="$S3_SYNC --dryrun"
fi
ee "$S3_SYNC"
echo 'Tagging website objects.'
export TAGS="$(jq -n -c --argjson git "$(cat package.json | jq -c .git)" '{"billing-use": "devrel", "branch": ($git | .branch), "build-url": ($git | .build_url), "commit": ($git | .commit), "email": ($git | .email), "manual": false, "tag": ($git | .tag), "terraform": false}')"
ee 'echo "$TAGS" | jq .'
export S3_LIST='aws s3api list-objects-v2 --bucket "$S3_BUCKET" --query "Contents[].{Key:Key}" --output text'
export S3_TAG='xargs -I OBJECT -- aws s3api put-object-tagging --bucket "$S3_BUCKET" --key OBJECT --tagging "TagSet=[{Key=colour,Value=blue}]"'
if [[ "$DRY_RUN" != 'false' ]]; then
    echo 'AWS CLI dry run support is inconsistent and this command does not have it, printing object tag command with no dry run.'
    echo "$S3_LIST | $S3_TAG \"TagSet=$(echo "$TAGS" | jq -c 'to_entries')\""
else
    ee "$S3_LIST | $S3_TAG \"TagSet=$(echo "$TAGS" | jq -c 'to_entries')\""
fi
echo 'Done! - frontend-publish.sh'
