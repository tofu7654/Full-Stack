// data manipulation

let example_sentence = "this is a string"

let string_length = example_sentence.length

//can index characters in a string like an array in js
console.log("Value at the end of the string = ", example_sentence[string_length - 1])

let combined_string = "hello world" + ' ' + "my name is tofu" + example_sentence[5]


let concatString = '3' + 5 //string concatenation

//const containsLetterA = example_sentence.indexOf('z') //find the index of the character and return the index
const splitSentence = combined_string.split(' ') //splits sentence into an array w delimiter, removes the delimiter
const checkSentence = combined_string.includes('s') //s
const replaceChar = combined_string.replaceAll("_", " ") //replace all underscores with a space
let slicedString = combined_string.slice() //slice string from start and end

//regex - regular expressions, use chat to get regex


//Arrays and Lists

let simpleArray = ['james', 'is', 'cool']

//crud - create, read, update, delete

console.log(simpleArray)

// simpleArray[1] = 'hello'

//pop, push, shift, unshift - methods to update arrays other than indexing

simpleArray.push('new_word') //pushes a new value to end of array


console.log(simpleArray)

simpleArray.pop()

let string = simpleArray.join(' ') //join all elements in the array to a string

let reverse = simpleArray.reverse()

console.log(reverse)

//2D arrays
let twodArray = [[3, 4, 2], [1, 2], [3, 3]]

for(let i=0; i<twodArray.length; i++){
    for(let j=0; j<twodArray[i].length; j++){
        console.log(twodArray[i][j])
    }
}

console.log(twodArray[2])