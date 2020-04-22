 
 function ageInDays(){
 var birthYear=prompt("What year were you born...dear friend?");
 var ageInDayss = (2020-birthYear) * 365;
 var h1= document.createElement('h1');
 var textAnswer= document.createTextNode('You are ' + ageInDayss+' days old.');
 h1.setAttribute('id','ageInDays') ;
 h1.appendChild(textAnswer);
 document.getElementById('flex-box-result').appendChild(h1);
 
}

function reset (){
    document.getElementById('ageInDays').remove();
} 

//challenge 2: cat generator   
function generateCat(){
    var image =document.createElement('img');
    var div=document.getElementById("flex-cat-gen");
    image.src="https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);  

}

//challenge 3: rock paper scissor
function rpsGame(yourChoice){
    var humanChoice, botChoice;
    humanChoice= yourChoice.id;
    botChoice= numberToChoice(randomToRpsInt());
    console.log('computerChoice:', botChoice);
    
    results= decideWinner(humanChoice, botChoice);
    console.log(results);
    
    message=finalMessage(results);
    console.log(message);
    rpsFrontEnd(yourChoice, botChoice, message);
}
 
function randomToRpsInt(){
    return Math.floor(Math.random() * 3);
}
function numberToChoice(number){
     return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase={
        'rock':{'scissors':1, 'rock':0.5, 'paper':0},
        'paper':{'rock':1, 'paper':0.5, 'scissors':0},
        'scissors':{'paper':1,'scissors':0.5, 'rock':0}
    };
    var yourScore=rpsDatabase[yourChoice][computerChoice];  
    var computerScore= rpsDatabase[computerChoice][yourChoice];
    
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if( yourScore===0){
        return {'message': 'You lost!', 'color': 'red'}
    }else if(yourScore=== 0.5){
        return {'message':'You tie!', 'color':'yellow'}
    }else{
        return{'message': 'You won!', 'color':'green'}
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    //console.log(botImageChoice);
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };

    //console.log(imagesDatabase[humanImageChoice.id]);
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src = '" + imagesDatabase[humanImageChoice.id] + "' width=150 height=150 style ='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML="<h1 style='color :"+finalMessage['color'] + "; font-size : 60px; padding: 30px; '>"+finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src = '" + imagesDatabase[botImageChoice] + "' width=150 height=150 style ='box-shadow: 0px 10px 50px rgba(243, 38, 234, 1);'>";
    
    
    document.getElementById('flex-box-rps-div').append(humanDiv);
    document.getElementById('flex-box-rps-div').append(messageDiv);
    document.getElementById('flex-box-rps-div').append(botDiv);
}





//challenge 4: change the color of all buttons





var all_buttons = document.getElementsByTagName('button');
//console.log(all_buttons);
    
var copyAllButtons = [];
for(let i=0; i<all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy){
   if(buttonThingy.value === 'red'){
       buttonsRed();
   } else if(buttonThingy.value === 'green'){
    buttonsGreen();
   }else if(buttonThingy.value === 'reset'){
    buttonColorReset();
   }else if(buttonThingy.value === 'random'){
    randomColors();
   }
}

function buttonsRed(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }

}

function randomColors(){
    var choices=['btn-primary', 'btn-success', 'btn-warning', 'btn-danger'];
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[Math.floor(Math.random()*4)]);
    }
}

//end of challenge 4s

//Challenge:5 Blackjack

let blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score':0},
    'dealer' :{'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const loseSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

function blackjackHit(){
    if(blackjackGame['isStand']===false){
    let card= randomCard();
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
    }
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
        let cardImage=document.createElement('img');
        cardImage.src=`images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsOver']===true){
    blackjackGame['isStand']=false;
    
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for(let i=0; i<yourImages.length;i++){
        yourImages[i].remove();
    }

     
    for(let i=0; i<dealerImages.length;i++){
        dealerImages[i].remove();
    }
    YOU['score']=0;
    DEALER['score']=0;
    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#your-blackjack-result').style.color='white';
    document.querySelector('#dealer-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').style.color='white';
    document.querySelector('#blackjack-result').textContent="Let's Play";
    document.querySelector('#blackjack-result').style.color='black';
    
    blackjackGame['turnsOver']=false;
}

}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13)
    return blackjackGame['cards'][randomIndex]
} 

function updateScore(card, activePlayer){
    //IF adding 11 keeps me below 21, add 11, otherwise add 1
   if(card ==='A'){
    if(activePlayer['score']+blackjackGame['cardsMap'][card][1] <=21){
        activePlayer['score']+=blackjackGame['cardsMap'][card][1];
   }else{
       activePlayer['score'] +=blackjackGame['cardsMap'][card][0];
   }
} else{
   
    activePlayer['score']+= blackjackGame['cardsMap'][card] ;
    }
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
}
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
    blackjackGame['isStand']=true;


    while(DEALER['score']<16 && blackjackGame['isStand']===true){
    let card = randomCard();
    showCard(card,DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
    }

    
    blackjackGame['turnsOver']=true;
    let winner = computeWinner();
    showResult(winner);
    
    
}

// compute winner and return  who just won
function computeWinner(){
    let winner;
    if(YOU['score']<=21){
        //condition higher score than dealer
        if(YOU['score']>DEALER['score'] || DEALER['score']>21){
            blackjackGame['wins']++;
            winner = YOU;
        }else if(YOU['score']<DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        }else if(YOU['score']===DEALER['score']){
            blackjackGame['draws']++;
        }
    }else if(YOU['score']>21 && DEALER['score'] <= 21){
        blackjackGame['wins']++;
        winner = DEALER;
    }else if(YOU['score']>21 && DEALER['score']>21){
        blackjackGame['draws']++;
    }
    
    return winner;
}

function showResult(winner){
    if(blackjackGame['turnsOver']===true){
    let message, messageColor;
    if (winner === YOU){

        document.querySelector('#wins').textContent= blackjackGame['wins'];
        message = 'You Won';
        messageColor= 'green';
        winSound.play();
    }else if (winner === DEALER){
        document.querySelector('#losses').textContent= blackjackGame['losses'];
        message = 'You Lost!';
        messageColor= 'red';
        loseSound.play();
    }else{
        document.querySelector('#draws').textContent= blackjackGame['draws'];
        message = 'You Drew!';
        messageColor = 'black';

    }    

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}
}