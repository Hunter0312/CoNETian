import React, { useRef, useEffect, useState } from 'react';

import { birdImg, groundImage, backgroundImage, pipeBottomImg, pipeTopImg, birdFly } from '../../shared/assets';

type Props = {
  setGameOver: (e: boolean) => void,
  gameOver: boolean,
  setScores: (score: number) => void
}


const Game: React.FC<Props> = ({ setGameOver, gameOver, setScores }) => {
  const gameSpeed = 4;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const gravity = 0.6;
  const bird = { x: 50, y: 50, width: 50, height: 50, dy: 0 };
  const pipes: { x: number, y: number, width: number, height: number, isTop: boolean, passed: boolean }[] = [];
  const ground = { x1: 0, x2: window.innerWidth, y: window.innerHeight - 50, width: window.innerWidth, height: 50, speed: gameSpeed }; // Adjust speed as needed
  let frame = 0;
  let flyBird = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    // Adjust canvas width and height to full device screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const birdImage = new Image();
    birdImage.src = birdImg;

    const pipeTopImage = new Image();
    pipeTopImage.src = pipeTopImg;

    const pipeBottomImage = new Image();
    pipeBottomImage.src = pipeBottomImg;

    const backgroundImageObj = new Image();
    backgroundImageObj.src = backgroundImage;

    const groundImageObj = new Image();
    groundImageObj.src = groundImage;

    const birdFlyImg = new Image();
    birdFlyImg.src = birdFly;

    const addPipe = () => {
      const pipeWidth = 60;
      const pipeHeight = Math.random() * (canvas.height - 400) + 50; // Adjust pipe placement as needed
      pipes.push({ x: canvas.width, y: 0, width: pipeWidth, height: pipeHeight, isTop: true, passed: false });
      pipes.push({ x: canvas.width, y: pipeHeight + 250, width: pipeWidth, height: canvas.height - pipeHeight - 300, isTop: false, passed: false });
    };

    function drawImageProp(ctx: any, img: any, x: number, y: number, w: number, h: number, offsetX: number, offsetY: number) {

      if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
      }

      // default offset is center
      offsetX = typeof offsetX === "number" ? offsetX : 0.5;
      offsetY = typeof offsetY === "number" ? offsetY : 0.5;

      // keep bounds [0.0, 1.0]
      if (offsetX < 0) offsetX = 0;
      if (offsetY < 0) offsetY = 0;
      if (offsetX > 1) offsetX = 1;
      if (offsetY > 1) offsetY = 1;

      var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

      // decide which gap to fill    
      if (nw < w) ar = w / nw;
      if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
      nw *= ar;
      nh *= ar;

      // calc source rectangle
      cw = iw / (nw / w);
      ch = ih / (nh / h);

      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;

      // make sure source rectangle is valid
      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;

      // fill image in dest. rectangle
      ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    }

    const drawBackground = () => {
      drawImageProp(context, backgroundImageObj, 0, 0, canvas.width, canvas.height, 0.5, 0.5);
    };

    const drawGround = () => {
      context.drawImage(groundImageObj, ground.x1, ground.y, ground.width, ground.height);
      context.drawImage(groundImageObj, ground.x2, ground.y, ground.width, ground.height);
    };

    const moveGround = () => {
      ground.x1 -= ground.speed;
      ground.x2 -= ground.speed;

      if (ground.x1 + ground.width <= 0) {
        ground.x1 = ground.x2 + ground.width;
      }
      if (ground.x2 + ground.width <= 0) {
        ground.x2 = ground.x1 + ground.width;
      }
    };

    const drawBird = () => {
      if (flyBird % 2 === 0)
        context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
      else
        context.drawImage(birdFlyImg, bird.x, bird.y, bird.width, bird.height);
    };

    const drawPipes = () => {
      pipes.forEach(pipe => {
        const pipeImage = pipe.isTop ? pipeTopImage : pipeBottomImage;
        context.drawImage(pipeImage, pipe.x, pipe.y, pipe.width, pipe.height);
      });
    };

    const update = () => {
      if (gameOver) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      drawBackground();
      drawGround();

      bird.dy += gravity;
      bird.y += bird.dy;
      if (bird.y + bird.height > ground.y || bird.y < 0) {
        setGameOver(true);
        return;
      }

      pipes.forEach(pipe => {
        pipe.x -= gameSpeed;
        if (!pipe.passed && pipe.isTop && pipe.x + pipe.width < bird.x) {
          setScore(score => score + 1);
          pipe.passed = true;
        }
        if (
          bird.x < pipe.x + pipe.width &&
          bird.x + bird.width > pipe.x &&
          bird.y < pipe.y + pipe.height &&
          bird.y + bird.height > pipe.y
        ) {
          setGameOver(true);
        }
      });

      drawBird();
      drawPipes();
      moveGround();

      if (frame % 100 === 0) {
        addPipe();
      }

      if (frame % 7 === 0)
        flyBird++;

      frame++;
    };

    const handleMouseClick = () => {
      if (!gameOver) {
        bird.dy = -10;
      }
    };

    window.addEventListener('mousedown', handleMouseClick);
    const gameInterval = setInterval(update, 20);

    return () => {
      window.removeEventListener('mousedown', handleMouseClick);
      clearInterval(gameInterval);
    };
  }, [gameOver]);


  useEffect(() => {
    setScores(score);
  }, [score])

  return (
    <div style={{ overflow: 'hidden', height: "100vh" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Game;
