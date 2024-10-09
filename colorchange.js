class Example extends Phaser.Scene {

    preload() {

        this.load.image("body", "images/body2.png");
        this.load.image("eye1", "images/eye1.png");
        this.load.image("eye2", "images/eye2.png");
        this.load.image("eye3", "images/eye3.png");
        this.load.image("mouth", "images/mouth.png");
        this.load.image("cheek", "images/cheek.png");
        this.load.image("bottom", "images/bottom.png");
        this.load.image("foot", "images/foot.png");
        this.load.image("top", "images/top.png");
        this.load.image("hair", "images/hairtest.png");
        this.load.image("eyebrows", "images/eyebrows.png");
        this.load.image("ribon", "images/ribon.png");
    }

    create() {
        const hsv = Phaser.Display.Color.HSVColorWheel();

        const body = this.add.image(200, 200, "body").setScale(0.1);
        const hair = this.add.image(200, 200, "hair").setScale(0.1);

        hair.setTint(0xF394C8);
        body.setTint(0xfff0e2);
        // image.setTint(0x00FFFF);
        // image.setTint(0x00ff00);
        // image.setTint(0x0000ff);

        this.input.on('pointerdown', function (pointer) {

            const i = Phaser.Math.Between(0, 359);

            image.setTint(hsv[i].color);

        });
    }

    update() {

    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example,
    backgroundColor: '#4488aa',
    physics: {
        default: "matter",
        matter: {
            enableSleeping: false,
            gravity: { y: 1 },
            debug: true,
        },
    },
};

const game = new Phaser.Game(config);

console.log(game);
