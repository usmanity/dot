echo "Using zsh..."

# configs for brew packages
[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh
export NVM_DIR="$HOME/.nvm"
. "/usr/local/opt/nvm/nvm.sh"

export PATH="$HOME/.composer/vendor/bin:$PATH"

source ~/dot/alias
source ~/dot/colors
source ~/dot/functions
