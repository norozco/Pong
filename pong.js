const Pong ={
    config :{
        ballDimensions : {
            width : 20, 
            height : 20 
        },
        stageDimensions : {
            width : 1000, 
            height : 600
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
    ballSpeed: {
    	x: 4,
    	y: 2
    },
    garbageCollection: {
    	animationInterval: null
    },

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
    	const z = this
    	z.stopBallMove()
    	z.garbageCollection.animationInterval = setInterval(function(){
    		z.nextBallMove()
    	}, z.config.intervalSpeed)
    },

    stopBallMove: function(){
    	clearInterval(this.garbageCollection.animationInterval)
    },

    nextBallMove: function(){
        const z = this
        z.calculateNextBallPosition()
        z.refreshBallPositionOnScreen()
    },

    calculateNextBallPosition : function(){
        const z = this
        z.ballPos.x += z.ballSpeed.x;
        z.ballPos.y += z.ballSpeed.y;

        // Check if ball is about to hit the left or right wall
        const leftWall = 0
        const rightWall = z.config.stageDimensions.width - z.config.ballDimensions.width
        if (z.ballPos.x < leftWall || z.ballPos.x > rightWall) {
        	// Simply reverse the X velocity
        	z.ballSpeed.x *= -1
        }

				// Check if ball is about to hit the top or bottom wall
        const topWall = 0
        const bottomWall = z.config.stageDimensions.height - z.config.ballDimensions.height
        if (z.ballPos.y < topWall || z.ballPos.y > bottomWall) {
        	// Simply reverse the Y velocity
        	z.ballSpeed.y *= -1
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




