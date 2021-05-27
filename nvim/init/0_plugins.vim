call plug#begin('~/.vim/plugged')

" Make sure you use single quotes

Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
Plug 'junegunn/goyo.vim'
Plug 'junegunn/limelight.vim'

Plug 'yuki-ycino/fzf-preview.vim', { 'branch': 'release/remote', 'do': ':UpdateRemotePlugins' }
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'neoclide/coc-snippets'
Plug 'mhinz/vim-startify'
Plug 'preservim/nerdtree'
Plug 'vim-airline/vim-airline'
Plug 'vim-test/vim-test'

" indentation plugins
Plug 'lukas-reineke/indent-blankline.nvim', { 'branch': 'lua'}

Plug 'tpope/vim-surround'

Plug 'nvim-lua/popup.nvim'
Plug 'nvim-lua/plenary.nvim'
Plug 'nvim-telescope/telescope.nvim'

" commenting in code
Plug 'tomtom/tcomment_vim'

" Themes
Plug 'morhetz/gruvbox'

" tmux & vim pane switching
Plug 'christoomey/vim-tmux-navigator'

" Initialize plugin system
call plug#end()
