import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';

import { AppContext } from '../../../store/AppContext';
import { Task, TASK_ACTIONS } from '../../../store/Tasks.reducers';
import { formatDateToHoursAndMinutes } from '../../../utils/timeUtils';
import { COLORS } from '../../../constants/colors';
import Button from '../../../UI/Button';

const BTN_HEIGHT = 35;

interface StyledProps {
  flex?: number;
}

const Wrapper = styled.div`
  position: relative;
`;

const Element = styled.p`
  display: flex;
  align-items: center;
  flex: ${(props: StyledProps) => props.flex};
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 21px;

  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const PomodorsButton = styled(Button)`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  cursor: pointer;
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
  width: 200px;
`;

const Menu = styled.ul`
  list-style: none;
  padding-left: 0;
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
  width: 100%;
  background: #fff;
  color: ${COLORS.TEXT};
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover,
  &:active {
    font-weight: 600;
  }
`;

interface Props {
  task: Task;
}

const TaskMenu: React.FC<Props> = ({ task }) => {
  const { dispatch } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleTriggerButtonClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleAddPomodoroClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.ADD_POMODORO,
      payload: { id: task.id },
    });
  }, [dispatch, task.id]);

  const handleDeletePomodoroClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.DELETE_POMODORO,
      payload: { id: task.id },
    });
  }, [dispatch, task.id]);

  const handleDeleteTaskClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.DELETE_TASK,
      payload: { id: task.id },
    });
  }, [dispatch, task.id]);

  return (
    <Wrapper>
      <MoreButton type="button" onClick={handleTriggerButtonClick}>
        ...
      </MoreButton>
      {isOpen && (
        <PopupMenuWrapper>
          <Menu>
            <MenuItem>
              <MenuItemButton type="button" onClick={handleAddPomodoroClick}>
                + Add another pomodoro
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button" onClick={handleDeletePomodoroClick}>
                - Delete one pomodoro
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button">V Set as completed</MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button">Edit</MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button" onClick={handleDeleteTaskClick}>
                Delete
              </MenuItemButton>
            </MenuItem>
          </Menu>
        </PopupMenuWrapper>
      )}
    </Wrapper>
  );
};

export default TaskMenu;
