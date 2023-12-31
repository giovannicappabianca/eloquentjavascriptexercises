
const countBs = function(a){
	let count = 0
	for(let i = 0; i < a.length; i++){
		if (a[i] == 'B')
			count++
	}
	return count
}

const countChar = function(a, b){
	let count = 0
	for(let i = 0; i < a.length; i++){
		if (a[i] == b)
			count++
	}
	return count
}
console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4