//CHANGE PAGE --------------------------------------------------------------------------------------------------------------------

function showsettingspage(pagename){

    document.querySelectorAll(".sidebarbutton").forEach(function(btn){

        if(btn.classList.contains(pagename + "pagebutton")){

            btn.querySelector(".showingsettcategoryindicator").style.opacity = 1;

        }

        else{

            btn.querySelector(".showingsettcategoryindicator").style.opacity = 0.2;

        }
        
    }, pagename);

    document.querySelectorAll(".settingspannel").forEach(function(page){

        if(page.classList.contains(pagename + "settings")){

            page.style.display = "inline-block";

        }

        else{

            page.style.display = "none";

        }
        
    }, pagename);

}

window.addEventListener('load', function () {
    
    showsettingspage("wallpaper");

})

//SHOW "ABOUT" INFO --------------------------------------------------------------------------------------------------------------------

document.querySelector(".versionabout").innerHTML = "Version v" + parent.jmidevDEversion;

const os = require('os');

const operatingsystem = process.platform;
document.querySelector(".os").querySelector(".aboutinfosectorvalue").innerHTML = operatingsystem;

const cpus = os.cpus();
console.log(cpus);
document.querySelector(".cpu").querySelector(".aboutinfosectorvalue").innerHTML = cpus[0].model;
document.querySelector(".cpucores").querySelector(".aboutinfosectorvalue").innerHTML = cpus.length;

const ramamount = os.totalmem();
document.querySelector(".ram").querySelector(".aboutinfosectorvalue").innerHTML = Math.round(ramamount/1024/1024/1024) + " GB";