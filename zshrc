echo "Using zsh..."

source $HOME/dot/alias
source $HOME/dot/colors

# configs for brew packages
[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh
export NVM_DIR="$HOME/.nvm"
. "/usr/local/opt/nvm/nvm.sh"

export PATH="$HOME/.composer/vendor/bin:$PATH"

defaults write -g InitialKeyRepeat -int 17 # normal minimum is 15 (225 ms)
defaults write -g KeyRepeat -int 2 # normal minimum is 2 (30 ms)
