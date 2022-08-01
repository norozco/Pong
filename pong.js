const Pong ={
    config :{
        ballDimensions : {
            width : 20, 
            height : 20 
        },
        stageDimensions : {
            width : 1500, 
            height : 1000
        },
        stageStyle : {
            border : "4px solid white",
            position : "relative"
        },
        gameStyle : {
            background : "black",
            padding : "100px",
            height : "100vh"
    
        },
        ballStyle : {
            position : "absolute"
        }, 
        intervalSpeed : 13, // Leave this alone unless there is lag
        ballSpeed : 3 // This is obviously ball speed :D 
    },
    ballPos : {
        x : 100,
        y : 100
    },
    garbageCollection: {},


    setupGame : function(containterElement){
        const z = this
        z.gamediv = containterElement;

        // set game styles
        z.gamediv.css(z.config.gameStyle)

        // create brand new div for stage
        z.stage = $ ("<div></div>") 
        z.stage.width(z.config.stageDimensions.width)
        z.stage.height(z.config.stageDimensions.height)
        // set stage styles
        z.stage.css(z.config.stageStyle)
        // add stage to game
        z.gamediv.append(z.stage)
    
        // create brand new ball
        z.ball = $ ("<img src=\"./Ball.svg\" />")
        z.ball.width(z.config.ballDimensions.width)
        z.ball.height(z.config.ballDimensions.height)
        // set ball styles
        z.ball.css(z.config.ballStyle)
        // add ball to stage
        z.stage.append(z.ball);



        // Start ball movement
        z.nextBallMove() 
    },

    nextBallMove: function(){
        const z = this

        // Delete any existing timeouts just in case
        // There will be a better place to put this later. Example: When a new round ends or starts
        //clearTimeout(z.garbageCollection.ballTimeout)

        // Move the ball one increment
        z.calculateNextBallPosition()
        z.refreshBallPositionOnScreen()

        // wait some time and then start all over again
        z.garbageCollection.ballTimeout = setTimeout(function(){
            z.nextBallMove()
        }, z.config.intervalSpeed)
    },

    calculateNextBallPosition : function(){
        const z = this
        z.ballPos.x = z.ballPos.x + z.config.ballSpeed;
        z.ballPos.y = z.ballPos.y + z.config.ballSpeed;
    },

    refreshBallPositionOnScreen : function(){
        const z = this
        z.ball.css({
            left : z.ballPos.x + "px",
            top : z.ballPos.y + "px" 
        })
    }

}



// Training stuff - can delete later
function addnumbers(number1,number2){
    const result=number1 * number2;
    return result


}

console.log('Hi its me')
console.log(addnumbers (6,25))










