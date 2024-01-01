
class PGroup{

  static empty = new PGroup([])

  constructor(initialSet) {
    this.set = initialSet;
  }
  
  static from(iterableObject) {
	let set = []
    for(let value of iterableObject)
		set.push(value)
	return new PGroup(set);
  };

  
  add(member) {
	let pGroup = PGroup.from(this)
	if(pGroup.set.indexOf(member) == -1)
		pGroup.set.push(member)
	return pGroup
  };

  
  delete(member) {
	let pGroup = PGroup.from(this)
	pGroup.set = pGroup.set.filter((aMember) => aMember != member)
	return pGroup
  };
  
  has(member) {
	if(this.set.indexOf(member) > -1)
		return true
	else
		return false
  };
  

  
  get length(){
	return this.set.length
  }
  
  getValue(i){
	return this.set[i]
  }
  
  [Symbol.iterator]() {
	  return new GroupIterator(this);
  };
  
}

/*
  Group.prototype[Symbol.iterator] = function() {
	  return new GroupIterator(this);
  };
  */

class GroupIterator {
  constructor(group, i) {
	this.i = 0;
    this.group = group;
  }

  next() {
    if (this.i == this.group.length) return {done: true};

    let value = this.group.getValue(this.i);
    this.i++;
	
    return {value, done: false};
  }
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false