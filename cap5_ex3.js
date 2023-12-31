
/*
function every(array, test){
	let outcome = 0
	for (let i = 0; i < array.length; i++){
		if (test(array[i])){
			outcome += 1
		}
	}
	if (outcome == array.length)
		return true
	else
		return false
}
*/

function every(array, test){
	let outcome = 0
	for (let i = 0; i < array.length; i++){
		if (!test(array[i])){
			return false
		}
	}
	return true	
}

function every_some(array, test){
	return !(array.some(a => !test(a)))
}


console.log(every_some([1, 3, 5], n => n < 10));
// → true
console.log(every_some([2, 4, 16], n => n < 10));
// → false
console.log(every_some([], n => n < 10));
// → true

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true