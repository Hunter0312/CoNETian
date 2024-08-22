import styled from "styled-components";

export const P = styled.p.attrs<{ $color?: string; $fontSize?: string }>(
  (props) => ({
    $color: props.$color || "white",
    $fontSize: props.$fontSize || "1rem",
  })
)`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
`;

export const GradientP = styled(P)<{ $first?: string; $second?: string }>`
  background: linear-gradient(
    ${(props) => props.$first},
    ${(props) => props.$second}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
