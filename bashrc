echo "Using bash..."

source ~/dot/alias

[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh

# The next line updates PATH for the Google Cloud SDK.
if [ -f /Users/muhammad/Downloads/google-cloud-sdk/path.bash.inc ]; then
  source '/Users/muhammad/Downloads/google-cloud-sdk/path.bash.inc'
fi

# The next line enables shell command completion for gcloud.
if [ -f /Users/muhammad/Downloads/google-cloud-sdk/completion.bash.inc ]; then
  source '/Users/muhammad/Downloads/google-cloud-sdk/completion.bash.inc'
fi


PS1="\w ☉ "
