import styled from "styled-components";

export const Div = styled.div.attrs<{
  $padding?: string;
  $margin?: string;
  $border?: string;
  $radius?: string;
  $width?: string;
  $height?: string;
  $background?: string;
  $position?: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $index?: string;
}>((props) => ({
  $padding: props.$padding || "0",
  $margin: props.$margin || "0",
  $border: props.$border || "unset",
  $radius: props.$radius || "0",
}))`
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
  border: ${(props) => props.$border};
  border-radius: ${(props) => props.$radius};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background-color: ${(props) => props.$background};
  position: ${(props) => props.$position};
  top: ${(props) => props.$top};
  bottom: ${(props) => props.$bottom};
  left: ${(props) => props.$left};
  right: ${(props) => props.$right};
  z-index: ${(props) => props.$index};
`;

export const FlexDiv = styled(Div).attrs<{
  $direction?: string;
  $justify?: string;
  $align?: string;
  $gap?: string;
  $grow?: string;
}>((props) => ({
  $direction: props.$direction || "unset",
  $justify: props.$justify || "unset",
  $align: props.$align || "unset",
  $gap: props.$gap || "0",
  $grow: props.$grow,
}))`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  justify-content: ${(props) => props.$justify};
  align-items: ${(props) => props.$align};
  gap: ${(props) => props.$gap};
  flex-grow: ${(props) => props.$grow};
`;
