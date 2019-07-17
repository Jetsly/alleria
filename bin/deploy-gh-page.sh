 #!/bin/bash
set -e # exit with nonzero exit code if anything fails

project=`git remote  get-url origin | awk -F ":" '{print $2}'`
project=${project/*github.com\//}
echo "deploy $1 file to github<$project> page"


if [ ! ${GITHUB_TOKEN} ]; then
  echo ${GITHUB_TOKEN?Not Found}
  exit 1
fi
if [ ! -d "$1" ]; then
  echo  "$1 not exist"
  exit 1
fi
if [ -f "CNAME" ]; then
  cp CNAME $1 
fi

echo "Starting to update gh-pages\n"

cd $1
git init
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis"
git add -f .
git commit -m "Travis build"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/$project" master:gh-pages > /dev/null

echo "Done updating gh-pages\n"