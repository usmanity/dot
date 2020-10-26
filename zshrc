# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

if [[ "$OSTYPE" == "linux-gnu" ]]; then
  export VISUAL=vim
  export EDITOR="$VISUAL"
  echo "🤔 – Linux based OS – using zsh 👻"
  source ~/dot/alias
  source ~/dot/colors
  source ~/dot/functions

  source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
  
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

  echo "👋 ⁓ macOS ⁓ using zsh 🌻"
  # Source Prezto.
  if [[ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]]; then
    source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
  fi
 
  #--------- configs for brew packages -----
 
  # Autojump aka `j` set up below
  [[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh

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
 
 
  export NVM_DIR="$HOME/.nvm" 
# . "/usr/local/opt/nvm/nvm.sh"
 
  export GOPATH=/Users/muhammad/go
  export PATH=$GOPATH/bin:$PATH
 
  # heroku autocomplete setup
  HEROKU_AC_ZSH_SETUP_PATH=/Users/muhammad/Library/Caches/heroku/autocomplete/zsh_setup && test -f $HEROKU_AC_ZSH_SETUP_PATH && source $HEROKU_AC_ZSH_SETUP_PATH;
 # eval "$(starship init zsh)" 
fi
# ---------- end of OS specific setups ---------

plugins=(zsh-completions)
autoload -U compinit && compinit


if [ -f ~/.square-zshrc ]
  then
    source ~/.square-zshrc
    source ~/local-only/shuttle.sh
    source ~/local-only/personal.sh
fi

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

PKG_CONFIG_PATH="/usr/local/opt/libarchive/lib/pkgconfig"

export PATH="/usr/local/opt/openssl/bin:$PATH"
export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"
export PATH="/Users/muhammad/.cargo/bin:$PATH"

# ----------- command history related options
SAVEHIST=2500
HISTFILE=~/.zhistory
setopt inc_append_history
setopt share_history

source ~/powerlevel10k/powerlevel10k.zsh-theme

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"

#export PATH="$HOME/.rbenv/bin:$PATH"
#eval "$(rbenv init -)"
