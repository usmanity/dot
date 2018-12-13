#!/bin/bash

echo "git will now use simple strategy for pulling and pushing"

git config --global push.default current

echo "Setting up symlinks..."
current_directory=$(pwd)
echo $current_directory

if [ -f ~/.vimrc ]
  then
    echo "~/.vimrc exists already, skipping"
else
  echo "Copying vimrc to ~/.vimrc"
  ln -s $current_directory/vimrc ~/.vimrc
fi

if [ -f ~/.zshrc ]
  then
    echo "~/.zshrc exists already, skipping"
else
  echo "Setting zsh as shell default..."
  chsh -s $(which zsh)
  echo "Copying zshrc to ~/.zshrc"
  ln -s $current_directory/zshrc ~/.zshrc
fi

if [ -f ~/.osx ]
    then
        echo "~/.osx exists already, skipping"
else
    echo "Copying osx to ~/.osx"
    ln -s $current_directory/osx ~/.osx
fi

echo "-------"
echo "Setup is done"
echo "Don't forget to turn on cursor guides and smart cursor!"
echo "Recommended installations using brew: autojump, exa, fzf, fd, bat, httpie, ag, and jq or rq"
echo "For installing fonts, use brew cask-font instead of manually installing fonts"

