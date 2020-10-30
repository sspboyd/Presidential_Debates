# Grep Commands for Preparing Text
These grep commands were used to transform the transcript files from Rev into the format used in the data viz.

This is the format the transcript arrived in:
``` 
Kristen Welker (00:18):
Good evening, everyone. Good evening. Thank you so much for being here...
```

This is the format I want it transformed to:
```
{
    "full_name": "Kristen Welker",
    "name": "Welker",
    "time_stamp": "2020-09-30T01:01:20.000Z",
    "text": "Good evening, everyone. Good evening. Thank you so much for being here...",
    "word_count": 124
},
```

The time stamp and word count will be handled by a node.js script. GREP will be used for everything else.

### Step 1
Make a copy of the data! Duplicate the file or find a way to keep an original handy just in case. 

### Step 2
Escape out the quotes used the text entries.

Search String: `"`  
Replace String: `\"`

And then again for the single quotes `'`.

### Step 3
Move the time stamp to a new line under the name and add the json around it.

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
Replace String: `"text": "$1",`

This search string identifies the text lines by only selecting for lines that do not start with a ".

### Step 6
Add brackets and save out as a JSON file.

## Step 7
Run each file through a JSON linting program. There are a number of websites that will run this kind of check for you. Most notably, https://jsonlint.com/ is good.

### Step 8
Convert the time codes into date time object formats using the data_munging script.

### Step 9
Merge the files using the command line tool `cat`.

On my OS, a Mac OS 10.15, this is the command I use:  
`cat  

Be careful though! From the BSD cat man page:

*...the following command will cause the original data in file1 to be destroyed:  
`$ cat file1 file2 > file1`*

### Step 10
Run the file through a JSON linting program again to make sure it is ready for use.

### Step 11
¡ ! C E L E B R A T E ! ¡