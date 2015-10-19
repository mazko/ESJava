coffee --nodejs '--stack-size=10000' src/cmd.coffee Test.java \
> Test.es6.js && \
# babel --blacklist strict Test.es6.js > Test.js
babel Test.es6.js > Test.js #&& \
# jslint --edition=es6 Test.es6.js