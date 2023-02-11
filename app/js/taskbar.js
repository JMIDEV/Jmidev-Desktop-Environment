//ICONS

function taskbariconwindowreorder(icon){

    var windowtotaketofront;

    $('.window').each(function(i, obj) {
        
        if(obj.id == icon.id){

            windowtotaketofront = obj;

        }
    
    });

    $('.window').each(function(i, obj) {

        if(obj.id == windowtotaketofront.id){
    
          windowtotaketofront.style.display = "inline";

          windowsopen.forEach(windowtosort => {
        
            if(windowtosort.id == obj.id){
    
              windowsopen.push(windowsopen.splice(windowsopen.indexOf(windowtosort), 1)[0]);
    
            }
        
          });
    
        }
    
    });
    
    windowsopen.forEach(windowtosort => {
        
        $(document.getElementById(windowtosort.id)).css("z-index", 3 + windowsopen.indexOf(windowtosort));
    
    });

    currentwindowtop = windowtotaketofront.querySelector(".windowtop");

    taskbarstateupdate();

}

function taskbarstateupdate(){

  $('.openedapptaskbar').each(function(i, obj) {
        
    $(obj.querySelector(".openedapptaskbar_statecircle")).css("outline", "none");

    $('.window').each(function(indice, windowthing) {

      if(windowthing.id == currentwindowtop.parentElement.id){

        if(obj.id == currentwindowtop.parentElement.id){

          $(obj.querySelector(".openedapptaskbar_statecircle")).css("outline", "3px solid #00aeff");

        }
        
        console.log(windowthing.id + " - " + currentwindowtop.parentElement.id + " - " + obj.id)

      }
  
    });

  });

}

// TIME

var taskbartimetext = document.querySelector(".taskbartime");

function returncurrenttime(){

  var currenttime = new Date();

  return currenttime;

}

function return_zeroed(value, digitnmb){

  return ('000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' + value).slice(-digitnmb)

}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

window.setInterval(function(){

  taskbartimetext.innerHTML = returncurrenttime().getDate() + " " + monthNames[returncurrenttime().getMonth()] + " " + returncurrenttime().getFullYear() + " · <b>" + returncurrenttime().getHours() + ":" + return_zeroed(returncurrenttime().getMinutes(), 2) + "</b>";

}, 1000);