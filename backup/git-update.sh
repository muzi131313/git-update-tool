# import files
. ./config.sh

# 1.open the target path
cd $UP_PATH && pwd

# 2.change into the target branch
git status
git checkout $UP_BRANCH
# TODO: you should resolve the conflict after pull(sometimes)
git pull

# 3.install packer
bash -c "$UP_PACKER_NAME install"

# 4.install the target package(eg: yarn install laser-pen@0.0.15 -s)
bash -c "$UP_PACKER_NAME $UP_UPDATE_TYPE $PACKAGE_NAME@$PACKAGE_VERSION $UP_UPDATE_PARAM"

# 5.commit and push
git add .
# dynamic generate commit message
commitMsg="update $PACKAGE_NAME version to $PACKAGE_VERSION"
if [[ "$UP_UPDATE_TYPE" == "add" ]]; then
  commitMsg="add $PACKAGE_NAME@$PACKAGE_VERSION"
fi
echo "commit msg: $commitMsg"
bash -c "git commit -m $commitMsg"
git push
