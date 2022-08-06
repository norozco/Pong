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

        paddleStyle :{
            background : "white",
            width: "7px",
            height: "200px",
            position: "absolute"
        },

        paddleOnePosition :{
            left: "10px"
        },

        paddleTwoPosition :{
            right: "10px"

        }

    },
    ballPos : {
        x : 100,
        y : 100
    },

    ballSpeed :{
        x: 3,
        y: 1
    },
    paddleOnePosition :{
        y: 0

    },
    
    paddleTwoPosition :{
        y: 0
    },

    paddleOneSpeed :{
        y: 3
    },
    
    paddleTwoSpeed :{
        y: 3
    },

    ballInterval : null,

    setupGame : function(containerElement){
        const z = this
        z.gamediv = containerElement;

        // set game styles
        z.gamediv.css(z.config.gameStyle)
        z.createStage()
        z.createPaddleOne()
        z.createPaddleTwo()
        z.createBall()
        z.paddleControls()
        // Start ball movement
        z.startBallMove()
        
    },

    createStage : function(){
        const z = this
        // create brand new div for stage
        z.stage = $ ("<div></div>") 
        z.stage.width(z.config.stageDimensions.width)
        z.stage.height(z.config.stageDimensions.height)
        // set stage styles
        z.stage.css(z.config.stageStyle)
        // add stage to game
        z.gamediv.append(z.stage)

    },

    createBall : function(){
        const z= this
        // create brand new ball
        z.ball = $ ("<img src=\"./Ball.svg\" />")
        z.ball.width(z.config.ballDimensions.width)
        z.ball.height(z.config.ballDimensions.height)
        // set ball styles
        z.ball.css(z.config.ballStyle)
        // add ball to stage
        z.stage.append(z.ball);

    },

    createPaddleOne : function(){
        const z = this
        // create paddle
        z.paddleOne = $ ("<div></div>")
        // assigning styles to the file
        z.paddleOne.css(z.config.paddleStyle)
        // add paddle to stage
        z.paddleOne.css(z.config.paddleOnePosition)
        z.stage.append(z.paddleOne);
        console.log ('help')
    },

    createPaddleTwo : function(){
        const z = this
        // create paddle
        z.paddleTwo = $ ("<div></div>")
        // assigning styles to the file
        z.paddleTwo.css(z.config.paddleStyle)
        // add paddle to stage
        z.paddleTwo.css(z.config.paddleTwoPosition)
        z.stage.append(z.paddleTwo);

        console.log ('help')
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
    },

    calculateNextPaddleOnePosition : function(){
        const z = this
        z.paddleOnePosition.y += z.paddleOneSpeed.y
    },

    refreshPaddlePositionOnScreen : function(){
        const z = this
        z.paddleOne.css({
            top : z.paddleOne.y + "px" 
        })
    
    },
    
    paddleControls :function(){
        console.log("paddle Controls Not Working")
        const z = this
        //Setup paddle one controls
        //listen to any keypress in the browser
        $ (window).keydown(function(event){
            //alert(event.which)
            //s=83 w=87 (on keyboard)
            //if you press up 
             if (event.which == 87){
            //move paddle one up
                z.paddleOne.css({
                    top: ""
                })
             }
        
            if (event.which == 83){
                z.paddleOne.css({
                    top: "50px"
                })

            }  
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






