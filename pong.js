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
        intervalSpeed : 13, //Leave this alone unless there is lag
        ballSpeed : 3 // This is obviously ball speed :D 
    },
    ballXy : {
        x : 100,
        y : 100
    },

    setupGame : function(){
        const z = this
        // search for existing div with id game
        z.gamediv = $ ("#game");
        // create brand new div for stage
        z.stage = $ ("<div></div>") 
            z.stage.width(z.config.stageDimensions.width)
            z.stage.height(z.config.stageDimensions.height)
            z.gamediv.append(z.stage)
    
            //create brand new ball
        z.ball = $ ("<img src=\"./Ball.svg\" />")
        z.ball.width(z.config.ballDimensions.width)
        z.ball.height(z.config.ballDimensions.height)
        //actually added to the page
        z.stage.append(z.ball);
        z.ball.css(z.config.ballStyle)
        z.gamediv.css(z.config.gameStyle)
        z.stage.css(z.config.stageStyle)
        z.nextBallMove()

        function repeatBallMove(){
            //Move the ball one increment
            z.nextBallMove()
            //wait some time and then start all over again
            setTimeout(function(){
                repeatBallMove()
            },z.config.intervalSpeed)
        }
        //Start ball movement
        repeatBallMove()   
    },

    moveBall : function(){
        const z = this
        z.ball.css({
            left : z.ballXy.x+"px",
            top : z.ballXy.y +"px" 
        })

    },

    nextBallMove : function(){
        const z = this
        z.ballXy.x = z.ballXy.x + z.config.ballSpeed;
        z.ballXy.y = z.ballXy.y + z.config.ballSpeed;
        z.moveBall()
    }

}


function addnumbers(number1,number2){
    const result=number1 * number2;
    return result


}

console.log('Hi its me')
console.log(addnumbers (6,25))









$(function(){
    Pong.setupGame ()
})
