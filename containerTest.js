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

  ground;
  wall;

  container;

  PlayerContainer;

  isJumping;
  isGround;
  jumpCount = 0;

  isAttack = false;

  mainCamera;

  preload() {
    this.load.atlas("player", "sprite/test.png", "sprite/test.json");
  }

  create() {

    //MatteJSのワールドを生成
    this.matter.world.setBounds(0, 0, 800, 600);

    //カメラ
    this.mainCamera = this.cameras.main;

    //プレイヤーのスプライト生成
    let playerSprite = this.add.sprite(0, 0, "player", 'Idle_0').setOrigin(0.5, 1);

    //コンテナを作成、プレイヤーのスプライトを設定
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
    let body = this.matter.bodies.rectangle(
      0,
      -300,
      this.container.list[0].width * 0.3,
      this.container.list[0].height,
      {
        chamfer: { radius: this.bodyRadius },
      }
    );

    //当たり判定の生成
    let jumpR = this.matter.bodies.rectangle(-10, -300 + 148, 1, 30, {
      isSensor: true,
      angle: 46,
      label: "jumpR"
    })
    let jumpL = this.matter.bodies.rectangle(13, -300 + 148, 1, 30, {
      isSensor: true,
      angle: -46,
      label: "jumpL"
    })

    let attackSensorBody = this.matter.bodies.circle(200, -300, 40, {
      isSensor: true,
    });

    let attackSensorBodyEmpty = this.matter.bodies.circle(-200, 0, 40, {
      isSensor: true,
    });

    //当たり判定、物理オブジェクトをまとめる
    const compoundBody = Phaser.Physics.Matter.Matter.Body.create({
      parts: [body, attackSensorBody, attackSensorBodyEmpty, jumpR, jumpL],
      gravityScale: this.playerGravityScale,
      friction: 0,
    });

    console.log(compoundBody);

    //コンテナに物理オブジェクトをつける
    this.PlayerContainer = this.matter.add.gameObject(
      this.container,
      compoundBody
    );
    //コンテナの設定
    this.PlayerContainer.setPosition(300, 100);
    this.PlayerContainer.setScale(0.4);
    this.PlayerContainer.setFixedRotation();
    console.log(this.PlayerContainer);

    //カメラの設定
    this.mainCamera.startFollow(this.PlayerContainer, true);

    //プレイヤーのアニメーションを生成
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
    this.PlayerContainer.list[0].anims.create({
      key: "attack",
      frames: this.PlayerContainer.list[0].anims.generateFrameNames("player", {
        prefix: "attack_",
        end: 2,
      }),
      frameRate: 15,
      repeat: 0,
    });

    //アニメーションの設定
    this.PlayerContainer.list[0].on('animationcomplete', (e) => {
      this.isAttack = false;
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

    //地面の物理オブジェクトを生成
    this.ground = this.matter.bodies.rectangle(400, 610, 810, 60, {
      isStatic: true,
    });

    this.wall = this.matter.bodies.rectangle(50, 480, 100, 500, {
      isStatic: true,
    });

    //Matterのワールドに追加
    this.matter.world.add([this.ground, this.wall]);

    //ユーザー入力
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.input.on('pointerdown', (pointer) => {
      if (pointer.leftButtonDown() && !this.isAttack) {
        this.isAttack = true;
        this.PlayerContainer.list[0].anims.play("attack");
      }
    });

    const keyDown = (e) => {
      const inputKey = e.code;
      if (inputKey == "Space") {
        if (this.isGround) {
          this.jumpCount = 0;
        }
        if (this.jumpCount > 1) {
          return;
        } else {
          this.jumpCount++;
        }

        this.PlayerContainer.setVelocityY(this.jumpForce);
        this.PlayerContainer.list[0].anims.play("jump", true);
      }

      if (inputKey == "ShiftLeft") {
        this.moveSpeed = 10;
      }
    };

    const keyup = (e) => {
      const inputKey = e.code;
      if (inputKey == "ShiftLeft") {
        this.moveSpeed = 7;
      }
    }

    this.input.keyboard.on("keydown", keyDown);
    this.input.keyboard.on("keyup", keyup);

    //collusion
    // this.matter.world.on("collisionactive", (event, jumpS, groundC) => {
    //   this.isGround = true;
    //   console.log(event);
    //   // if((bodyA.label == "plane" && bodyB.label == "obstacle") || (bodyB.label == "plane" && bodyA.label == "obstacle")) {
    //   //     if(plane.anims.getCurrentKey() != "explode") {
    //   //         plane.play("explode");
    //   //         plane.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
    //   //             plane.destroy();
    //   //         });
    //   //     }
    //   // }
    // });
  }

  update() {

    console.log(this.PlayerContainer.body.parts[3]);
    if (this.matter.collision.collides(this.PlayerContainer.body.parts[3], this.ground) != null || this.matter.collision.collides(this.PlayerContainer.body.parts[4], this.ground)) {
      this.isGround = true;
    } else {
      this.isGround = false;
    }

    this.moveVelocityX = this.moveX * this.moveSpeed;
    this.PlayerContainer.setVelocityX(this.moveVelocityX);


    if (this.keyA.isDown) {
      if (this.isAttack) {
        this.moveX = -0.5;
        return;
      };
      this.moveX = -1;
      this.PlayerContainer.scaleX = -0.4;
      if (!this.isGround) return;
      this.PlayerContainer.list[0].anims.play("run", true);
      // this.PlayerContainer.list[0].visible = false;
      // this.PlayerContainer.list[1].visible = true;
    } else if (this.keyD.isDown) {
      if (this.isAttack) {
        this.moveX = 0.5;
        return;
      };
      this.moveX = 1;
      this.PlayerContainer.scaleX = 0.4;
      if (!this.isGround) return;
      this.PlayerContainer.list[0].anims.play("run", true);
    } else {

      if (this.isAttack) {
        return;
      };
      this.moveX = 0;
      if (!this.isGround) return;
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
