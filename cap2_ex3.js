let chess = ""
for(row = 0; row < 8; row++){
	for(column = 0; column < 4; column++){
		if(row % 2 == 0 && column % 2 == 0 || row % 2 == 1 && column % 2 == 1)
			chess += " # "
		else if(row % 2 == 0 && column % 2 == 1 || row % 2 == 1 && column % 2 == 0)
			chess += "#"
	}
	chess += "\n"
}
console.log(chess)