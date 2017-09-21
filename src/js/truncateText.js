/**
 * 
 * @param {String} text 
 * @param {Number} length 
 * @param {String} suffix 
 */

function ellipsize(text, length, suffix) {
    if (text.length <= length) {
        return text;
    }

    if (length < suffix.length) {
        throw Error("Suffix length is greater than truncated length");
    }

    var truncated = text.substr(0, length - suffix.length);
    return truncated + suffix;
}

//console.log('result:', ellipsize('abcdef', 6, '...'), '\nshould be: abcdef');   // abcdef
//console.log('result:', ellipsize('abcdef', 3, '...'), '\nshould be: ...');   // ...

//try {
//    console.log('result:', ellipsize('abcdef', 3, 'READ MORE'), '\nshould be: error'); // throw Error
//} catch (e) {
//    console.error(e)
//}

//console.log('result:', ellipsize('abcdef', 100, '...'), '\nshould be: abcdef'); // abcdef
//console.log('result:', ellipsize('abcdef', 5, '...'), '\nshould be: ab...');   // ab...

var headings = document.getElementsByTagName("h2");
for (var i = 0; i < headings.length; i++) {
    headings[i].innerText = ellipsize(headings[i].innerText, 51, '...');
}
