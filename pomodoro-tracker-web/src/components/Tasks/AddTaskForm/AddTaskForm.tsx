import React, {
  ChangeEvent,
  FunctionComponent,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import { COLORS } from '../../../constants/colors';
import Button from '../../../UI/Button';

interface InputProps {
  flex?: number;
}

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: ${(props: InputProps) => props.flex};
  border: 1px solid ${COLORS.GREY_LIGHTER};
  border-radius: 5px;
  height: 48px;
  padding: 10px;
  font-size: 21px;

  &:focus,
  &:focus-visible {
    border: 2px solid ${COLORS.BLUE_GREYISH};
    outline: ${COLORS.BLUE_GREYISH} 2px;
  }

  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const SubmitButton = styled(Button)`
  border-radius: 5px;
  height: 48px;
  padding: 10px;
  border: 2px solid ${COLORS.BLUE_GREYISH};
`;

interface Props {
  onSubmit: (values: { category: string; description: string }) => void;
}

const AddTaskForm: FunctionComponent<Props> = ({ onSubmit }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      onSubmit({ category, description });
      setCategory('');
      setDescription('');
    },
    [category, description, onSubmit]
  );

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'category':
        setCategory(event.target.value);
        break;
      case 'description':
        setDescription(event.target.value);
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Category"
          name="category"
          value={category}
          onChange={handleChange}
          flex={3}
        />
        <Input
          type="text"
          placeholder="Task description"
          name="description"
          value={description}
          onChange={handleChange}
          flex={8}
        />
        <SubmitButton type="submit" disabled={!description} flex={1}>
          <FiPlus size="26px" />
        </SubmitButton>
      </Form>
    </>
  );
};

export default AddTaskForm;
