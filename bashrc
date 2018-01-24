echo "Using bash..."

source ~/dot/alias
source ~/dot/colors

[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh

PS1="\w ${COLOR_YELLOW}☉${COLOR_NC} "

export PATH="$HOME/.composer/vendor/bin:$PATH"

defaults write -g InitialKeyRepeat -int 17 # normal minimum is 15 (225 ms)
defaults write -g KeyRepeat -int 2 # normal minimum is 2 (30 ms)

export NVM_DIR="$HOME/.nvm"
. "/usr/local/opt/nvm/nvm.sh"
