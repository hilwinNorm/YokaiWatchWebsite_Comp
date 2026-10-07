
PATH_MAIN="Content/JS/main.js" 

if [ ! -f "$PATH_MAIN" ]; then
	echo "Error: Couldn't find file: $PATH_MAIN"
	exit 1
fi

# Checking if user sent version (e.g.: ./release.sh 2.4.0)
if [ -z "$1" ]; then
	echo "Error: Specify project version. E.g.: ./release.sh 2.4.0"
	exit 1
fi

VERSION=$1

MAJOR=$(echo $VERSION | cut -d. -f1)
MINOR=$(echo $VERSION | cut -d. -f2)
PATCH=$(echo $VERSION | cut -d. -f3)

echo "Synchronising Git: Updating $PATH_MAIN to v$VERSION..."

# Rewriting lines in file main.js using sed

sed -i "s/\"Major\":.*/\"Major\": $MAJOR,/g" "$PATH_MAIN"
sed -i "s/\"Minor\":.*/\"Minor\": $MINOR,/g" "$PATH_MAIN"
sed -i "s/\"Patch\":.*/\"Patch\": $PATCH/g" "$PATH_MAIN"

echo "1. Successfully updated file: $PATH_MAIN"

git add "$PATH_MAIN"
git commit -m "chore: release version v$VERSION"
echo "2. Сommit version has been created."

git tag -a "v$VERSION" -m "Version $VERSION"
echo "3. Created git tag: v$VERSION"

echo "=== Done! You can now push the code to GitHub: git push origin main --tags ==="