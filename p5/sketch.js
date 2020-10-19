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
  let c; // declaring the canvas var here so it can be used later in saveCanvas() func
  let transcript_data; // holds the json data
  let lineH = 18;
  let transcript_entries = []; // holds the objects for each line of the transcript

  let exportImg = function(){
    let sketchName = "2020_Presidental_Debates-";
    // generate date string like this YYYY-MM-DD-HH-MM-SS
    let dt = new Date();
    let datetime = `${dt.getFullYear().toString()}${(dt.getMonth()+1).toString()}${dt.getDate().toString()}${dt.getHours().toString()}${dt.getMinutes().toString()}${dt.getSeconds().toString()}`;
    let filename = sketchName + datetime;
    console.log(`saving canvas to: ${filename}`);
    p55.saveCanvas(c, filename, 'png');

  }

  p55.preload = () => {
    let url = '../newTranscript.json';
    transcript_data = p55.loadJSON(url);
  };

  const transcript_entry = {
    curr_loc: p55.createVector(),
    prev_loc: p55.createVector(),
    h: lineH,
    w: 0,
    full_name: "",
    name: "",
    clr: "",

    init: function () {
      // maybe call to calculate initial values for things?
      // set w, h, curr_loc, clr?
    },

    update: function () {
      this.w = p55.map(this.word_count, 0, 199, 0, p55.width / 2);
      this.h = lineH * 1;

      if (this.name === "Trump") {
        this.curr_loc.x = p55.width / 2;
      } else if (this.name === "Biden") {
        this.curr_loc.x = p55.width / 2;
        this.w = this.w * -1;
      } else if (this.name === "Wallace") {
        this.curr_loc.x = p55.width / 2 - (this.w / 2);
      }
      this.curr_loc.y = 0;
    },
    
    render: function () {
      p55.push();
      p55.translate(this.curr_loc.x, lineH * i);
      p55.noStroke();
      p55.fill(this.clr);
      p55.rect(0, 0, this.w, this.h - 4, this.h / 3)
      p55.pop();
    },
  };

  const create_transcript_entry = t => {
    let entry = Object.create(t);
    return entry;
  };

  p55.setup = () => {
    c = p55.createCanvas(1300, 9050);
    p55.background(255);
    p55.noLoop();

    // generate an array of objects for each line in the transcript
    for (i in transcript_data) {
      let cl = transcript_data[i]; // cl = current line in transcript_data
      let nto = create_transcript_entry(transcript_entry); // nto = new transcription object

      nto.full_name = cl.full_name;
      nto.name = cl.name;
      nto.timestamp = new Date(cl.time_stamp);
      nto.text = cl.text;
      nto.word_count = cl.word_count;
      nto.clr = speakers[cl.full_name].clr;

      transcript_entries.push(nto);
    };
  };

  p55.draw = () => {
    for (i in transcript_entries) {
      transcript_entries[i].update();
      transcript_entries[i].render();
    }
    // render graph
    // render titles
    exportImg();


  };
  // p55.pop();
};

let myp5 = new p5(s);