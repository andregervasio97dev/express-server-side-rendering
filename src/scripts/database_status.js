import { execSync } from "child_process";
import fs from "fs";

const decoder = new TextDecoder();

export function databaseStatus(directory) {
    const subPaths = fs.readdirSync(directory, {
        withFileTypes: true,
    });
    const subDirectories = subPaths.filter((Dirent) => Dirent.isDirectory());
    let returnMap = [];
    subDirectories.forEach((element) => {
        try {
            let output = execSync(
                `echo ${directory}` + "\\" + `${element.name}`
            );
            returnMap.push({
                name: element.name,
                status: decoder.decode(output),
            });
        } catch (error) {
            console.error(error.message);
        }
    });
    return returnMap;
}
