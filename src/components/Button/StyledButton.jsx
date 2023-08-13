import { styled } from 'styled-components';

export const StyledButton = styled.button`
  width: 200px;
  height: 40px;
  background: ${({ theme }) => theme.colors.accentColor};
  border-radius: 8px;
  margin: auto;
  font-weight: 700;
  letter-spacing: 3.3px;
  color: ${({ theme }) => theme.colors.textColor};
  &:hover {
    color: ${({ theme }) => theme.colors.hoverTextColor};
  }
  svg {
    display: inline-block;
    /* width: 2em;
    height: 2em; */
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }
  svg :hover,
  svg :focus {
    stroke: currentColor;
    fill: currentColor;
  }
`;

export const IconButton = styled(StyledButton)`
  position: relative;
  width: 40px;
  border-radius: 50%;
  margin: 0;
`;
export const CloseButton = styled(StyledButton)`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 40px;
  margin: 0;
  width: 3em;
  height: 3em;
  background: transparent;
`;
