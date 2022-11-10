const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// * tacker repo and parent repo paths
// const TRACKERFOLDER = './.tracker/'
// const PARENTPACKAGEJSONPATH = path.join(path.resolve(), './package.json');
// const TRACKERPATH = path.join(path.resolve(),TRACKERFOLDER);
// const TRACKERJSONTPATH = path.join(TRACKERPATH,'./object/repo.json');
const TRACKERPATH = __dirname;
const TRACKERJSONTPATH = path.join(TRACKERPATH, './object/repo.json');
const PARENTPACKAGEJSONPATH = path.join(path.resolve(), './package.json');

// * main function
async function main(){
    try {
        // get the version of current repository and name
        let name, version;
        let parentPackageJSON = await fs.readJSON(PARENTPACKAGEJSONPATH)
        name = parentPackageJSON.name;
        version = parentPackageJSON.version;

        // update the version number in the object file
        let trackerJSON = await fs.readJSON(TRACKERJSONTPATH);
        trackerJSON[name] = version;
        await fs.writeJSON(TRACKERJSONTPATH,trackerJSON)

        // update and publish tracker repository
        let command = `cd ${TRACKERPATH} && git commit -am 'pre release' && npm version patch && git push origin master && npm publish`;
        const stdData = await exec(command)
        console.log(`stdout : ${stdData.stdout}`)
        console.log(`stderr : ${stdData.stderr}`)
    } catch (error) {
        console.error(error)
    } finally {
        // post clean up
        await fs.remove(TRACKERPATH);
    };
}

main()