#!/bin/bash
set -eo pipefail
if [[ "$GITHUB_REF_TYPE" == 'tag' ]]; then
    echo "Found git $GITHUB_REF_TYPE \"$GITHUB_REF_NAME,\" attempting a production deployment."
    echo "::set-output name=arn::$DEVHUB_FRONTEND_PROD_IAM_ARN"
else
    echo "Found git $GITHUB_REF_TYPE \"$GITHUB_REF_NAME,\" performing a dry-run."
    echo "::set-output name=arn::$DEVHUB_FRONTEND_RO_IAM_ARN"
fi
echo 'Done. - aws-role.sh'
