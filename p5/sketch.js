// quick outline of a way to view the interuptions in the first (and
// now maybe only) Presidential debate.

const speakers = {
  "President Donald J. Trump": {
    full_name: "President Donald J. Trump",
    name: "Trump",
    clr: "#E91D0E",
    dir: -1,
    orig_X: 500
  },
  "Chris Wallace": {
    full_name: "Chris Wallace",
    name: "Wallace",
    clr: "#AAA",
    dir: 0,
    orig_X: 250

  },
  "Vice President Joe Biden": {
    full_name: "Vice President Joe Biden",
    name: "Biden",
    clr: "#232066",
    dir: 1,
    orig_X: 0
  }
};

const titles = {
  main_title: "Visualizing the Presidential Debate",
  sub_title: "The first and maybe only debate. \nTuesday September 29, 2020.",
  description: "Each line represents either Joe Biden, Donald Trump or Chris Wallace talking. The length of each line is determined by how many words were spoken.",
  credit: "Original transcription from Rev transcription services.",
  author: "Built by Stephen Boyd, @sspboyd",
}

const s = (p55) => {

  let transcript_data;
  let lineH = 7;

  p55.preload = () => {
    let url = '../newTranscript.json';
    transcript_data = p55.loadJSON(url);
  };

  const transcript_entry = {
    init: function () {
      // maybe call to calculate initial values for things?
      // set w, h, curr_loc, clr?
    },
    update: function () {
      console.log("I'm an update function!");
    },
    render: function () {
      console.log("I'm the render function");
    },
    curr_loc: p55.createVector(),
    prev_loc: p55.createVector(),
    h: lineH,
    w: 0,
    full_name: "",
    name: "",
  };

  const create_transcript_entry = t => {
    let entry = Object.create(t);
    return entry;
  };

  let transcript_entries = [];



  p55.setup = () => {
    p55.createCanvas(1000, 10000);
    p55.background(255);
    p55.noLoop();
    // console.trace(transcript_data)
    p55.noStroke();

    // generate an array of objects for each line in the transcript
    for (i in transcript_data) {
      let cl = transcript_data[i]; // cl = current line in transcript_data
      let nto = create_transcript_entry(transcript_entry); // nto = new transcription object

      nto.full_name = cl.full_name;
      nto.name = cl.name;
      nto.timestamp = new Date(cl.time_stamp);
      nto.text = cl.text;
      nto.word_count = cl.word_count;

      transcript_entries.push(nto);
    };
    // console.table(transcript_entries);
  };

  p55.draw = () => {
    // update transcription line objs
    for (i in transcript_entries) {
      let cto = transcript_entries[i]; //cto = current transcription object
      cto.w = p55.map(cto.word_count, 0, 199, 0, p55.width / 2);
      console.log(`${i}, ${cto.name}`);
      let speaker_clr = speakers[cto.full_name].clr;

      if (cto.name === "Trump") {
        cto.curr_loc.x = p55.width / 2;
      } else if (cto.name === "Biden") {
        cto.curr_loc.x = p55.width / 2;
        cto.w = cto.w * -1;
      } else if (cto.name === "Wallace") {
        cto.curr_loc.x = p55.width / 2 - (cto.w / 2);
      }
      cto.curr_loc.y = 0;


      // Render functions
      p55.push();
      p55.translate(cto.curr_loc.x, lineH * i);
      p55.fill(speaker_clr);
      p55.rect(0, 0, cto.w, cto.h - 1, cto.h / 3)
      p55.pop();

    }
    // render graph
    // render titles

  };
};

let myp5 = new p5(s);