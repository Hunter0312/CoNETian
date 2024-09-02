import styled from "styled-components";

export const P = styled.p.attrs<{
  $color?: string;
  $fontSize?: string;
  $align?: string;
  $lineHeight?: string;
  $alignSelf?: string;
  $width?: string;
}>((props) => ({
  $color: props.$color || "white",
  $fontSize: props.$fontSize || "1rem",
  $align: props.$align || "left",
  $lineHeight: props.$lineHeight || "initial",
  $alignSelf: props.$alignSelf || "initial",
}))`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
  text-align: ${(props) => props.$align};
  line-height: ${(props) => props.$lineHeight};
  align-self: ${(props) => props.$alignSelf};
  width: ${(props) => props.$width};
`;

export const GradientP = styled(P) <{ $first?: string; $second?: string }>`
  background: linear-gradient(
    ${(props) => props.$first},
    ${(props) => props.$second}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
