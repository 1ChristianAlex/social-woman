import styled, { css } from 'styled-components';
import { Colors } from 'styles';

export const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;

  ${props =>
    props.hasLine &&
    css`
      ::after {
        content: '';
        position: absolute;
        width: 88%;
        border-bottom: 1px solid ${Colors.lightGray};
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
      }
    `}
`;

export const StyledInput = styled.input`
  background: ${Colors.white};
  color: ${Colors.dark};
  padding: 12px 15px;
  border-radius: ${props => props.borderRadius}px;
  border: 3px solid ${Colors.primary};
  font-size: 18px;
  position: relative;
  width: 100%;
`;
