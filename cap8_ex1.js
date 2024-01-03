class MultiplicatorUnitFailure extends Error { 
	name = this.constructor.name;
	stack = 'My custom error context data!\n' + this.stack;
}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  try{
	  return primitiveMultiply(a, b)
  }
  catch (e){
	if (e instanceof MultiplicatorUnitFailure){
		return reliableMultiply(a, b)
	}		
  }
}

console.log(reliableMultiply(8, 8));
// → 64