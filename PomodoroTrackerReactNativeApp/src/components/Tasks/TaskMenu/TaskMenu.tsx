import React, {useCallback, useRef, useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import {FiCheck, FiEdit, FiMinus, FiPlus, FiTrash} from 'react-icons/fi';
import {BsThreeDots} from 'react-icons/bs';

import {COLORS} from '../../../constants/colors';
import Button from '../../../UI/Button';
// import useOnOutsideClick from '../../../hooks/useOnOutsideClick';

const BTN_HEIGHT = 35;

const Wrapper = styled.div`
  position: relative;
`;

const MoreButton = styled(Button)`
  height: ${BTN_HEIGHT}px;
  width: 70px;
`;

const PopupMenuWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  background: white;
  right: 0;
  bottom: ${BTN_HEIGHT + 2}px;
  border: 2px solid ${COLORS.BLUE_GREYISH};
  border-radius: 5px;
  width: 300px;
`;

const Menu = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 7px;
  margin: 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${COLORS.GREY_LIGHT};
  }
`;

const MenuItemButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #fff;
  color: ${COLORS.TEXT};
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover,
  &:active {
    font-weight: 600;
  }
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
        <Text>
          <BsThreeDots size="30px" />
        </Text>
      </MoreButton>
      {isOpen && (
        <PopupMenuWrapper>
          <Menu>
            <MenuItem>
              <MenuItemButton type="button" onClick={onAddPomodoroClick}>
                Add another pomodoro <FiPlus />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button" onClick={onDeletePomodoroClick}>
                Delete one pomodoro <FiMinus />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button" onClick={onCompletePomodoroClick}>
                Set as completed <FiCheck />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button" onClick={onEditTaskClick}>
                Edit <FiEdit />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button" onClick={onDeleteTaskClick}>
                Delete <FiTrash />
              </MenuItemButton>
            </MenuItem>
          </Menu>
        </PopupMenuWrapper>
      )}
    </Wrapper>
  );
};

export default TaskMenu;
