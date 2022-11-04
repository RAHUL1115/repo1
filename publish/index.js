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

        // let command = `git push origin master`;
        let command = `cd ${REPO1} && git commit -am 'pre relese' && npm version patch && git push origin master && npm publish`;
        const { stdout, stderr } = await exec(command)
        // if(stderr){
        //     throw new Error(stderr)
        // }
        console.log('1',stdout)
        console.log('2',stderr)
    } catch (error) {
        throw new Error(error)
    }
}

main()