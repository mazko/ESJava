coffee --nodejs '--stack-size=10000' src/cmd.coffee test/Test.java \
> test/Test.es6.js && \
# babel --blacklist strict Test.es6.js > Test.js
babel --presets es2015 test/Test.es6.js > test/Test.js #&& \
# jslint --edition=es6 Test.es6.js