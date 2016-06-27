#!/bin/bash

echo "Setting up symlinks..."

if [ -f ~/.vimrc ]
  then
    echo "~/.vimrc exists already, skipping"
else
  echo "Creating .vimrc file in ~/"
  ln -s vimrc ~/.vimrc
fi
