
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
  
  /*
  delete(member) {
	if(this.set.indexOf(member) > -1){
		for (let i = this.set.indexOf(member); i < this.set.length - 1; i++){
			this.set[i] = this.set[i+1]
		}
	}
  };
  */
  
  delete(member) {
	this.set = this.set.filter((aMember) => aMember != member)
  };
  
  has(member) {
	if(this.set.indexOf(member) > -1)
		return true
	else
		return false
  };
  
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false