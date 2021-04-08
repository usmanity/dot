" ----------------------------------------
" Load Plugins/Settings
" ----------------------------------------
runtime! init/**.vim
" ----------------------------------------
"  load local vimrc
" ----------------------------------------
if filereadable($HOME . "/.vimrc.local")
  source ~/.vimrc.local
endif

" load local file if directory/project has one
set exrc



" ------------------ CoC set up
"  let return key ↩ to select suggestion
inoremap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"

" return selects first open
inoremap <silent><expr> <cr> pumvisible() ? coc#_select_confirm() : "\<C-g>u\<CR>"

" coc tries to format after enter
inoremap <silent><expr> <cr> pumvisible() ? coc#_select_confirm() : "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"

" use Tab completion
function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~ '\s'
endfunction

inoremap <silent><expr> <Tab>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<Tab>" :
      \ coc#refresh()


" ---------------- Mike's config below
"  " FZFPreview Mappings
" https://github.com/yuki-ycino/fzf-preview.vim#command
" ----------------------------------------
"nnoremap <silent> <leader>.  :FzfPreviewDirectoryFiles <C-r>=expand("%:h")<CR>/<CR>
"nnoremap <silent> <Leader>,  :FzfPreviewAllBuffers<CR>
"nnoremap <silent> <Leader>,, :FzfPreviewDirectoryFiles<CR>
"nnoremap <silent> <Leader>,j :FzfPreviewJumps<CR>
"nnoremap <silent> <Leader>/  :FzfPreviewBufferTags<CR>
"nnoremap <silent> <Leader>m  :FzfPreviewProjectMruFiles<CR>
"nnoremap <silent> <Leader>mm :FzfPreviewMruFiles<CR>
"" FZF Mappings
"" https://github.com/junegunn/fzf.vim#commands
"" ----------------------------------------
""nnoremap <silent> <Leader>,  :Files<CR>
""nnoremap <silent> <Leader>b  :Buffers<CR>
"nnoremap <silent> <Leader>bc :BCommits<CR>
"
"nnoremap <silent> <Leader>bm :Marks<CR>
"nnoremap <silent> <Leader>c  :Commits<CR>
"nnoremap <silent> <Leader>g  :GFiles?<CR>
"nnoremap <silent> <Leader>m  :History<CR>
nnoremap <Leader>r           :Rg <C-R><C-W><CR>
nnoremap <Leader>rg          :Rg<Space>
nnoremap <Leader>!           :Rg!<Space>
"
"" only list current directory
"let g:fzf_mru_relative = 1
"
"function! s:build_quickfix_list(lines)
"  call setqflist(map(copy(a:lines), '{ "filename": v:val }'))
"  copen
"  cc
"endfunction
"
"function! RipgrepFzf(query, fullscreen)
"  let command_fmt = 'rg --column --line-number --no-heading --color=always --smart-case -- %s || --preview "bat --color=always --style=header,grid --line-range :300 {}"'
"  let initial_command = printf(command_fmt, shellescape(a:query))
"  let reload_command = printf(command_fmt, '{q}')
"  let spec = {'options': ['--phony', '--query', a:query, '--bind', 'change:reload:'.reload_command]}
"  call fzf#vim#grep(initial_command, 1, fzf#vim#with_preview(spec), a:fullscreen)
"endfunction
"
"" Use RG for FZF
"command! -nargs=* -bang RG call RipgrepFzf(<q-args>, <bang>0)
"let g:fzf_action = {
"  \ 'ctrl-q': function('s:build_quickfix_list'),
"  \ 'ctrl-t': 'tab split',
"  \ 'ctrl-x': 'split',
"  \ 'ctrl-v': 'vsplit' }
"let $FZF_DEFAULT_OPTS = '--ansi --bind ctrl-a:select-all'
