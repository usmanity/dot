#!/bin/bash

echo "git will now use simple strategy for pulling and pushing"

git config --global push.default simple

echo "Setting up symlinks..."

if [ -f ~/.vimrc ]
  then
    echo "~/.vimrc exists already, skipping"
else
  echo "Creating .vimrc file in ~/"
  ln -s vimrc ~/.vimrc
fi


