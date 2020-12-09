/*
The plan is 
read in the file

get total number of entries in the file

set an index counter at the last line in the file
for each transcription entry in the file,
    if the index counter is greater than 1
        get the current index line and current index-1 line
        if the names are the same then
            add the text from index line and add it to the index - 1 line
            update the word count number for the index-1 line

When done, write out a new file
*/