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
echo "Using zsh 👋..."

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
export PATH="$PATH:$HOME/.rvm/bin"

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

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

export NVM_DIR="$HOME/.nvm" 
. "/usr/local/opt/nvm/nvm.sh"


export COMPOSER_CAFILE=/etc/ssl/cert.pem
export PATH="/usr/local/opt/php@7.1/bin:$PATH"
export PATH="/usr/local/opt/php@7.1/sbin:$PATH"
export PATH="/Users/muhammad/dot/bin:$PATH"
