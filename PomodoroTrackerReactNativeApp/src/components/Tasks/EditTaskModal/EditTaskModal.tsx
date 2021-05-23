import React, {
  FunctionComponent,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react';
import {Modal, View, ModalProps} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

import {COLORS} from '../../../constants/colors';

interface InputProps {
  flex?: number;
}

const Input = styled.TextInput`
  flex: ${(props: InputProps) => props.flex};
  border: 1px solid ${COLORS.GREY_LIGHTER};
  border-radius: 5px;
  height: 48px;
  padding: 10px;
  font-size: 21px;
`;

const Button = styled.Pressable``;

interface EditTaskFormValues {
  category: string;
  description: string;
  id?: string;
}
interface Props {
  data: EditTaskFormValues;
  onSubmit: (values: EditTaskFormValues) => void;
  modalProps: ModalProps;
}

const EditTaskForm: FunctionComponent<Props> = ({
  data,
  onSubmit,
  modalProps,
}) => {
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

  const handleChange = useCallback((name: string, text: string) => {
    switch (name) {
      case 'category':
        setCategory(text);
        break;
      case 'description':
        setDescription(text);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Modal {...modalProps}>
      <View>
        <View>
          <Button onPress={handleSubmit}>
            <Icon name="check" />
          </Button>
          <Button onPress={modalProps.onRequestClose}>
            <Icon name="x" />
          </Button>
        </View>
        <Input
          placeholder="Category"
          value={category}
          onChangeText={text => handleChange('category', text)}
          flex={3}
        />
        <Input
          placeholder="Task description"
          value={description}
          onChangeText={text => handleChange('description', text)}
          flex={8}
        />
      </View>
    </Modal>
  );
};

export default EditTaskForm;
