// require repo1
const fs = require('fs')  
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const tracker = require('./index') // get tracker object
const parentPackageJSON = require('../../../package.json') // get parent packageJSON

// else always install prod
(async function() { 
    let prodPackages = parentPackageJSON?.nexsales?.prod || {};
    let devPackages = parentPackageJSON?.nexsales?.dev || {};

    // necessary variables
    let packagesToInstall = ``;
    let packageObject = prodPackages
    
    // change packageObject according to environment type
    if (process.env.BUILD == 'dev') {
        packageObject = devPackages;
    }

    // check if packageObject is type of object
    if(typeof(a) != 'object'){
        packageObject = {};
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
    console.log(`stdout : ${stdData.stdout}`)
})()