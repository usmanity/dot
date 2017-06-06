let mapleader=","               "declare the comma to be SUPREME leader!

set paste                       "handles pasting properly
set number                      "show line numbers

noremap <C-S> :w<CR>
vnoremap <C-S> <C-C>:w<CR>
inoremap <C-S> <C-O>:w<CR>

set expandtab                   "convert tabs to spaces

" below are all cursor related settings
set cursorline                  "highlights current line "highlight each line
color desert

" hi is actually short for highlight
hi CursorLine term=bold cterm=bold guibg=Grey40 "cursorline colors
hi Cursor guifg=white guibg=black
hi iCursor guifg=white guibg=steelblue

set guicursor=n-v-c:block-Cursor
set guicursor+=i:ver100-iCursor
set guicursor+=n-v-c:blinkon0
set guicursor+=i:blinkwait10

" backspace fix
set backspace=2


" vundle setup
" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

" my plugins
Plugin 'vim-airline/vim-airline'
Plugin 'ctrlpvim/ctrlp.vim'

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required

" allow airline to use powerline fonts
let g:airline_powerline_fonts = 1
" enable airline
let g:airline#extensions#tabline#enabled = 1
