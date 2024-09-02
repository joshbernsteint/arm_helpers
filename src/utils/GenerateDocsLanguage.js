// This file augments and reformats the tmLanguage file to create the "docs" version.

const fs = require('fs');

const toObj = JSON.parse(fs.readFileSync('../../config/arm.tmLanguage.json').toString());
const newPatterns = [
    ...toObj.patterns.slice(0, -1),
    {
        "name": "keyword.operator.hoverEqual",
        "match": "=="
    },
    {
        "name": "constant.language.keywords",
        "match": "\\b(addr|src|num|label|expr)\\b"
    },
    toObj.patterns[toObj.patterns.length - 1]
];
toObj.name = toObj.name + ".docs"
toObj.patterns = newPatterns;

toObj.repository.directives.patterns = toObj.repository.directives.patterns.map(e => {
    if(e.name === "invalid.illegal.directive") return e;
    e.match = e.match.replaceAll("\\.", "");
    return e;
})

toObj.repository.directives.patterns.unshift(
    {
        "name": "support.class.directive.types.type",
        "match": "\\s*(Register|Simm9|Imm9|Label|Address|Instruction|FRegister|Directive|Integer)"
    }
);



toObj.scopeName = toObj.scopeName + ".docs"
fs.writeFileSync('../../config/autogen-arm.docs.tmLanguage.json', JSON.stringify(toObj, null, 4));
console.log('Built Doc file');

