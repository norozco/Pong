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
