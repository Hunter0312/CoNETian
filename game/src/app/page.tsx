"use client";
import { Button } from "@/components/button";
import { FlexDiv } from "@/components/div";
import styled from "styled-components";
import { useGameContext } from "@/utilitiy/providers/GameProvider";

import Home from "@/pages/home";
import Menu from "@/components/menu";

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
      <S.Main>{router === "/" && <Home />}</S.Main>
      <Menu />
    </>
  );
}
