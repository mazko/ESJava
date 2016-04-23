test/test.sh && \
./node_modules/browserify/bin/cmd.js \
-t coffeeify --extension=".coffee" \
 --standalone javaconves6func src/ESJava.coffee | \
 ./node_modules/uglify-js/bin/uglifyjs -c > bundle.js