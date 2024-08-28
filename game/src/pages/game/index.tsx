import React, { useRef, useEffect, useState } from 'react';
import { levels } from '../../shared/gameParams';
// import { Tap, BackgroundAudio, ConetianDeath } from '../../shared/assets';
import { playAudio, stopAudio } from '../../shared/functions';
import { useAudioPlayer } from 'react-use-audio-player';

import { useConetianHighFire, useConetianMediumFire } from '../../hooks/useConetianHooks';
import { groundImage, backgroundImage, asteroid1, asteroid2, asteroid3, asteroid4, asteroid5, asteroid6, } from '../../shared/assets';
import { useGameContext } from '../../utilitiy/providers/GameProvider';

type Props = {
  setGameStatus: (e: number) => void,
  gameStatus: number,
  setScores: (score: number) => void,
  setRoulette: (event: boolean) => void,
}

const Game: React.FC<Props> = ({ setGameStatus, gameStatus, setScores, setRoulette }) => {

  const { load } = useAudioPlayer();

  const { setGames, games, audio, gameDifficulty, profile } = useGameContext();

  let gameSpeed = gameDifficulty === 2 || gameDifficulty === 1 ? levels.speedLevel1 : levels.speedLevel3;
  let gameFrame = gameDifficulty === 2 || gameDifficulty === 1 ? levels.frameLevel1 : levels.frameLevel3;

  const conetianHighFireImage = useConetianHighFire();
  const conetianMediumFireImage = useConetianMediumFire();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState<number>(0);
  const backAudioRef = useRef<HTMLAudioElement | null>(null);

  let gravity = 0.6;
  let conetian = { x: 30, y: 70, width: 50, height: 50, dy: 0 };
  let asteroids: { shape: { x: number, y: number }[], x: number, y: number, width: number, height: number, passed: boolean }[] = [];
  let ground = { x1: 0, x2: window.innerWidth, y: window.innerHeight - 100, width: window.innerWidth, height: 100, speed: gameSpeed };
  let background = { x1: 0, x2: 0, y: 0, width: 0, height: 0, speed: gameSpeed };
  let frame = 0;
  let flyConetian = 0;
  let flagScore = 0;

  useEffect(() => {
    if (audio)
      playAudio(backAudioRef);
  }, [audio]);

  useEffect(() => {
    if (gameStatus === 1) {
      stopAudio(backAudioRef);
    }

    if (gameStatus === 2) {
      gameSpeed = 0;
      gravity = 0;
      conetian = games.conetian;
      asteroids = games.asteroids;
      ground = games.ground;
      frame = games.frame;
      conetian.dy = 0;
      flagScore = games.score;
    }

    if (gameStatus === 3) {
      playAudio(backAudioRef);
      gameSpeed = games.gameSpeed;
      gravity = 0.6;
      conetian = games.conetian;
      asteroids = games.asteroids;
      ground = games.ground;
      frame = games.frame;
      flagScore = games.score;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const conetianImage = new Image();
    conetianImage.src = conetianHighFireImage.src;

    const asteroid1Image = new Image();
    asteroid1Image.src = asteroid1.src;

    const asteroid2Image = new Image();
    asteroid2Image.src = asteroid2.src;

    const asteroid3Image = new Image();
    asteroid3Image.src = asteroid3.src;

    const asteroid4Image = new Image();
    asteroid4Image.src = asteroid4.src;

    const asteroid5Image = new Image();
    asteroid5Image.src = asteroid5.src;

    const asteroid6Image = new Image();
    asteroid6Image.src = asteroid6.src;

    const backgroundImageObj = new Image();
    backgroundImageObj.src = backgroundImage.src;

    const groundImageObj = new Image();
    groundImageObj.src = groundImage.src;

    const conetianMediumFireImg = new Image();
    conetianMediumFireImg.src = conetianMediumFireImage.src;

    backgroundImageObj.onload = () => {
      background.width = backgroundImageObj.width;
      background.height = canvas.height;
      background.x2 = background.width;
    };

    const conetianCanvas = document.createElement('canvas');
    conetianCanvas.width = conetian.width;
    conetianCanvas.height = conetian.height;
    const conetianContext = conetianCanvas.getContext('2d')!;
    conetianImage.onload = () => {
      conetianContext.drawImage(conetianImage, 0, 0, conetian.width, conetian.height);
    };

    const isPointInPolygon = (x: number, y: number, vertices: { x: number, y: number }[]) => {
      let inside = false;
      for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x, yi = vertices[i].y;
        const xj = vertices[j].x, yj = vertices[j].y;

        const intersect = ((yi > y) !== (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };

    const addAsteroid = () => {
      const asteroidWidth = 110; // Increased by 50 pixels
      const asteroidHeight = Math.random() * (canvas.height - 400) + 100; // Increased by 50 pixels
      const numSides = Math.floor(Math.random() * 5) + 3; // Random number of sides
      const radius = asteroidWidth / 2;
      const angleIncrement = (Math.PI * 2) / numSides;
      const centerX = asteroidWidth / 2;
      const centerY = asteroidHeight / 2;

      const shape: { x: number, y: number }[] = [];
      for (let i = 0; i < numSides; i++) {
        const angle = i * angleIncrement;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        shape.push({ x, y });
      }

      asteroids.push({
        shape,
        x: canvas.width,
        y: 0,
        width: asteroidWidth,
        height: asteroidHeight,
        passed: false,
      });
    };

    const drawBackground = () => {
      context.drawImage(backgroundImageObj, background.x1, 0, backgroundImageObj.width, canvas.height);
      context.drawImage(backgroundImageObj, background.x2, 0, backgroundImageObj.width, canvas.height);
    };

    const moveBackground = () => {
      background.x1 -= background.speed;
      background.x2 -= background.speed;

      // Adjust the position if background.x1 moves off-screen
      if (background.x1 <= -backgroundImageObj.width) {
        background.x1 = background.x2 + backgroundImageObj.width;
      }

      // Adjust the position if background.x2 moves off-screen
      if (background.x2 <= -backgroundImageObj.width) {
        background.x2 = background.x1 + backgroundImageObj.width;
      }

      // Make sure there's no initial gap by aligning the second image correctly
      if (background.x1 >= 0 && background.x2 >= backgroundImageObj.width) {
        background.x2 = background.x1 + backgroundImageObj.width;
      }
      if (background.x2 >= 0 && background.x1 >= backgroundImageObj.width) {
        background.x1 = background.x2 + backgroundImageObj.width;
      }
    };

    // Initializing background positions
    let background = {
      x1: 0,
      x2: backgroundImageObj.width,
      y: 0,
      width: backgroundImageObj.width,
      height: canvas.height,
      speed: gameSpeed
    };


    const drawConetian = () => {
      const centerX = conetian.x + conetian.width / 2;
      const centerY = conetian.y + conetian.height / 2;
      const radius = conetian.width / 2;

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.closePath();
      context.clip();

      if (flyConetian % 2 === 0)
        context.drawImage(conetianImage, conetian.x, conetian.y, conetian.width, conetian.height);
      else
        context.drawImage(conetianMediumFireImg, conetian.x, conetian.y, conetian.width, conetian.height);
      context.restore();
    };

    const drawAsteroids = () => {
      asteroids.forEach(asteroid => {
        context.save();

        // Set the fill color for the polygon
        context.fillStyle = "gray";

        // Draw the stored polygon shape
        context.beginPath();
        asteroid.shape.forEach((vertex, index) => {
          const x = asteroid.x + vertex.x;
          const y = asteroid.y + vertex.y;
          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        context.closePath();
        context.fill();

        context.restore();
      });
    };

    const extractAsteroidShape = (context: CanvasRenderingContext2D, width: number, height: number) => {
      const imageData = context.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      const shape: boolean[][] = [];

      for (let y = 0; y < height; y++) {
        shape[y] = [];
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const alpha = pixels[index + 3]; // Alpha channel

          // Non-transparent pixel
          shape[y][x] = alpha > 0;
        }
      }
      return shape;
    };

    const checkPixelCollision = (
      conetianContext: CanvasRenderingContext2D,
      asteroid: { x: number, y: number, width: number, height: number }
    ) => {
      const conetianImageData = conetianContext.getImageData(0, 0, conetian.width, conetian.height);
      const conetianPixels = conetianImageData.data;

      for (let y = 0; y < conetian.height; y++) {
        for (let x = 0; x < conetian.width; x++) {
          const conetianPixelIndex = (y * conetian.width + x) * 4;
          const conetianAlpha = conetianPixels[conetianPixelIndex + 3];

          if (conetianAlpha > 0) {
            const conetianPixelX = conetian.x + x;
            const conetianPixelY = conetian.y + y;

            if (
              conetianPixelX >= asteroid.x &&
              conetianPixelX <= asteroid.x + asteroid.width &&
              conetianPixelY >= asteroid.y &&
              conetianPixelY <= asteroid.y + asteroid.height
            ) {
              const asteroidImageData = context.getImageData(
                asteroid.x,
                asteroid.y,
                asteroid.width,
                asteroid.height
              );
              const asteroidPixels = asteroidImageData.data;

              const asteroidPixelX = conetianPixelX - asteroid.x;
              const asteroidPixelY = conetianPixelY - asteroid.y;
              const asteroidPixelIndex = (asteroidPixelY * asteroid.width + asteroidPixelX) * 4;
              const asteroidAlpha = asteroidPixels[asteroidPixelIndex + 3];

              if (asteroidAlpha > 0) {
                return true;
              }
            }
          }
        }
      }
      return false;
    };

    const checkBoundingBoxCollision = (
      conetian: { x: number, y: number, width: number, height: number },
      asteroid: { x: number, y: number, width: number, height: number }
    ) => {
      return (
        conetian.x < asteroid.x + asteroid.width &&
        conetian.x + conetian.width > asteroid.x &&
        conetian.y < asteroid.y + asteroid.height &&
        conetian.y + conetian.height > asteroid.y
      );
    };

    const checkPixelCollisionWithShape = (
      conetianContext: CanvasRenderingContext2D,
      conetian: { x: number, y: number, width: number, height: number },
      asteroid: { x: number, y: number, shape: { x: number, y: number }[] }
    ) => {
      const conetianImageData = conetianContext.getImageData(0, 0, conetian.width, conetian.height);
      const conetianPixels = conetianImageData.data;

      for (let y = 0; y < conetian.height; y++) {
        for (let x = 0; x < conetian.width; x++) {
          const conetianPixelIndex = (y * conetian.width + x) * 4;
          const conetianAlpha = conetianPixels[conetianPixelIndex + 3];

          if (conetianAlpha > 0) {
            const conetianPixelX = conetian.x + x;
            const conetianPixelY = conetian.y + y;

            // Check if the pixel position is inside the asteroid's polygon
            const localX = conetianPixelX - asteroid.x;
            const localY = conetianPixelY - asteroid.y;
            if (isPointInPolygon(localX, localY, asteroid.shape)) {
              return true;
            }
          }
        }
      }
      return false;
    };

    const checkEllipseCollision = (
      conetian: { x: number, y: number, width: number, height: number },
      asteroid: { x: number, y: number, width: number, height: number }
    ) => {
      const conetianCenterX = conetian.x + conetian.width / 2;
      const conetianCenterY = conetian.y + conetian.height / 2;
      const asteroidCenterX = asteroid.x + asteroid.width / 2;
      const asteroidCenterY = asteroid.y + asteroid.height / 2;

      const dx = conetianCenterX - asteroidCenterX;
      const dy = conetianCenterY - asteroidCenterY;

      const radiiSumX = conetian.width / 2 + asteroid.width / 2;
      const radiiSumY = conetian.height / 2 + asteroid.height / 2;

      return (
        (dx * dx) / (radiiSumX * radiiSumX) +
        (dy * dy) / (radiiSumY * radiiSumY) <= 1
      );
    };

    const checkCollision = () => {
      for (const asteroid of asteroids) {
        if (checkPixelCollisionWithShape(conetianContext, conetian, asteroid)) {
          setGameStatus(1);
          setGames({
            conetian,
            asteroids,
            ground,
            frame,
            gameSpeed,
            score: flagScore,
          });
          return;
        }
      }
    };

    const animate = () => {
      if (gameStatus === 1) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      drawBackground();

      conetian.dy += gravity;
      conetian.y += conetian.dy;
      if (conetian.y + conetian.height > window.innerHeight || conetian.y < 0) {
        if (audio)
          // load(ConetianDeath, {
          //   autoplay: true,
          // })
          setGameStatus(1);

        return;
      }

      asteroids.forEach(asteroid => {
        asteroid.x -= gameSpeed;

        if (!asteroid.passed && asteroid.x + asteroid.width < conetian.x) {
          flagScore++;
          if (flagScore === 10 && gameDifficulty === 2) {
            gameSpeed = levels.speedLevel2;
            gameFrame = levels.frameLevel2;
          }

          if (flagScore === 30 && gameDifficulty === 2) {
            gameSpeed = levels.speedLevel3;
            gameFrame = levels.frameLevel3;
          }

          setScore(score => score + 1);

          if (flagScore % 5 === 0 && flagScore >= 1 && profile?.keyID) {
            if (Math.random() > 0.5) {
              setRoulette(true);
              setGameStatus(2);
              setRoulette(false)
            }
          }

          asteroid.passed = true;
        }
      });

      checkCollision();

      drawConetian();
      drawAsteroids();
      moveBackground();

      if (asteroids.length === 0)
        addAsteroid();

      if (canvas.width - asteroids[asteroids.length - 1]?.x >= 500) {
        addAsteroid();
      }

      if (frame % 7 === 0)
        flyConetian++;

      if (gameStatus === 0 || gameStatus === 3) {
        frame++;
        setGames({
          gameSpeed: gameSpeed,
          gameFrame: gameFrame,
          gravity: gravity,
          conetian: conetian,
          asteroids: asteroids,
          ground: ground,
          frame: frame,
          score: flagScore,
        });
      }
    };

    const jumpConetian = () => {
      if (gameStatus === 0 || gameStatus === 3) {
        conetian.dy = -5;
      }
    };

    const handleMouseClick = () => jumpConetian();

    const handleSpaceBarPress = (event: KeyboardEvent) => {
      if (event.code === 'Space')
        jumpConetian();
    };

    window.addEventListener('mousedown', handleMouseClick);
    window.addEventListener('keyup', handleSpaceBarPress);

    const gameInterval = setInterval(animate, 20);

    return () => {
      window.removeEventListener('mousedown', handleMouseClick);
      window.removeEventListener('keyup', handleSpaceBarPress);
      clearInterval(gameInterval);
    };
  }, [gameStatus]);

  useEffect(() => {
    setScores(score);
  }, [score]);

  return (
    <div style={{ overflow: 'hidden', height: "100vh" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Game;