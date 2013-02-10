#!/bin/bash

# creates a new post
# format as _posts/YYYY/YYYY-MM-DD-filename.ext
# usage:
#   $ ./newpost.sh my-new-post-filename

echo "Creating new post"
# get template
read -p "Enter slug, i.e. my-post-slug: " SLUG

COPY_FILE=_posts/template.mdown

# create file
POST_FILE=_posts/$(date "+%Y/%Y-%m-%d")-$SLUG.mdown

# echo new post:
echo $POST_FILE
cp $COPY_FILE $POST_FILE
# open it
mate $POST_FILE