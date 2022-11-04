// const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// ? repo1 path and repo1 object path
const REPO1 = path.join(path.resolve())
const REPO1OBJECT = path.join(REPO1,'/object/repo1.json')
const REPO2 = path.join(path.resolve(),'./../repo2')
const REPO2PACKAGE = path.join(REPO2,'package.json')
const REPO3 = path.join(path.resolve(),'./../repo3')
const REPO3PACKAGE = path.join(REPO3,'package.json')


// // * pre prcoess arguments function
// function processArgs(){
//     program.option('-k1, --key1 <int>')
//     program.option('-k2, --key2 <int>');
//     program.parse();
//     const options = program.opts();
//     return options;
// }

// * main function
async function main(){
    // const options = processArgs();
    try {
        // * first update repo 1
        // let command1 = `cd ${REPO1} && npm version patch -m "pre relese for version %s"`
        // let command1 = `cd ${REPO1} && pwd`
        // const { stdout1, stderr1 } = await exec(command1)
        // if(stderr1){
            // throw new Error(stderr1)
        // }
        // console.log(stdout1)

        // * declearation
        let allRepos = []
        let allRepoVersion = {}

        // * promisify all repos
        allRepos.push(fs.readJSON(REPO2PACKAGE))
        allRepos.push(fs.readJSON(REPO3PACKAGE))

        // * object output
        let repos = await Promise.all(allRepos)
        repos.forEach(repo => {
            allRepoVersion[repo.name] = repo.version
        })

        // * wirte the output to file
        await fs.writeJSON(REPO1OBJECT,allRepoVersion)

        // let command2 = `git push origin master`;
        let command2 = `cd ${REPO1} && pwd`
        const { stdout2, stderr2 } = await exec(command2)
        if(stderr1){
            throw new Error(stderr2)
        }
        console.log(stdout1)
    } catch (error) {
        throw new Error(error)
    }
}

main()