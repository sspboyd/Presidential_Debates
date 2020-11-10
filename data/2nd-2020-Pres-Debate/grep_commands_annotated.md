# Demystifying Regex: A Walk-through On How To Prep Data For A Visualization

Regex! It looks arcane and complex in the same way that bitwise operators have always looked to me. It's been around the periphery of my awareness as a developer and something I know I 'should' be better at using. 

What I want to do here is demystify Regex a bit by doing a walk-through of how I used it to prepare the data for my recent [Presidential Debate Visualization](https://twitter.com/sspboyd/status/1319379713555652608?s=20). 

For anyone who is completely new to regex, here is the [Wikipedia](https://en.wikipedia.org/wiki/Regular_expression) definition:
> A regular expression (shortened as regex) is a sequence of characters that define a search pattern. Usually such patterns are used by string-searching algorithms for "find" or "find and replace" operations on strings...

The idea of regex dates back to the 1950s and was included in early versions of UNIX. 

Regex is useful when I need to run a search-find-replace command for something more complicated than just a word or variable.

The example below comes from a recent personal project where I wanted to visualize the two 2020 Presidential debates to show how often each person spoke and what was said. 

The raw transcript data came from the [Rev.com transcription service](https://www.rev.com/blog/transcript-category/debate-transcripts) and I used regex because I needed to make hundreds of changes to the data structure, the existing data itself and also add in some new data. The goal was to prepare the data so I could convert it from a a CSV file to a JSON file. 

This is one entry in the transcript in its original format:
``` 
Kristen Welker (00:18):
Good evening, everyone. Good evening. Thank you so much for being here...
```

And this is the format I want it transformed to:
```
{
    "full_name": "Kristen Welker",
    "name": "Welker",
    "time_stamp": "2020-09-30T01:01:20.000Z",
    "text": "Good evening, everyone. Good evening. Thank you so much for being here...",
    "word_count": 124
},
```

The time_stamp and word_count are handled by a Node.js script and regex will be used for everything else.

## The Walk-through

### Step 1
Make a copy of the data! Duplicate the file or find a way to keep an original handy just in case. 

### Step 2
Escape out the quotes used the text entries. The reason for this step is so that the quotes do not interfere with the JSON formatting. 

Search String: `"`  
Replace String: `\"`

One thing to note is that you don't need to escape single-quotes in your text. The [official JSON docs](https://www.json.org/json-en.html) do a good job outlining what's valid and what isn't.

### Step 3
Move the time stamp to a new line under the name and add the JSON around it.

Search String: `\s\((\d\d:\d\d)(\):)`  
Replace String: `\n"time_stamp": "$1",`

### Step 4
Create entries for full_name and name.

Search String: `^(Kristen)\s(Welker)`  
Replace String: `"full_name": "$1 $2", \n"name": "$2",`

And then run this again for Trump and Biden.

Search String: `^(Joe)\s(Biden)`  
Replace String: `"full_name": "$1 $2", \n"name": "$2",`

Search String: `^(Donald)\s(Trump)`  
Replace String: `"full_name": "$1 $2", \n"name": "$2",`

### Step 5
Add prefix to the text for each entry.

Search String: `^([^"].+)`  
Replace String: `"text": "$1"`

This search string identifies the text lines by only selecting for lines that do not start with a ".

### Step 6
Add brackets and save out as a JSON file.
Search String: `("full_name": ")`
Replace String: `},\n{\n$1`

This step requires some manual intervention. The first entry will have an extra bracket and the last entry will be missing the bracket. There also needs to be square brackets `[ ]` at the beginning and end of each file so that it can be checked by a JSON lint service in the next step.

### Step 7
Run each file through a JSON linting program. There are a number of websites that will run this kind of check for you. Most notably, [JSONLint.com](https://jsonlint.com/) is good.

### Step 8
Convert the time codes into date time object formats using the data_munging script.

### Step 9
Merge the files using the command line tool `cat`.

On my OS, a Mac OS 10.15, this is the command I use:  
`cat debate_pt1.json debate_pt2.json debate_p3.json > debate_2.json`  

Be careful though! From the BSD cat man page:

*...the following command will cause the original data in file1 to be destroyed:  
`$ cat file1 file2 > file1`

Be sure to remove the extra square brackets at the beginnings and ends of files. There should only be one bracket at the start and end of the final file.

### Step 10
Run the file through a [JSON linting program](https://jsonlint.com/) again to make sure it is ready for use.

### Step 11
¡ ! C E L E B R A T E ! ¡

## Summary and Resources
That's it! I mean, that's a lot of steps but ultimately it's a pretty straightforward process. 

Every time I use regex, I need to go back and refresh my memory on the specific syntax. Cheat sheets are really helpful and there are a number of good tutorials to get you going. 

Here's a few links that I particularly like:
- [BBEdit Grep Tutorial & Cheatsheet](https://anybrowser.org/bbedit/grep.html#ReplaceChars) - This is one of the first tutorials I came across way back when I was learning regex for the first time and it still holds up
- [RegExr](https://regexr.com/) - "RegExr is an online tool to learn, build, & test Regular Expressions".  
I really like how this tool will colour code your pattern to help explain how it is working. 