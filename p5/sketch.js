// quick outline of a way to view the interuptions in the first (and
// now maybe only) Presidential debate.
const PHI = (Math.sqrt(5)+1)/2;

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
  p55.preload = () => {
    let url = '../newTranscript.json';
    transcript_data = p55.loadJSON(url);
  };

  let c; // declaring the canvas var here so it can be used later in saveCanvas() func
  let transcript_data; // holds the json data
  let te_bar_w; // transcript entry bar width
  let transcript_entries = []; // holds the objects for each line of the transcript
  let canvasH = 600;
  let canvasW = 1100;


  const transcript_entry = {
    curr_loc: p55.createVector(),
    prev_loc: p55.createVector(),
    h: 0,
    w: te_bar_w,
    full_name: "",
    name: "",
    clr: "",

    init: function () {
      // maybe call to calculate initial values for things?
      // set w, h, curr_loc, clr?
    },

    update: function () {
      this.w = te_bar_w * 1; // transcript entry bar width
      this.h = p55.map(this.word_count, 0, 220, 0, p55.height / 2);

      if (this.name === "Trump") {
        this.curr_loc.y = p55.height / 2;
        this.h = this.h * -1;
      } else if (this.name === "Biden") {
        this.curr_loc.y = p55.height / 2;
      } else if (this.name === "Wallace") {
        this.curr_loc.y = (p55.height / 2) - (this.h / 2);
      }
      // this.curr_loc.x = map(curr_loc.timestamp);
    },
    
    render: function () {
      p55.push();
      // console.log(`i is ${i}`);
      p55.translate(te_bar_w * i, this.curr_loc.y) // transcript entry bar width;
      p55.stroke(this.clr);
      p55.strokeWeight(this.w/(PHI));
      p55.line(0,0,0,this.h);
      // p55.fill(this.clr);
      // p55.rect(0, 0, this.w, this.h)
      p55.pop();
    },
  };

  const create_transcript_entry = t => {
    let entry = Object.create(t);
    return entry;
  };

  p55.setup = () => {
    c = p55.createCanvas(canvasW, canvasH);
    te_bar_w = canvasW/Object.keys(transcript_data).length;

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
    p55.background(255);

    for ( i in transcript_entries) {
      transcript_entries[i].update();
      transcript_entries[i].render();
    }
    // render graph
    // render titles
  };

  let exportImg = function(){
    let sketchName = "2020_Presidental_Debates-";
    // generate date string like this YYYY-MM-DD-HH-MM-SS
    let dt = new Date();
    let datetime = `${dt.getFullYear().toString()}${(dt.getMonth()+1).toString()}${dt.getDate().toString()}${dt.getHours().toString()}${dt.getMinutes().toString()}${dt.getSeconds().toString()}`;
    let filename = sketchName + datetime;
    console.log(`saving canvas to: ${filename}`);
    p55.saveCanvas(c, filename, 'png');
  };

  p55.keyTyped = () => {
    if(p55.key === 'S'){
      exportImg();
    }
  };


};

let myp5 = new p5(s);