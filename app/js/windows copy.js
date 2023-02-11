//
// WINDOW GENERATION & MANAGEMENT ---------------------------------------------------------------------------------------------
//

var nowindowselected = {"parentElement":{

  "id": ""

}};

function windowinstance(id, img){

  this.id = id;
  this.img = img;

}

var windowsopen = [];

function newWindow(path){

  fetch(path + "/appinfo.json")
        .then((response) => response.json())
        .then((json) => {
        
          var appname = json.name;
          var appversion = json.version;
          var appauthor = json.author;
          var appfiletorun = json.filetorun;
          var appicon = json.icon;
          var appshortdescription = json.shortdescription;
          var appdescription = json.description;
          var appwidth = json.windowwidth;
          var appheight = json.windowheight;

          var warehousewindow = document.querySelector("body > div.warehouse > div.window");
          var newwindow = warehousewindow.cloneNode(true);
          newwindow.style.width = appwidth + "px";
          newwindow.style.height = appheight + "px";
          document.querySelector("body > div.windowspace").appendChild(newwindow);

          newwindow.querySelector('.windowiframe').src = path + "/" + appfiletorun;
          newwindow.querySelector('.windowtitle').innerHTML = appname;

          var windowid = appname + Math.round(Math.random()*1000000000000000) + "windowopened";
          newwindow.id = windowid;
          
          windowsopen.push(new windowinstance(windowid, path + "/" + appicon));

          newwindow.querySelector('.windowfavicon').src = path + "/" + appicon;

          currentwindowtop = newwindow.querySelector('.windowtop');

          var warehousetaskbaricon = document.querySelector("body > div.warehouse > div.openedapptaskbar");
          var newtaskbaricon = warehousetaskbaricon.cloneNode(true);
          document.querySelector("body > div.taskbarcont > div.taskbaropened").appendChild(newtaskbaricon);

          newtaskbaricon.querySelector('img').src = path + "/" + appicon;
          newtaskbaricon.id = windowid;

          windowsopen.forEach(windowtosort => {
            
            $(document.getElementById(windowtosort.id)).css("z-index", 4 + windowsopen.indexOf(windowtosort));

          });

          taskbarstateupdate()
        
        });

}

//
// WINDOW MOVEMENT ---------------------------------------------------------------------------------------------
//

var currentwindowtop;

$(document).mousedown(function(event) {

    if ($(event.target).hasClass("windowtop")){

      currentwindowtop = event.target;
      mousedown(event);

      $('.window').each(function(i, obj) {

        if(obj.id == currentwindowtop.parentElement.id){
    
          windowsopen.forEach(windowtosort => {
        
            if(windowtosort.id == obj.id){
    
              windowsopen.push(windowsopen.splice(windowsopen.indexOf(windowtosort), 1)[0]);
    
            }
        
          });
    
        }
    
      });
    
      windowsopen.forEach(windowtosort => {
        
        $(document.getElementById(windowtosort.id)).css("z-index", 4 + windowsopen.indexOf(windowtosort));
    
      });

      taskbarstateupdate()

    }

    if ($(event.target).hasClass("resizer")){

      if(event.target.id == "resizerright"){

        currentwindowtop = event.target.parentElement.parentElement.querySelector('.windowtop');
        resizing(event, "right");

      }

      if(event.target.id == "resizerbottom"){

        currentwindowtop = event.target.parentElement.parentElement.querySelector('.windowtop');
        resizing(event, "bottom");

      }

      if(event.target.id == "resizerbottomright"){

        currentwindowtop = event.target.parentElement.parentElement.querySelector('.windowtop');
        resizing(event, "bottomright");

      }

      if(event.target.id == "resizerbottomleft"){

        currentwindowtop = event.target.parentElement.parentElement.querySelector('.windowtop');
        resizing(event, "bottomleft");

      }

      if(event.target.id == "resizertop"){

        currentwindowtop = event.target.parentElement.parentElement.querySelector('.windowtop');
        resizing(event, "top");

      }

      if(event.target.id == "resizerleft"){

        currentwindowtop = event.target.parentElement.parentElement.querySelector('.windowtop');
        resizing(event, "left");

      }

      if(event.target.id == "resizertopleft"){

        currentwindowtop = event.target.parentElement.parentElement.querySelector('.windowtop');
        resizing(event, "topleft");

      }

      if(event.target.id == "resizertopright"){

        currentwindowtop = event.target.parentElement.parentElement.querySelector('.windowtop');
        resizing(event, "topright");

      }

      $('.window').each(function(i, obj) {

        if(obj.id == currentwindowtop.parentElement.id){
    
          windowsopen.forEach(windowtosort => {
        
            if(windowtosort.id == obj.id){
    
              windowsopen.push(windowsopen.splice(windowsopen.indexOf(windowtosort), 1)[0]);
    
            }
        
          });
    
        }
    
      });
    
      windowsopen.forEach(windowtosort => {
        
        $(document.getElementById(windowtosort.id)).css("z-index", 4 + windowsopen.indexOf(windowtosort));
    
      });

      taskbarstateupdate()

    }

    $(".windowmovingindicators").css("z-index", $(currentwindowtop.parentElement).css("z-index"));

    //console.log(currentwindowtop);

});

function mousedown(e){

  var going_to_side_position = "no";
  
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);

  $('.windowcontent').each(function(i, obj) {
    $(obj).css("pointer-events", "none");
  });

  //$(currentwindowtop.nextElementSibling).css("pointer-events", "none");

  //console.log(currentwindowtop.nextElementSibling);

  let prevX = e.clientX;
  let prevY = e.clientY;
  
  function mousemove(e){
    
    $(currentwindowtop.parentElement).css("border-radius", "15px");
    
    let newX = prevX - e.clientX;
    let newY = prevY - e.clientY;

    const rect = currentwindowtop.parentElement.getBoundingClientRect();

    currentwindowtop.parentElement.style.left = rect.left - newX + "px";
    currentwindowtop.parentElement.style.top = rect.top - newY + "px";

    prevX = e.clientX;
    prevY = e.clientY;

    if(e.clientY > 0){

      if(e.clientX >= document.documentElement.clientWidth-1){

        if($("#movetopanelright").css("display") != "inline"){
    
          $("#movetopanelright").css("display", "inline");
    
        }

        going_to_side_position = "right";
  
        if($("#movetopanelleft").css("opacity") != "0"){
  
          $("#movetopanelleft").css("opacity", "0");
  
        }

        if($("#movetopanelfull").css("opacity") != "0"){
  
          $("#movetopanelfull").css("opacity", "0");
  
        }
  
        if($("#movetopanelright").css("opacity") != "1"){
  
          $("#movetopanelright").css("opacity", "1");
  
        }
  
      }
  
      else if(e.clientX <= 0){
  
        if($("#movetopanelleft").css("display") != "inline"){
    
          $("#movetopanelleft").css("display", "inline");
    
        }

        going_to_side_position = "left";
  
        if($("#movetopanelleft").css("opacity") != "1"){
  
          $("#movetopanelleft").css("opacity", "1");
  
        }

        if($("#movetopanelfull").css("opacity") != "0"){
  
          $("#movetopanelfull").css("opacity", "0");
  
        }
  
        if($("#movetopanelright").css("opacity") != "0"){
  
          $("#movetopanelright").css("opacity", "0");
  
        }
  
      }

      else{

        going_to_side_position = "no";
  
        if($("#movetopanelleft").css("opacity") != "0"){
  
          $("#movetopanelleft").css("opacity", "0");
  
        }

        if($("#movetopanelfull").css("opacity") != "0"){
  
          $("#movetopanelfull").css("opacity", "0");
  
        }
  
        if($("#movetopanelright").css("opacity") != "0"){
  
          $("#movetopanelright").css("opacity", "0");
  
        }
  
      } 

    }

    else if(e.clientY <= 0){

      if($("#movetopanelfull").css("display") != "inline"){
  
        $("#movetopanelfull").css("display", "inline");
  
      }

      going_to_side_position = "full";

      if($("#movetopanelleft").css("opacity") != "0"){
  
        $("#movetopanelleft").css("opacity", "0");

      }

      if($("#movetopanelfull").css("opacity") != "1"){

        $("#movetopanelfull").css("opacity", "1");

      }

      if($("#movetopanelright").css("opacity") != "0"){

        $("#movetopanelright").css("opacity", "0");

      }

    }

    /*console.log(e.clientX + " - " + (document.documentElement.clientWidth-1));
    console.log(going_to_side_position);*/

  }

  function mouseup(){

    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);

    $('.windowcontent').each(function(i, obj) {
        $(obj).css("pointer-events", "all");
    });

    if(going_to_side_position == "left"){

      currentwindowtop.parentElement.style.left = "0px";
      currentwindowtop.parentElement.style.top = "0px";
      currentwindowtop.parentElement.style.width = document.documentElement.clientWidth/2 + "px";
      currentwindowtop.parentElement.style.height = document.documentElement.clientHeight - 50 + "px";

      $(currentwindowtop.parentElement).css("border-radius", "0px");
      
    }

    else if(going_to_side_position == "right"){

      currentwindowtop.parentElement.style.left = document.documentElement.clientWidth/2 + "px";
      currentwindowtop.parentElement.style.top = "0px";
      currentwindowtop.parentElement.style.width = document.documentElement.clientWidth/2 + "px";
      currentwindowtop.parentElement.style.height = document.documentElement.clientHeight - 50 + "px";

      $(currentwindowtop.parentElement).css("border-radius", "0px");
      
    }

    else if(going_to_side_position == "full"){

      windowfullscreen(currentwindowtop.parentElement);
      
      $(currentwindowtop.parentElement).css("border-radius", "0px");
      
    }

    if($("#movetopanelleft").css("opacity") != "0"){

      $("#movetopanelleft").css("opacity", "0");

    }

    if($("#movetopanelfull").css("opacity") != "0"){

      $("#movetopanelfull").css("opacity", "0");

    }

    if($("#movetopanelright").css("opacity") != "0"){

      $("#movetopanelright").css("opacity", "0");

    }

    if($("#movetopanelleft").css("display") != "none"){

      $("#movetopanelleft").css("display", "none");

    }

    if($("#movetopanelfull").css("display") != "none"){

      $("#movetopanelfull").css("display", "none");

    }

    if($("#movetopanelright").css("display") != "none"){

      $("#movetopanelleft").css("display", "none");

    }

    currentwindowtop.parentElement.querySelector(".windowiframe").focus();

  }

}

function resizing(e, side){

  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);

  $('.windowcontent').each(function(i, obj) {
    $(obj).css("pointer-events", "none");
  });

  let prevX = e.clientX;
  let prevY = e.clientY; 

  function mousemove(e){

    $(currentwindowtop.parentElement).css("border-radius", "15px");
    
    let newX = prevX - e.clientX;
    let newY = prevY - e.clientY;

    const rect = currentwindowtop.parentElement.getBoundingClientRect();

    if(side == "right"){

      currentwindowtop.parentElement.style.width = rect.width - newX + "px";

    }

    if(side == "bottom"){

      currentwindowtop.parentElement.style.height = rect.height - newY + "px";

    }

    if(side == "bottomright"){

      currentwindowtop.parentElement.style.width = rect.width - newX + "px";
      currentwindowtop.parentElement.style.height = rect.height - newY + "px";

    }

    if(side == "bottomleft"){

      currentwindowtop.parentElement.style.left = rect.left - newX + "px";
      currentwindowtop.parentElement.style.width = rect.width + newX + "px";
      currentwindowtop.parentElement.style.height = rect.height - newY + "px";

    }

    if(side == "top"){

      currentwindowtop.parentElement.style.top = rect.top - newY + "px";
      currentwindowtop.parentElement.style.height = rect.height + newY + "px";

    }

    if(side == "left"){

      currentwindowtop.parentElement.style.left = rect.left - newX + "px";
      currentwindowtop.parentElement.style.width = rect.width + newX + "px";

    }

    if(side == "topleft"){

      currentwindowtop.parentElement.style.top = rect.top - newY + "px";
      currentwindowtop.parentElement.style.height = rect.height + newY + "px";
      currentwindowtop.parentElement.style.left = rect.left - newX + "px";
      currentwindowtop.parentElement.style.width = rect.width + newX + "px";

    }

    if(side == "topright"){

      currentwindowtop.parentElement.style.top = rect.top - newY + "px";
      currentwindowtop.parentElement.style.height = rect.height + newY + "px";
      currentwindowtop.parentElement.style.width = rect.width - newX + "px";

    }



    prevX = e.clientX;
    prevY = e.clientY;

  }

  function mouseup(){

    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);

    $('.windowcontent').each(function(i, obj) {
        $(obj).css("pointer-events", "all");
    });

  }

}



//
// WINDOW BUTTONS ---------------------------------------------------------------------------------------------
//

function windowfullscreen(windowtofull){

  windowtofull.style.left = "0px";
  windowtofull.style.top = "0px";
  windowtofull.style.width = document.documentElement.clientWidth + "px";
  windowtofull.style.height = document.documentElement.clientHeight - 50 + "px";

  $(windowtofull).css("border-radius", "0px");

  $('.window').each(function(i, obj) {

    if(obj.id == windowtofull.id){

      windowsopen.forEach(windowtosort => {
    
        if(windowtosort.id == obj.id){

          windowsopen.push(windowsopen.splice(windowsopen.indexOf(windowtosort), 1)[0]);

        }
    
      });

    }

  });

  windowsopen.forEach(windowtosort => {
    
    $(document.getElementById(windowtosort.id)).css("z-index", 4 + windowsopen.indexOf(windowtosort));

  });

  currentwindowtop = windowtofull.querySelector(".windowtop");

  taskbarstateupdate();

}

function windowminimize(windowtomin){

  windowtomin.style.display = "none";
  currentwindowtop = nowindowselected;
  taskbarstateupdate();

}

function windowclose(window){

  currentwindowtop = window.querySelector(".windowtop");

  $('.window').each(function(i, obj) {

    if(obj.id == currentwindowtop.parentElement.id){

      windowsopen.forEach(windowtosort => {
    
        if(windowtosort.id == obj.id){

          windowsopen.push(windowsopen.splice(windowsopen.indexOf(windowtosort), 1)[0]);

        }
    
      });

    }

  });

  windowsopen.forEach(windowtosort => {
            
    $(document.getElementById(windowtosort.id)).css("z-index", 4 + windowsopen.indexOf(windowtosort));

  });

  windowsopen.forEach(windowtodelete => {

    if(windowtodelete.id == window.id){

      windowsopen.pop(windowtodelete);

    }

  });

  $('.openedapptaskbar').each(function(i, appicontask) {
    
    if(appicontask.id == window.id){

      appicontask.remove();

    }

  });

  window.remove();

}
/*
function windowgoback(window){

  window.querySelector('.windowiframe').contentWindow.history.back();

}*/