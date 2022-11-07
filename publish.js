const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// * repo1 path and repo1 object path
const TRACKERFOLDER = './.tracker/'
const PARENTPACKAGEJSONPATH = path.join(path.resolve(), './package.json');
const TRACKERPATH = path.join(path.resolve(),TRACKERFOLDER);
const TRACKERJSONTPATH = path.join(TRACKERPATH,'./object/repo.json');

// * main function
async function main(){
    try {
        // get the version of current repository and name
        let name, version;
        let parentPackageJSON = await fs.readJSON(PARENTPACKAGEJSONPATH)
        name = parentPackageJSON.name;
        version = parentPackageJSON.version;

        // update the verison number in the object file
        let trackerJSON = await fs.readJSON(TRACKERJSONTPATH);
        trackerJSON[name] = version;
        await fs.writeJSON(TRACKERJSONTPATH,trackerJSON)

        // update and publish tracker repository
        let command2 = `cd ${TRACKERPATH} && git commit -am 'pre relese' && npm version patch && git push origin master && npm publish`;
        const stdData2 = await exec(command2)
        console.log(`stdout : ${stdData2.stdout}`)
        console.log(`stderr : ${stdData2.stderr}`)

        // post clean up
        await fs.remove(TRACKERPATH);
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

main()