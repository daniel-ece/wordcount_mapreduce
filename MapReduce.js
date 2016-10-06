//When we load the window (page html)
window.onload = function() {

      //variables
      var myFile = document.getElementById('myfile'); //input of my file
      var fileDisplayArea = document.getElementById('fileDisplayArea'); //area to display the input
      var mapDisplayArea = document.getElementById('mapDisplayArea'); //area to display the output of mappers
      var shufflesortDisplayArea = document.getElementById('shufflesortDisplayArea'); //area to display the output of shuffle and sort
      var reduceDisplayArea = document.getElementById('reduceDisplayArea'); //area to display the output of reducers
      var allArraytoSort = {}; //array will contain all the word as key with its value

      //event listener
      myFile.addEventListener('change', function(e) {
          var file = myFile.files[0]; //access to my file

          //if the file is in correct MIME type 'text'(E.g. *.css, *.txt*, ...)
          if (file.type.match('text.*')) {

              //use fileReader to read our file
              var reader = new FileReader();
              reader.readAsText(file);

              //when the file is load
              reader.onload = function(e) {

                //display the input into my page
                fileDisplayArea.innerText = reader.result;

                //split the result by line
                var data = reader.result.split("\n");

                //call Map function and display the result
                for(var i in data) {
                  var numberOfMapper = parseInt(i)+1; //simulate the number of mappers according to line number
                  mapDisplayArea.innerText = mapDisplayArea.innerText + "Mapper #" + numberOfMapper + " : \n";

                  //call the map function
                  var arrayMap = map(data[i]);

                  //add the arrayMap into my allArraytoSort
                  for(var j in arrayMap) {

                    //if the key already exists (it means that we have the same word)  add the value [1,1,...]
                    if(allArraytoSort[j]) {
                      var tmpArray = JSON.parse("[" + allArraytoSort[j] + "]"); //use JSON.parse to convert the value into an array
                      tmpArray.push(1); //add 1 to the array
                      allArraytoSort[j] = tmpArray; //change the value of the key j
                    } else { //add it
                      allArraytoSort[j] = arrayMap[j];
                    }
                  }

                  //display the result of map function
                  for (var k in arrayMap) {
                    mapDisplayArea.innerText = mapDisplayArea.innerText + "(" + k + "," + arrayMap[k] +")\n"; //(word, 1)
                  }

                  mapDisplayArea.innerText =  mapDisplayArea.innerText + "\n";
                }

                //sort and shuffle the array in alphabetical order
                var arraySorted = sortArray(allArraytoSort);

                //display the result of the shuffle and sort function
                for (var k in arraySorted) {
                  shufflesortDisplayArea.innerText = shufflesortDisplayArea.innerText + "(" + k + ", [" + arraySorted[k] +"])\n";
                }

                //call Reduce function and display the result
                for(var k in arraySorted) {

                  //call the reduce function
                  var reducer = reduce(k, arraySorted[k]);

                  //display result of the reducers
                  reduceDisplayArea.innerText = reduceDisplayArea.innerText + "(" + k + "," + reducer[k] +")\n";
                }
              }
          } else {
              fileDisplayArea.innerText = "File not supported!"
          }
      });
}

//Function Mapper
function map(line) {

  //variables
  var map = {};

  //separate the line into a word
  var split = line.split(/\s+/);

  //create a map with key=word and value=1
  for(var i in split) {
    //verify if the line is not "empty"
    if(split[i]!="") {
      map[split[i]]=1;
    }
  }

  //return the array with key=word and value=1
  return map;
}

//Function sortArray by key
function sortArray(arrayToSort) {
  var keys = [];

  for (var k in arrayToSort) {
   if (arrayToSort.hasOwnProperty(k)) {
     keys.push(k);
   }
  }
  //using the function array.sort to sort by alphabetical order the key
  keys.sort(); //but it doesn't sort with capital letter (e.g. if we have 'B', 'c', 'a', 'D' ==> output : 'B', 'D', 'a', 'c')

  //create a new array will be sorted
  var arraySorted={}
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    arraySorted[k] = arrayToSort[k];
  }

  return arraySorted;
}

//Function reduce
function reduce(key, value) {
  console.log(value);
  var reducer = {} //array

  if(value.length>1) {
    reducer[key] = value.length; //(word,value) it is a word count so the new value will be the length of the array value
  } else {
    reducer[key] = 1;
  }
  return reducer; // return the result
}
