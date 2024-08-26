function matchEvery(str, regex){
    return Array.from(str.matchAll(regex));
}

/**
 * 
 * @param {string} str 
 */
function trimNewLine(str){
    let newStart = 0;
    let newEnd = str.length;
    for (let i = 0; i < str.length; i++) {
        const c = str.charAt(i);
        console.log(c);
        
        if(c === "\n" || c === "\r" || " ")
            newStart++;
        else{
            break;
        }
    }

    for (let i = str.length - 1; i >= 0; i--) {
        const c = str.charAt(i);
        if(c === "\n" || c === "\r"  || " ")
            newEnd--;
        else{
            break;
        }
    }

    console.log(newStart, newEnd);
    
    return str.substring(newStart, newEnd);
}

module.exports = {
    matchEvery,
    trimNewLine,
}