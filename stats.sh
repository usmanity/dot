#!/bin/bash

set -e

git rev-list --reverse HEAD | 
	while read rev; do 
		echo; 
		git ls-tree -r $rev |
		awk {'print $3}' | 
		xargs git show | 
		wc -l ; 
	done
