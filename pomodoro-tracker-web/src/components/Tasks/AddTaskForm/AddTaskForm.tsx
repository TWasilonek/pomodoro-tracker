import {
  ChangeEvent,
  FunctionComponent,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react';

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={category}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Task description"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <input type="submit" value="+" disabled={!description} />
      </form>
    </>
  );
};

export default AddTaskForm;
