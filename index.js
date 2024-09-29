class Example extends Phaser.Scene {

    moveX = 0;
    moveSpeed = 7;
    moveVelocityX = 0;

    jumpForce = -18;
    playerGravityScale = {
        x: 1,
        y: 3.5
    }

    bodyRadius = 60;

    player;

    keyA;
    keyD;
    keySpace;

    boxA;
    ground;


    preload() {
        this.load.spritesheet('player', 'test.png', { frameWidth: 220, frameHeight: 300 });
    }

    create() {

        //MatterWorld
        this.matter.world.setBounds(0, 0, 800, 600);

        //create sprite , add to world
        this.player = this.matter.add.sprite(0, 0, 'player', 0);

        //collider body
        this.boxA = this.matter.bodies.rectangle(this.player.width / 2, this.player.height / 2, this.player.width * 0.75, this.player.height, {
            chamfer: { radius: this.bodyRadius },
            gravityScale: this.playerGravityScale,
            friction: 0,
        });

        //this.matter.body.setMass(this.boxA, 60);

        this.ground = this.matter.bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        //setBodyToSprite
        this.player.setExistingBody(this.boxA).setFixedRotation();

        this.player.scaleX = 0.4;
        this.player.scaleY = 0.4;

        console.log(this.player);

        //create player anims
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        //add world
        this.matter.world.add(this.ground);

        //input
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        const keyDown = (e) => {
            const inputKey = e.code;
            if (inputKey == "Space") {
                this.player.setVelocityY(this.jumpForce);
            }
        }

        this.input.keyboard.on('keydown', keyDown);
    }

    update() {
        this.moveVelocityX = this.moveX * this.moveSpeed;
        this.player.setVelocityX(this.moveVelocityX);
        //input
        if (this.keyA.isDown) {
            this.moveX = -1;
        } else if (this.keyD.isDown) {
            this.moveX = 1;
        } else {
            this.moveX = 0;
        }

        if (this.moveX == -1) {
            this.player.flipX = true;
        } else if (this.moveX == 1) {
            this.player.flipX = false;
        }

        if (this.moveX === 0) {
            this.player.anims.play('idle', true);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example,
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: false,
            gravity: { y: 1 },
            debug: true
        }
    }
};

const game = new Phaser.Game(config);

console.log(game);