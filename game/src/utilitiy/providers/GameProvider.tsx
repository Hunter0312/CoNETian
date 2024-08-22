"use client";

import PropTypes from "prop-types";
import { createContext, useContext, useState, ReactNode } from "react";

type GameContext = {
  router: string;
  setRouter: (props: string) => void;
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
  return (
    <Game.Provider
      value={{
        router,
        setRouter,
      }}
    >
      {children}
    </Game.Provider>
  );
}

GameProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
