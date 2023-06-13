/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {

  result = 0;

  add(num) {
      this.result += parseFloat(num);
  }

  subtract(num) {
      this.result -= parseFloat(num);
  }

  multiply(num) {
      this.result *= parseFloat(num);
  }

  divide(num) {
      if (parseFloat(num) === 0) {
          throw new console.error('cannot divide by 0');
      }
      this.result /= parseFloat(num);
  }

  clear() {
      this.result = 0;
  }

  getResult() {
      return this.result;
  }

  calculate(str) {

      // divide all the numbers first
      function bodmas(arr) {
          let res1 = 0
          for (let i = 0; i < arr.length - 1; i++) {
              if (arr[i] === '/') {
                  if (parseFloat(arr[i + 1]) === 0) {
                      throw new console.error('cannot divide by 0');
                  }
                  res1 = parseFloat(arr[i - 1]) / parseFloat(arr[i + 1]);
                  arr.splice(i - 1, 3)
                  arr.splice(i - 1, 0, res1)
                  i -= 2
              }
          }

          // the multiply all the numbers
          for (let i = 0; i < arr.length - 1; i++) {
              if (arr[i] === '*') {
                  res1 = parseFloat(arr[i - 1]) * parseFloat(arr[i + 1]);
                  arr.splice(i - 1, 3)
                  arr.splice(i - 1, 0, res1)
                  i -= 2
              }
          }

          // then add all the numbers
          for (let i = 0; i < arr.length - 1; i++) {
              if (arr[i] === '+') {
                  res1 = parseFloat(arr[i - 1]) + parseFloat(arr[i + 1]);
                  arr.splice(i - 1, 3)
                  arr.splice(i - 1, 0, res1)
                  i -= 2
              }
          }

          //the subtract all the numbers lastly
          for (let i = 0; i < arr.length - 1; i++) {
              if (arr[i] === '-') {
                  res1 = parseFloat(arr[i - 1]) - parseFloat(arr[i + 1]);
                  arr.splice(i - 1, 3)
                  arr.splice(i - 1, 0, res1)
                  i -= 2
              }
          }
          return arr[0].toString()
      
      }
      
      // check whether non numberical characters exists
      // remove all the spaces and retain only numbers and operators
      function to_arr(str) {
          let str_arr = [];
          let str1 = '';
          let valid_elements = '1234567890-+/*(). '
          for (let i = 0; i < str.length; i++) {
              if (!(valid_elements.includes(str[i]))) {
                  throw new Error("unsuitable input found!");
              }
              if ((str[i] === '+') || (str[i] === '-') || (str[i] === '/') || (str[i] === '*') || (str[i] === '(') || (str[i] === ')')) {
                  if (str1.trim() !== '') {
                      str_arr.push(str1.trim()); 
                  }
                  str_arr.push(str[i]);
                  str1 = '';
              }
              else {
                  str1 += str[i];
              }
          }
          str_arr.push(str1.trim());
          return str_arr;
      }

      function check_valid_paranthesis(str_arr) {
          let stack = [];
          for (let i = 0; i < str_arr.length; i++) {
              if (str_arr[i] === ')') {
                  if (stack.length === 0) {
                      throw new console.error("invalid paranthesis");
                  }
                  stack.pop()
              }
              else if (str_arr[i] === '(') {
                  stack.push('(')
              }
          }
          if (stack.length > 0) {
              throw new console.error("invalid paranthesis")
          }
      }
      // main function to get result
      function calculator(str) {
          let str_arr = to_arr(str);
          check_valid_paranthesis(str_arr)
          let i = 0;
          for (let i = 0; i < str_arr.length; i++) {
              if (str_arr[i] === ')') {
                  let stack = [];
                  i -= 1
                  while(str_arr[i] !== '(') {
                      stack.unshift(str_arr[i])
                      i -= 1
                  }
                  str_arr.splice(i, stack.length + 2)
                  str_arr.splice(i, 0, bodmas(stack))
              }
          }
          if (str_arr.length > 1) {
              return parseFloat(bodmas(str_arr))
          }
          return parseFloat(str_arr[0])
      }
      this.result = calculator(str)
  }
}


module.exports = Calculator;
