#!/bin/bash

# creates a new post
# format as _posts/YYYY/YYYY-MM-DD-filename.ext
# usage:
#   $ ./newpost.sh my-new-post-filename

COPY_FILE=_posts/template.mdown
# create file
POST_FILE=_posts/$(date "+%Y/%Y-%m-%d")-$1.mdown

echo new post: $POST_FILE
cp $COPY_FILE $POST_FILE
# open it
mate $POST_FILE