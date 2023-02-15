var jmidevDEversion = "DEV";
var currentuserrunning = "systemtestuser";

window.addEventListener('load', function () {
    
    taskbarstateupdate();

    //newWindow("https://google.com", "Google", "https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png")

})

if(localStorage.getItem(currentuserrunning + '_wallpaper') != null){

    document.querySelector(".backgroundinsideimage").src = localStorage.getItem(currentuserrunning + '_wallpaper');

}

else{

    document.querySelector(".backgroundinsideimage").src = "imgs/wallpapers/mountains.jpg";

    localStorage.setItem(currentuserrunning + '_wallpaper', "imgs/wallpapers/mountains.jpg");

}

function changewallpaper(url){

    document.querySelector(".backgroundinsideimage").src = url;

    localStorage.setItem(currentuserrunning + '_wallpaper', url);

}