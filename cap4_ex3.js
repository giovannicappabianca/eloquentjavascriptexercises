
const arrayToList = function(a){

	let previousNode = null
	let node = null
	for (j = a.length-1; j >= 0 ; j--){
		node = {
			  value: a[j],
			  rest: previousNode
		}
		previousNode = node
	}
	return node
}

const listToArray = function(aList){

	let anArray = []
	let rest = aList
	while (rest != null){
		anArray.push(rest['value'])
		rest = rest['rest']
	}

	return anArray
}

const prepend = function(anElement, aList){
	newList = {
	  value: anElement,
	  rest: aList
	}
	return newList
}

//search
const searchAnElement = function(aList, anElement){
	let index = 0
	let found = false
	let rest = aList
	while (rest != null && !found){
		if (rest['value'] == anElement)
			found = true
		index++
		rest = rest['rest']
	}
	if (found = false)
		index = undefined
	return index
}

//nth iterative
const nth = function(aList, anIndex){
	let index = 0
	let rest = aList
	while (rest != null && index<anIndex){
		index++
		rest = rest['rest']
	}
	if (rest == null)
		return undefined
	else
		return rest['value']
}

//nth recursive
const nth_recursive = function(aList, anIndex){
	if (aList == null || anIndex <0)
		return undefined
	else if (aList != null && anIndex == 0){
		return aList['value']
	}
	else{
		return nth_recursive(aList['rest'], --anIndex)
	}
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
console.log(nth_recursive(arrayToList([10, 20, 30]), 1));
// → 20