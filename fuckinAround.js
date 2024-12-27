const canvas = document.getElementById("bubblesCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbles = [];
const bubbleCount = 50;

// Bubble class
class Bubble {
    constructor() {
        // Start at a random position on the right side of the screen
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        // Random horizontal speed to move left
        this.vx = -(Math.random() * .05 + .1); // Always negative (moving left)

        // Random size
        this.radius = Math.random() * 1 + .5; // Radius between 5 and 35

        // Color is transparent; we will only draw an outline
        this.color = "white";
    }

    update() {
        // Move left
        this.x += this.vx;

        // Reset position when the bubble exits the screen on the left
        if (this.x + this.radius < 0) {
            this.x = canvas.width + this.radius; // Move to the far right
            this.y = Math.random() * canvas.height; // Randomize vertical position
            this.vx = -(Math.random() * .5 + .1); // Reset random speed
            this.radius = Math.random() * 1 + .5; // Reset random size
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }
}

// Create bubbles
for (let i = 0; i < bubbleCount; i++) {
    bubbles.push(new Bubble());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((bubble) => {
        bubble.update();
        bubble.draw();
    });

    requestAnimationFrame(animate);
}

// Resize canvas when window is resized
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reset bubbles to keep them distributed across the screen
    bubbles.forEach((bubble) => {
        bubble.x = Math.random() * canvas.width;
        bubble.y = Math.random() * canvas.height;
    });
});

// Start animation
animate();
