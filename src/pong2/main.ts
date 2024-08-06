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

function updateBall(ball: Ball) {
  //Balls to the walls collision detection
  ball.x += ball.velocityX;
  if (ball.x > canvas.clientWidth - ball.radius) { ball.velocityX = -ball.velocityX };
  if (ball.x < 0 + ball.radius) { ball.velocityX = -ball.velocityX };
  ball.y += ball.velocityY;
  if (ball.y > canvas.clientHeight - ball.radius) { ball.velocityY = -ball.velocityY };
  if (ball.y < 0 + ball.radius) { ball.velocityY = -ball.velocityY };

  //corner detection
  if (ball.x - ball.radius > canvas.clientWidth - ball.radius && ball.y > canvas.clientHeight - ball.radius) {
    ballArray.push({
      x: canvas.clientWidth / 2,
      y:  canvas.clientHeight / 2,
      radius: Math.random() * 30 + 60,
      velocityX: Math.random() * 15 + 5,
      velocityY: Math.random() * 15 + 5,
      fillStyle: "blue"
    })
  }
  if (ball.x < 0 + ball.radius && ball.y < 0 + ball.radius) {
    ballArray.push({
      x: canvas.clientWidth / 2,
      y:  canvas.clientHeight / 2,
      radius: Math.random() * 25 + 40,
      velocityX: Math.random() * 20 + 5,
      velocityY: Math.random() * 20 + 5,
      fillStyle: "blue"
    })
  }
}

let ballArray: Ball[] = [
  {
  x: 200,
  y: 200,
  radius:50,
  velocityX: 18,
  velocityY: 18,
  fillStyle: "red"
  }
];

function drawBall(ball: Ball) {
  // Set line width
  c.lineWidth = 4;
  c.strokeStyle = ball.fillStyle;
  c.beginPath();
  c.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
  c.stroke();
}

function draw() {
  c.fillStyle = "orange"
  c.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight,);

  for (let ball of ballArray) {
    drawBall(ball);
    updateBall(ball);
  }


  requestAnimationFrame(draw);
}
draw()