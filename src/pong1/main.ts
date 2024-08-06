const canvas = document.getElementById('myCanvas') as HTMLCanvasElement; // as Foo means treat as type Foo.
const c = canvas.getContext("2d")!; // ! means assert that expression exists.

type Ball = {
  x: number;
  y: number;
  radius: number;
  velocityX: number;
  velocityY: number;
  fillStyle: string;
};

type Paddle = {
  x: number;
  y: number;
  height: number;
  width: number;
  velocityX: number;
  velocityY: number;
  fillStyle: string;
};

let ballArray: Ball[] = [
  {
    x: 200,
    y: 200,
    radius: 50,
    velocityX: 10,
    velocityY: 10,
    fillStyle: "red"
  }
];

let paddleArray: Paddle[] = [
  {
    x: canvas.clientWidth * 1/20 - 50,
    y: canvas.clientHeight / 2,
    height: 150,
    width: 50,
    velocityX: 6,
    velocityY: 6,
    fillStyle: "blue"
  },
  {
    x: canvas.clientWidth * 19/20,
    y: canvas.clientHeight / 2,
    height: 150,
    width: 50,
    velocityX: 6,
    velocityY: 6,
    fillStyle: "purple"
  }
]


const keyState: { [key: string]: boolean } = {};
document.body.addEventListener("keydown", (event: KeyboardEvent) => {
  keyState[event.key] = true;
});

document.body.addEventListener("keyup", (event: KeyboardEvent) => {
  keyState[event.key] = false;
});


function updateBall(ball: Ball) {
  //Balls to the walls collision detection
  ball.x += ball.velocityX;
  if (ball.x > canvas.clientWidth - ball.radius) { ball.velocityX = -ball.velocityX };
  if (ball.x < 0 + ball.radius) { ball.velocityX = -ball.velocityX };
  ball.y += ball.velocityY;
  if (ball.y > canvas.clientHeight - ball.radius) { ball.velocityY = -ball.velocityY };
  if (ball.y < 0 + ball.radius) { ball.velocityY = -ball.velocityY };

}
//Paddle on Ball Detection  
function detectPaddleCollision(paddle: Paddle, ball: Ball) {
  return !(
    paddle.x + paddle.width < ball.x - ball.radius ||
    paddle.x > ball.x + ball.radius ||
    paddle.y + paddle.height + ball.radius < ball.y ||
    paddle.y > ball.y + ball.radius
);
}

function handleCollision(paddle: Paddle, ball: Ball) {
  if (detectPaddleCollision(paddle, ball)) {
    // Determine collision side
    const paddleCenterX = paddle.x + paddle.width / 2;
    const paddleCenterY = paddle.y + paddle.height / 2;

    const dx = ball.x - paddleCenterX;
    const dy = ball.y - paddleCenterY;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Collision on the sides of the paddle
      if (dx > 0) {
        ball.x = paddle.x + paddle.width + ball.radius;
      } else {
        ball.x = paddle.x - ball.radius;
      }
      ball.velocityX = -ball.velocityX; // Reverse X velocity
    } else {
      // Collision on the top or bottom of the paddle
      if (dy > 0) {
        ball.y = paddle.y + paddle.height + ball.radius;
      } else {
        ball.y = paddle.y - ball.radius;
      }
      ball.velocityY = -ball.velocityY; // Reverse Y velocity
    }
  }
}


function updatePaddle() {

  if (keyState["w"] && paddleArray[0].y > 0) {
    paddleArray[0].y -= paddleArray[0].velocityY;
  }
  if (keyState["s"] && paddleArray[0].y < canvas.clientHeight - paddleArray[0].height) {
    paddleArray[0].y += paddleArray[0].velocityY;
  }
  if (keyState["a"] && paddleArray[0].x > 0) {
    paddleArray[0].x -= paddleArray[0].velocityX;
  }
  if (keyState["d"] && paddleArray[0].x < canvas.clientWidth - paddleArray[0].width) {
    paddleArray[0].x += paddleArray[0].velocityX;
  }

  if (keyState["i"] && paddleArray[1].y > 0) {
    paddleArray[1].y -= paddleArray[1].velocityY;
  }
  if (keyState["k"] && paddleArray[1].y < canvas.clientHeight - paddleArray[0].height) {
    paddleArray[1].y += paddleArray[1].velocityY;
  }
  if (keyState["j"] && paddleArray[1].x > 0) {
    paddleArray[1].x -= paddleArray[1].velocityX;
  }
  if (keyState["l"] && paddleArray[1].x < canvas.clientWidth - paddleArray[0].width) {
    paddleArray[1].x += paddleArray[1].velocityX;
  }
}


document.body.addEventListener("keyup", (event: KeyboardEvent) => {
  keyState[event.key] = false;
});

function winCondition() {
  if (ballArray[0].x < ballArray[0].radius) 
    {
      ballArray[0].x = canvas.clientWidth * 1/8
      ballArray[0].y = canvas.clientHeight / 2  
      player2score ++;
    }
  if (ballArray[0].x > canvas.clientWidth - ballArray[0].radius) 
    {
      ballArray[0].x = canvas.clientWidth * 7/8
      ballArray[0].y = canvas.clientHeight / 2  
      player1score ++;
     }
}

function drawPaddle(paddle: Paddle) {
  c.fillStyle = paddle.fillStyle
  c.strokeStyle = paddle.fillStyle
  c.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
};

function drawBall(ball: Ball) {
  // Set line width
  c.lineWidth = 4;
  c.strokeStyle = ball.fillStyle;
  c.beginPath();
  c.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
  c.stroke();
}
let player1score: number = 0
let player2score: number = 0



function draw() {
  c.fillStyle = "beige"
  c.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight,);

  c.fillStyle = "black"
  c.font = "30px Arial"
  c.fillText(`Player 1 Score: ${player1score.toString()}`, 300, 50);
  c.fillText(`Player 2 Score: ${player2score.toString()}`, 1100, 50);

winCondition();

  for (let ball of ballArray) {
    drawBall(ball);
    updateBall(ball);
  }
  updatePaddle();
  for (let paddle of paddleArray) {
    drawPaddle(paddle);
    for (let ball of ballArray) {
      handleCollision(paddle, ball);
    }
  }
  requestAnimationFrame(draw);
}

draw()