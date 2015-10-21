###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

fs     = require 'fs'
ESJava = require './ESJava'

if process.argv.length > 2
  for file in process.argv[2..]
    src = fs.readFileSync file, 'utf8'
    console.log ESJava src
else
  console.log "Usage: esjava file..."
  # console.log "Invalid arguments: #{process.argv}"