let mapleader="," "declare the comma to be SUPREME leader!

set paste  "handles pasting properly
set number "show line numbers

noremap <C-S> :w<CR>
vnoremap <C-S> <C-C>:w<CR>
inoremap <C-S> <C-O>:w<CR>

set expandtab  "convert tabs to spaces

" below are all cursor related settings
set cursorline "highlights current line "highlight each line
color desert
" hi is actually short for highlight
hi CursorLine term=bold cterm=bold guibg=Grey40 "cursorline colors
hi Cursor guifg=white guibg=black
hi iCursor guifg=white guibg=steelblue
set guicursor=n-v-c:block-Cursor
set guicursor+=i:ver100-iCursor
set guicursor+=n-v-c:blinkon0
set guicursor+=i:blinkwait10
