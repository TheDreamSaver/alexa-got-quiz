"use strict";

var Alexa = require("alexa-sdk");

const got = [
    {
        question: "Grey Wind, Lady, Ghost, Shaggydog, Summer and the sixth direwolve's name is?",
        answer: 'nymeria',
    },
    {
        question: "What was the name of the sinister castle where Arya and Gendry were held prisoner in season two?",
        answer: 'harrenhal',
    },
    {
        question: "What is a person called that can enter the minds of animals?",
        answer: 'warg',
    },
    {
        question: "What was the name of the Stark ancestral sword that was melted down by Tywin Lannister?",
        answer: 'ice',
    }
    
];

var handlers = {
  "customIntent": function () {
		   this.response.speak("Would you like to appear for a trial by combat");
      this.emit(":responseReady");
   },
   "quizIntent": function () {
       var mydecision = this.event.request.intent.slots.decision.value;
       if(mydecision=='no'||mydecision=='nope'||mydecision=='naah'){
        this.response.speak("A five year old has more courage than you.");
        this.emit(":responseReady");
       }
       
	   for(var i = 0; i <got.length; i++){
	        var myanswer = this.event.request.intent.slots.answer.value;
            var item = got[i].question;
	        this.response.speak(item).listen();
	        if(myanswer!=got[i].answer){
	            this.response.speak("Wrong Answer. You are dead");
	            this.emit(':responseReady');

	        }
	        if(i==got.length-1){
	            this.response.speak("You won");
	            this.emit(':responseReady');
	        }
            
      }
        
       
   },
   "LaunchRequest": function () {
    this.response.speak("Valar Morghulis").listen("You are supposed to say Valar Dohareis"); 
    this.emit(":responseReady");
   }

};


// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {

// Set up the Alexa object
var alexa = Alexa.handler(event, context); 

// Register Handlers
alexa.registerHandlers(handlers); 

// Start our Alexa code
alexa.execute(); 
  
};
