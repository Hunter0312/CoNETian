import styled from "styled-components";

export const P = styled.p.attrs<{
  $color?: string;
  $fontSize?: string;
  $align?: string;
  $line?: string;
}>((props) => ({
  $align: props.$align || "left",
  $color: props.$color || "white",
  $fontSize: props.$fontSize || "1rem",
}))`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
  text-align: ${(props) => props.$align};
  line-height: ${(props) => props.$line};
`;

export const GradientP = styled(P)<{ $first?: string; $second?: string }>`
  background: linear-gradient(
    ${(props) => props.$first},
    ${(props) => props.$second}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
