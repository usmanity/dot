echo "Using bash..."

source ~/dot/alias
source ~/dot/colors

[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh

PS1="\w ☉ "

export PATH="$HOME/.composer/vendor/bin:$PATH"
