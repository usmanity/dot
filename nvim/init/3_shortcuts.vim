" ---- keyboard shortcuts ----
" quickly edit config file
nnoremap <silent> <leader>ec :e $MYVIMRC<CR>
" quickly edit plugins file
nnoremap <silent> <leader>ep :e ~/.config/nvim/init/0_plugins.vim<CR>

" source config file
nnoremap <silent> <leader>sc :source $MYVIMRC<CR>

nnoremap <silent> <leader>,j :FzfPreviewJumps<CR>
nnoremap <silent> <leader>,  :FzfPreviewAllBuffers<CR>

"nnoremap <silent> <leader>; :Files<CR>
" fzf open
nnoremap <silent> <leader>o :Files<CR>

" use jj to escape
inoremap jj <esc>
