const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let rocket = {
  x: canvas.width / 2 - 15, // Center horizontally
  y: canvas.height - 60,    // Bottom of canvas
  width: 30,
  height: 60,
  color: "red",
  speed: 3                  // Speed at which the rocket moves up
};

let countdown = 10;
let countdownInterval;
let animationFrameId;
let isLaunching = false;

function startCountdown() {
  countdown = 10;
  document.getElementById("countdownDisplay").innerText = `Countdown: ${countdown}`;
  isLaunching = false;

  countdownInterval = setInterval(() => {
    countdown--;
    document.getElementById("countdownDisplay").innerText = `Countdown: ${countdown}`;

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      isLaunching = true; // Start launch sequence
      animate(); // Begin the rocket animation
    }
  }, 1000);
}

function drawRocket() {
  ctx.fillStyle = rocket.color;
  ctx.fillRect(rocket.x, rocket.y, rocket.width, rocket.height);

  // Adding flames when the rocket is launching
  if (isLaunching) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(rocket.x, rocket.y + rocket.height);
    ctx.lineTo(rocket.x + rocket.width / 2, rocket.y + rocket.height + 20);
    ctx.lineTo(rocket.x + rocket.width, rocket.y + rocket.height);
    ctx.fill();
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  clearCanvas();
  drawRocket();

  // If launching, move the rocket up
  if (isLaunching) {
    rocket.y -= rocket.speed;

    // Stop animation when the rocket exits the top of the canvas
    if (rocket.y + rocket.height < 0) {
      cancelAnimationFrame(animationFrameId);
      isLaunching = false;
      return;
    }
  }

  animationFrameId = requestAnimationFrame(animate);
}
