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

export PATH="$HOME/.composer/vendor/bin:$PATH"

defaults write -g InitialKeyRepeat -int 17 # normal minimum is 15 (225 ms)
defaults write -g KeyRepeat -int 2 # normal minimum is 2 (30 ms)

# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export PATH="$PATH:$HOME/.rvm/bin"

source ~/dot/alias
source ~/dot/colors
source ~/dot/functions

export EDITOR=/usr/bin/vim
export VISUAL=/usr/bin/less
