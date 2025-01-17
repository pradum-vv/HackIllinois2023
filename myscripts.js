var time = -1;
function getDuration() {
  time = document.getElementById("usertime").value;
  console.log(time);
  //other functions to get data
  let csvstring = "Activities,Duration (min),Duration (max),Temperature,Day/Night bool,Weather,Area\nRead a book,5,,,,,\nExercise,20,,,,,\nPush ups to failure ,10,,,,,\nOrganize,5,60,,,,\nCreate a new hobby,10,,,,,\nDraw/Paint,10,,,,,\nur mom,10,,,,,\nTake a walk,20,,,,,\nListen to a new song,5,,,,,\nSleep,30,,,,,\nTry out a new recipe,30,90,,,,\nmake tea,3,10,,,,\neat paint,0,9999,,,,\nyoga,,,,,,";
  let activities = readCSVstr(csvstring);
  let data = getActivities(time, activities)
  showResults(data);
}

//display options on page
function showResults(data) {
  let list = document.getElementById('options');
  list.innerHTML = "";
  data.forEach((item)=>{
    let li = document.createElement("li");
    li.innerText = item; 
    list.appendChild(li);
  });
}

class Activity {
  constructor(datastring){
      var array = datastring.split(',');
      this.name = array[0];
      if(array.length > 0 && array[1] != ""){
          this.min = array[1];
      }
      if(array.length > 1 && array[2] != ""){
          this.max = array[2];
      }
  }
  canDo(time){
      var minenough = (this.min == null || this.min <= time);
      var maxenough = (this.max == null || this.max >= time);
      return minenough && maxenough;
  }
}

function readCSVstr(filestr){
  activs = []
  var file = filestr.split('\n');    
  for (var row = 1; row < file.length; row++){
      var activity = new Activity(file[row]);
      activs.push(activity);
  }
  return activs
}

function getActivities(time, acts){
  if(time == 420 || time == 69){
    return ["are u 12?", "", "", "", ""];
  }
  toreturn = [];
  count = 0;
  while(toreturn.length < 5 && count != 100){
      var cur = acts[Math.floor(Math.random() * acts.length)];
      if(cur.canDo(time)){
          var toadd = true;
          for(i = 0; i < toreturn.length; i++){
              if(cur.name == toreturn[i]){
                  toadd = false;
              }
          }
          if(toadd){
              toreturn.push(cur.name);
          }
      }
      count += 1;
  }
  while(toreturn.length < 5) {
    toreturn.push("");
  }
  return toreturn;
}