// ALL SELECTORS FROM HTML
var btn = document.getElementById("set-alrm");
var hrs = document.getElementById("hrs-optns");
var mins = document.getElementById("min-optns");
var secs = document.getElementById("secnds-optns");
var AmPm = document.getElementById('AM/PM');
var time = document.getElementById("clock-time");

// AUDIO FILE FOR RINGING
var audio = new Audio("./audio.wav");

// NOTIFICATION MESSAGE
const AddMessage = "Alarm is already set at this time";

// ALARM ARRAY FOR STORING ALL ALARMS
alramArray=[];

// FUNCTION CALCULATE THE CURRENT TIME AND SET THE CONTENT INSIDE THE HEADING TAG IN EVERY SECONDS
var currentTime = setInterval(function(){
      var date = new Date();
      currhours=date.getHours();
      currmins=date.getMinutes();
      currsecs= date.getSeconds();
      currpmam=(currhours<12)? 'AM':'PM';
      time.textContent=addZero(currhours)+":"+addZero(currmins)+":"+addZero(currsecs)+" "+currpmam;

},1000)

// NOTIFICATION FUNCTION
function alertMessage(msg) {
  var alertbox = document.getElementById("alert");
  alertbox.innerHTML = msg;
  alertbox.className = "show";
  setTimeout(function () {
    alertbox.className = alertbox.className.replace("show", "");
  }, 2500);
}

// SET ALARM CLICK EVENT LISTENER FUNCTION AND CREATE A LI TAG
btn.addEventListener('click',function(){
    alarmtime = hrs.value + ":" + mins.value + ":" + secs.value+" "+AmPm.value;

    if(alramArray.includes(alarmtime)==true){
        alertMessage(AddMessage);
        return;
    }

    liTag = document.createElement("li");
    liTag.id=alarmtime;
    liTag.innerHTML = "<span>"+alarmtime+"</span><span><button id='stop-alrm'>Stop Alram</button></span><span><button id='del'>delete</button></span>";
    alramArray.push(alarmtime);
    document.getElementsByClassName("alrm-list")[0].appendChild(liTag);
})

// STOP ALARM AND DELETE ALARM CLICK EVENT LISTENER
document.addEventListener("click", function (event) {

    clickedId = event.target.id;
    if (clickedId == "stop-alrm")
    {
        let activealram = document.getElementById(event.target.parentNode.parentNode.id);
        if(activealram.style.backgroundColor=='red')
        {
            activealram.style.backgroundColor = "#131419";
        }
        audio.pause();
    }
    else if(clickedId == 'del'){
        let index = alramArray.indexOf(event.target.parentNode.parentNode.id);
        alramArray.splice(index, 1);
        alertMessage(event.target.parentNode.parentNode.id+" Alarm is deleted successfully");
        audio.pause();
        document.getElementById(event.target.parentNode.parentNode.id).remove();
    }
});


//CHECKING THE CURRENTTIME HAVING A ALRAM OR NOT FROM ARRAY IN EVERY SECONDS
var checkAlram = setInterval(function(){
   
    if(alramArray.includes(time.innerText)==true)
    {
        document.getElementById(time.innerText).style.backgroundColor='red';
        audio.loop = true;
        audio.play();
    }
},1000)

// ADD THE ZEROS AT THE BEGINNING FOR LESS THAN 10
function addZero(number)
{
    if(number<10)
    {
        return '0'+number;
    }

    return number;
}

// DYNAMICALLY CREATE A OPTIONS FOR HOURS,MINUTES,SECONDS
function CreateOptions(selector,min,max){
    for(let i=min;i<max;i++)
    {
        let optionsTag = document.createElement("option");
        if(i<10)
        {
            optionsTag.value='0'+i;
            optionsTag.innerHTML='0'+i;
        }
        else
        {
            optionsTag.value = i;
            optionsTag.innerHTML =i;
        }
        selector.appendChild(optionsTag);
    }
}
// FUNCTIONS CALLS
CreateOptions(hrs,0,24);
CreateOptions(mins,0,60);
CreateOptions(secs,0,60);
