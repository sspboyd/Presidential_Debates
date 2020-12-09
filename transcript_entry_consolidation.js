/*
The plan is 
read in the file

get total number of entries in the file

set an index counter at the last line in the file
for each transcription entry in the file,
    if the index counter is greater than 1
        get the current index line and current index-1 line
        if the names are the same then
            add the text from index line and add it to the index - 1 line
            update the word count number for the index-1 line

When done, write out a new file
*/

const fs = require('fs');
const tcpt = require('./debate_2.json');
console.log(tcpt.length);

const concat_entries = function(elt1, elt2){
    const new_elt_text = elt1.text.concat(" ", elt2.text);
    const new_word_count = elt1.word_count + elt2.word_count;
    let new_elt = elt1;
    new_elt.text = new_elt_text;
    new_elt.word_count = new_word_count;
    return new_elt;
};

for (let i = tcpt.length-1; i > 0; i--) {
    const elt2 = tcpt[i];
    const elt1 = tcpt[i - 1];

    // console.log(tcpt[i-1]);

    if(elt2.name === elt1.name){
        tcpt[i-1] = concat_entries(elt1, elt2);
        // console.log("new combined line...");
        // console.log(tcpt[i-1]);

    }
}

const newFile = JSON.stringify(tcpt);
console.log(newFile);

fs.writeFile("tcpt_concat.json", newFile, (err) => {
    if(err){
        throw err;
    }
    console.log("saved");
});