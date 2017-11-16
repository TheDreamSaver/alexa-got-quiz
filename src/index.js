"use strict";

var Alexa = require("alexa-sdk");

const got = [
    {
        question: "According to Littlefinger, chaos is a ?",
        answer: 'ladder',
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
    },
    {
        question: "Who is the first character to say the phrase ‘Game of Thrones’ in the series?",
        answer: 'cersei',
    },
    {
        question: "Whose sword is the Widow's Wail?",
        answer: 'joffrey',
    },
    {
        question: "Grey Wind, Lady, Ghost, Shaggydog, Summer and the sixth direwolve's name is?",
        answer: 'nymeria',
    },
    {
        question: "What is the name of Roose Bolton’s wife?",
        answer: 'walda',
    },
    {
        question: "What is the surname given to bastards in the Reach?",
        answer: 'flower',
    },
    {
        question: "What is the name of Jon Snow's sword?",
        answer: 'longclaw',
    },
    {
        question: "Where does Daenerys meet Missandei?",
        answer: 'astapor',
    },
    {
        question: "Who kills Ygritte?",
        answer: 'olly',
    },
    {
        question: "What is Littlefinger’s sigil?",
        answer: 'mockingbird',
    },
    {
        question: "What was High Sparrow's profession before he became the leader of the Faith of the Seven?",
        answer: 'cobbler',
    },
    {
        question: "Whose wife was Tysha?",
        answer: 'Tyrion',
    }
    
];

var i = 0;
var handlers = {
  "customIntent": function () {
		   this.response.speak("Would you like to take part in a trial by combat?").listen();
      this.emit(":responseReady");
   },
   "quizIntent": function () {
       var mydecision = this.event.request.intent.slots.decision.value;
       if(mydecision=='no'||mydecision=='nope'||mydecision=='naah'){
        this.response.speak("Even little Lyanna Mormont has more courage than you.");
        this.emit(":responseReady");
       }
       
       if(i<=got.length){
           var item = got[i].question;
           if(i == 0){
                this.response.speak("Be attentive; just like life, I won't repeat or give you a second chance. Here you go; " + item).listen();
	            this.emit(":responseReady");
           }
           else {
	       this.response.speak(item).listen();
	       this.emit(":responseReady");
           }
        }
   },
    
    "answerIntent": function () {  
	        var myanswer = this.event.request.intent.slots.answer.value;
           
	        if(myanswer!=got[i].answer){
	            this.response.speak("Wrong Answer. The correct answer is " + got[i].answer + ". You are dead.");
	            this.emit(':responseReady');

	        }
	        i++;
	        if(i==got.length){
	            i=0;
	            this.response.speak("You emerged the ultimate victor. The best in all of Planetos.");
	            this.emit(':responseReady');
	        }
	        this.response.speak("You survived. Say ready, when you are, for the next combat!").listen();
	        this.emit(':responseReady');
    },
    'UnhandledIntent': function () {
        this.emit(':ask', 'I don\'t get it!', 'I don\'t get it!');
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
