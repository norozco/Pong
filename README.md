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
1. Setup rounds with names and a button to start it
2. Consolidate end of round logic
3. Fix the bouncing on the outside of the paddles and the stage (maybe)
4. Change angle based on where the ball hits 
5. Make game fit browsers 
6. Make this multiplayer (jesus take the wheel)