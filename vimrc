let mapleader=","               " declare the comma to be SUPREME leader!

set paste                       " handles pasting properly
set number                      " show line numbers
set showcmd                     " show the current command in the bottom bar

set expandtab                   " convert tabs to spaces
set tabstop=4                   " sets the visual look of the tab to be 4 spaces
set softtabstop=4               " similar to the above but it's for inserting tabs

set backspace=2                 " fixes how backspace should work!

" below are all cursor related settings
set cursorline                  " highlights current line "highlight each line
color desert

syntax enable                   " enables syntax highlighting which helps a lot!
filetype indent on              " load filetype-specific indent files
set showmatch                   " highlight matching [{()}]

set wildmenu                    " visual autocomplete for command menu

set incsearch                   " search as characters are typed
set hlsearch                    " highlight the matches from a search

nnoremap <leader>x ZZ
