var buttons=["green", "red", "blue", "yellow"];

var userButtons=[];

var compButtons=[];

var level=1;


$(".start").slideUp();
$(".container").slideUp();


$(".enter").on("click", function(){
    $(".enter").slideUp();
    $(".rules").slideUp();
    $("p").slideUp();
    $("ul").slideUp();
    $(".start").slideDown();
    $(".container").slideDown();
    $(".start").removeClass("visibility");
    $(".container").removeClass("visibility");
})


// Starting and restarting the game on keypress.

$(document).on("keydown", function(){
    $("h1").text("Level : 1");
    compInitiation();
});


function compInitiation(){
    setTimeout(compSequence, 1000);
}


// Computer Sequence

function compSequence(){
    var randomNum=Math.floor(Math.random()*4);
    var randomColor=buttons[randomNum];
    compButtons.push(randomColor); 
    animate(randomColor);   
}


// Animating buttons function

function animate(randomColor){
    playSound(randomColor);
    $("#"+randomColor).addClass("button-animation");
    setTimeout(
       function(){
           $("#"+randomColor).removeClass("button-animation");
       }, 100);
}


// Sound playing

function playSound(input){
    var sound=new Audio ("./sounds/"+input+".mp3");
    sound.play();
}


// Flashing on click

$(".btn").on("click", clickButton);

function clickButton(){
    var id=$(this).attr("id");
    playSound(id);
    animate(id) ;
    userSequence(id);   
}


// Storing user sequence

function userSequence(id){
    userButtons.push(id);
    check();  
}


// Checking if userButtons=compButtons

function check(){
   
    for (var i=0; i<userButtons.length; i++){
            if (userButtons[i]==compButtons[i]){
                
                if(userButtons.length==compButtons.length){
                    userButtons=[];
                    level+=1;
                    setTimeout(function(){
                        $("h1").text("Level : "+level);
                    
                    }, 1000);
                    compInitiation();   
                } 
            }
            else{
                playSound("wrong");
                $("body").addClass("body-red");
                setTimeout(function(){
                    $("body").removeClass("body-red");
                    }, 100);
                $("h1").text("Game Over. Press any key to restart");
                compButtons=[];
                userButtons=[];
                level=1;
            }
}
}


