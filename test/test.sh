./node_modules/coffee-script/bin/coffee --nodejs '--stack-size=10000' src/cmd.coffee test/Test.java \
> test/Test.es6.js && \
# babel --blacklist strict Test.es6.js > Test.js
./node_modules/babel-cli/bin/babel.js --presets es2015 test/Test.es6.js > test/Test.js && \
# jslint --edition=es6 Test.es6.js
git status --porcelain | { grep -q . && { echo 'git diff test FAILED !!!' ; exit 1; } || exit 0; }