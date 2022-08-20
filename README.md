# Pong!

Author: Nasser
## notes





### Simplify the ball position into 2 if's instead of 4
```
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
```
### What to look at if it lags
1. Play with the intervalSPeed
2. Clear out unecessary console logs
3. Optimize the calculate ball position

### TO DO 
1. Change angle based on where the ball hits 
1. Make game fit browsers 
1. Make smaller images for the start screen
1. Add sound and music
1. Fix bug where ball goes straight through paddle when speed is too high
1. Clean up the start countdown
1. Deploy to internet
    1. Audio might need adjustments
1. Make this multiplayer (jesus take the wheel) 