import { useCallback, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiCheck, FiEdit, FiMinus, FiPlus, FiTrash } from 'react-icons/fi';

import { AppContext } from '../../../store/AppContext';
import { Task, TASK_ACTIONS } from '../../../store/Tasks.reducers';
import { COLORS } from '../../../constants/colors';
import Button from '../../../UI/Button';
import useOnOutsideClick from '../../../hooks/useOnOutsideClick';

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
  task: Task;
}

const TaskMenu: React.FC<Props> = ({ task }) => {
  const wrapperRef = useRef(null);
  const { dispatch } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  useOnOutsideClick(wrapperRef, () => setIsOpen(false));

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

  const handleSetCompletedClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.COMPLETE_POMODORO,
      payload: { id: task.id },
    });
  }, [dispatch, task.id]);

  return (
    <Wrapper ref={wrapperRef}>
      <MoreButton type="button" onClick={handleTriggerButtonClick}>
        ...
      </MoreButton>
      {isOpen && (
        <PopupMenuWrapper>
          <Menu>
            <MenuItem>
              <MenuItemButton type="button" onClick={handleAddPomodoroClick}>
                Add another pomodoro <FiPlus />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button" onClick={handleDeletePomodoroClick}>
                Delete one pomodoro <FiMinus />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button" onClick={handleSetCompletedClick}>
                Set as completed <FiCheck />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button">
                Edit <FiEdit />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button" onClick={handleDeleteTaskClick}>
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
