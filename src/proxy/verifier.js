const { mapLimit } = require("async")
const { readFile, unlink } = require("fs-extra")
const { join } = require("path")

const { getConfig, getCacheLocation } = require("./config")
const Logger = require("./ipc")
const cacher = require("./cacher")


async function verifyCache() {
    if(!getConfig().verifyCache) {
        Logger.error("verifyCache is not set in config! Aborted check!")
        return
    }

    Logger.log("Verifying cache... This might take a while")

    const deleteinvalid = process.argv.find(k => k.toLowerCase() == "delete")

    const responses = await mapLimit(
        Object.entries(cacher.cached),
        32,
        async ([key, value]) =>  {
            try {
                if(value.length == undefined) return 0
                const file = join(getCacheLocation(), key)
                const contents = await readFile(file)

                if(contents.length != value.length) {
                    Logger.error(key, "length doesn't match!", contents.length, value.length)
                    if(deleteinvalid)
                        unlink(file)
                    return 0
                }
                return 1
            } catch(e) {
                return -1
            }
        }
    )

    const total = responses.length,
          invalid = responses.filter(k => k == 0).length,
          checked = responses.filter(k => k >= 0).length,
          error   = responses.filter(k => k == -1).length

    Logger.log(`Done verifying, found ${invalid} invalid files, ${checked} files checked, cached.json contains ${total} files, failed to check ${error} files (missing?)`)
}

module.exports = { verifyCache }
