#
# Executes commands at the start of an interactive session.
# Originally put together as part of prezto for zsh, modified by usmanity
#
# Authors:
#   Sorin Ionescu <sorin.ionescu@gmail.com>
#
# Modifications in this repo:
#   Muhammad Usman <muhammad@usmanity.com>
#

# Customize to your needs...

if [[ "$OSTYPE" == "linux-gnu" ]]; then
  export VISUAL=vim
  export EDITOR="$VISUAL"
  echo "On a linux box..."
  source ~/dot/alias
  source ~/dot/colors
  source ~/dot/functions

  source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
  # command history related options
  setopt appendhistory
  setopt sharehistory
  setopt incappendhistory
  
  # enable fzf key-bindings
  [ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
  . /usr/share/autojump/autojump.sh
  source ~/local.sh

  # check if tmux session exists
  # if it exists, attach
  tmux ls
  if [ $? -eq 0 ]; then
    $TMUX
    if [ $? -eq 0 ]; then
      tmux attach
    else
      clear
    fi
  fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Using zsh 👋...(macOS)"
  # Source Prezto.
  if [[ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]]; then
    source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
  fi

  # configs for brew packages
  [[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh
  export NVM_DIR="$HOME/.nvm"
  . "/usr/local/opt/nvm/nvm.sh" --no-use

  export PATH="$HOME/bin:$HOME/.composer/vendor/bin:$PATH"

  defaults write -g InitialKeyRepeat -int 17 # normal minimum is 15 (225 ms)
  defaults write -g KeyRepeat -int 2 # normal minimum is 2 (30 ms)

  # Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
  export PATH="$HOME/.rvm/bin:$PATH"

  source ~/dot/alias
  source ~/dot/colors
  source ~/dot/functions

  export EDITOR=/usr/bin/vim
  export VISUAL=/usr/bin/less

  # command history related options
  setopt appendhistory
  setopt sharehistory
  setopt incappendhistory
  export PATH="/usr/local/opt/php@5.6/bin:$PATH"
  export PATH="/usr/local/opt/php@5.6/sbin:$PATH"
  export PATH="/usr/local/opt/php@7.0/bin:$PATH"
  export PATH="/usr/local/opt/php@7.0/sbin:$PATH"

  export NVM_DIR="$HOME/.nvm" 
  . "/usr/local/opt/nvm/nvm.sh"

  export COMPOSER_CAFILE=/etc/ssl/cert.pem
  export PATH="/usr/local/opt/php@7.1/bin:$PATH"
  export PATH="/usr/local/opt/php@7.1/sbin:$PATH"
  export PATH="/Users/muhammad/dot/bin:$PATH"

  export GOPATH=/Users/muhammad/go
  export PATH=$GOPATH/bin:$PATH
  # heroku autocomplete setup
  HEROKU_AC_ZSH_SETUP_PATH=/Users/muhammad/Library/Caches/heroku/autocomplete/zsh_setup && test -f $HEROKU_AC_ZSH_SETUP_PATH && source $HEROKU_AC_ZSH_SETUP_PATH;
  # sets the tab title to current dir
  precmd() {
    echo -ne "\e]1;${PWD##*/}\a"
  }
fi

plugins=(zsh-completions)
autoload -U compinit && compinit


export PATH="/usr/local/opt/openssl/bin:$PATH"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

if [ -f ~/.square-zshrc ]
  then
    source ~/.square-zshrc
    source ~/local-only/shuttle.sh
    source ~/local-only/personal.sh
fi

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

source ~/local-only/shuttle.sh
source ~/local-only/personal.sh

# [[ -f ~/.local-only ]] && source ~/.local-only
PKG_CONFIG_PATH="/usr/local/opt/libarchive/lib/pkgconfig"
