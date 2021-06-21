import React, {useCallback, createRef, RefObject} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actions-sheet';

import {COLORS} from '../../../constants/colors';
import Button from '../../../UI/Button';

const BTN_HEIGHT = 35;

const Wrapper = styled.View``;

const MoreButton = styled(Button)`
  height: ${BTN_HEIGHT}px;
  width: 70px;
`;

const Menu = styled.View`
  padding: 20px;
  padding-bottom: 40px;
`;

const MenuItem = styled.View`
  align-items: center;
  padding-horizontal: 10px;
  padding-vertical: 16px;
`;

const MenuItemButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #fff;
  color: ${COLORS.TEXT};
`;

const ButtonText = styled.Text`
  font-size: 20px;
  margin-left: 16px;
`;

const actionSheetRef: RefObject<ActionSheet> = createRef();

interface Props {
  onEditTaskClick: () => void;
  onDeleteTaskClick: () => void;
  onAddPomodoroClick: () => void;
  onDeletePomodoroClick: () => void;
  onCompletePomodoroClick: () => void;
}

const TaskMenu: React.FC<Props> = ({
  onEditTaskClick,
  onAddPomodoroClick,
  onCompletePomodoroClick,
  onDeletePomodoroClick,
  onDeleteTaskClick,
}) => {
  const handleTriggerButtonClick = useCallback(() => {
    actionSheetRef.current?.setModalVisible();
  }, []);

  return (
    <Wrapper>
      <MoreButton onPress={handleTriggerButtonClick}>
        <Icon size={18} name="more-horizontal" />
      </MoreButton>
      <ActionSheet ref={actionSheetRef}>
        <Menu>
          <MenuItem>
            <MenuItemButton onPress={onAddPomodoroClick}>
              <Icon size={18} name="plus" />
              <ButtonText>Add another pomodoro</ButtonText>
            </MenuItemButton>
          </MenuItem>
          <MenuItem>
            <MenuItemButton onPress={onDeletePomodoroClick}>
              <Icon size={18} name="minus" />
              <ButtonText>Delete one pomodoro</ButtonText>
            </MenuItemButton>
          </MenuItem>
          <MenuItem>
            <MenuItemButton onPress={onCompletePomodoroClick}>
              <Icon size={18} name="check" />
              <ButtonText>Set as completed</ButtonText>
            </MenuItemButton>
          </MenuItem>
          <MenuItem>
            <MenuItemButton onPress={onEditTaskClick}>
              <Icon size={18} name="edit" />
              <ButtonText>Edit</ButtonText>
            </MenuItemButton>
          </MenuItem>
          <MenuItem>
            <MenuItemButton onPress={onDeleteTaskClick}>
              <Icon size={18} name="trash" />
              <ButtonText>Delete</ButtonText>
            </MenuItemButton>
          </MenuItem>
        </Menu>
      </ActionSheet>
    </Wrapper>
  );
};

export default TaskMenu;
