/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  let str11 = str1.toLowerCase().split('').sort().toString().trim()
  let str21 = str2.toLowerCase().split('').sort().toString().trim()
  console.log(str11)
  console.log(str21)
  if (str11 === str21) {
          return true;
      }
      return false;
  }

  
  module.exports = isAnagram;
