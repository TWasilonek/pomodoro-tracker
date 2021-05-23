import {FunctionComponent, SyntheticEvent, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

import {COLORS} from '../../../constants/colors';
import Button from '../../../UI/Button';

interface InputProps {
  flex?: number;
}

const Form = styled.View`
  display: flex;
  align-items: center;
`;

const Input = styled.TextInput`
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

interface EditTaskFormValues {
  category: string;
  description: string;
  id?: string;
}
interface Props {
  data: EditTaskFormValues;
  onSubmit: (values: EditTaskFormValues) => void;
}

const EditTaskForm: FunctionComponent<Props> = ({data, onSubmit}) => {
  const [category, setCategory] = useState(data.category);
  const [description, setDescription] = useState(data.description);

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      onSubmit({category, description});
      setCategory('');
      setDescription('');
    },
    [category, description, onSubmit],
  );

  // const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
  //   // switch (event.target.name) {
  //   //   case 'category':
  //   //     setCategory(event.target.value);
  //   //     break;
  //   //   case 'description':
  //   //     setDescription(event.target.value);
  //   //     break;
  //   //   default:
  //   //     break;
  //   // }
  // }, []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* <Input
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
        /> */}
        <SubmitButton disabled={!description} flex={1}>
          {data.id ? (
            <Icon name="save" size={26} />
          ) : (
            <Icon name="plus" size={26} />
          )}
        </SubmitButton>
      </Form>
    </>
  );
};

export default EditTaskForm;
