// quick outline of a way to view the interuptions in the first (and
// now maybe only) Presidential debate.
const PHI = (Math.sqrt(5) + 1) / 2;

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
    clr: "#888",
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
  let copy_font;
  p55.preload = () => {
    let url = '../newTranscript.json';
    transcript_data = p55.loadJSON(url);
    copy_font = p55.loadFont('assets/fonts/Georgia.ttf');
  };

  let c; // declaring the canvas var here so it can be used later in saveCanvas() func
  let transcript_data; // holds the json data
  let te_bar_w; // transcript entry bar width - don't much like this var name
  let transcript_entries = []; // holds the objects for each line of the transcript
  let canvasW = p55.windowWidth;
  let canvasH = p55.windowHeight;

  const time_axis = function (t) {
    const debate_start_time = new Date(2020, 8, 29, 21, 0);
    const debate_end_time = new Date(2020, 8, 29, 22, 36);
    return p55.map(t, debate_start_time.getTime(), debate_end_time.getTime(), 0, canvasW);
  }

  const index_scale = function (i) {
    const max_entry_idx = Object.keys(transcript_entries).length;
    return p55.map(i, 0, max_entry_idx, 0, canvasW);
  }


  const transcript_entry = {

    init: function () {
      // maybe call to calculate initial values for things?
      // set w, h, curr_loc, clr?
    },

    update: function () {
      let word_count_sqr = Math.sqrt(this.word_count); // this doesn't change and could go to the obj instantiaion spot in setup()
      let max_sqr = Math.sqrt(199); // still need to break this out into a separate calculation
      this.w = p55.map(word_count_sqr, 0, max_sqr, 0, p55.height / 2);
      this.h = this.w;

      if (this.name === "Trump") {
        this.curr_loc.y = p55.height / 2;
        this.h = this.h * -1;
      } else if (this.name === "Biden") {
        this.curr_loc.y = p55.height / 2;
      } else if (this.name === "Wallace") {
        this.curr_loc.y = (p55.height / 2) - (this.h / 2);
      }

      this.curr_loc.x = time_axis(this.timestamp.getTime());

      // check mouse loc for hover
      // let horz_check = Math.abs(this.curr_loc.x - p55.mouseX) < 2;
      // let vert_check = p55.mouseY > 0 && p55.mouseY < p55.height;
      // if(horz_check && vert_check){
      // let mouse_dist = this.curr_loc.dist(p55.createVector(p55.mouseX, p55.mouseY));
      let mouse_dist = Math.abs(p55.mouseX-this.curr_loc.x);
      if (mouse_dist < 4) { // how big an area are we checking?
        this.hover = true;
      } else {
        this.hover = false;
      }

      // set alpha for clr
      if (this.hover) {
        this.clr.setAlpha(199);
      } else {
        this.clr.setAlpha(76)
      }
    },

    render: function () {
      p55.push();
      p55.translate(this.curr_loc.x, this.curr_loc.y) // transcript entry bar width;
      // render circles/lines for each entry
      p55.fill(this.clr);
      p55.stroke(this.clr);
      p55.ellipse(0, this.h / 2, this.w / 3, this.h / 3);
      p55.ellipse(0, this.h / 2, 3, 3);
      p55.line(0, 0, 0, this.h / 3);
      p55.pop();
    },

    render_text: function () {
      // render text if necessary
      if (this.hover) {
        p55.push();
        p55.translate(this.curr_loc.x, this.curr_loc.y) // transcript entry bar width;
        p55.fill(255, 47);
        p55.strokeWeight(.76);
        p55.stroke(255, 29);
        p55.rect(0-4, this.h-7, Math.min(600, p55.width - this.curr_loc.x), 76, 7);
        p55.fill(0,199);
        p55.textFont(copy_font);
        p55.textSize(18);
        p55.text(`${this.text}`, 0, this.h, Math.min(607, p55.width - this.curr_loc.x+11), 76);
        p55.pop();
      }
    },
  };

  const create_transcript_entry = t => {
    let entry = Object.create(t);
    return entry;
  };

  p55.setup = () => {
    c = p55.createCanvas(canvasW, canvasH);
    te_bar_w = canvasW / Object.keys(transcript_data).length; // not sure if there is a better way to set this. Also, don't like this var name...

    // generate an array of objects for each line in the transcript
    for (i in transcript_data) {
      let cl = transcript_data[i]; // cl = current line in transcript_data
      let nto = create_transcript_entry(transcript_entry); // nto = new transcription object

      nto.curr_loc = p55.createVector();
      nto.h = 0;
      nto.w = te_bar_w;
      nto.hover = false;
      nto.full_name = cl.full_name;
      nto.name = cl.name;
      nto.timestamp = new Date(cl.time_stamp);
      nto.text = cl.text;
      nto.word_count = cl.word_count;
      nto.clr = p55.color(speakers[cl.full_name].clr);

      transcript_entries.push(nto);
    };
    // let result = getClosestEntry('Biden');
  };

  p55.draw = () => {
    p55.background(255);
    // find objects closest to mouse for each speaker
    set_hover();
    //render legend

    render_legend();
    for (i in transcript_entries) {
      transcript_entries[i].update();
      transcript_entries[i].render();
    }
    for (i in transcript_entries) { // super not great doing this twice!! But I want the text on top of the circles and lines so...
      transcript_entries[i].render_text();
    }
    // render graph
    // render titles

    // render axis
    p55.strokeWeight(.25);
    p55.fill(0);
    p55.line(0, p55.height / 2, p55.width, p55.height / 2);

    // render focus area
    p55.fill(255,29);
    p55.stroke(255,76);
    p55.strokeWeight(.76);
    p55.rect(p55.mouseX-2, 0, 4, p55.height);

  };

  let getClosestEntry = function (n) {
    let result = transcript_entries.filter(e => e.name === n);
    result = result.map(e => e.curr_loc.dist(p55.createVector(p55.mouseX, p55.mouseY)));
    // for the name provided...
    // filter the transcipt_entries array by that name
    // use map to calculate the distances to mouseX for each entry
    // use something like `let min = Math.min(...arrayOfNumbers);` to get smallest number
    // use array.indexOf to return that element from the array
    return result;
  }

  let render_legend = function(){
    p55.textFont(copy_font);
    p55.textSize(199);
    p55.fill(0,29);
    p55.text("Trump", 0, p55.height/2-100);
    p55.text("Biden", 0, p55.height-100);
  };

  let set_hover = function(){

  }

  let exportImg = function () {
    let sketchName = "2020_Presidential_Debates-";
    // generate date string like this YYYY-MM-DD-HH-MM-SS
    let dt = new Date();
    let datetime = `${dt.getFullYear().toString()}${(dt.getMonth()+1).toString().padStart(2,'0')}${dt.getDate().toString().padStart(2,'0')}${dt.getHours().toString().padStart(2,'0')}${dt.getMinutes().toString().padStart(2,'0')}${dt.getSeconds().toString().padStart(2,'0')}`;
    let filename = sketchName + datetime;
    console.log(`saving canvas to: ${filename}`);
    p55.saveCanvas(c, filename, 'png');
  };

  p55.keyTyped = () => {
    if (p55.key === 'S') {
      exportImg();
    }
  };


};

let myp5 = new p5(s);