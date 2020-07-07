var counter = 0;
function changeBG(){
    var imgs = [
        "url(https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
        ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 2000);


