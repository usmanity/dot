# ---------------
# --- Plugins ---
# ---------------
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-continuum'
#set -g @plugin 'tmux-plugins/tmux-copycat'
#set -g @plugin 'tmux-plugins/tmux-open'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'christoomey/vim-tmux-navigator'
set -g @plugin 'dracula/tmux'

# --------------- TMUX Resurrect
# Last saved environment is automatically restored when tmux is started.
# https://github.com/tmux-plugins/tmux-continuum#automatic-restore
run-shell '~/.tmux/plugins/tmux-resurrect/resurrect.tmux'
run-shell '~/.tmux/plugins/tmux-continuum/continuum.tmux'
set -g @continuum-restore 'on'
set -g @continuum-save-interval '60' # hourly
# Run all plugins' scripts
run '~/.tmux/plugins/tpm/tpm'

# ---------------- Dracula theme options
# disable weather
set -g @dracula-show-weather false
set -g @dracula-show-location false
# disable battery
set -g @dracula-show-battery false

# ---------------- Keybindings (might move these out to a different file)
unbind C-b
set-option -g prefix C-j

# mouse scrolling
set -g mouse on

# start window and pane numbering at 1
set -g base-index 1
setw -g pane-base-index 1
