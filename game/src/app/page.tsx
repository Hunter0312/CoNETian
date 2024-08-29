"use client";
import { Button } from "@/components/button";
import { FlexDiv } from "@/components/div";
import styled from "styled-components";
import { useGameContext } from "@/utilitiy/providers/GameProvider";

import Home from "@/pages/home";
import Menu from "@/components/menu";
import Wallet from '@/pages/wallet';
import About from '@/pages/about';
import Settings from '@/pages/settings';

const S = {
  Main: styled.div`
    max-width: 430px;
    margin: 0 auto;
  `,
};

export default function App() {
  const { router } = useGameContext();
  return (
    <>
      <S.Main>
        {router === "/" && <Home />}
        {router === "/wallet" && <Wallet />}
        {router === "/about" && <About />}
        {router === "/settings" && <Settings />}
      </S.Main>
      <Menu />
    </>
  );
}
