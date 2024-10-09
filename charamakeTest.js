class Example extends Phaser.Scene {

    preload() {

        this.load.image("body", "images/body.png");
        this.load.image("eye1", "images/eye1.png");
        this.load.image("eye2", "images/eye2.png");
        this.load.image("eye3", "images/eye3.png");
        this.load.image("mouth", "images/mouth.png");
        this.load.image("cheek", "images/cheek.png");
        this.load.image("bottom", "images/bottom.png");
        this.load.image("foot", "images/foot.png");
        this.load.image("top", "images/top.png");
        this.load.image("hair", "images/hair.png");
        this.load.image("eyebrows", "images/eyebrows.png");
        this.load.image("ribon", "images/ribon.png");
    }

    create() {
        const body = this.add.image(200, 200, "body").setScale(0.1);
        const eye1 = this.add.image(200, 200, "eye1").setScale(0.1);
        const eye2 = this.add.image(200, 200, "eye2").setScale(0);
        const eye3 = this.add.image(200, 200, "eye3").setScale(0);
        const mouth = this.add.image(200, 200, "mouth").setScale(0.1);
        const cheek = this.add.image(200, 200, "cheek").setScale(0.1);
        const bottom = this.add.image(200, 200, "bottom").setScale(0.1);
        const foot = this.add.image(200, 200, "foot").setScale(0.1);
        const top = this.add.image(200, 200, "top").setScale(0.1);
        const hair = this.add.image(200, 200, "hair").setScale(0.1);
        const eyebrows = this.add.image(200, 200, "eyebrows").setScale(0.1);
        const ribon = this.add.image(200, 200, "ribon").setScale(0.1);

        const eyes = [eye1, eye2, eye3];

        const fxEye = eye1.preFX.addColorMatrix();
        const fxHair = hair.preFX.addColorMatrix();
        const fxTop = top.preFX.addColorMatrix();
        const fxBottom = bottom.preFX.addColorMatrix();

        // fxEye.saturate(-0.5);
        // fxHair.saturate(-0.5);

        const tween = this.tweens.addCounter({
            from: 0,
            to: 360,
            duration: 3000,
            loop: -1,
            onUpdate: () => {
                fxEye.hue(tween.getValue());
                fxHair.hue(tween.getValue());
                fxTop.hue(tween.getValue());
                fxBottom.hue(tween.getValue());
            }
        });

        //ui

        //select要素を取得する
        const selectFoodName = document.getElementById('food-name');

        //option要素にvalueと表示名を設定
        eyes.map((_, i) => {
            const option = document.createElement('option');
            option.value = "eye" + (i + 1);
            option.textContent = "eye" + (i + 1);
            selectFoodName.appendChild(option);
        });

        selectFoodName.addEventListener("change", (e) => {
            console.log(e.target.value);
            eyes.map((_, i) => {
                if ("eye" + (i + 1) === e.target.value) {
                    eyes[i].setScale(0.1);
                } else {
                    eyes[i].setScale(0);
                }
            });
            console.log(eyeSkin[e.target.value]);
        })


        const button = document.querySelector(".button");
        button.addEventListener("click", () => {

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
