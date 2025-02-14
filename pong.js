const Pong = {
    config: {
        ballDimensions: {
            width: 20,
            height: 20
        },
        stageDimensions: {
            width: 1500,
            height: 1000
        },
        stageStyle: {
            border: "4px solid white",
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        },
        gameStyle: {
            background: "black",
            paddle: "100px",
            height: "100vh",
            position: "relative"
        },
        ballStyle: {
            position: "absolute"
        },
        intervalSpeed: 13, // Leave this alone unless there is lag

        countdownspeed: 780,

        paddleStyle: {
            background: "white",
            position: "absolute"
        },
        paddleOneDimensions: {
            width: 7,
            height: 200
        },
        paddleTwoDimensions: {
            width: 7,
            height: 200
        },

        paddleOnePosition: {
            x: 100,
            y: 100
        },

        paddleTwoPosition: {
            x: 1400,
            y: 100
        },

        paddleOnePressingSpeed: {
            y: 6
        },

        paddleTwoPressingSpeed: {
            y: 6
        },

        scoreStyle: {
            color: "white",
            fontSize: "100px",
            fontFamily: "Garamond"
        },
        nextRoundCounterStyle: {
            color: "white",
            fontSize: "281px",
            fontFamily: "Garamond",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        },

        ballSpeed: 5,

        ballSpeedIncreaseonHit: {
            x: 1.1,
            y: 1.1
        },

        pauseButtonStyle: {
            width: "100px",
            height: "100px"
        },

        playButtonStyle: {
            width: "100px",
            height: "100px"
        },

        startGameButton: {
            height: "100vh",
            width: "100vw",
            position: "absolute",
            left: 0,
            top: 0,
            backgroundImage: 'url(./Pictures/start.svg)',
            backgroundSize: 'cover'
        },

        startScreenHotspotStyles: {
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "59vh",
            width: "96vw",
            background: "transparent",
            transform: "translate(-50%, -50%)",
            cursor: "pointer"
        }
    },

    ballPos: {
        x: null,
        y: null
    },

    ballSpeed: {
        x: null,
        y: null
    },
    paddleOnePosition: {
        x: null,
        y: null

    },

    paddleTwoPosition: {
        x: null,
        y: null
    },

    paddleOneSpeed: {
        y: 0
    },

    paddleTwoSpeed: {
        y: 0
    },

    ballInterval: null,

    score: [0, 0],

    keysPressed: {
        W: false,
        S: false,
        UP: false,
        DOWN: false
    },

    gameIsPaused: false,
    countdownHappening: false,

    setupGame: function (containerElement) {
        const z = this
        z.gamediv = containerElement;

        // set game styles
        z.gamediv.css(z.config.gameStyle)
        z.createStage()
        z.createPaddleOne()
        z.createPaddleTwo()
        z.createBall()
        z.paddleControls()
        z.createScore()
        z.createPauseButton()
        z.createStartScreen()
        z.createRoundCounter()
        z.setupSounds()
    },

    createStartScreen: function () {
        const z = this
        //create element
        z.startScreen = $("<div></div>")
        //Size of the picture
        z.startScreen.css(z.config.startGameButton)
        //makes it exist in the game
        z.gamediv.append(z.startScreen)
        //set the event handler's to start the game
        z.startScreen.on("click", function () {
            z.startScreen.remove()
            z.restartRound()
        })
        //We are gonna create an invisible rectangle that you can hover over
        //create element
        z.startScreenHotspot = $("<div></div>")
        //Size of the picture
        z.startScreenHotspot.css(z.config.startScreenHotspotStyles)
        //makes it exist in the game
        z.startScreen.append(z.startScreenHotspot)
        z.startScreenHotspot.hover(function () {
            // this is when the mouse hovers over the image
            z.startScreen.css({ backgroundImage: 'url(./Pictures/startBig.svg)' })
        }, function () {
            //this is when the mouse exits the image    
            z.startScreen.css({ backgroundImage: 'url(./Pictures/start.svg)' })
        })
    },

    createPauseButton: function () {
        const z = this
        //create pause button and assign a handler to a variable
        z.pauseButton = $("<img src=\"./Pictures/Play.svg\" />")
        z.pauseButton.css(z.config.pauseButtonStyle)
        z.playButton = $("<img src=\"./Pictures/Pause.svg\" />")
        z.playButton.css(z.config.playButtonStyle)
        z.gamediv.append(z.playButton);
        z.gamediv.append(z.pauseButton)

        z.pauseButton.on("click", function () {
            z.resumeGame()
        });
        z.playButton.on("click", function () {
            z.pauseGame()
        })
        $(window).on("keydown", function (event) {
            // space= 32
            if (event.which == 32) {
                //if game is currently paused, we want to start play
                if (z.gameIsPaused) {
                    //resume game
                    z.resumeGame()
                } else {
                    //pause game
                    z.pauseGame()
                }
            }
        })

    },

    pauseGame: function () {
        const z = this
        //Starting idea (comment below)
        //1. If start countdown is happening, dont pause the game
        // Now, lets look at it the opposite way
        //If countdown is not going on, pause the game 
        console.log(z.countdownHappening, "pausegamepressed")
        if (z.countdownHappening == false) {
            z.pauseButton.show()
            z.playButton.hide()
            z.stopAnimation()
            z.gameIsPaused = true
        }

    },

    resumeGame: function () {
        const z = this
        if(z.countdownHappening == false) {
        z.pauseButton.hide()
        z.playButton.show()
        z.startAnimation()
        z.gameIsPaused = false
        }
    },

    createStage: function () {
        const z = this
        // create brand new div for stage
        z.stage = $("<div></div>")
        z.stage.width(z.config.stageDimensions.width)
        z.stage.height(z.config.stageDimensions.height)
        // set stage styles
        z.stage.css(z.config.stageStyle)
        // add stage to game
        z.gamediv.append(z.stage)

    },

    createBall: function () {
        const z = this
        // create brand new ball
        z.ball = $("<img src=\"./Pictures/Ball.svg\" />")
        z.ball.width(z.config.ballDimensions.width)
        z.ball.height(z.config.ballDimensions.height)
        // set ball styles
        z.ball.css(z.config.ballStyle)
        z.resetBallPosition()
        z.refreshBallPositionOnScreen()
        // add ball to stage
        z.stage.append(z.ball);

    },

    createPaddleOne: function () {
        const z = this
        // create paddle
        z.paddleOne = $("<div></div>")
        // assigning styles to the file
        z.paddleOne.css(z.config.paddleStyle)
        // add paddle to stage
        z.resetPaddlePosition()
        z.refreshPaddleOnePositionOnScreen()
        z.paddleOne.width(z.config.paddleOneDimensions.width)
        z.paddleOne.height(z.config.paddleOneDimensions.height)
        z.stage.append(z.paddleOne);
    },

    createPaddleTwo: function () {
        const z = this
        // create paddle
        z.paddleTwo = $("<div></div>")
        // assigning styles to the paddle
        z.paddleTwo.css(z.config.paddleStyle)
        // add paddle to stage
        z.resetPaddlePosition()
        z.refreshPaddleTwoPositionOnScreen()
        z.paddleTwo.width(z.config.paddleTwoDimensions.width)
        z.paddleTwo.height(z.config.paddleTwoDimensions.height)
        z.stage.append(z.paddleTwo);
        console.log('help')
    },

    createScore: function () {
        const z = this
        //create score
        z.scoreOne = $("<div></div>")
        z.scoreTwo = $("<div></div>")
        //assign styles to the score one
        z.scoreOne.css(z.config.scoreStyle)
        z.scoreTwo.css(z.config.scoreStyle)
        //add to the game
        z.gamediv.append(z.scoreOne)
        z.gamediv.append(z.scoreTwo)
        //fill in initial scores
        z.scoreOne.html(z.score[0])
        z.scoreTwo.html(z.score[1])
    },

    createRoundCounter: function () {
        const z = this
        //creating the round counter
        z.roundCounter = $("<div></div>")
        //assign styles to the round counter
        z.roundCounter.css(z.config.nextRoundCounterStyle)
        //add to the stage
        z.stage.append(z.roundCounter)
        //Put it where its supposed to go, we did this on styles in the config
    },
    startCountdown: function (callMeWhenCountdownIsCompleted) {
        const z = this
        let startnumber = 3
        z.countdownHappening = true
        clearTimeout(z.coundownTimeout)
        z.roundCounter.html(startnumber)
        z.roundCounter.show()
        //wait one second 
        z.coundownTimeout = setTimeout(function () {
            //choose the number
            z.roundCounter.html("2")
            //wait one second
            z.coundownTimeout = setTimeout(function () {
                //choose the number
                z.roundCounter.html("1")
                z.coundownTimeout = setTimeout(function () {
                    //choose the number
                    console.log("countdown is complete")
                    z.countdownHappening = false
                    callMeWhenCountdownIsCompleted()
                }, z.config.countdownspeed)
            }, z.config.countdownspeed)
        }, z.config.countdownspeed)
    },

    setupSounds: function () {
        const z = this
        z.mysoundfile = new Audio("./Ponghit.wav")
    },

    pongSound: function () {
        const z = this
        z.mysoundfile.play()
    },

    startAnimation: function () {
        // This calls next ball move repeadeatly, in this case its better to use than setTimeout
        const z = this
        z.stopAnimation()
        z.ballInterval = setInterval(function () {
            z.nextBallMove()
            z.nextPaddleMove()

        }, z.config.intervalSpeed)
    },

    nextPaddleMove: function () {
        const z = this
        z.calculateNextPaddleOnePosition()
        z.refreshPaddleOnePositionOnScreen()
        z.calculateNextPaddleTwoPosition()
        z.refreshPaddleTwoPositionOnScreen()
    },

    stopAnimation: function () {
        const z = this

        clearInterval(z.ballInterval)
    },

    restartRound: function () {
        const z = this
        //reset the ball position
        z.resetBallPosition()
        z.resetPaddlePosition()
        z.pauseButton.show()
        z.playButton.hide()
        //dont start animation until countdown is complete
        z.stopAnimation()
        z.startCountdown(function () {
            z.startAnimation()
            z.roundCounter.hide()
            console.log("I called my callback")
        })
        //
    },

    resetBallPosition: function () {
        const z = this
        z.ballPos.x = (z.config.stageDimensions.width - z.config.ballDimensions.width) / 2
        z.ballPos.y = (z.config.stageDimensions.height - z.config.ballDimensions.height) / 2
        //to do: pick a random angle
        //angle=pickRandomNumber
        /*ballXspeed = speed *cos(angle)
          ballYspeed = speed *sin(angle)
        */
        //we are narrowing down the random between the angles that we need in the left side
        let angle = Math.random() * (Math.PI / 2) + (3 * Math.PI / 4)
        console.log(angle)
        // Flip it on a 50% chance it will go the other way
        if (Math.random() < .5) {
            angle -= Math.PI
            console.log("reverse",)
        }
        // Option 1: is if angle is bad reroll Option 2: Make your randomizer always pick a good spot
        z.ballSpeed.x = z.config.ballSpeed * Math.cos(angle)
        z.ballSpeed.y = z.config.ballSpeed * Math.sin(angle)
        console.log(z.ballPos.x, z.ballPos.y, "ball is here")
    },

    resetPaddlePosition: function () {
        const z = this
        z.paddleOnePosition.x = z.config.paddleOnePosition.x
        z.paddleOnePosition.y = (z.config.stageDimensions.height - z.config.paddleOneDimensions.height) / 2
        z.paddleTwoPosition.x = z.config.paddleTwoPosition.x
        z.paddleTwoPosition.y = (z.config.stageDimensions.height - z.config.paddleTwoDimensions.height) / 2
    },

    nextBallMove: function () {
        const z = this
        // Move the ball one increment
        z.calculateNextBallPosition()
        z.refreshBallPositionOnScreen()

    },

    calculateNextBallPosition: function () {
        const z = this
        z.ballPos.x += z.ballSpeed.x // += add to myself
        z.ballPos.y += z.ballSpeed.y
        //check if ball is about to hit the right wall
        if (z.ballPos.x > z.config.stageDimensions.width - z.config.ballDimensions.width) {
            //reverse x direction
            //z.ballSpeed.x *= -1 // *= Multyplying myself
            //when it hits the right wall 1:score incrases 
            z.score[0] += 1
            z.scoreOne.html(z.score[0])
            //2: stop the ball from moving
            z.stopAnimation()
            // 3: immediately start the round
            z.restartRound()
        }
        //check if ball is about to hit the left wall  
        if (z.ballPos.x < 0) {
            //reverse x direction
            //z.ballSpeed.x *= -1 // *= Multyplying myself
            //when it hits the right wall 1:score incrases 
            z.score[1] += 1
            z.scoreTwo.html(z.score[1])
            //2: stop the ball from moving
            z.stopAnimation()
            // 3: immediately start the round
            z.restartRound()
        }
        // check if ball is about to hit the bottom 
        if (z.ballPos.y > z.config.stageDimensions.height - z.config.ballDimensions.height) {
            //reverse y direction
            z.ballSpeed.y *= -1 // *= Multyplying myself


        }
        if (z.ballPos.y < 0) {
            //reverse y direction
            z.ballSpeed.y *= -1 // *= Multyplying myself
        }
        //cond 1: if ball goes to the right of paddle two, cond 2: if ball is below the top of the paddle cond 3: ball is above the bottom of the paddle
        if (z.ballPos.x > z.paddleTwoPosition.x - z.config.ballDimensions.width && z.ballPos.y > z.paddleTwoPosition.y && z.ballPos.y < z.paddleTwoPosition.y + z.config.paddleTwoDimensions.height) {
            //if ball goes all the way past the paddle in the x direction then make it stop bouncing 
            if (!(z.ballPos.x > z.paddleTwoPosition.x + z.config.paddleTwoDimensions.width)) {
                z.ballBouncesOffPaddle()
                console.log()
            }
        }
        //cond 1: if ball goes to the left of paddle one, cond 2: if ball is below the top of the paddle cond 3: ball is above the bottom of the paddle
        if (z.ballPos.x < z.paddleOnePosition.x + z.config.paddleOneDimensions.width && z.ballPos.y > z.paddleOnePosition.y && z.ballPos.y < z.paddleOnePosition.y + z.config.paddleOneDimensions.height) {
            if (!(z.ballPos.x < z.config.paddleOnePosition.x - z.config.ballDimensions.width)) {
                z.ballBouncesOffPaddle()
            }
        }
        //console.log(z.ballPos.y > z.paddleTwoPosition.y, z.ballPos.y < z.paddleTwoPosition.y, z.ballPos.y,  z.paddleTwoPosition.y)
        //console.log(z.ballPos.x > z.paddleTwoPosition.x - z.config.ballDimensions.width, z.ballPos.x, z.paddleTwoPosition.x, z.config.ballDimensions.width )

    },
    ballBouncesOffPaddle() {
        const z = this
        z.ballSpeed.x *= -1
        z.ballGoesFaster()
        z.pongSound()
    },

    ballGoesFaster: function () {
        const z = this
        // ball speed x = bigger ball speed x
        z.ballSpeed.x *= z.config.ballSpeedIncreaseonHit.x
        z.ballSpeed.y *= z.config.ballSpeedIncreaseonHit.y
    },


    refreshBallPositionOnScreen: function () {
        const z = this
        z.ball.css({
            left: z.ballPos.x + "px",
            top: z.ballPos.y + "px"
        })
    },


    calculateNextPaddleOnePosition: function (direction) {
        const z = this
        const nextPosition = z.paddleOnePosition.y + z.paddleOneSpeed.y
        //top of paddle hits top wall
        const paddleHitsTopWall = nextPosition < 0
        const paddleHitsBottomWall = nextPosition > z.config.stageDimensions.height - z.config.paddleOneDimensions.height
        if (paddleHitsTopWall || paddleHitsBottomWall) {
            //do nothing
            return
        }
        z.paddleOnePosition.y = nextPosition
    },

    refreshPaddleOnePositionOnScreen: function () {
        const z = this
        z.paddleOne.css({
            top: z.paddleOnePosition.y + "px",
            left: z.paddleOnePosition.x + "px"
        })
    },

    calculateNextPaddleTwoPosition: function () {
        const z = this
        const nextPosition = z.paddleTwoPosition.y + z.paddleTwoSpeed.y
        //top of paddle hits top wall
        const paddleHitsTopWall = nextPosition < 0
        const paddleHitsBottomWall = nextPosition > z.config.stageDimensions.height - z.config.paddleTwoDimensions.height
        if (paddleHitsTopWall || paddleHitsBottomWall) {
            //do nothing
            return
        }
        z.paddleTwoPosition.y = nextPosition
    },

    refreshPaddleTwoPositionOnScreen: function () {
        const z = this
        z.paddleTwo.css({
            top: z.paddleTwoPosition.y + "px",
            left: z.paddleTwoPosition.x + "px"
        })
    },

    paddleControls: function () {
        console.log("paddle Controls Not Working")
        const z = this
        // Setup paddle one controls

        // If key up or down is pressed
        $(window).keydown(function (event) {
            //s=83 w=87 (on keyboard)

            //if you press W key (up)
            if (event.which == 87) {
                // Set velocity to UP
                z.paddleOneSpeed.y = -1 * z.config.paddleOnePressingSpeed.y
                z.keysPressed.W = true

            }
            //If you press S key (down)
            if (event.which == 83) {
                // Set velocity to DOWN
                z.paddleOneSpeed.y = z.config.paddleOnePressingSpeed.y
                z.keysPressed.S = true
            }

            //If you press UP key
            if (event.which == 38) {
                // Set velocity to UP
                z.paddleTwoSpeed.y = -1 * z.config.paddleTwoPressingSpeed.y
                event.preventDefault()
                z.keysPressed.UP = true
            }
            //If you press DOWN key
            if (event.which == 40) {
                // Set velocity to DOWN
                z.paddleTwoSpeed.y = z.config.paddleTwoPressingSpeed.y
                event.preventDefault()
                z.keysPressed.DOWN = true
            }


        })

        // If either up or down key is let go
        $(window).keyup(function (event) {
            // Set Y movement to 0
            /*
            if (event.which == 87 || event.which == 83) {
                z.paddleOneSpeed.y = 0
            }
            if (event.which == 38 || event.which == 40) {
                z.paddleTwoSpeed.y = 0
            }
            */
            if (event.which == 87 && !z.keysPressed.S) {
                z.paddleOneSpeed.y = 0
            }
            if (event.which == 83 && !z.keysPressed.W) {
                z.paddleOneSpeed.y = 0
            }

            if (event.which == 87) {
                z.keysPressed.W = false
            }
            if (event.which == 83) {
                z.keysPressed.S = false
            }

            if (event.which == 38 && !z.keysPressed.DOWN) {
                z.paddleTwoSpeed.y = 0
            }
            if (event.which == 40 && !z.keysPressed.UP) {
                z.paddleTwoSpeed.y = 0
            }

            if (event.which == 38) {
                z.keysPressed.UP = false
            }
            if (event.which == 40) {
                z.keysPressed.DOWN = false
            }
        })
    }

}


// Training stuff - can delete later
function addnumbers(number1, number2) {
    const result = number1 * number2;
    return result


}

myNumber = 10
console.log("Calling numbers", addnumbers(5, 12))
console.log("multiplying by the number 2", myNumber * 2)
console.log("multiplying by the string 2", myNumber * "abc")
console.log("multiplying by null", myNumber * null)
console.log("multiplying by an object", myNumber * { x: 2 })

//for(startingNumber; if case "the condition" (if it returns true keep going, if it returns false STOP; what to do at the end of each loop)
for (let I = 0; I < 10; I += 1) {
    console.log("hi", Math.random() * Math.PI / 2 + Math.PI / 2)
}
