import {PressableProps} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '../constants/colors';

interface Props extends PressableProps {
  flex?: number;
}

const Button = styled.Pressable`
  align-items: center;
  justify-content: center;
  flex: ${(props: Props) => props.flex};
  font-size: 21px;
  color: ${(props: Props) =>
    props.disabled ? COLORS.BLUE_GREYISH : COLORS.TEXT};
  background-color: #fff;
  border: 1px solid ${COLORS.GREY_LIGHTER};
`;

export default Button;
