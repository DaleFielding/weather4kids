/** 
calculateAverages function:
1) Accesses each key in the array 
2) Loops (forEach) through the values of each key 
3) Calculates an average for each value
4) Stores the key value pairs in an object called arrayAveraged
**/
export function calculateAverages(array) {
  let arrayAveraged = {};
  
  if (array.length > 0) {
    let keys = Object.keys(array[0]);

    keys.forEach((key) => {
      let arrayReduced = array.reduce((acc, curr) => acc + curr[key], 0);
      arrayAveraged[key] = Math.round(arrayReduced / array.length);
    });
  }

  return arrayAveraged;
}

