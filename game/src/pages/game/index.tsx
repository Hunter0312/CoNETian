import { useEffect, useRef, useState } from "react";
import { Img } from "@/utilitiy/images";
import { Tap, BackgroundAudio, ConetianDeath } from "../../shared/assets";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { fetchTicketResult } from "@/API/getData";
import { playAudio } from "@/shared/functions";
import { useAudioPlayer } from "react-use-audio-player";

type Props = {
  restart: boolean;
  setRestart: (e: boolean) => void;
  setScore: (number: number) => void;
};

const MIN_ASTEROID_SIZE = 0.1;
const MAX_ASTEROID_SIZE = 0.3;

const FlappyBirdGame: React.FC<Props> = ({ restart, setRestart, setScore }) => {
  const gameContainer = useRef<HTMLDivElement>(null);
  const { profile, difficulty, audio } = useGameContext();
  const [game, setGame] = useState<any>(null);
  const backAudioRef = useRef<HTMLAudioElement | null>(null);
  const eventListeners = useRef<(() => void)[]>([]);
  let score = 0;

  const { load } = useAudioPlayer();
  const gameDifficulty = difficulty === "easy" ? 1 : difficulty === "normal" ? 2 : 3;

  // Audio player effect
  useEffect(() => {
    if (audio) playAudio(backAudioRef);
  }, [audio]);

  // Clean up Phaser instance and event listeners on unmount or game restart
  useEffect(() => {
    return () => {
      if (game) {
        game.destroy(true);
        setGame(null);
        removeEventListeners();
      }
    };
  }, [game]);

  useEffect(() => {
    let PhaserInstance: any;

    const loadPhaser = async () => {
      const Phaser = await import("phaser");
      PhaserInstance = Phaser;

      if (!game) {
        startGame(PhaserInstance);
      }
    };

    loadPhaser();
  }, [game]);

  // Removes all event listeners
  const removeEventListeners = () => {
    eventListeners.current.forEach((removeListener) => removeListener());
    eventListeners.current = [];
  };

  // Make bird jump function
  function makeConetianJump(thisContext: any) {
    if (audio) {
      load(Tap, { autoplay: true });
    }

    if (!thisContext.gameOver) {
      thisContext.bird.setVelocityY(-200);
    }
  }

  // Preload assets
  function preload(this: any) {
    this.load.image("bird1", Img.NormalLowFireImg);
    this.load.image("bird2", Img.NormalMediumFireImg);
    this.load.image("bird3", Img.NormalHighFireImg);
    this.load.image("asteroid1", Img.AsteriodImg1);
    this.load.image("asteroid2", Img.AsteriodImg2);
    this.load.image("asteroid3", Img.AsteriodImg3);
    this.load.image("asteroid4", Img.AsteriodImg4);
    this.load.image("asteroid5", Img.AsteriodImg5);
    this.load.image("asteroid6", Img.AsteriodImg6);
    this.load.image("background", Img.BackImg);
  }

  // Create the game scene
  function create(this: any) {
    const thisContext = this;
    this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "background");
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    // Create bird
    this.bird = this.physics.add.sprite(50, window.innerHeight / 2, "bird1").setOrigin(0, 0).setOffset(10, 10).setScale(0.5);
    this.bird.setCollideWorldBounds(true);
    this.bird.setGravityY(0);
    this.bird.body.setCircle(50);
    this.birdTextures = ["bird1", "bird2", "bird3"];
    this.currentTextureIndex = 0;

    // Switch bird texture every 100ms
    this.time.addEvent({
      delay: 100,
      callback: switchBirdTexture,
      callbackScope: this,
      loop: true,
    });

    // Add input event listeners
    const handleMouseDown = () => makeConetianJump(thisContext);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") makeConetianJump(thisContext);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleKeyDown);

    // Store listeners for cleanup
    eventListeners.current.push(() => window.removeEventListener("mousedown", handleMouseDown));
    eventListeners.current.push(() => window.removeEventListener("keydown", handleKeyDown));

    // Pause and resume functionality
    document.getElementById("game-pause")?.addEventListener("click", () => {
      this.bird.setVelocityY(300);
      this.scene.pause();
    });

    document.getElementById("game-resume")?.addEventListener("click", () => {
      setTimeout(() => {
        this.bird.setVelocityY(300);
        this.scene.resume();
      }, 3000);
    });

    // Create asteroids group
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

    // Bird-asteroid collision handling
    this.physics.add.collider(this.bird, this.asteroids, () => {
      if (!this.gameOver) {
        handleGameOver.call(this);
      }
    });

    this.gameOver = false;
  }

  // Switch bird texture function
  function switchBirdTexture(this: any) {
    if (!this.bird || !this.bird.active) return;
    this.currentTextureIndex = (this.currentTextureIndex + 1) % this.birdTextures.length;
    this.bird.setTexture(this.birdTextures[this.currentTextureIndex]);
  }

  // Create asteroids function
  function createAsteroid(this: any) {
    const x = 470;
    const y = gameDifficulty === 1 ? Phaser.Math.Between(0, window.innerHeight - 50) : Phaser.Math.Between(this.bird.y - 300, this.bird.y + 300);

    const asteroidNumber = Math.floor(Math.random() * 6) + 1;
    const asteroid = this.asteroids.create(x, y, `asteroid${asteroidNumber}`);

    //generate random number between 0.1 and 0.3
    const asteroidSize = Math.random() * (MAX_ASTEROID_SIZE - MIN_ASTEROID_SIZE) + MIN_ASTEROID_SIZE;

    if (asteroid) {
      asteroid.setActive(true).setVisible(true);
      asteroid.setGravityY(-300);
      asteroid.setVelocityX(gameDifficulty === 3 ? -400 : -200);
      asteroid.setRotation(Phaser.Math.FloatBetween(0, 2 * Math.PI));
      asteroid.setAngularVelocity(-400);
      asteroid.setCircle(200);
      asteroid.setScale(asteroidSize);
    }
  }

  // Handle game over
  function handleGameOver(this: any) {
    this.gameOver = true;

    if (audio) {
      load(ConetianDeath, { autoplay: true });
    }

    this.time.removeAllEvents();
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

    if (game) {
      game.destroy(true);
      setGame(null);
    }

    setRestart(true);
    removeEventListeners();
  }

  // Game update function
  function update(this: any) {
    if (!this.gameOver) {
      this.background.tilePositionX += gameDifficulty === 3 ? 5 : 2;

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

  // Start the game
  const startGame = (PhaserInstance: any) => {
    if (gameContainer.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.CANVAS,
        render: {
          antialias: false,
        },
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

      const newGame = new PhaserInstance.Game(config);
      setGame(newGame);
    }
  };

  return (
    <div className="h-[100vh] w-[430px] mx-auto">
      <div ref={gameContainer} />
      <audio ref={backAudioRef} src={BackgroundAudio} loop />
    </div>
  );
};

export default FlappyBirdGame;
