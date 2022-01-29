const sumBelowNumberRecursive = (number, sum = 0) => {
    if (number === 0) {
        return sum
    } else {
        return sumBelowNumberRecursive(number - 1, sum + number)
    }
}

// This WILL exceed the maximum call stack size limit
try {
    console.log({standard: sumBelowNumberRecursive(10000)})
} catch (error) {
    console.log(error.message)
}

// Recursion is cool, but exceeding the maximum call stack size isn't...

// ...Introducing trampolines!

/**
 * A trampoline function basically wraps our recusrive function in a loop.
 * Under the hood, it calls the recusie function piece by peice until it no
 * no longer produces recursive calls.
 * 
 * The trampoline function takes a function (fn) as its argument - this is
 * the recursive function it is going to wrap - and returns a new function.
 * 
 * Within this new function, the recursive function is called.
 * 
 * We keep the loop running as long as fn returns another function. Once
 * fn resolves into a value, we stop running the loop and return the value.
 * 
 * We have to slighly modify our recursive function in order to be used by the
 * trampoline.
 * 
 * @param {A} fn 
 * @returns 
 */
const trampoline = fn => (...args) => {
    let result = fn(...args)
    
    while (typeof result === 'function') {
      result = result()
    }

    return result
}

const sumBelowNumberRecursiveTrampoline = (number, sum = 0) => {
    if (number === 0) {
        return sum
    } else {
        // Note the only difference between this method and sumBelowNumberRecursive is that the recursive portion
        // has been wrapped inside an anonymous function, that way it returns a function and can be managed by the
        // while loop of the trampoline function.
        return () => sumBelowNumberRecursiveTrampoline(number - 1, sum + number)
    }
}

// Define our trampoline method for summing all the numbers below the given number
const sumBelow = trampoline(sumBelowNumberRecursiveTrampoline)


// Output: 50005000
try {
    console.log({trampoline: sumBelow(10000)})
} catch (error) {
    console.log(error.message)
}
