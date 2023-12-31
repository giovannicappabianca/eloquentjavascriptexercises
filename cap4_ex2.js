
//assumption: when c is negative, a is greater than b. Owtherwise, when c is positive a is less than b
const reverseArray = function(a){
	let newArray = []
	for (j = a.length - 1; j >=0; j--){
		newArray.push(a[j]) 
	}
	return newArray
}

const reverseArrayInPlace = function(a){
	let temp
	let i = 0
	let j = a.length -1
	while (i < j){
		temp = a[i]
		a[i] = a[j] 
		a[j] = temp
		i++
		j--
	}
	return a
}


console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]