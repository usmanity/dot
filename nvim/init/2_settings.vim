" -------------- general vim options

" share clipboard
set clipboard=unnamed

" keep buffers around without saving
set hidden
" save buffers on change, not sure how this affects hidden above
set autowriteall
" attempt to save on focus lost
" autocmd CursorHold,CursorHoldI * update

" line numbers etc
set relativenumber
set nu

" undo setup, where to store and turn it on
set undodir=~/.vim/undodir
set undofile

" let's not use a swapfile
set noswapfile

" searching options
set incsearch
set nohlsearch

" scrolling space
set scrolloff=8

" add a column for errors/git
set signcolumn=yes

" document formatting, e.g. tabs etc
set tabstop=4 softtabstop=4


" THEME
