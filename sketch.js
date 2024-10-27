let gapWidth = 50;
let letters = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
}

function draw() {
    background(255);
    for (let i = letters.length - 1; i >= 0; i--) {
        let letter = letters[i];
        letter.update();
        letter.display();
        if (letter.isOffScreen()) {
            letters.splice(i, 1);
        }
    }
}

function touchMoved() {
    let touchX = touches[0].x;
    let touchY = touches[0].y;
    let pressure = touches[0].pressure || 0.5; // Fallback si la pression n'est pas supportée
    
    gapWidth = map(pressure, 0, 1, 20, 150); // Ajuste l'écart en fonction de la pression du doigt
    
    // Génère des lettres de chaque côté du chemin du doigt
    generateLetters(touchX - gapWidth / 2, touchY, pressure);
    generateLetters(touchX + gapWidth / 2, touchY, pressure);
    
    return false; // Empêche le comportement par défaut
}

function generateLetters(x, y, pressure) {
    let density = 8; // Plus de lettres pour une densité accrue
    for (let i = 0; i < density; i++) {
        let randomChar = String.fromCharCode(int(random(65, 90))); // Lettre aléatoire (A-Z)
        let baseSpeed = map(pressure, 0, 1, 0.2, 5); // Plus de variations de vitesse
        let speed;
        
        // Certaines lettres auront une vitesse très lente pour créer une traînée
        if (random(1) < 0.3) {
            speed = random(0.1, 0.5); // Lettres lentes pour créer une traînée
        } else {
            speed = baseSpeed;
        }

        let directionX = random(-0.8, 0.8); // Plus de diversité dans les mouvements
        let directionY = random(-0.8, 0.8);
        letters.push(new Letter(randomChar, x, y, directionX, directionY, speed));
    }
}

class Letter {
    constructor(letter, x, y, dirX, dirY, speed) {
        this.letter = letter;
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.speed = speed;
        this.opacity = 255;
    }

    update() {
        this.x += this.dirX * this.speed;
        this.y += this.dirY * this.speed;
        this.opacity -= 1; // S'estompe lentement pour un effet de traînée visible
    }

    display() {
        fill(0, this.opacity);
        textSize(12);
        text(this.letter, this.x, this.y);
    }

    isOffScreen() {
        return (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.opacity <= 0);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
