let mapleader=";"               " declare the comma to be SUPREME leader!
set nocompatible                " turn off compatiblity with vi

set paste                       " handles pasting properly
set number                      " show line numbers
set showcmd                     " show the current command in the bottom bar

set expandtab                   " convert tabs to spaces
set tabstop=4                   " sets the visual look of the tab to be 4 spaces
set softtabstop=4               " similar to the above but it's for inserting tabs

set backspace=2                 " fixes how backspace should work!

" below are all cursor related settings
set cursorline                  " highlights current line "highlight each line
" color desert

syntax enable                   " enables syntax highlighting which helps a lot!
filetype indent on              " load filetype-specific indent files
set showmatch                   " highlight matching [{()}]

set wildmenu                    " visual autocomplete for command menu

set incsearch                   " search as characters are typed
set hlsearch                    " highlight the matches from a search

"""""" LEADER COMMANDS """"""
" Source vimrc
nnoremap <Leader>vs :source ~/.vimrc<CR>:echo "Reloaded .vimrc"<CR>

"""""" Plugins below here """"""

"" set the runtime path to include Vundle and initialize
"set rtp+=~/.vim/bundle/Vundle.vim
"call vundle#begin()
"" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
"Plugin 'VundleVim/Vundle.vim'

" call plug#begin('~/.vim/plugged')
"    Plug 'wakatime/vim-wakatime'
" call plug#end()
"Plugin 'ervandew/supertab'
"Plugin 'scrooloose/nerdtree'
"Plugin 'scrooloose/syntastic'
"Plugin 'kien/ctrlp.vim'
"Plugin 'altercation/vim-colors-solarized'
"
"call vundle#end()            " required
"filetype plugin indent on    " required

"map <C-n> :NERDTreeToggle<CR>
"colorscheme solarized
"set background=dark

"""""" fzf """"""
set rtp+=/usr/local/opt/fzf
