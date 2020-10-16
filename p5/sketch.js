// quick outline of a way to view the interuptions in the first (and
// now maybe only) Presidential debate.

// const lines = 600;
// const transcript = Array(lines).fill(0);
const speakers = {
  "President Donald J. Trump": {
    name: "President Donald J. Trump",
    clr: "#E91D0E",
    dir: -1,
    orig_X: 500
  },
  "Chris Wallace": {
    name: "Chris Wallace",
    clr: "#AAA",
    dir: 0,
    orig_X: 250

  },
  "Vice President Joe Biden": {
    name: "Vice President Joe Biden",
    clr: "#232066",
    dir: 1,
    orig_X: 0
  }
};

// const new_transcript = transcript.map((t) => {
//   return {
//     name: function() {
//       let names = Object.keys(speakers);
//       // console.log(names)
//       let curr_name = names[Math.floor(names.length * Math.random())];
//       // console.log(curr_name);
//       return curr_name;
//     }(),
//     text: "I am talking",
//     time: "00:33:22",
//     text_len: Math.floor(Math.random() * Math.floor(321))
//   };
// });

// new_transcript.map((t) => {
//   // return console.log(t.text_len);
// });

// Globals. yck
let transcript_data;
let lineH = 7;


function preload(){
  let url = '../newTranscript.json';
  transcript_data = loadJSON(url);
}

function setup() {
  createCanvas(1000, 10000);
  background(255);
  noLoop();
  // console.trace(transcript_data)
  noStroke();
  for(i in transcript_data){
    let px = 0;
    curr_line = transcript_data[i];
    let curr_line_wc = curr_line["Word Count"];
    let pw = map(curr_line_wc, 0,199,0,width/2)

    let speaker_clr = speakers[curr_line.Name].clr;
    // console.table({curr_line});
    push();
    if (curr_line.Name === "President Donald J. Trump") {
      px = width / 2;
    } else if (curr_line.Name === "Vice President Joe Biden") {
      px = width / 2;
      pw=pw * -1;
    } else if (curr_line.Name === "Chris Wallace") {
      px = width/2-(pw/2);
    }
    translate(px, (lineH + 1) * i);
    fill(speaker_clr);
    console.log({px, pw, lineH, speaker_clr});
    rect(0, 0, pw, lineH,lineH/3)
    pop();
  };

  // for (let i = 0; i < transcript_data.length; i++) {
  // }

  // stroke(0);
  // strokeWeight(.3);
  // noFill();
  // noStroke();

  // beginShape();
  // curveVertex(width / 2, 0);
  // curveVertex(width / 2, 0);


//   for (let i = 0; i < new_transcript.length; i++) {
//     let px = 0;
//     let py = 0;
//     curr_line = new_transcript[i];
//     // curveVertex(random(200), (lineH + 1) * i);
//     if (curr_line.name === "Trump") {
//       px = width / 2;
//     } else if (curr_line.name === "Biden") {
//       px = width / 2;
//       console.log("Biden's text_len: " + curr_line.text_len);
//       curr_line.text_len = curr_line.text_len * -1;
//     } else if (curr_line.name === "Wallace") {
//       px = width / 2 - curr_line.text_len / 2;
//     }
// //    curr_line.text_len
//     py = (lineH - 320) * i;
//     let speaker_clr = speakers[curr_line.name].clr
//     fill(speaker_clr);
//     // rect(0, 0, , lineH)
//     beginShape();
    
//     curveVertex(px+curr_line.text_len, py);
//     curveVertex(px, py);
//     curveVertex((px+curr_line.text_len), py + lineH);
//     curveVertex(px, (py + lineH));
//     endShape();
//   }
//   // curveVertex(width / 2, height);
//   // curveVertex(width / 2, height);
//   // endShape();


}

function draw() {

}