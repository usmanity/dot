" ---------------------------------------- 
" PLUGINS
" https://github.com/junegunn/vim-plug
" ---------------------------------------- 
if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif
call plug#begin('~/.vim/plugged')
" ---------------------------------------- 
" General
" Plug 'tpope/vim-obsession'
Plug 'tpope/vim-unimpaired'
" Plug 'vim-scripts/matchit.zip'
" ---------------------------------------- 
" TMUX integration
Plug 'christoomey/vim-tmux-navigator'
Plug 'christoomey/vim-tmux-runner'
Plug 'tmux-plugins/vim-tmux-focus-events'
" ---------------------------------------- 
" Searching
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
" Use the Remote Plugin version of fzf-preview https://github.com/yuki-ycino/fzf-preview.vim#remote-plugin-1
Plug 'yuki-ycino/fzf-preview.vim', { 'branch': 'release/remote', 'do': ':UpdateRemotePlugins' }
Plug 'ludovicchabant/vim-gutentags'
Plug 'rizzatti/dash.vim'
Plug 'scrooloose/nerdcommenter'
Plug 'scrooloose/nerdtree'
Plug 'preservim/tagbar'
Plug 'shougo/neomru.vim'
" ---------------------------------------- 
" Editing
Plug 'dense-analysis/ale'
Plug 'godlygeek/tabular'
Plug 'haya14busa/incsearch.vim'
Plug 'jiangmiao/auto-pairs'
Plug 'junegunn/vim-easy-align'
Plug 'nathanaelkane/vim-indent-guides'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'neoclide/coc-snippets'
Plug 'tpope/vim-surround'
" ---------------------------------------- 
" Git
Plug 'Xuyuanp/nerdtree-git-plugin'
Plug 'idanarye/vim-merginal'
Plug 'tpope/vim-fugitive'
Plug 'tpope/vim-rhubarb'
Plug 'iberianpig/tig-explorer.vim'
Plug 'rbgrouleff/bclose.vim'
" ---------------------------------------- 
" Display
Plug 'airblade/vim-gitgutter'
Plug 'kshenoy/vim-signature'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'junegunn/vim-peekaboo'
" ---------------------------------------- 
" Colorschemes
Plug 'morhetz/gruvbox'
Plug 'nanotech/jellybeans.vim'
Plug 'trusktr/seti.vim'
Plug 'duckwork/nirvana'
Plug 'ratazzi/blackboard.vim'
Plug 'fcpg/vim-farout'
Plug 'chriskempson/base16-vim'
" ---------------------------------------- 
" Ruby/Rails
Plug 'ecomba/vim-ruby-refactoring', { 'branch': 'main' }
Plug 'vim-test/vim-test'
Plug 'thoughtbot/vim-rspec'
Plug 'tpope/vim-endwise'
Plug 'tpope/vim-rails'
" ---------------------------------------- 
" Languages
Plug 'elzr/vim-json'
Plug 'evanleck/vim-svelte'
Plug 'fatih/vim-go', { 'do': ':GoInstallBinaries' }
Plug 'gabrielelana/vim-markdown'
Plug 'slim-template/vim-slim'
Plug 'xolox/vim-misc'
Plug 'xolox/vim-notes'
Plug 'chrisbra/csv.vim'
Plug 'cespare/vim-toml'
" ---------------------------------------- 
" Snippets
"Plug 'sirver/ultisnips'
call plug#end()
