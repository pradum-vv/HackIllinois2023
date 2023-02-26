var time = -1;
function getDuration() {
  time = document.getElementById("usertime").value;
  console.log(time);
  //other functions to get data
  let csvstring = "Activities,Duration (min),Duration (max),Temperature,Day/Night bool,Weather,Area\nRead a book,5,,,,0,\nExercise,20,,,,0,\nPush ups to failure ,10,,,,0,\nOrganize,5,60,,,0,\nCreate a new hobby,10,,,,0,\nDraw/Paint,10,,,,0,\nur mom,10,,,,0,\nTake a walk,20,,,,1,\nListen to a new song,5,,,,0,\nSleep,30,,,,0,\nTry out a new recipe,30,90,,,0,\nmake tea,3,10,,,0,\neat paint,0,9999,,,0,\nyoga,,,,,0,";
  let activities = readCSVstr(csvstring);
  let data = getActivities(time, activities)

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
      if(array.length > 5) {
        console.log(array);
        this.weatherdependent = parseInt(array[5], 10);
        console.log(this.weatherdependent);
      }
  }
  canDo(time, weather){
      var minenough = (this.min == null || this.min <= time);
      var maxenough = (this.max == null || this.max >= time);
      var good_weather = (this.weatherdependent == 0 || weather >= 700);
      return minenough && maxenough && good_weather;
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
    showResults(["are u 12?", "", "", "", ""]);
  }
  
  let fetchres = fetch("https://api.openweathermap.org/data/2.5/weather?lat=40.11&lon=-88.24&appid=471ebf2b004e51c18666963df03fe6e0");
  fetchres.then(res =>
    res.json()).then(d => {
      toreturn = [];
      count = 0;
      const weather = d.weather[0].id;
      console.log(weather);
      while(toreturn.length < 5 && count != 100){
          var cur = acts[Math.floor(Math.random() * acts.length)];
          if(cur.canDo(time, weather)){
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
          console.log(toreturn);
          count += 1;
      }
      while(toreturn.length < 5) {
        toreturn.push("");
      }
      showResults(toreturn);
  })
}
