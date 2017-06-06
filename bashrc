echo "Using bash..."

source ~/dot/alias
source ~/dot/colors

[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh

PS1="\w ${COLOR_YELLOW}☉${COLOR_NC} "

export PATH="$HOME/.composer/vendor/bin:$PATH"

defaults write -g InitialKeyRepeat -int 10 # normal minimum is 15 (225 ms)
defaults write -g KeyRepeat -int 1 # normal minimum is 2 (30 ms)