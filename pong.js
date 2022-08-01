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
            border : "4px solid white"
        },
        gameStyle : {
            background : "black",
            padding : "100px",
            height : "100vh"
    
        }
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
    
        z.gamediv.css(z.config.gameStyle)
        z.stage.css(z.config.stageStyle)
    }




}


function addnumbers(number1,number2){
    const result=number1 * number2;
    return result


}

console.log('Hi its me')
console.log(addnumbers (6,25))









$(Pong.setupGame)
