module.exports = function zeros(expr) {
  expr = expr.split("*");
  if (expr.every(x => /\d+!!/.test(x))
      && expr.every(x => Number(x.replace(/(\d+).*/, "$1")) % 2 !== 0)) return 0;
  return expr.map(getZeroes).reduce((acc, cur) => acc + cur, 0);
}

function getZeroes(fact) {
  let num = Number(fact.replace(/(\d+)!+/, "$1"));
  let sign = fact.replace(/\d+(!+)/, "$1");
  let zeroes = 0;
  let factors = [];
  if (sign === "!") factors = Array(num).fill(0).map((_, i) => i + 1);
  else if (num % 2 === 0) {
    factors = Array(num).fill(0).map((_, i) => {
      if ((i + 1) % 2 === 0) return i + 1;
      else return 0;
    }).filter(x => x !== 0);
  } else {
    factors = Array(num).fill(0).map((_, i) => {
      if ((i + 1) % 2 !== 0) return i + 1;
      else return 0;
    }).filter(x => x !== 0);
  }
  while(factors.length > 0) {
    factors = factors.filter(x => x % 5 === 0);
    zeroes += factors.length;
    factors = factors.map(x => x / 5);
  }
  return zeroes;
}
