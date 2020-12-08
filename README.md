# Visualizing the First 2020 Presidential Debates

> Visualizing the flow, duration and cross-talk from the two 2020 Presidential Debates

View the online version here: [https://sspboyd.ca/US-Presidential-Debates/](https://sspboyd.ca/US-Presidential-Debates/).

On September 29, 2020, the US held their first presidential debate between President Trump and former Vice President Biden. The debate immediately became known not for what was said or policies debated but for the interruptions and complete lack of decorum. One anchor called it a "Shitshow" and to quote an anchor from CNN:
>  "That was a hot mess inside a dumpster fire inside a train wreck. That was the worst debate I have ever seen. It wasn't even a debate. It was a disgrace. And it's primarily because of President Trump, who spent the entire time interrupting not abiding by the rules he agreed to."

The second debate took place on October 22, 2020 and it garnered a lot of interest to see if it would be the same style (disaster) as the first debate.

So what do these debates look like when visualized? Is it possible to see the differences between the first and second debates? Are all of the interruptions from the first debate visible? Is it possible to tell who is interrupting the most?

To test out this idea, I am using transcripts from [Rev Transcription Services](https://www.rev.com/blog/transcripts/donald-trump-joe-biden-1st-presidential-debate-transcript-2020). I have processed the data to include the times when each person speaks. You can find the ways I adjusted the data in the data_munging.js file. There is [an accompanying blog post](link to blog post) about using Regex for parsing this data as well.  

The visualization is built using [P5.js](https://p5js.org/).

### Early prototype screenshots
>![Visualizing Debate](https://raw.githubusercontent.com/sspboyd/Presidential_Debates/master/output/2020_Presidental_Debates-20201019161710.png)


## Features to Add or Explore
- [x] Implement explorable text interface. Rollover states for each bar such that you can scrub the timeline and see what is being said at each moment. 
- Add debate transcripts from previous elections. Or what about Lincoln Douglas Debates?
- [x] Try using something other than lines for rendering for each transcript entry. Look at using squares where the area is proportional to the number of words spoken. Maybe cirles? 
- Try out adjusting vertical location of axis based on end point of person who last spoke? Might be a way to see the interruption patterns move up and down? Hard to tell how this would work or look. 
- Add annotations
  - Length of line matches number of words spoken. 
  - [x] Red is Trump, Blue is Biden, Grey is Wallace. 
  - [ ] Add 15 min time markers
  - [ ] Maybe add in where the moderators attempted to have candidates address specific questions, eg Supreme Court, Covid, etc...
- [x] Create landing page
  - [https://sspboyd.ca/US-Presidential-Debates/](https://sspboyd.ca/US-Presidential-Debates/)


## Contributors

Stephen Boyd 
- http://sspboyd.ca/US-Presidential-Debates/
- Twitter, Instagram, GitHub are all @sspboyd

---
---

## Initial Notes from October 1st, 2020

I'd like to build a quick sketch looking at the flow of conversation for the first 2020 Presidential Debate. The term 'debate' should be used lightly here to describe what that was. 

I think it would be really interesting to look at how long each of the three participants talked for. How long did they talk. How much did they talk over each other. 


## Ideas for this project:
- Look at past presidential debates to compare what their visual fingerprint looks like in comparison. I hope this would show just how beyond the norm the first Trump / Biden debate was.

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
