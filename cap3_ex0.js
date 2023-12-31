


const power = function(base, exponent) {
  if (exponent == 0)
	return 1;
  else
	  return base * power(base, exponent - 1)
};
let base = process.argv[2]
let exponent = process.argv[3]
let outcome = "la potenza di "+ base + " elevato a " + exponent+ " è pari a "+ power(base, exponent)
console.log(outcome)

