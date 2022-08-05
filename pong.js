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
        intervalSpeed : 13 // Leave this alone unless there is lag
    },
    ballPos : {
        x : 100,
        y : 100
    },
    ballSpeed :{
        x: 3,
        y: 1
    },

    ballInterval : null,

    setupGame : function(containerElement){
        const z = this
        z.gamediv = containerElement;

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
        z.startBallMove()
    },


    startBallMove: function(){
         // This calls next ball move repeadeatly, in this case its better to use than setTimeout
        const z = this
        z.ballInterval = setInterval(function(){
            z.nextBallMove()
            
        }, z.config.intervalSpeed)

    },

    stopBallMove: function(){
        const z = this

        clearInterval(z.ballInterval)


    },

    nextBallMove: function(){
        const z = this

        // Move the ball one increment
        z.calculateNextBallPosition()
        z.refreshBallPositionOnScreen()

    },

    calculateNextBallPosition : function(){
        const z = this 
        z.ballPos.x += z.ballSpeed.x // += add to myself
        z.ballPos.y += z.ballSpeed.y
        //check if ball is about to hit the right wall
        if (z.ballPos.x > z.config.stageDimensions.width - z.config.ballDimensions.width){
            //reverse x direction
            z.ballSpeed.x *= -1 // *= Multyplying myself
        
        }
         //check if ball is about to hit the left wall  
        if (z.ballPos.x < 0){
            //reverse x direction
            z.ballSpeed.x *= -1 // *= Multyplying myself
        

        }
        // check if ball is about to hit the bottom 
        if (z.ballPos.y > z.config.stageDimensions.height - z.config.ballDimensions.height){
            //reverse y direction
            z.ballSpeed.y *= -1 // *= Multyplying myself
         

        }
        if (z.ballPos.y < 0){
           //reverse y direction
            z.ballSpeed.y *= -1 // *= Multyplying myself
           

        }
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
let speed= 5 
console.log('hi speed=', speed)
speed *= -2
console.log('new speed', speed)






