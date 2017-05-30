echo "Using bash..."

source ~/dot/alias
source ~/dot/colors

[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh

PS1="\w ${COLOR_YELLOW}☉${COLOR_NC} "

export PATH="$HOME/.composer/vendor/bin:$PATH"
