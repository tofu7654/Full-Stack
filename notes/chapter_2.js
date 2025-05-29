//First JS file: Basic syntax, data types, variables
"hello world" //can use single or double quotes for strings

23432423 //this is a number

null //absence of a value

undefined //absence of a value because we intentionally set it to that

//booleans
true 
false 
let sentence, number_of_eggs //declaring a variable
sentence = "hi mom" //initializing a variable

let friends = {
    james: 'is cool',
    lucy: 'isn\'t cool',
    number_of_eggs: sentence
} //dictionaries with key-value pairs


//console.log(typeof example_array) //checks the typeof what comes after

let is_true = true 
//var, let, const to initialize vars
//const - variable is never going to change
//let - variable may change



number_of_eggs = 3 //can't start variable name w number or have spaces; underscores is a best practice

number_of_eggs = 5 //can reassign a let

let total_groceries = number_of_eggs //assignment by reference

console.log(total_groceries)

number_of_eggs = 10

console.log(friends) //this is how you print stuff with a new line

// console.log(4+4) //can do ops inside

console.log(total_groceries) //stays as the first assignment, shallow copy

//Functions - custom set of instructions
// && AND || OR !
function myFirstFunction(value, secondValue){
    // output the value of is_true
    console.log(value === secondValue) //== can tell if a string and number is the same i.e: '6' == 6 is true but, '6'=== 6 is false
}

let multiplyTwoNumbers = myFirstFunction
console.log(multiplyTwoNumbers)

console.log(typeof myFirstFunction) //tells us that this is a function

myFirstFunction('5', 5)

let condition1 = true 
let condition2 = false

console.log(typeof '')

if (condition2 && condition1) { //if-statement syntax
    console.log("hi mom")
}
else if (condition1 || condition2){
    console.log('one condition of the two was true')
}
else {
    console.log("value was false")
}

let example_array = [1, 2, 3, 5, 6, 100, 43, 134] //no key-value pairs, have indices

let i = 0
let length = example_array.length //gets length of the array
console.log(length)
// while(i < length){
//     console.log('value was true: ', example_array[i])
//     i++
// }

// for (let j=0; j<length; j++){

//     if(j==5){
//         continue //can use continue and break in js
//     }
//     console.log('value was true: ', j, example_array[j])


// }


function addString(string1 = "default1", string2= "default2"){ //if a parameter is not defined, can give default vals
    if (!string1 || !string2){ //this condition is run if either of the parameters are not defined
        console.log("You are missing an input")
        return 
    }
    let concatString = string1 + ' ' + string2
    console.log(concatString)
    return concatString
}

let newString = addString("hello")
console.log("The new string is: ", newString)

//questions
