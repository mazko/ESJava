###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

fs     = require 'fs'
ESJava = require './ESJava'


echo = (msg) ->
  process.stdout.write(msg + '\n');


if process.argv.length > 2
  for file in process.argv[2..]
    src = fs.readFileSync file, 'utf8'
    echo ESJava src
else
  echo "Usage: esjava file..."
  # echo "Invalid arguments: #{process.argv}"