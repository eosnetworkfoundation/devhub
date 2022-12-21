#!/bin/bash
set -eo pipefail
if [[ "$GITHUB_REF_TYPE" == 'tag' ]]; then
    echo "Found git $GITHUB_REF_TYPE \"$GITHUB_REF_NAME,\" attempting a production deployment."
    export GIT_TAG="$(git --no-pager tag --points-at HEAD)"
    export FRONTEND_VERSION="$(cat frontend/package.json | jq '.version')"
    if [[ "v$FRONTEND_VERSION" != "$GIT_TAG" || "$GIT_TAG" != "$GITHUB_REF_NAME" ]]; then
        echo '::error:: Frontend package.json version string does not match the git tag!'
        echo "FRONTEND_VERSION='v$FRONTEND_VERSION'"
        echo "GITHUB_REF_NAME='$GITHUB_REF_NAME'"
        echo "GIT_TAG='$GIT_TAG'"
        cat frontend/package.json | jq '.'
        exit 10
    fi
    echo '::set-output name=dry-run::false'
    echo "::set-output name=role-arn::$DEVHUB_FRONTEND_PROD_IAM_ARN"
else
    echo "Found git $GITHUB_REF_TYPE \"$GITHUB_REF_NAME,\" performing a dry-run."
    echo '::set-output name=dry-run::true'
    echo "::set-output name=role-arn::$DEVHUB_FRONTEND_RO_IAM_ARN"
fi
echo 'Done. - frontend-aws-role.sh'
