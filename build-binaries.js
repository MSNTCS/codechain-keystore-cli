#!/usr/bin/env node

const { execSync } = require('child_process');
const { version } = require('./package.json');

execSync("rm -r binaries/");
execSync("mkdir -p binaries");
execSync("yarn pkg -t node8-linux-x86,node8-linux-x64,node8-macos-x64,node8-windows-x86,node8-windows-x64 --out-path binaries/ package.json");


const files = [
    "codechain-keystore-cli-linux-x64",
    "codechain-keystore-cli-linux-x86",
    "codechain-keystore-cli-macos-x64",
    "codechain-keystore-cli-win-x64.exe",
    "codechain-keystore-cli-win-x86.exe"
];

for (const file of files) {
    execSync(`mv binaries/${file} binaries/cckey`);
    const dir = removeExe(file);
    execSync(`mkdir -p binaries/${dir}`);
    execSync(`mv binaries/cckey binaries/${dir}/`);

    execSync(`zip -r binaries/${dir}-${version}.zip binaries/${dir}`)
}

/**
 * @param {string} fileName
 */
function removeExe(fileName) {
    if (fileName.indexOf("exe") !== -1) {
        return fileName.slice(0, fileName.length - 4);
    } else {
        return fileName;
    }
}
