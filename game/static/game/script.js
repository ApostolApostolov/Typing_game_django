
let quoteInputArea = document.getElementById('quoteInput');
let current_quote = document.getElementById("current-text");

let timer_seconds = document.getElementById("timer-seconds");
let timer_minutes = document.getElementById("timer-minutes")
var timer_on = false
let mistakes = 0
let total_length = 0 // Keep track of all written characters in the input area

var indexVariable = 0  //Keeps track of the last written character in the input area




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

    // To not count the arrow keys as input 
    if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key ==='ArrowDown'){
        event.preventDefault();
        return null
    }

    if (event.inputType === "deleteContentBackward"){
        if (indexVariable === 0) return 

        indexVariable--;
        remove_assigned_classes_in_typing_game()
        return null
    }

    if (timer_on === false){
        timer_on = true
        timer_start();
    }


    const arrayValue = quoteInputArea.value.split('');

    // in case of deleting the whole text to reset it 
    if (arrayValue.length === 0){
        indexVariable = 0;
    } 


    const arrayQuote = current_quote.querySelectorAll('span');
    const letter_in_quote = arrayQuote[arrayValue.length - 1]
    indexVariable = arrayValue.length - 1
    character = arrayValue[arrayValue.length - 1]
    
    if (character === letter_in_quote.innerHTML){

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
    //currently all quotes end on ".", the API provides the like this
    if (arrayQuote.length === arrayValue.length
        && character === "."){
            mistakes =  mistakes + current_quote.querySelectorAll('.incorrect').length + current_quote.querySelectorAll('.incorrect-space').length;
            total_length = total_length + quoteInputArea.value.length
        randomQuote()
        document.getElementById('quoteInput').value = ''
    }

})


function reset(){
    randomQuote()
    timer_on = false
    document.getElementById('quoteInput').value = ''
    document.getElementById('quoteInput').disabled = false
    document.getElementById("information-result").style.visibility  = "hidden";
    quoteInputArea.focus();
}



function timer_start(){
    let count = 30; // debug value change upon completion
    const timer = setInterval(function(){
        count--;
    
        if (count > 60){
            minutes = Math.floor(count / 60)
            timer_minutes.innerHTML = "0" + minutes
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
            total_length = total_length + quoteInputArea.value.length

            document.getElementById("information-result").style.visibility  = "visible";
            document.getElementById('quoteInput').disabled = true
            document.getElementById("information-mistakes").innerHTML= "Mistakes - " + mistakes
            document.getElementById("WPM").innerHTML = (quoteInputArea.value.length / 5 / 0.5) .toFixed(2) + " wpm"

            accuracy = Math.round(((total_length - mistakes) / (total_length)) * 100)


            if (accuracy <=0  || isNaN(accuracy)){
                accuracy = 0
            }
            document.getElementById("accuracy").innerHTML = "Accuracy - " + accuracy + "%";
        }
    },1000) 
}


// Prevent use of arrows in the input area
window.addEventListener("keydown", function (e) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    }, false);


function remove_assigned_classes_in_typing_game(){
    const arrayValue = quoteInputArea.value.split('');
    const arrayQuote = current_quote.querySelectorAll('span');
    const letter_in_quote = arrayQuote[arrayValue.length]

    arrayQuote.forEach((characterSpan, index) => {

        character = arrayValue[index]
        letter_in_quote.classList.remove("correct")
        letter_in_quote.classList.remove('incorrect')
        letter_in_quote.classList.remove('correct-space')
        letter_in_quote.classList.remove('incorrect-space')
    });
}


randomQuote()



