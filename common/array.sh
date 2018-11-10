function inArray(){
	array=$@
	count=0
	for item in ${array[*]};
	do
		count=$[count+1]
		if [[ count -eq 1 ]]; then
			continue
		fi
		if [ "$item" == $1 ]; then
			echo 1
			return 0
		fi
	done
	echo 0
}
