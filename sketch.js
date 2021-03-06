// quick outline of a way to view the interuptions in the first (and
// now maybe only) Presidential debate.
const PHI = (Math.sqrt(5) + 1) / 2; // I use PHI for layout ratios

// max_word_count is the max number of words in a transcript entry for 
// both debates. This will be a constant used to scale the circle sizes 
// and thereby make circle size comparable between the two debates.
const max_word_count = 387;

const speakers = {
  "President Donald J. Trump": {
    full_name: "President Donald J. Trump",
    name: "Trump",
    clr: "#E91D0E",
    dir: -1,
    orig_X: 500
  },
  "Donald Trump": {
    full_name: "Donald Trump",
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
  "Kristen Welker": {
    full_name: "Kristen Welker",
    name: "Welker",
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
  },
  "Joe Biden": {
    full_name: "Joe Biden",
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


let viz_controller = {
  state: "intro", // default value. valid options are intro, viz, about
  // time to complete loading animation
  load_duration: undefined,
  total_elts: undefined,
  debate_start_time: undefined,
  debate_end_time: undefined,


  mPressed: function () {
    if (this.state === "intro") {
      this.state = "viz";
    }
  },
};





let myp5; // this var will be used to construct both p5 debate instances

// Debate 1 Start
const db1 = (p55) => {
  let copy_font;
  let transcript_data; // holds the json data

  let c; // declaring the canvas var here so it can be used later in saveCanvas() func
  let te_bar_w; // transcript entry bar width - don't much like this var name
  let transcript_entries = []; // holds the objects for each line of the transcript
  // let canvasW = Math.max(1100, p55.windowWidth);
  let canvasW = Math.max(500, document.getElementById("debate_viz").offsetWidth);
  let canvasH = 500;
  let db1_vc = Object.create(viz_controller);


  p55.preload = () => {
    let url = 'data/newTranscript.json';
    transcript_data = p55.loadJSON(url);
    copy_font = p55.loadFont('assets/fonts/Georgia.ttf');
  };



  const transcript_entry = {
    init: function () {
      // maybe call to calculate initial values for things?
      // set w, h, curr_loc, clr?
    },

    update: function () {
      let word_count_sqr = Math.sqrt(this.word_count); // this doesn't change and could go to the obj instantiaion spot in setup()
      let max_sqr = Math.sqrt(max_word_count); // still need to break this out into a separate calculation
      this.w = p55.map(word_count_sqr, 0, max_sqr, 0, p55.height / 2);
      this.h = this.w;

      if (this.name === "Trump") {
        this.curr_loc.y = p55.height / 2;
        this.h = this.h * -1;
      } else if (this.name === "Biden") {
        this.curr_loc.y = p55.height / 2;
      } else if (this.name === "Wallace") {
        this.curr_loc.y = (p55.height / 2);
      }

      this.curr_loc.x = p55.map(this.timestamp.getTime(), db1_vc.debate_start_time.getTime(), db1_vc.debate_end_time.getTime(), 0, canvasW);

      // check mouse loc for hover
      // let horz_check = Math.abs(this.curr_loc.x - p55.mouseX) < 2;
      // let vert_check = p55.mouseY > 0 && p55.mouseY < p55.height;
      // if(horz_check && vert_check){
      // let mouse_dist = this.curr_loc.dist(p55.createVector(p55.mouseX, p55.mouseY));
      let mouse_dist = Math.abs(p55.mouseX - this.curr_loc.x);
      let inside_canvas = (p55.mouseY > 0) && (p55.mouseY < canvasH);
      if ((mouse_dist < 3) && inside_canvas) { // how big an area are we checking?
        this.hover = true;
      } else {
        this.hover = false;
      }

      // set alpha for clr
      if (this.hover) {
        this.clr.setAlpha(247);
      } else {
        this.clr.setAlpha(76)
      }
    },

    render: function () {
      p55.push();
      p55.translate(this.curr_loc.x, this.curr_loc.y);
      // render circles/lines for each entry
      p55.fill(this.clr);
      p55.stroke(this.clr);
      if (this.name === "Wallace") {
        p55.ellipse(0, 0, this.w / 3, this.h / 3);
        // p55.ellipse(0, 0, 2, 2);
      } else {
        p55.ellipse(0, this.h / 1.2, this.w / 3, this.h / 3); // lots of jank in here. Would do well to refactor this.
        // p55.noStroke();
        p55.ellipse(0, this.h / 1.2, 3, 3);
      }
      // p55.line(0, 0, 0, )this.h / 1.2)-(this.h/4));
      p55.pop();
    },

    render_text: function () {
      // render text if necessary
      if (this.hover) {
        let rect_w = 123 + 199; //521 :)
        let rect_x = p55.map(p55.mouseX, 0, canvasW, 0, -1 * rect_w);
        p55.textFont(copy_font); // declaring these up here so they can be used in textWidth().
        p55.textSize(18);
        let bkg_width = Math.min(p55.textWidth(this.text) + 11, 600);
        p55.push();
        p55.translate(this.curr_loc.x, this.curr_loc.y);
        p55.fill(255, 87);
        p55.strokeWeight(.76);
        p55.stroke(255, 129);
        if (this.name === "Wallace") {
          p55.rect(rect_x - 7, -7 - 29, rect_w, 76, 7);
          p55.fill(0, 199);
          p55.text(`${this.text}`, rect_x, -29, rect_w, 76);

        } else if (this.name === "Trump") {
          p55.rect(rect_x - 7, this.h - 7, rect_w, 123, 7);
          p55.fill(0, 199);
          p55.text(`${this.text}`, rect_x, this.h, rect_w, 123);

        } else if (this.name === "Biden") {
          p55.rect(rect_x - 7, (this.h - 7) - (this.w / 3), rect_w, 123, 7);
          p55.fill(0, 199);
          p55.text(`${this.word_count} words: ${this.text}`, rect_x, this.h - (this.w / 3), rect_w, 123);

        }
        p55.pop();
      }
    },
  };


  const index_scale = function (i) {
    const max_entry_idx = Object.keys(transcript_entries).length;
    return p55.map(i, 0, max_entry_idx, 0, canvasW);
  }

  p55.setup = () => {
    c = p55.createCanvas(canvasW, canvasH);
    // c.parent('debate_viz');
    te_bar_w = canvasW / Object.keys(transcript_data).length; // not sure if there is a better way to set this. Also, don't like this var name...

    // generate an array of objects for each line in the transcript
    for (i in transcript_data) {
      let cl = transcript_data[i]; // cl = current line in transcript_data
      let nto = Object.create(transcript_entry); // nto = new transcription object

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

    db1_vc.state = 'viz';
    db1_vc.load_duration = 5; // seconds
    db1_vc.debate_start_time = new Date(2020, 8, 29, 21, 0);
    db1_vc.debate_end_time = new Date(2020, 8, 29, 22, 36);
    db1_vc.total_elts = transcript_entries.length;

  };

  p55.draw = () => {
    p55.background(255);

    if(db1_vc.state === "viz"){
    // find objects closest to mouse for each speaker
    // set_hover();
    //render legend

    render_legend();

    for (i in transcript_entries) {
      transcript_entries[i].update();
      transcript_entries[i].render();
    }

    for (i in transcript_entries) { // super not great doing this twice!! But I want the text on top of the circles and lines so...
      transcript_entries[i].render_text();
    }

    // render the x axis
    p55.strokeWeight(.5);
    p55.stroke(255);
    p55.line(0, p55.height / 2, canvasW, canvasH / 2);

    // render focus area
    p55.fill(255, 29);
    p55.stroke(255, 76);
    p55.strokeWeight(.76);
    p55.rect(p55.mouseX - 1.5, 0, 3, p55.height);
  }

    // render attrib watermark
    p55.textFont(copy_font);
    p55.textSize(11);
    p55.fill(76);
    p55.text("@sspboyd", canvasW - p55.textWidth("@sspboyd"), canvasH - 29);

  };

  // let getClosestEntry = function (n) {
  //   let result = transcript_entries.filter(e => e.name === n);
  //   result = result.map(e => e.curr_loc.dist(p55.createVector(p55.mouseX, p55.mouseY)));
  //   // for the name provided...
  //   // filter the transcipt_entries array by that name
  //   // use map to calculate the distances to mouseX for each entry
  //   // use something like `let min = Math.min(...arrayOfNumbers);` to get smallest number
  //   // use array.indexOf to return that element from the array
  //   return result;
  // }

  let render_legend = function () {
    p55.textFont(copy_font);
    p55.textSize(47);
    p55.fill(0, 47);
    p55.text("Trump", 0, p55.textAscent("Trump"));
    p55.text("Biden", 0, p55.height);
    p55.textSize(29);
    p55.fill(0, 76);
    p55.text("Wallace", 0, (p55.height / 2) - 2);
  };

  let exportImg = function () {
    let sketchName = "2020_Presidential_Debate1-sspboyd-";
    // generate date string like this YYYY-MM-DD-HH-MM-SS
    let dt = new Date();
    let datetime = `${dt.getFullYear().toString()}${(dt.getMonth()+1).toString().padStart(2,'0')}${dt.getDate().toString().padStart(2,'0')}${dt.getHours().toString().padStart(2,'0')}${dt.getMinutes().toString().padStart(2,'0')}${dt.getSeconds().toString().padStart(2,'0')}`;
    let filename = sketchName + datetime;
    console.log(`saving canvas to: ${filename}`);
    p55.saveCanvas(c, filename, 'png');
  };

  p55.keyTyped = () => {
    if (p55.key === 'S' || p55.key === 's') {
      exportImg();
    }
  };
};
myp5 = new p5(db1, 'debate_viz');
  ///////// Debate 1 End


// Debate 2 Start
const db2 = (p55) => {
  let copy_font;
  p55.preload = () => {
    // let url = 'data/newTranscript.json';
    // let url = 'data/debate_2.json';
    let url = './data/debate_2_concat.json';
    transcript_data = p55.loadJSON(url);
    copy_font = p55.loadFont('assets/fonts/Georgia.ttf');
  };


  let c; // declaring the canvas var here so it can be used later in saveCanvas() func
  let transcript_data; // holds the json data
  let te_bar_w; // transcript entry bar width - don't much like this var name
  let transcript_entries = []; // holds the objects for each line of the transcript
  // let canvasW = Math.max(1100, p55.windowWidth);
  // let canvasW = Math.max(1100, p55.windowWidth);
  let canvasW = Math.max(500, document.getElementById("debate2_viz").offsetWidth);
  let canvasH = 500;
  let db2_vc = Object.create(viz_controller);


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
      // let max_sqr = Math.sqrt(199); // still need to break this out into a separate calculation
      let max_sqr = Math.sqrt(max_word_count); // still need to break this out into a separate calculation
      this.w = p55.map(word_count_sqr, 0, max_sqr, 0, p55.height / 2);
      this.h = this.w;

      if (this.name === "Trump") {
        this.curr_loc.y = p55.height / 2;
        this.h = this.h * -1;
      } else if (this.name === "Biden") {
        this.curr_loc.y = p55.height / 2;
      } else if (this.name === "Welker") {
        this.curr_loc.y = (p55.height / 2);
      }

      this.curr_loc.x = p55.map(this.timestamp.getTime(), db2_vc.debate_start_time.getTime(), db2_vc.debate_end_time.getTime(), 0, canvasW);

      // check mouse loc for hover
      // let horz_check = Math.abs(this.curr_loc.x - p55.mouseX) < 2;
      // let vert_check = p55.mouseY > 0 && p55.mouseY < p55.height;
      // if(horz_check && vert_check){
      // let mouse_dist = this.curr_loc.dist(p55.createVector(p55.mouseX, p55.mouseY));
      let mouse_dist = Math.abs(p55.mouseX - this.curr_loc.x);
      let inside_canvas = (p55.mouseY > 0) && (p55.mouseY < canvasH);
      if ((mouse_dist < 4) && inside_canvas) { // how big an area are we checking?
        this.hover = true;
      } else {
        this.hover = false;
      }

      // set alpha for clr
      if (this.hover) {
        this.clr.setAlpha(247);
      } else {
        this.clr.setAlpha(99);
      }
    },

    render: function () {
      p55.push();
      p55.translate(this.curr_loc.x, this.curr_loc.y);
      // render circles/lines for each entry
      p55.fill(this.clr);
      // p55.stroke(this.clr);
      if (this.name === "Welker") {
        p55.ellipse(0, 0, this.w / 3, this.h / 3);
        // p55.ellipse(0, 0, 2, 2);
      } else {
        p55.stroke(255, 123);
        p55.ellipse(0, this.h / 1.2, this.w / 3, this.h / 3); // lots of jank in here. Would do well to refactor this.
        p55.noStroke();
        // p55.fill(255);
        p55.ellipse(0, this.h / 1.2, 3, 3);
      }
      // p55.line(0, 0, 0, )this.h / 1.2)-(this.h/4));
      p55.pop();
    },

    render_text: function () {
      // render text if necessary
      if (this.hover) {
        let rect_w = 123 + 199; //521 :)
        let rect_x = p55.map(p55.mouseX, 0, canvasW, 0, -1 * rect_w);
        p55.textFont(copy_font); // declaring these up here so they can be used in textWidth().
        p55.textSize(18);
        let bkg_width = Math.min(p55.textWidth(this.text) + 11, 600);
        p55.push();
        p55.translate(this.curr_loc.x, this.curr_loc.y);
        p55.fill(255, 123);
        p55.strokeWeight(.76);
        p55.stroke(255, 129);
        if (this.name === "Welker") {
          p55.rect(rect_x - 7, -7 - 29, rect_w, 76, 7);
          p55.fill(0, 199);
          p55.text(`${this.text}`, rect_x, -29, rect_w, 76);

        } else if (this.name === "Trump") {
          p55.rect(rect_x - 7, this.h - 7, rect_w, 123, 7);
          p55.fill(0, 199);
          p55.text(`${this.text}`, rect_x, this.h, rect_w, 123);

        } else if (this.name === "Biden") {
          p55.rect(rect_x - 7, (this.h - 7) - (this.w / 3), rect_w, 123, 7);
          p55.fill(0, 199);
          p55.text(`${this.text}`, rect_x, this.h - (this.w / 3), rect_w, 123);

        }
        p55.pop();
      }
    },
  };

  p55.setup = () => {
    c = p55.createCanvas(canvasW, canvasH);
    // c.parent('debate_viz');
    te_bar_w = canvasW / Object.keys(transcript_data).length; // not sure if there is a better way to set this. Also, don't like this var name...

    // generate an array of objects for each line in the transcript
    for (i in transcript_data) {
      let cl = transcript_data[i]; // cl = current line in transcript_data
      let nto = Object.create(transcript_entry); // nto = new transcription object

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

    db2_vc.state = 'viz';
    db2_vc.load_duration = 5; // seconds
    db2_vc.debate_start_time = new Date(2020, 9, 22, 21, 0);
    db2_vc.debate_end_time = new Date(2020, 9, 22, 22, 45);
    db2_vc.total_elts = transcript_entries.length;


    // let result = getClosestEntry('Biden');
  };

  p55.draw = () => {
    p55.background(255);
    // find objects closest to mouse for each speaker
    // set_hover();
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
    p55.strokeWeight(.5);
    p55.stroke(255);
    p55.line(0, p55.height / 2, canvasW, canvasH / 2);

    // render focus area
    p55.fill(255, 29);
    p55.stroke(255, 76);
    p55.strokeWeight(.76);
    p55.rect(p55.mouseX - 1.5, 0, 3, p55.height);

    // render attrib watermark
    p55.textFont(copy_font);
    p55.textSize(18);
    p55.fill(76);
    p55.text("@sspboyd", canvasW - p55.textWidth("@sspboyd"), canvasH - 29);
  };

  ///////// Debate 2 End









  // let getClosestEntry = function (n) {
  //   let result = transcript_entries.filter(e => e.name === n);
  //   result = result.map(e => e.curr_loc.dist(p55.createVector(p55.mouseX, p55.mouseY)));
  //   // for the name provided...
  //   // filter the transcipt_entries array by that name
  //   // use map to calculate the distances to mouseX for each entry
  //   // use something like `let min = Math.min(...arrayOfNumbers);` to get smallest number
  //   // use array.indexOf to return that element from the array
  //   return result;
  // }

  let render_legend = function () {
    p55.textFont(copy_font);
    p55.textSize(47);
    p55.fill(0, 47);
    p55.text("Trump", 0, p55.textAscent("Trump"));
    p55.text("Biden", 0, p55.height);
    p55.textSize(29);
    p55.fill(0, 76);
    p55.text("Welker", 0, (p55.height / 2) - 2);
  };

  let exportImg = function () {
    let sketchName = "2020_Presidential_Debate2-sspboyd-";
    // generate date string like this YYYY-MM-DD-HH-MM-SS
    let dt = new Date();
    let datetime = `${dt.getFullYear().toString()}${(dt.getMonth()+1).toString().padStart(2,'0')}${dt.getDate().toString().padStart(2,'0')}${dt.getHours().toString().padStart(2,'0')}${dt.getMinutes().toString().padStart(2,'0')}${dt.getSeconds().toString().padStart(2,'0')}`;
    let filename = sketchName + datetime;
    console.log(`saving canvas to: ${filename}`);
    p55.saveCanvas(c, filename, 'png');
  };

  p55.keyTyped = () => {
    if (p55.key === 'S' || p55.key === 's') {
      exportImg();
    }
  };
};

myp5 = new p5(db2, 'debate2_viz');