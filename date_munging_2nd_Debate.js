console.log("date fixing/munging");

// const tcpt = require('./data/2nd-2020-Pres-Debate/debate_2_1_v2.json');
// const tcpt = require('./data/2nd-2020-Pres-Debate/debate_2_2_v1.json');
const tcpt = require('./data/2nd-2020-Pres-Debate/debate_2_3_v1.json');
const add = require("date-fns/add");
const fs = require('fs');
// const _ = require('lodash');

// console.log(tcpt);
const dateOfDebate = new Date(2020, 9, 22, 21, 0);
const adjusted_start_time = add(dateOfDebate, {
    hours: 1,
    minutes: 13,
    seconds: 15
});
// console.log(dateOfDebate);
tcpt.map(d => {
    // console.log('d["Time Stamp"]: '+d["Time Stamp"]);
    let ts = d['time_stamp'].split(':');
    // console.log('ts: '+ts);
    let nd;
    const wordCount = d.text.split(/\s+/);
    // console.log("word count and text: "+ wordCount.length, d.Text);
    if(ts.length < 3){
        // console.log("<3: "+ ts[0], ts[1]);
        nd = add(adjusted_start_time, {minutes:ts[0], seconds:ts[1]});
    }else if(ts.length > 2){
        // console.log("before adding time: \n"+nd)
        nd = add(dateOfDebate, {hours: ts[0], minutes: ts[1], seconds: ts[2]});
        nd = add(nd, {minutes: 24, seconds: 30});
        // console.log("nd is now: "+nd)
    }

    d['time_stamp'] = nd;
    d['word_count'] = wordCount.length;
    // var result = addHours(new Date(2014, 6, 10, 23, 0), 2)
    // plan is to check which of these are the long ones (00:00:00)
    // convert those to date times using moment.js
    // add the right number of minutes
    // print the time back out to the var;
});
console.log("tcpt");
console.log(tcpt);
const newFile = JSON.stringify(tcpt);
// console.log("newFile");
// console.log(newFile);
const output_filename = "debate_2_3_v2.json"
fs.writeFile(output_filename, newFile, (err) => {
    if(err){
        throw err;
    }
    console.log("saved");
});

// const maxWrdCount = _.max(_.map(tcpt, function(d){
//     return _.max(_.values(d["Word Count"]));
// }));

let maxWrd=0
const wrdCount = tcpt.forEach(function(d){
    if(d["Word Count"] > maxWrd) maxWrd = d["Word Count"];
});


console.log("largest word count val: " + maxWrd);
