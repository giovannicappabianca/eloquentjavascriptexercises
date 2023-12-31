
const isEven = function(a){
	if (a == 0) 
		return true
	else if (a == 1)
		return false
	else if (a > 0)
		return isEven(a-2)
	else
		return isEven((a-2)*-1)
}
console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
console.log(isEven(-4));