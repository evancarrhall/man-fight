const fs = require('fs')
files = fs.readdirSync('assets/portraits/')

json = JSON.stringify(files)

fs.writeFile('./assets/heros.json', json, 'utf8');