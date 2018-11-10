#!/bin/bash
basedir=$(dirname `greadlink -f $0`)
source "$basedir/../common/array.sh"

if [ ! -d "$basedir/project" ]; then
	echo "react base dir not exists"
	exit 1
fi
if [ $# -eq 0 ]; then
	echo "input target path please"
	exit 1
fi

if [ -f "$basedir/config.ini" ]; then
	ignore=$(cat "$basedir/config.ini" | grep ignore | awk -F '=' '{print $2}' | sed s/[[:space:]]//g)
	source=$(cat "$basedir/config.ini" | grep source | awk -F '=' '{print $2}' | sed s/[[:space:]]//g)
else
	echo "config.ini not exists"
	exit 1
fi

target=$1
if [ ! -d "$target" ]; then
	mkdir "$target"
fi

ignores=(${ignore//:/ })
if [ -d $source ]; then
	update=1
else
	update=0
	source="${basedir}/project"
fi
for source_item in `ls -a $source`; 
do
	source_path="$source/$source_item"
	isIn=$(inArray $source_item ${ignores[*]})
	if [ ! $isIn -eq 1 -a ! "$source_item" == "." -a ! "$source_item" == ".." ]; then
		echo $source_path
		if [ $update -eq 1 ]; then
			cp -R "$source_path" "$basedir/project/"
		fi
		cp -R "$basedir/project/$source_item" "$target"
	fi
done


