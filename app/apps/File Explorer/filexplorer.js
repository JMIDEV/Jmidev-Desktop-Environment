const fs = require('fs');
const path = require('path');

var currentdirectory;
var currentfoldershowing = [];
var directorieshistory = [];
var cursorplaceinhistory = 0;

function loaddirectory(addresspath, removefutureentriesinhistory){

    if(removefutureentriesinhistory){

        currentdirectory = addresspath;
        directorieshistory.splice(cursorplaceinhistory, 0, currentdirectory);
        cursorplaceinhistory ++;
        directorieshistory.splice(cursorplaceinhistory, directorieshistory.length);

    }

    var foldercontentdiv = document.querySelector(".foldercontentdiv");
    foldercontentdiv.innerHTML = "";

    var filesinpath = [];

    fs.readdirSync(addresspath).forEach(file => {
        var filepath = path.join(addresspath, file);
        var filestats = fs.statSync(filepath);
        var filetype;
        if (filestats.isFile()) {
            filetype = "file";
        } else if (filestats.isDirectory()) {
            filetype = "folder";
        }
        var fileextension;
        if(filetype == "folder"){

            fileextension = "jmidev__folder";

        }
        else{

            fileextension = path.extname(filepath);

        }
        filesinpath.push([file, filepath, filetype, fileextension]);
    });

    currentfoldershowing = filesinpath;

    currentfoldershowing.forEach(function(item){

        explorerwarehouse = document.querySelector(".warehouse");
        itemwarehouse = explorerwarehouse.querySelector(".insidefolderitem");

        newitemadress = itemwarehouse.cloneNode(true);
        newitemadress.querySelector(".insidefoldertitle").innerHTML = item[0];

        iconsource = "";
        switch (item[3].toLowerCase()) {

            case "jmidev__folder":

                iconsource = "itemicons/folder.svg";
                break;

            case ".png":
            case ".jpg":

                iconsource = "itemicons/image.svg";
                break;

            case ".mp4":
            case ".mov":
            case ".wmv":
            case ".avi":
            case ".avchd":
            case ".mkv":
            case ".webm":

                iconsource = "itemicons/video.svg";
                break;    

            case ".txt":

                iconsource = "itemicons/textdoc.svg";
                break;

            default:

                iconsource = "itemicons/document.svg";

        }

        newitemadress.querySelector(".insidefoldericon").src = iconsource;

        if(item[3] == "jmidev__folder"){

            newitemadress.onclick = function(){loaddirectory(item[1], true)};

        }

        foldercontentdiv.appendChild(newitemadress);


    });

}

function goBack(){

    if(cursorplaceinhistory > 1){

        cursorplaceinhistory --;
        loaddirectory(directorieshistory[cursorplaceinhistory-1], false);

    }

}

function goForward(){

    if(cursorplaceinhistory < directorieshistory.length){

        loaddirectory(directorieshistory[cursorplaceinhistory], false);
        cursorplaceinhistory++;

    }

}

function goUp(){

    loaddirectory(path.dirname(currentdirectory), true);

}

loaddirectory("DIRECTORIO", true);
