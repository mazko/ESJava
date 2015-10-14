###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

fs     = require 'fs'
ESJava = require './ESJava'


src = fs.readFileSync process.argv[2], 'utf8'
console.log ESJava src