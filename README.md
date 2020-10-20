# Visualizing the First 2020 Presidential Debates

> Visualizing the flow, duration and cross-talk from the first 2020 Presidental Debate

On September 29, 2020, the US held their first presidential debate between President Trump and former Vice President Biden. The debate immediately became known not for what was said or policies debated but for the interuptions and complete lack of decorum. One anchor called it a "Shitshow" and to quote an anchor from CNN:
>  "That was a hot mess inside a dumpster fire inside a train wreck. That was the worst debate I have ever seen. It wasn't even a debate. It was a disgrace. And it's primarily because of President Trump, who spent the entire time interrupting not abiding by the rules he agreed to."

So what does this debate look like when visualized? Are all of these interuptions visible? Is it possible to tell who is interupting the most?

To test out this idea, I am using a transcript from [Rev Transcription Services](https://www.rev.com/blog/transcripts/donald-trump-joe-biden-1st-presidential-debate-transcript-2020). I have processed the data to include the times when each person speaks. You can find the ways I adjusted the data in the data_munging.js file. 

The visualization is built using [P5.js](https://p5js.org/). And as of today (Tuesday, Oct 20, 2020), the visualization is still being adjusted and tweaked. 

Further questions to be asked are how does this debate campare to previous debates and possibly future debates between Trump and Biden?

--- 
#### My Initial Notes from October 1st, 2020

I'd like to build a quick sketch looking at the flow of conversation for the first 2020 Presidental Debate. The term 'debate' should be used lightly here to describe what that was. 

I think it would be really interesting to look at how long each of the three, Wallace, Biden and Trump, talked for. How long did they talk. How much did they talk over each other. 


## Ideas for this project:
- Use the trope of liberals/dems being on the left and conservatives/republicans on the right to format a text display of the debate with Wallace being in the middle. The obvious red vs blue colour coding here.
- Look at past presidental debates to compare what their visual fingerprint looks like in comparison. I hope this would show just how beyond the norm the first Trump / Biden debate was.

This connects to an [old (like 2004 old) data print](https://www.flickr.com/photos/sboyd/188448637/in/album-72057594126302391/) I built for one of the Bush / Kerry debates where I used screen capture composites of the debate video to create an image of two vertical structures with gradients from blue to red. 

## Data sources

I've started asking online to find a good source of timestamped data for this project.

- [NBC YouTube Subtitles Transcript](https://youtu.be/5cathmZFeXs?t=3823) - https://youtu.be/5cathmZFeXs?t=3823
- [Otter.ai](Otter.ai) - 
- [The Commission on Presidential Debates](https://www.debates.org/voter-education/debate-transcripts/) - https://www.debates.org/voter-education/debate-transcripts/
- [Opal Transcription Services](https://www.opaltranscriptionservices.com/debate-transcripts/) - https://www.opaltranscriptionservices.com/debate-transcripts/
- [Concord Monitor](https://www.concordmonitor.com/First-presidential-debate-Trump-Biden-full-transcript-36532544) - https://www.concordmonitor.com/First-presidential-debate-Trump-Biden-full-transcript-36532544
- [Rev Transcription Services](https://www.rev.com/blog/transcripts/donald-trump-joe-biden-1st-presidential-debate-transcript-2020) - https://www.rev.com/blog/transcripts/donald-trump-joe-biden-1st-presidential-debate-transcript-2020

## TODO

- [x] post links to Kerry Bush debate project and images
- [x] Post link to the Otter.ai service I've tried
- [x] add link to the YouTube video I grabbed the initial transcription from
- [x] visually sketch out some ideas for how this could look
- [x] decide what tool(s) to use
  - Python/Pandas, Processing, P5.js, D3.js
- [x] define minimum viable first version and use dummy data
- [ ] add example of data format to data sources section above.
- [x] What is the data model here? What is the representation model?
  - Speaker class and subclasses for each speaker and then instances for each time someone speaks? Seems overwrought. Simpler the better at first. 
  - Lets keep it to each speaker having a text area, colour and width of text dependent on how much each person speaks. Simple left/right/centre layout with red/blue/grey for each person.

## Contributors

Stephen Boyd 
- http://sspboyd.ca/Presidential-Debates
- Twitter, Instagram, GitHub are all @sspboyd