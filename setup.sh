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


# doing this at the end because it opens the Font Book app
# learn more about Hack here: https://github.com/chrissimpkins/Hack
if [ -f ~/Dropbox/fonts/Hack-Regular.ttf ]
    then
        if [ -f ~/Library/Fonts/Hack-Regular.ttf ]
            then
                echo "Hack is already installed, skipping..."
        else
                echo "Setting up Hack font..."
                open ~/Dropbox/fonts/Hack-Regular.ttf
        fi
fi

source osx

echo "-------"
echo "Setup is done"
echo "Don't forget to turn on cursor guides and smart cursor!"
