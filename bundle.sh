test/test.sh && \
browserify -t coffeeify --extension=".coffee" --standalone javaconves6func src/ESJava.coffee > bundle.js