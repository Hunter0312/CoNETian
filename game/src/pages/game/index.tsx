// components/FlappyBirdGame.tsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { Img } from "@/utilitiy/images";

type Props = {
  restart: boolean;
  setRestart: (e: boolean) => void;
  setScore: (number: number) => void;
};

const FlappyBirdGame: React.FC<Props> = ({ restart, setRestart, setScore }) => {
  const gameContainer = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<any>(null);
  let score = 0;

  useLayoutEffect(() => {
    if (game) {
      game.destroy(true);
    }

    if (!game) {
      console.log(123);
      startGame();
      return;
    }

    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, [game]);

  function preload(this: any) {
    this.load.image("bird", Img.NormalLowFireImg);
    this.load.image("asteroid1", Img.AsteriodImg1);
    this.load.image("asteroid2", Img.AsteriodImg2);
    this.load.image("asteroid3", Img.AsteriodImg3);
    this.load.image("asteroid4", Img.AsteriodImg4);
    this.load.image("asteroid5", Img.AsteriodImg5);
    this.load.image("asteroid6", Img.AsteriodImg6);
    this.load.image("background", Img.BackImg);
  }

  function create(this: any) {
    this.background = this.add.tileSprite(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
      "background"
    );
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    // Create bird
    this.bird = this.physics.add
      .sprite(50, window.innerHeight / 2, "bird")
      .setOrigin(0, 0)
      .setOffset(10, 10)
      .setScale(0.5);
    this.bird.setCollideWorldBounds(true);
    this.bird.setGravityY(0);

    this.bird.body.setCircle(50);

    window.addEventListener("mousedown", () => {
      if (!this.gameOver) {
        this.bird.setVelocityY(-300);
      }
    });

    window.addEventListener("keydown", event => {
      if (event.code === 'Space') {
        if (!this.gameOver) {
          this.bird.setVelocityY(-300);
        }
      }
    });

    const pauseBtn = document.getElementById("game-pause");
    const resumeBtn = document.getElementById("game-resume");

    pauseBtn?.addEventListener("click", () => {
      this.bird.setVelocityY(300);
      this.scene.pause();
    });

    resumeBtn?.addEventListener("click", () => {
      setTimeout(() => {
        this.bird.setVelocityY(300);
        this.scene.resume();
      }, 3000);
    });

    this.asteroids = this.physics.add.group();

    this.time.addEvent({
      delay: 0,
      callback: () => {
        this.time.addEvent({
          delay: 1000,
          callback: createAsteroid,
          callbackScope: this,
          loop: true,
        });
      },
      callbackScope: this,
    });

    this.physics.add.collider(this.bird, this.asteroids, () => {
      if (!this.gameOver) {
        handleGameOver.call(this);
      }
    });

    this.gameOver = false;
  }

  function createAsteroid(this: any) {
    const x = 430;
    const y = Phaser.Math.Between(0, window.innerHeight - 50);

    // generate random number between 1 and 6
    const asteroidNumber = Math.floor(Math.random() * 6) + 1;

    const asteroid = this.asteroids.create(
      x,
      y,
      `asteroid${asteroidNumber}`
    );
    if (asteroid) {
      asteroid.setActive(true).setVisible(true);
      asteroid.setGravityY(-300);
      asteroid.setVelocityX(-200);
      asteroid.setRotation(Phaser.Math.FloatBetween(0, 2 * Math.PI));
      asteroid.setAngularVelocity(-400);
      asteroid.setCircle(200);
      asteroid.setScale(0.2);
    }
  }

  function handleGameOver(this: any) {
    this.gameOver = true;

    this.asteroids.setVelocityX(0);

    this.asteroids.children.each(
      (asteroid: Phaser.Physics.Arcade.Sprite) => {
        asteroid.setAngularVelocity(0);
        asteroid.setRotation(0);
      }
    );

    this.bird.setVelocityY(0);
    this.bird.destroy();

    this.asteroids.children.each(
      (asteroid: Phaser.Physics.Arcade.Sprite) => {
        asteroid.destroy();
      }
    );
    score = 0;
    game?.destroy(true);
    setRestart(true);
  }

  function update(this: any) {
    if (!this.gameOver) {
      this.background.tilePositionX += 2;

      this.asteroids.children.each(
        (asteroid: any) => {
          if (!asteroid.temp) {
            if (asteroid.x < this.bird.x) {
              setScore(++score);
              asteroid.temp = true;
            }
          }
          if (asteroid.x < -asteroid.width) {
            asteroid.destroy();
          }
        }
      );
    }
  }

  const startGame = () => {
    if (gameContainer.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 430,
        height: window.innerHeight,
        parent: gameContainer.current,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 300, x: 0 },
            debug: false,
          },
        },
        scene: {
          preload,
          create,
          update,
        },
      };

      const newgame = new Phaser.Game(config);
      setGame(newgame);

      return () => {
        game.destroy(true);
      };
    }
  };

  return (
    <div ref={gameContainer} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default FlappyBirdGame;
