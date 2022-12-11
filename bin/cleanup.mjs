import fs from 'fs'
import path from 'path'
import packageJSON from "../package.json" assert { type: "json" };

delete packageJSON.scripts['setup']
delete packageJSON.scripts['postinstall']
delete packageJSON.scripts['cleanup-repository']

let data = JSON.stringify(packageJSON, null, 2)
fs.writeFileSync(path.resolve(__dirname, '../package.json'), data)
