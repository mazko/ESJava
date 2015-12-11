test/test.sh && \
git status --porcelain | grep -q . && { echo 'git diff test FAILED !!!' ; exit 1; } || \
browserify -t coffeeify --extension=".coffee" --standalone javaconves6func src/ESJava.coffee > bundle.js