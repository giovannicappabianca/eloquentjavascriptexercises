
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function dominantDirection(text) {
	directions = countBy(text, aText => {
			//console.log(aText + " character with code point" + aText.codePointAt(0))
			
			script = characterScript(aText.codePointAt(0)) 	
			if(script != null){
				//console.log("character destination is" + script.direction)
				return script.direction
			}
			else
			  return "undefined"
			}
    );
  	let max_direction = {name: "undefined", count: -1}
  	for (const direction of directions){
    	if (max_direction.count < direction.count)	
      		max_direction = direction 
    }
  	return max_direction.name 
}

function dominantDirection(text) {
   
   directions = countBy(text, aText => {
     	//console.log(aText + " character with code point" + aText.codePointAt(0))
     	
     	script = characterScript(aText.codePointAt(0)) 	
     	if(script != null){
          	//console.log("character destination is" + script.direction)
     		return script.direction
        }
     	else
          return "undefined"
   	}
    );
  	/*
  	let max_direction = {name: "undefined", count: -1}
  	for (const direction of directions){
    	if (max_direction.count < direction.count)	
      		max_direction = direction 
    }
  	return max_direction.name 
    */
  	//console.log(directions)
  
    return directions.reduce((a, b) => {
      	//console.log("a " + a.name + a.count + " b " + b.name + b.count)
    	return a.count < b.count ? b : a;
	}).name
	
}



console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl