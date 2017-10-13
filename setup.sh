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

if [ -f ~/.bashrc ]
  then
    echo "~/.bashrc exists already, skipping"
else
  echo "Creating .vimrc file in ~/"
  ln -s bashrc ~/.bashrc
fi

if [ -f ~/.osx ]
    then
        echo "~/.osx exists already, skipping"
else
    echo "Coping osx file to ~/.osx"
fi


# doing this at the end because it opens the Font Book app
# learn more about Hack here: https://github.com/chrissimpkins/Hack
if [ -f ~/Dropbox/fonts/Hack-Regular.ttf ]
  then
    echo "Setting up Hack font..."
    open ~/Dropbox/fonts/Hack-Regular.ttf
fi
