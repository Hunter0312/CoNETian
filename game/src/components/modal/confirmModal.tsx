import styled from "styled-components";
import { FlexDiv } from "../div";
import { P } from "../p";
import React from "react";
import { FilledButton, OutlinedButton } from "../button";

const S = {
  BioContent: styled(FlexDiv)`
    border-top: 2px solid #e5e5e580;
    border-radius: 16px 16px 0 0;
    height: 55vh;
    width: 100%;
    background-color: #111113e5;
  `,
};

type Props = {
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
  showConfirmModal: boolean;
  confirmButtonAction: () => void;
  cancelButtonAction: () => void;
  closeButtonAction: () => void;
};

const ConfirmModal: React.FC<Props> = ({ title, message, confirmButtonText, cancelButtonText, showConfirmModal, confirmButtonAction, cancelButtonAction, closeButtonAction }) => {
  return (
    <FlexDiv
      $width="100%"
      $height="100vh"
      $background="#00000099"
      $position="fixed"
      $top="0"
      $left="0"
      $index="10"
      $align="flex-end"
      style={{ display: showConfirmModal ? "flex" : "none" }}
    >
      <S.BioContent $align="center" $direction="column" $padding="20px" $gap="20px">
        <FlexDiv
          $width="60px"
          $border="3px solid #F6F1F2"
          $radius="50px"
        />

        <P $fontSize="20px">{title}</P>

        <P $lineHeight="1.7">
          {message}
        </P>

        <FlexDiv $justify="center" $gap="20px" $width="400px" $align="center" $margin="20px 0 0 0">
          <FilledButton onClick={confirmButtonAction} width="160px" height="45px" backgroundColor="#363E59">
            {confirmButtonText}
          </FilledButton>

          <OutlinedButton onClick={cancelButtonAction} width="160px" height="45px">
            {cancelButtonText}
          </OutlinedButton>
        </FlexDiv>
      </S.BioContent>
    </FlexDiv>
  );
};

export default ConfirmModal;
