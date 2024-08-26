function matchEvery(str, regex){
    return Array.from(str.matchAll(regex));
}


function generateSpaceString(numSpaces){
    return " ".repeat(numSpaces);
}

module.exports = {
    matchEvery,
    generateSpaceString,
}