#!/bin/bash

echo "git will now use simple strategy for pulling and pushing"

git config --global push.default current

echo "Setting up symlinks..."

if [ -f ~/.vimrc ]
  then
    echo "~/.vimrc exists already, skipping"
else
  echo "Creating .vimrc file in ~/"
  ln -s vimrc ~/.vimrc
fi


# doing this at the end because it opens the Font Book app
# learn more about Hack here: https://github.com/chrissimpkins/Hack
if [ -f ~/Dropbox/fonts/Hack-Regular.ttf ]
  then
    echo "Setting up Hack font..."
    open ~/Dropbox/fonts/Hack-Regular.ttf
fi
