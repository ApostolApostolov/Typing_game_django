
let string_index = 0;

let quoteInputArea = document.getElementById('quoteInput');
let current_quote = document.getElementById("current-text");
let timer_seconds = document.getElementById("timer-seconds");
let timer_minutes = document.getElementById("timer-minutes")
var timer_on = false
let mistakes = 0

var indexVariable = 0


let charIndex = 0



async function randomQuote() {
    const response = await fetch('https://api.quotable.io/random')
    const quote = await response.json()
    
    // Output the quote and author name
    document.getElementById("current-text").innerText = quote.content

    //separate the quote into spans 
    let current_quote = document.getElementById("current-text").innerText
    document.getElementById("current-text").innerText = ""
    current_quote.split('').forEach(character =>{
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    document.getElementById("current-text").appendChild(characterSpan)
    });
    
  }


quoteInputArea.addEventListener('input', function(event) {
    const key = event.key;

    if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key ==='ArrowDown'){
        event.preventDefault();
        return null
    }
    
    if (key === "Backspace" || key === "Delete"){
        if (indexVariable === 0) return 
        indexVariable--;
        console.log(indexVariable)
        return null
    }

    if (timer_on === false){
        timer_on = true
        timer_start();
    }




    const arrayValue = quoteInputArea.value.split('');

    if (arrayValue.length === 0){
        indexVariable = 0;
    } 


    

    const arrayQuote = current_quote.querySelectorAll('span');
    const letter_in_quote = arrayQuote[arrayValue.length - 1]


    indexVariable = arrayValue.length - 1
    character = arrayValue[arrayValue.length - 1]

    
    if (character == null){ 
        letter_in_quote.classList.remove('correct')
        letter_in_quote.classList.remove('incorrect')
    }
 
    else if (character === letter_in_quote.innerHTML){

        if (character === " "){
            letter_in_quote.classList.add("correct-space")
            letter_in_quote.classList.remove("incorrect-space")
        }
        else{
            letter_in_quote.classList.add("correct")
            letter_in_quote.classList.remove("incorrect")
        }


    }else {

        if (letter_in_quote.innerHTML === " "){
            letter_in_quote.classList.remove("correct-space")
            letter_in_quote.classList.add("incorrect-space")
        }
        else{
            letter_in_quote.classList.add("incorrect")
         letter_in_quote.classList.remove("correct")
        }
        

    }

    //check array size if the last written char is . then get new quote
    
    if (arrayQuote.length === arrayValue.length
        && character === "."){
        console.log("HERE WE ARE")
        mistakes =  mistakes + current_quote.querySelectorAll('.incorrect').length;

        console.log(mistakes +" MIstakes")
        // get the span all the mistakes

        reset()
    }

})

function reset(){
    randomQuote()
    document.getElementById('quoteInput').value = ''
    document.getElementById('quoteInput').disabled = false
    timer_on = false
}



function timer_start(){
    let count = 20;
    const timer = setInterval(function(){
        count--;
    
        if (count > 60){
            minutes = Math.floor(count / 60)
            timer_minutes.innerHTML = "0" +minutes
            seconds = count % 60
            timer_seconds.innerHTML = count % 60
        }
        else if (count >= 10 && count < 60){
            timer_minutes.innerHTML = "00";
            timer_seconds.innerHTML = count
        }
        else if (count < 10){
            timer_seconds.innerHTML = "0" + count
        }
    
        
       
        if (count === 0){
            clearInterval(timer)
            mistakes =  mistakes + current_quote.querySelectorAll('.incorrect').length + current_quote.querySelectorAll('.incorrect-space').length;
            console.log("is over")
            document.getElementById('quoteInput').disabled = true
            document.getElementById("information-mistakes").innerHTML= "Mistakes - " + mistakes

            
        }
    },1000) 
}


// Prevent use of arrows in the input area
window.addEventListener("keydown", function (e) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    }, false);





randomQuote()



