import React, {FunctionComponent, useCallback, useState} from 'react';
import {Modal, ModalProps, Pressable} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

import {COLORS} from '../../../constants/colors';

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: ${(props: {visible: boolean}) => (props.visible ? 1 : 0)};
  background-color: #fff;
`;

const InnerWrapper = styled.View`
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 15px;
  padding-right: 15px;
  flex: 1;
  background-color: #fff;
`;

const Top = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Form = styled.View`
  flex: 2;
`;

interface InputProps {
  flex?: number;
}

const Input = styled.TextInput`
  flex: ${(props: InputProps) => props.flex || 'none'};
  height: 48px;
  border: 1px solid ${COLORS.GREY_LIGHTER};
  border-radius: 5px;
  height: 48px;
  padding: 10px;
  font-size: 21px;
  margin-bottom: 20px;
`;

const ErrorText = styled.Text`
  color: ${COLORS.RED};
`;

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
  const [descriptionError, setDescriptionError] = useState('');

  const handleSubmit = useCallback(() => {
    if (description.trim() === '') {
      setDescriptionError('Description is required');
      return;
    }

    onSubmit({category: category.trim(), description: description.trim()});
    setCategory('');
    setDescription('');
    setDescriptionError('');
  }, [category, description, onSubmit]);

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
    <Wrapper visible={modalProps.visible}>
      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        {...modalProps}>
        <InnerWrapper>
          <Top>
            <Pressable onPress={modalProps.onRequestClose}>
              <Icon name="x" size={30} color={COLORS.TEXT} />
            </Pressable>
            <Pressable onPress={handleSubmit}>
              <Icon name="check" size={30} color={COLORS.TEXT} />
            </Pressable>
          </Top>
          <Form>
            <Input
              placeholder="Category"
              value={category}
              onChangeText={text => handleChange('category', text)}
            />
            <Input
              placeholder="Task description"
              value={description}
              onChangeText={text => handleChange('description', text)}
            />
            {!!descriptionError && <ErrorText>{descriptionError}</ErrorText>}
          </Form>
        </InnerWrapper>
      </Modal>
    </Wrapper>
  );
};

export default EditTaskForm;
