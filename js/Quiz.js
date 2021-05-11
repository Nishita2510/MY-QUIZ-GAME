class Quiz {
  constructor(){
    this.title2 = createElement('h2')
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
     question.hide(); 

    //write code to change the background color here
     background(159, 226, 191)

    //write code to show a heading for showing the result of Quiz
     this.title2.html("RESULT OF QUIZ")
     this.title2.position(350, 0);

    //call getContestantInfo( ) here
     Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
     if(allContestants !== undefined){
        //write code to add a note here
       fill(41, 128, 185)
       textSize(20)
       text("*NOTE: Contestant who answered correct highlighted in green color",110,210)
  
    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer){
        fill("green");
        text(allContestants[plr].name+": "+allContestants[plr].answer,120,230)
      }
      else 
      {
        fill("red");
        text(allContestants[plr].name+": "+allContestants[plr].answer,120,250)
      }
     }
    }
  }
}
