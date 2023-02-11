var showingstartmenu = false;
var startmenu = document.querySelector(".startmenu");
var startmenubox = startmenu.querySelector(".startmenubox");

var applist = ["apps/Settings", "apps/Calculator", "apps/File Explorer"];
var appcategories = [];
var applistinstartmenu = [];

function filtercategory(category){

    window.setTimeout(function(){

        if(category == "All"){

            document.querySelectorAll(".startmenuappopen").forEach(function(button){
    
                button.style.display = "inline-block";
    
            });

            document.querySelectorAll(".startmenuappcategory").forEach(function(categbutton){
    
                if(categbutton.querySelector("span").innerHTML == "All"){

                    categbutton.querySelector("img").style.opacity = "1";

                }

                else{

                    categbutton.querySelector("img").style.opacity = "0.2";

                }
    
            });
    
        }
    
        else{
    
            document.querySelectorAll(".startmenuappopen").forEach(function(button){
    
                button.style.display = "none";

            });

            document.querySelectorAll(".category_" + category).forEach(function(button){
    
                button.style.display = "inline-block";

            }, category);

            document.querySelectorAll(".startmenuappcategory").forEach(function(categbutton){
    
                if(categbutton.querySelector("span").innerHTML == category){

                    categbutton.querySelector("img").style.opacity = "1";

                }

                else{

                    categbutton.querySelector("img").style.opacity = "0.2";

                }
    
            }, category);
    
        }

    }, 30)

}

function showtaskbar(state){

    showingstartmenu = state;

    if(state){

        appcategories = [];
        applistinstartmenu = [];

        startmenu.style.display = "inline";

        applist.forEach(function(path){

            fetch(path + "/appinfo.json")
                .then((response) => response.json())
                .then((json) => {
                
                    if(appcategories.includes(json.category) != true){

                        appcategories.push(json.category);

                    }
                    
                    applistinstartmenu.push([path, json.name, json.icon, json.category]);
                
                });

        });

        window.setTimeout(function(){

            appcategories.sort((a, b) => a.localeCompare(b));
            applistinstartmenu.sort((a, b) => a[1].localeCompare(b[1]));
            var categoriesstartmenudiv = document.querySelector(".startmenuappcategories");
            categoriesstartmenudiv.innerHTML = "";
            var appselectorstartmenudiv = document.querySelector(".startmenuappselector");
            appselectorstartmenudiv.innerHTML = "";

            //"All" category

            var categoriesstartmenudiv = document.querySelector(".startmenuappcategories");
            var warehousecategorybutton = document.querySelector(".warehouse").querySelector(".startmenuappcategory");
            var newcategorybutton = warehousecategorybutton.cloneNode(true);
    
            newcategorybutton.querySelector("span").innerHTML = "All";
            newcategorybutton.onclick = function(){filtercategory("All")};
            categoriesstartmenudiv.appendChild(newcategorybutton);

            //Other categories

            appcategories.forEach(function(category){

                var categoriesstartmenudiv = document.querySelector(".startmenuappcategories");
                var warehousecategorybutton = document.querySelector(".warehouse").querySelector(".startmenuappcategory");
                var newcategorybutton = warehousecategorybutton.cloneNode(true);
    
                newcategorybutton.querySelector("span").innerHTML = category;
                newcategorybutton.onclick = function(){filtercategory(category)};
                categoriesstartmenudiv.appendChild(newcategorybutton);
    
            });

            applistinstartmenu.forEach(function(app){

                var appselectorstartmenudiv = document.querySelector(".startmenuappselector");
                var warehouseappbutton = document.querySelector(".warehouse").querySelector(".startmenuappopen");
                var newappbutton = warehouseappbutton.cloneNode(true);
    
                newappbutton.querySelector("span").innerHTML = app[1];
                newappbutton.querySelector("img").src = app[0] + "/" + app[2];
                newappbutton.classList.add("category_" + app[3]);
                newappbutton.onclick = function(){newWindow(app[0]); showtaskbar(false);};
                appselectorstartmenudiv.appendChild(newappbutton);
    
            });

            filtercategory("All");
            
        }, 30);

    }

    else{

        startmenu.style.display = "none";

    }

}