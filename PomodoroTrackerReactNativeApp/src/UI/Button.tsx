import styled from 'styled-components/native';
import {COLORS} from '../constants/colors';

interface Props {
  flex?: number;
}

const Button = styled.Button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: ${(props: Props) => props.flex};
  font-size: 21px;
  color: ${COLORS.TEXT};
  background-color: #fff;
  border: 1px solid ${COLORS.GREY_LIGHTER};
  cursor: pointer;

  &:not(:disabled):hover,
  &:not(:disabled):active {
    background: ${COLORS.BLUE_GREYISH};
    color: #fff;
  }

  &:disabled {
    border-width: 1px;
    color: ${COLORS.BLUE_GREYISH};
  }
`;

export default Button;
