module.exports = function getZerosCount(number, base) {
  var primePow = getPrimeAndPower(base);
  var result = 0;
  var divider = primePow.prime;
  while (number >= divider) {
    result += Math.floor(number / divider)
    divider *= primePow.prime;
  }

  function getPrimeAndPower(base) {
    let dividers = new Map();
    let length = base;
    for (let i = 2; i <= length; i++) {
      let power = 1;
      while (base > 1) {
        if ((base % i) == 0) {
          dividers.set(i, power++);
          base /= i;
        } else {
          break;
        }
      }
    }

    let maxPower = {
      prime: 2,
      power: 1
    };
    let maxPrime = {
      prime: 2,
      power: 1
    };

    for (divider of dividers) {
      let prime = divider[0];
      let power = divider[1];
      if (maxPower.power < power) {
        maxPower.prime = prime;
        maxPower.power = power;
      }
      if (maxPrime.prime < prime) {
        maxPrime.prime = prime;
        maxPrime.power = power;
      }
    }
    var power = maxPower.power / maxPrime.power;
    if (power >= maxPrime.prime) {
      return maxPower;
    }
    return maxPrime;
  }

  return Math.floor(result / primePow.power);
}