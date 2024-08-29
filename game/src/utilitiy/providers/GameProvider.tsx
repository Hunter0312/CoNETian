"use client";

import PropTypes from "prop-types";
import { createContext, useContext, useState, ReactNode } from "react";

export type Difficulty = 'easy' | 'normal' | 'hard';
type GameContext = {
  router: string;
  setRouter: (props: string) => void;
  difficulty: Difficulty;
  setDifficulty: (val: Difficulty) => void;
  effects: number;
  setEffects: (val: number) => void;
  music: number;
  setMusic: (val: number) => void;
};

const Game = createContext<GameContext | undefined>(undefined);

export function useGameContext() {
  const context = useContext(Game);
  if (!context) {
    throw new Error("useRouterContext must be used within a RouterProvider");
  }
  return context;
}

type GameProps = {
  children: ReactNode;
};

export function GameProvider({ children }: GameProps) {
  const [router, setRouter] = useState<string>("/");
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [music, setMusic] = useState<number>(70);
  const [effects, setEffects] = useState<number>(70);

  return (
    <Game.Provider
      value={{
        router,
        setRouter,
        difficulty,
        setDifficulty,
        effects,
        setEffects,
        music,
        setMusic,
      }}
    >
      {children}
    </Game.Provider>
  );
}

GameProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
