const hs = require('../assets/heroStats.js')
let stats = hs.stats

// const fs = require('fs')
// const portraits = fs.readdirSync('../../static/portraits/')

let heroData = {}
stats = stats.split('\n').map(x => x.split(','))
for(const row of stats) {
  let nameArr = []
  for(const item of row[0].split(' ')) {
    if(row[0].split(' ').filter(x => x === item).length === 2 && nameArr.indexOf(item) === -1) nameArr.push(item)
  }
  name = nameArr.join(' ')

  heroData[name] = {}
  heroData[name].name = name
  heroData[name].main_attr = row[1].split(' ')[0].toLowerCase().slice(0,3)
  heroData[name].str = parseFloat(row[2])
  heroData[name].agi = parseFloat(row[5])
  heroData[name].int = parseFloat(row[21])
  heroData[name].min = parseFloat(row[16])
  heroData[name].max = parseFloat(row[17])
  heroData[name].bat = parseFloat(row[19])
  heroData[name].armor = parseFloat(row[15])
  heroData[name].base_hps = parseFloat(row[26])
  heroData[name].img = "npc_dota_hero_" + name.split(' ').join('_') + ".png"
}

fixNonStandardHeroImgs()

json = JSON.stringify(heroData)
const fs = require('fs')
fs.writeFile('../assets/heroData.json', json, 'utf8')



function fixNonStandardHeroImgs() {

    heroData['Anti-Mage'].img = toPortraitPath('antimage')
    heroData['Centaur Warrunner'].img = toPortraitPath('centaur')
    heroData['Clockwerk'].img = toPortraitPath('rattletrap')
    heroData['Doom'].img = toPortraitPath('doom_bringer')
    heroData['Io'].img = toPortraitPath('wisp')
    heroData['Lifestealer'].img = toPortraitPath('life_stealer')
    heroData['Magnus'].img = toPortraitPath('magnataur')
    heroData['Nature\'s Prophet'].img = toPortraitPath('furion')
    heroData['Necrophos'].img = toPortraitPath('necrolyte')
    heroData['Outworld Devourer'].img = toPortraitPath('obsidian_destroyer')
    heroData['Queen of Pain'].img = toPortraitPath('queenofpain')
    heroData['Shadow Fiend'].img = toPortraitPath('nevermore')
    heroData['Timbersaw'].img = toPortraitPath('shredder')
    heroData['Treant Protector'].img = toPortraitPath('treant')
    heroData['Underlord'].img = toPortraitPath('abyssal_underlord')
    heroData['Vengeful Spirit'].img = toPortraitPath('vengefulspirit')
    heroData['Windranger'].img = toPortraitPath('windrunner')
    heroData['Wraith King'].img = toPortraitPath('skeleton_king')
    heroData['Zeus'].img = toPortraitPath('zuus')

    function toPortraitPath(heroName) {
        return "npc_dota_hero_" + heroName  + '.png'
    }
}