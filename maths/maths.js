const factorial = (num) => {
    let i= 1

;
    while (num > 1) {
        i++;
        num /=i;

        if (num == 1) return fact + "!";
    }

    return"NONE";
}

console.log(factorial(180));

module.exports = factorial;