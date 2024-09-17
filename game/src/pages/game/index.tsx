import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Img } from "@/utilitiy/images";
import { Tap, BackgroundAudio, ConetianDeath } from '../../shared/assets';
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { fetchTicketResult } from "@/API/getData";
import { playAudio } from "@/shared/functions";
import { useAudioPlayer } from "react-use-audio-player";

type Props = {
  restart: boolean;
  setRestart: (e: boolean) => void;
  setScore: (number: number) => void;
};

const FlappyBirdGame: React.FC<Props> = ({ restart, setRestart, setScore }) => {
  const gameContainer = useRef<HTMLDivElement>(null);
  const { profile, difficulty, audio } = useGameContext();
  const [game, setGame] = useState<any>(null);
  const backAudioRef = useRef<HTMLAudioElement | null>(null);
  const eventListeners = useRef<(() => void)[]>([]); // Store event removal callbacks
  let score = 0;

  const { load } = useAudioPlayer();

  const gameDifficulty = difficulty === "easy" ? 1 : difficulty === "normal" ? 2 : 3;

  useEffect(() => {
    if (audio) playAudio(backAudioRef);
  }, [audio]);

  useLayoutEffect(() => {
    let PhaserInstance: any;

    const loadPhaser = async () => {
      const Phaser = await import("phaser");
      PhaserInstance = Phaser;

      if (!game) {
        startGame(PhaserInstance);
        return;
      }

      return () => {
        if (game) {
          game.destroy(true);
          // Remove event listeners when game is destroyed
          removeEventListeners();
        }
      };
    };

    loadPhaser();
  }, [game]);

  // Remove all event listeners
  const removeEventListeners = () => {
    eventListeners.current.forEach((removeListener) => removeListener());
    eventListeners.current = [];
  };

  function makeConetianJump(thisContext: any) {
    if (audio) {
      load(Tap, {
        autoplay: true,
      });
    }

    if (!thisContext.gameOver) {
      thisContext.bird.setVelocityY(-200);
    }
  }

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
    const thisContext = this;

    this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "background");
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

    // Handle mouse down and key press events
    const handleMouseDown = () => makeConetianJump(thisContext);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        makeConetianJump(thisContext);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleKeyDown);

    // Store the removal of these event listeners in eventListeners
    eventListeners.current.push(() => window.removeEventListener("mousedown", handleMouseDown));
    eventListeners.current.push(() => window.removeEventListener("keydown", handleKeyDown));

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
          delay: gameDifficulty === 1 ? 1000 : 700,
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
    const y = gameDifficulty === 1 ? Phaser.Math.Between(0, window.innerHeight - 50) : Phaser.Math.Between(this.bird.y - 300, this.bird.y + 300);

    const asteroidNumber = Math.floor(Math.random() * 6) + 1;

    const asteroid = this.asteroids.create(x, y, `asteroid${asteroidNumber}`);
    if (asteroid) {
      asteroid.setActive(true).setVisible(true);
      asteroid.setGravityY(-300);
      gameDifficulty === 3 ? asteroid.setVelocityX(-400) : asteroid.setVelocityX(-200);
      asteroid.setRotation(Phaser.Math.FloatBetween(0, 2 * Math.PI));
      asteroid.setAngularVelocity(-400);
      asteroid.setCircle(200);
      asteroid.setScale(0.2);
    }
  }

  function handleGameOver(this: any) {
    this.gameOver = true;

    if (audio) {
      load(ConetianDeath, {
        autoplay: true,
      });
    }

    this.asteroids.setVelocityX(0);

    this.asteroids.children.each((asteroid: Phaser.Physics.Arcade.Sprite) => {
      asteroid.setAngularVelocity(0);
      asteroid.setRotation(0);
    });

    this.bird.setVelocityY(0);
    this.bird.destroy();

    this.asteroids.children.each((asteroid: Phaser.Physics.Arcade.Sprite) => {
      asteroid.destroy();
    });
    score = 0;
    game?.destroy(true);
    setRestart(true);

    // Remove event listeners when game is over
    removeEventListeners();
  }

  function update(this: any) {
    if (!this.gameOver) {
      this.background.tilePositionX = gameDifficulty === 3 ? this.background.tilePositionX + 5 : this.background.tilePositionX + 2;

      if (this.bird.y >= window.innerHeight - 70 || this.bird.y <= 0) {
        handleGameOver.call(this);
      }

      this.asteroids.children.each((asteroid: any) => {
        if (!asteroid.temp) {
          if (asteroid.x < this.bird.x) {
            setScore(++score);

            if (score % 5 === 0 && score >= 1 && profile?.keyID) {
              fetchTicketResult(profile?.keyID);
            }

            asteroid.temp = true;
          }
        }
        if (asteroid.x < -asteroid.width) {
          asteroid.destroy();
        }
      });
    }
  }

  const startGame = (PhaserInstance: any) => {
    if (gameContainer.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.CANVAS,
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
        removeEventListeners();
      };
    }
  };

  return (
    <div ref={gameContainer} style={{ width: "100%", height: "100%" }}>
      {audio && <audio src={BackgroundAudio} ref={backAudioRef} loop />}
    </div>
  );
};

export default FlappyBirdGame;
