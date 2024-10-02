class MyContainer extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children) {
    super(scene, x, y, children);
  }
}

class Entity {
  sprites = {};
  body;
  bodyRadius = 10;
  colliders = {};

  move = {
    x: 0,
    speed: 7,
    velocityX: 0,
  };
  jumpForce = -18;
  gravityScale = {
    x: 1,
    y: 3.5,
  };

  constructor() {
    console.log("Entity");
  }
  move() {}
}

class Example extends Phaser.Scene {
  moveX = 0;
  moveSpeed = 7;
  moveVelocityX = 0;

  jumpForce = -18;
  playerGravityScale = {
    x: 1,
    y: 3.5,
  };

  bodyRadius = 10;

  player;

  keyA;
  keyD;
  keySpace;

  boxA;
  ground;

  container;

  PlayerContainer;

  preload() {
    // this.load.spritesheet("player", "test.png", {
    //   frameWidth: 220,
    //   frameHeight: 300,
    // });
    // this.load.spritesheet("playerRun", "test2.png", {
    //   frameWidth: 254.5,
    //   frameHeight: 275,
    // });

    this.load.atlas("player", "sprite/player.png", "sprite/player.json");
  }

  create() {
    // const Player = new Entity();
    // Player.sprites.idle = this.add.sprite(0, 0, "player", 0);
    // Player.sprites.idle.anims.create({
    //   key: "idle",
    //   frames: Player.sprites.idle.anims.generateFrameNumbers("player", {
    //     start: 0,
    //     end: 1,
    //   }),
    //   frameRate: 2,
    //   repeat: -1,
    // });

    //プレイヤーのスプライト生成
    let playerSprite = this.add.sprite(0, 0, "player", 0).setScale(0.4, 0.4);
    // let playerRunSprite = this.add
    //   .sprite(0, 0, "playerRun", 0)
    //   .setScale(0.4, 0.4);

    //コンテナを作成
    this.container = this.add.container(0, 0, playerSprite);

    // this.container.add(playerRunSprite);

    //テキストを作成
    var text = this.add.text(0, 0, "0");
    text.setColor("#fff");
    text.setOrigin(0.5);
    text.setFontSize(50);
    //コンテナに追加
    this.container.add(text);

    //物理オブジェクトの生成
    let box = this.matter.bodies.rectangle(
      0,
      0,
      this.container.list[0].width * 0.75,
      this.container.list[0].height,
      {
        chamfer: { radius: this.bodyRadius },
        friction: 0,
      }
    );
    box.setScale(0.4);

    //コンテナに物理オブジェクトをつける
    this.PlayerContainer = this.matter.add.gameObject(this.container, box);

    //コンテナのポジションを設定
    this.PlayerContainer.setPosition(300, 100);
    console.log(this.PlayerContainer);

    // const empty = this.matter.add.image(300, 0);

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
    // this.PlayerContainer.list[1].anims.create({
    //   key: "run",
    //   frames: this.PlayerContainer.list[0].anims.generateFrameNumbers(
    //     "playerRun",
    //     { start: 0, end: 3 }
    //   ),
    //   frameRate: 12,
    //   repeat: -1,
    // });

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
    // this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // const keyDown = (e) => {
    //     const inputKey = e.code;
    //     if (inputKey == "Space") {
    //         this.player.setVelocityY(this.jumpForce);
    //     }
    // }

    // this.input.keyboard.on('keydown', keyDown);
  }

  update() {
    if (this.keyA.isDown) {
      console.log("a");
      this.PlayerContainer.list[0].anims.play("run", true);
      // this.PlayerContainer.list[0].visible = false;
      // this.PlayerContainer.list[1].visible = true;
      // this.PlayerContainer.list[1].anims.play("run", true);
    } else if (this.keyD.isDown) {
      console.log("d");
      this.PlayerContainer.list[0].anims.play("run", true);
      // this.PlayerContainer.list[0].visible = false;
      // this.PlayerContainer.list[1].visible = true;
      // this.PlayerContainer.list[1].anims.play("run", true);
    } else {
      // this.PlayerContainer.list[1].visible = false;
      // this.PlayerContainer.list[0].visible = true;
      this.PlayerContainer.list[0].anims.play("idle", true);
    }
    // this.moveVelocityX = this.moveX * this.moveSpeed;
    // this.player.setVelocityX(this.moveVelocityX);
    // //input
    // if (this.keyA.isDown) {
    //     this.moveX = -1;
    // } else if (this.keyD.isDown) {
    //     this.moveX = 1;
    // } else {
    //     this.moveX = 0;
    // }

    // if (this.moveX == -1) {
    //     this.player.flipX = true;
    // } else if (this.moveX == 1) {
    //     this.player.flipX = false;
    // }

    // if (this.moveX === 0) {
    //     this.player.anims.play('idle', true);
    // }
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
