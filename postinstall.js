const fs = require('fs-extra');
const path = require('node:path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const tracker = require('./index'); // get tracker object

async function main() { 
    const parentPackageJSON = fs.readJSONSync(path.join(path.resolve(), 'package.json'));
    let prodPackages = parentPackageJSON?.nexsales?.prod;
    let devPackages = parentPackageJSON?.nexsales?.dev;

    // necessary variables
    let packagesToInstall = ``;
    let packageObject = prodPackages
    
    // change packageObject according to environment type
    if (process.env.BUILD == 'dev') {
        packageObject = devPackages;
    }

    // check if packageObject is valid JSON object
    if(typeof(packageObject) != 'object' || packageObject == {}) {
        return;
    }

    // construct packages string from packageObject
    Object.entries(packageObject).forEach(([packageName, packageVersion]) => {
        if(tracker[packageName]){
            packageVersion = packageVersion === "*" ? tracker[packageName] : packageVersion;
            packagesToInstall = `${packagesToInstall} ${packageName}@${packageVersion}`
        }
    })

    // ? run the install command
    let command = `npm install --no-save ${packagesToInstall}`;
    const stdData = await exec(command)
    console.log(stdData.stdout)
    console.log(stdData.stderr);
}

main()