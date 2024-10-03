class Example extends Phaser.Scene {
  moveX = 0;
  moveSpeed = 7;
  moveVelocityX = 0;

  jumpForce = -18;
  playerGravityScale = {
    x: 1,
    y: 3.5,
  };

  bodyRadius = 30;

  player;

  keyA;
  keyD;
  keySpace;

  boxA;
  ground;

  container;

  PlayerContainer;

  preload() {
    this.load.atlas("player", "sprite/test.png", "sprite/test.json");
  }

  create() {
    //プレイヤーのスプライト生成
    let playerSprite = this.add.sprite(0, 0, "player", 0);

    //コンテナを作成
    this.container = this.add.container(0, 0, playerSprite);

    // this.container.add(playerRunSprite);

    //テキストを作成
    // var text = this.add.text(0, 0, "0");
    // text.setColor("#fff");
    // text.setOrigin(0.5);
    // text.setFontSize(50);
    //コンテナに追加
    // this.container.add(text);

    //物理オブジェクトの生成
    let box = this.matter.bodies.rectangle(
      0,
      0,
      this.container.list[0].width * 0.3,
      this.container.list[0].height,
      {
        chamfer: { radius: this.bodyRadius },
        gravityScale: this.playerGravityScale,
        friction: 0,
      }
    );

    let attackSensorBody = this.matter.bodies.circle(200, 40, 40, {
      isSensor: true,
    });

    const compoundBody = Phaser.Physics.Matter.Matter.Body.create({
      parts: [box, attackSensorBody],
      gravityScale: this.playerGravityScale,
    });

    //コンテナに物理オブジェクトをつける
    this.PlayerContainer = this.matter.add.gameObject(
      this.container,
      compoundBody
    );

    //コンテナのポジションを設定
    this.PlayerContainer.setPosition(300, 100);
    this.PlayerContainer.setScale(0.4);
    this.PlayerContainer.setFixedRotation();
    console.log(this.PlayerContainer);

    //MatterWorld
    this.matter.world.setBounds(0, 0, 800, 600);

    //create player anims
    this.PlayerContainer.list[0].anims.create({
      key: "idle",
      frames: this.PlayerContainer.list[0].anims.generateFrameNames("player", {
        prefix: "Idle_",
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.PlayerContainer.list[0].anims.create({
      key: "run",
      frames: this.PlayerContainer.list[0].anims.generateFrameNames("player", {
        prefix: "run_",
        end: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.PlayerContainer.list[0].anims.create({
      key: "jump",
      frames: this.PlayerContainer.list[0].anims.generateFrameNames("player", {
        prefix: "jump_",
        end: 1,
      }),
      frameRate: 15,
      repeat: 0,
    });

    // this.PlayerContainer.list[1].visible = false;

    //create sprite , add to world
    //console.log(this.matter);
    // this.player = this.matter.add.sprite(0, 0, 'player', 0);

    //collider body
    // this.boxA = this.matter.bodies.rectangle(0, 0, 100, 100, {
    //     chamfer: { radius: this.bodyRadius },
    //     friction: 0,
    // });

    //empty.setExistingBody(this.boxA);
    // this.boxA = this.matter.bodies.rectangle(0, 0, this.player.width * 0.75, this.player.height, {
    //     chamfer: { radius: this.bodyRadius },
    //     gravityScale: this.playerGravityScale,
    //     friction: 0,
    // });

    //this.container.add(empty);

    //this.matter.body.setMass(this.boxA, 60);

    //setBodyToSprite
    // this.player.setExistingBody(this.boxA).setFixedRotation();

    // this.player.scaleX = 0.4;
    // this.player.scaleY = 0.4;

    // console.log(this.player);

    //create player anims
    // this.anims.create({
    //     key: 'idle',
    //     frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
    //     frameRate: 2,
    //     repeat: -1
    // });

    //add world
    this.ground = this.matter.bodies.rectangle(400, 610, 810, 60, {
      isStatic: true,
    });
    this.matter.world.add(this.ground);

    //input
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    const keyDown = (e) => {
      const inputKey = e.code;
      if (inputKey == "Space") {
        this.PlayerContainer.setVelocityY(this.jumpForce);
        this.PlayerContainer.list[0].anims.play("jump", true);
      }
    };

    this.input.keyboard.on("keydown", keyDown);
  }

  update() {
    this.moveVelocityX = this.moveX * this.moveSpeed;
    this.PlayerContainer.setVelocityX(this.moveVelocityX);
    if (this.keyA.isDown) {
      this.moveX = -1;
      this.PlayerContainer.scaleX = -0.4;
      this.PlayerContainer.list[0].anims.play("run", true);
      // this.PlayerContainer.list[0].visible = false;
      // this.PlayerContainer.list[1].visible = true;
    } else if (this.keyD.isDown) {
      this.moveX = 1;
      this.PlayerContainer.scaleX = 0.4;
      this.PlayerContainer.list[0].anims.play("run", true);
    } else {
      this.moveX = 0;
      this.PlayerContainer.list[0].anims.play("idle", true);
    }
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
