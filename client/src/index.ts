//Adding an Alias for use to the whole project
import * as Alias from "module-alias"
Alias.addAlias("", __dirname)

import Arduino from "/backend/lib/arduino"
console.log(`Puerto: ${Arduino.port}`)
console.log(`Rate  : ${Arduino.bulkrate}`)
