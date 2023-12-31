
class Group{
	
  constructor(initialSet) {
    this.set = initialSet;
  }
  
  static from(iterableObject) {
	let set = []
    for(let value of iterableObject)
		set.push(value)
	return new Group(set);
  };

  
  add(member) {
	if(this.set.indexOf(member) == -1)
		this.set.push(member)
  };

  
  delete(member) {
	this.set = this.set.filter((aMember) => aMember != member)
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

// NRT
let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c