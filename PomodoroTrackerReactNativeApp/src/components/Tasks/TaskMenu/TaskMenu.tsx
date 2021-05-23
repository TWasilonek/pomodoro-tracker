import React, {useCallback, useRef, useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

import {COLORS} from '../../../constants/colors';
import Button from '../../../UI/Button';
// import useOnOutsideClick from '../../../hooks/useOnOutsideClick';

const BTN_HEIGHT = 35;

const Wrapper = styled.View`
  position: relative;
`;

const MoreButton = styled(Button)`
  height: ${BTN_HEIGHT}px;
  width: 70px;
`;

const PopupMenuWrapper = styled.View`
  position: absolute;
  z-index: 1000;
  background: white;
  right: 0;
  bottom: ${BTN_HEIGHT + 2}px;
  border: 2px solid ${COLORS.BLUE_GREYISH};
  border-radius: 5px;
  width: 300px;
`;

const Menu = styled.View`
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

const MenuItem = styled.View`
  display: flex;
  align-items: center;
  padding: 7px;
  margin: 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${COLORS.GREY_LIGHT};
  }
`;

const MenuItemButton = styled.Pressable`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  color: ${COLORS.TEXT};
  border: none;
  font-size: 16px;
`;

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
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // useOnOutsideClick(wrapperRef, () => setIsOpen(false));

  const handleTriggerButtonClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <Wrapper ref={wrapperRef}>
      <MoreButton onPress={handleTriggerButtonClick}>
        <Icon name="more-horizontal" />
      </MoreButton>
      {isOpen && (
        <PopupMenuWrapper>
          <Menu>
            <MenuItem>
              <MenuItemButton onPress={onAddPomodoroClick}>
                <Text>
                  Add another pomodoro <Icon name="plus" />
                </Text>
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton onPress={onDeletePomodoroClick}>
                Delete one pomodoro <Icon name="minus" />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton onPress={onCompletePomodoroClick}>
                Set as completed <Icon name="check" />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton onPress={onEditTaskClick}>
                Edit <Icon name="edit" />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton onPress={onDeleteTaskClick}>
                Delete <Icon name="trash" />
              </MenuItemButton>
            </MenuItem>
          </Menu>
        </PopupMenuWrapper>
      )}
    </Wrapper>
  );
};

export default TaskMenu;
