#!/bin/bash

#-------------------------
# git setup 
#-------------------------
echo "git will now use simple strategy for pulling and pushing"
git config --global push.default current

echo "git will now use my name as the author"
git config --global user.name "Muhammad Usman"

echo "git editor is vim now"
git config --global core.editor vim

echo "Setting up symlinks..."
current_directory=$(pwd)
echo $current_directory

echo "Skipping vimrc changes, use vim bootstrap: https://vim-bootstrap.com/"

#-------------------------
# symlinking vimrc, this will be skipped now
#-------------------------
#if [ -f ~/.vimrc ]
#  then
#    echo "~/.vimrc exists already, skipping"
#else
#  echo "Copying vimrc to ~/.vimrc"
#  ln -s $current_directory/vimrc ~/.vimrc
#fi

#-------------------------
# symlinking zshrc
#-------------------------
if [ -f ~/.zshrc ]
  then
    echo "~/.zshrc exists already, skipping"
else
  echo "Setting zsh as shell default..."
  chsh -s $(which zsh)
  echo "Copying zshrc to ~/.zshrc"
  ln -s $current_directory/zshrc ~/.zshrc
fi

#-------------------------
# symlinking osx
#-------------------------
if [ -f ~/.osx ]
    then
        echo "~/.osx exists already, skipping"
else
    echo "Copying osx to ~/.osx"
    ln -s $current_directory/osx ~/.osx
    source ~/.osx
fi


#-------------------------
# attempt to install brew packages
#-------------------------
which brew
if [ $? == 1 ]
    then
        echo "Homebrew is not installed"
else
    echo "✓ Homebrew exists, installing packages"
    brew install ag jq httpie fd tldr bat autojump fzf
    echo "Installed ag, jq, httpie, fd, tldr, bat, autojump, fzf"
fi

echo "-------"
echo "Setup is done ✓"
echo "[iTerm2] Don't forget to turn on cursor guides and smart cursor!"
echo "For installing fonts, use brew cask-font instead of manually installing fonts"

