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
  setopt inc_append_history
  setopt share_history
  
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
  PATH="/snap/bin:$PATH"
# ------ MAC OS SETUP BELOW ------
elif [[ "$OSTYPE" == "darwin"* ]]; then

  echo "Using zsh 👋...(macOS)"
  # Source Prezto.
  if [[ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]]; then
    source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
  fi

  # configs for brew packages
  # Autojump aka `j` set up below
  [[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh
  # nvm setup before starting
  export NVM_DIR="$HOME/.nvm"
  . "/usr/local/opt/nvm/nvm.sh" --no-use
  nvm use default

  export PATH="$HOME/bin:$HOME/.composer/vendor/bin:$PATH"

  # key repeating for OSX
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
  HISTFILE=~/.zhistory
  setopt appendhistory
  setopt sharehistory
  setopt incappendhistory
  setopt inc_append_history
  setopt share_history

  export NVM_DIR="$HOME/.nvm" 
  . "/usr/local/opt/nvm/nvm.sh"

  export GOPATH=/Users/muhammad/go
  export PATH=$GOPATH/bin:$PATH
  # heroku autocomplete setup
  HEROKU_AC_ZSH_SETUP_PATH=/Users/muhammad/Library/Caches/heroku/autocomplete/zsh_setup && test -f $HEROKU_AC_ZSH_SETUP_PATH && source $HEROKU_AC_ZSH_SETUP_PATH;
  # sets the tab title to current dir
  precmd() {
    echo -ne "\e]1;${PWD##*/}\a"
  }
fi
# ---------- end of OS specific setups ---------

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

PKG_CONFIG_PATH="/usr/local/opt/libarchive/lib/pkgconfig"
export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"

eval "$(rbenv init -)"
