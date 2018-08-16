(function () {
  "use strict";

  let timer = document.getElementById("timer");
  let min = document.getElementById("min");
  let sec = document.getElementById("sec");
  let reset = document.getElementById("reset");
  let start = document.getElementById("start");

  let starttime;
  let timeleft;
  // let timetocountdown = 4 * 1000;
  let timetocountdown = 0;
  let timerid;
  let isrunning = false;

  function updatetimer(t) {
    let d = new Date(t);
    let m = d.getMinutes();
    let s = d.getSeconds();
    let ms = d.getMilliseconds();
    let timerstring;
    m = (`0${m}`).slice(-2);
    s = (`0${s}`).slice(-2);
    ms = (`00${ms}`).slice(-3);
    timerstring = `${m}:${s}.${ms}`;
    timer.textContent = timerstring;
    document.title = timerstring;
  }

  function countdown() {
    timerid = setTimeout(function () {
      let elapsedtime = Date.now() - starttime;
      timeleft = timetocountdown - elapsedtime;
      // console.log(timeleft);
      if(timeleft < 0){
        isrunning = false;
        start.value = "Start";
        clearTimeout(timerid);
        timeleft = 0;
        updatetimer(timeleft);
        timetocountdown = 0;
        return;
      }
      updatetimer(timeleft);
      countdown();
    },10);
  }

  start.addEventListener("click",function(){
    if(isrunning === false){
      isrunning = true;
      start.value = "Stop";
      starttime = Date.now();
      countdown();
    } else {
      isrunning = false;
      start.value = "Start";
      timetocountdown = timeleft;
      clearTimeout(timerid);
    }
    
  });

  min.addEventListener("click",function(){
    if (isrunning === true){
      return;
    }
    timetocountdown += 60 * 1000;
    if (timetocountdown >= 60 * 60 * 1000){
      timetocountdown = 0;
    }
    updatetimer(timetocountdown);
  });
  sec.addEventListener("click",function(){
    if (isrunning === true){
      return;
    }
    timetocountdown += 1000;
    if (timetocountdown >= 60 * 60 * 1000){
      timetocountdown = 0;
    }
    updatetimer(timetocountdown);
  });
  reset.addEventListener("click",function(){
    timetocountdown = 0;
    updatetimer(timetocountdown);
  });
})();
