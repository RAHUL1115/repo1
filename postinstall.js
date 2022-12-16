// require repo1
const fs = require('fs')  
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const tracker = require('./index') // get tracker object
const parentPackageJSON = require('../../../package.json') // get parent packageJSON

async function main() { 
    let isProd = true;
    let prod = parentPackageJSON?.nexsales?.prod
    let prodLength = Object.keys(prod).length;
    let dev = parentPackageJSON?.nexsales?.dev
    let devLength = Object.keys(dev).length;

    // * necessary variables
    let packagesToInstall = ``;
    let packageObject;

    // ? change isProd according to arguments
    if (process.env.BUILD == 'dev') {
        isProd = false;
    }

    // ? use the object according to environment
    if(isProd && prod && prodLength > 0){
        packageObject = prod
    } else if(!isProd && dev && devLength > 0) { 
        packageObject = dev
    } else{
        packageObject = tracker
    }

    // ? construct packages string from packageObject
    Object.entries(packageObject).forEach(([packageName, packageVersion]) => {
        if(tracker[packageName]){
            packageVersion = packageVersion === "*" ? tracker[packageName] : packageVersion;
            packagesToInstall = `${packagesToInstall} ${packageName}@${packageVersion}`
        }
    })

    // ? run the install command
    let command = `npm install --no-save ${packagesToInstall}`;
    const stdData = await exec(command)
    console.log(`stdout : ${stdData.stdout}`)
}

main();