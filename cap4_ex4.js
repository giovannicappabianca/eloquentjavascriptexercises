
const deepEqual = function(a, b){

	if (typeof a != "object" && typeof b != "object"){
		console.log("case 1")
		if (a === b)
			return true
		else
			return false
	}
	else if(a == null && b ==  null){
		return false
	}
	else if(Object.keys(a).length != Object.keys(b).length){
		return false
	}
	else {
		for(let param of Object.keys(a)){
			console.log(param)
			console.log(a[param])
			console.log(b[param])
			if (!(param in b) || !deepEqual(a[param], b[param])){
				return false
			}
		}
		return true
	}
	
}



let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
console.log(deepEqual(obj, {here: {is: "ant"}, object: 2}));
// → false
console.log(deepEqual(obj, {here: {ist: "an"}, object: 2}));
// → false