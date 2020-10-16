# Presidential Debates Data Visualization

> Visualizing the flow, duration and cross-talk from the first 2020 Presidental Debate

I'd like to build a quick sketch looking at the flow of conversation for the first 2020 Presidental Debate. The term 'debate' should be used lightly here to describe what that was. 

I think it would be really interesting to look at how long each of the three, Wallace, Biden and Trump, talked for. How long did they talk. How much did they talk over each other. 



Ideas for this project:
- Use the trope of liberals/dems being on the left and conservatives/republicans on the right to format a text display of the debate with Wallace being in the middle. The obvious red vs blue colour coding here.
- Look at past presidental debates to compare what their visual fingerprint looks like in comparison. I hope this would show just how beyond the norm the first Trump / Biden debate was.
- I need to find data sources for these previous transcripts.

This connects to an old (like 2004 old) data viz I built for one of the Bush / Kerry debates where I used screen shots of the debates to create an image of two (twin) towers. 

## Data sources

I've started asking online to find a good source of timestamped data for this project.

- [NBC YouTube Subtitles Transcript](https://youtu.be/5cathmZFeXs?t=3823) - https://youtu.be/5cathmZFeXs?t=3823
- [Otter.ai](Otter.ai) - 
- [The Commission on Presidential Debates](https://www.debates.org/voter-education/debate-transcripts/) - https://www.debates.org/voter-education/debate-transcripts/
- [Opal Transcription Services](https://www.opaltranscriptionservices.com/debate-transcripts/) - https://www.opaltranscriptionservices.com/debate-transcripts/
- [Concord Monitor](https://www.concordmonitor.com/First-presidential-debate-Trump-Biden-full-transcript-36532544) - https://www.concordmonitor.com/First-presidential-debate-Trump-Biden-full-transcript-36532544
- [Rev Transcription Services](https://www.rev.com/blog/transcripts/donald-trump-joe-biden-1st-presidential-debate-transcript-2020) - https://www.rev.com/blog/transcripts/donald-trump-joe-biden-1st-presidential-debate-transcript-2020

## TODO

- [ ] post links to Kerry Bush debate project and images
- [ ] Post link to the Reddit post I put up about finding data
- [ ] Post link to the Otter.ai service I've tried
- [ ] add link to the YouTube video I grabbed the initial transcription from
- [ ] visually sketch out some ideas for how this could look
- [ ] decide what tool(s) to use
  - Python/Pandas, Processing, P5.js, D3.js
- [ ] define minimum viable first version and use dummy data
- [ ] add example of data format to data sources section above.
- [ ] What is the data model here? What is the representation model?
  - Speaker class and subclasses for each speaker and then instances for each time someone speaks? Seems overwrought. Simpler the better at first. 
  - Lets keep it to each speaker having a text area, colour and width of text dependent on how much each person speaks. Simple left/right/centre layout with red/blue/grey for each person.

## Contributors

Stephen Boyd 
- http://sspboyd.ca/
- Twitter, Instagram, GitHub are all @sspboyd