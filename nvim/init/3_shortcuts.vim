" ---- keyboard shortcuts ----
" quickly edit config file
nnoremap <silent> <leader>ec :e ~/dot/nvim/init<CR>
" quickly edit plugins file
nnoremap <silent> <leader>ep :e ~/.config/nvim/init/0_plugins.vim<CR>

" source config file
nnoremap <silent> <leader>so :source $MYVIMRC<CR>

nnoremap <silent> <leader>,j :FzfPreviewJumps<CR>
nnoremap <silent> <leader>,  :FzfPreviewAllBuffers<CR>
nnoremap <silent> <leader>,  <cmd>Telescope buffers<cr>


"nnoremap <silent> <leader>; :Files<CR>
" fzf open
nnoremap <silent> <leader>o :GitFiles<CR>

" use jj to escape
inoremap jj <esc>

" use leader + w to save
nnoremap <leader>w :write<CR>

" open NerdTree
nnoremap <leader>b :NERDTree<CR>


" indentation for the whole file with leader =
nmap <silent> <Leader>= gg=G<CR>

" === for source code etc
nnoremap <silent> <leader>;; <cmd>only<CR>

" === for writing only
" focus mode, uses option + f on mac
nnoremap <silent> ƒ :Goyo<CR>
" focused without limelight
nnoremap <silent> Ï :Limelight!<CR>
