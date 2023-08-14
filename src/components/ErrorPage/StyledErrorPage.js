import { styled } from 'styled-components';

export const Wrapper = styled.p`
  width: 80%;
  /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */

  color: ${({ theme }) => theme.colors.errorTextColor};
  font-size: 30px;
  animation: type 0.5s alternate infinite;
`;
