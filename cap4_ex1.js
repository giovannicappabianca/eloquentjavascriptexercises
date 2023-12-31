
//assumption: when c is negative, a is greater than b. Owtherwise, when c is positive a is less than b
const range = function(a, b, c = 1){
	let sequence = []
	if (c > 0){
		while(a <= b){
			sequence.push(a)
			a = a + c
		}
	}
	else if (c < 0){
		while(a >= b){
			sequence.push(a)
			a = a + c
		}
	}
	else{
		sequence.push(a) // c = 0 is not valid so it return an array with a single element
	}
	return sequence
}

const sum = function(anArray){
	let sum = 0
	for(let n of anArray){
		sum += n
	}
	return sum
}
console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55