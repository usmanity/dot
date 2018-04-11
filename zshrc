#
# Executes commands at the start of an interactive session.
#
# Authors:
#   Sorin Ionescu <sorin.ionescu@gmail.com>
#

# Source Prezto.
if [[ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]]; then
  source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
fi

# Customize to your needs...

echo "Using zsh..."

source $HOME/dot/alias
source $HOME/dot/colors

# configs for brew packages
[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh
export NVM_DIR="$HOME/.nvm"
. "/usr/local/opt/nvm/nvm.sh" --no-use

export PATH="$HOME/.composer/vendor/bin:$PATH"

defaults write -g InitialKeyRepeat -int 17 # normal minimum is 15 (225 ms)
defaults write -g KeyRepeat -int 2 # normal minimum is 2 (30 ms)
