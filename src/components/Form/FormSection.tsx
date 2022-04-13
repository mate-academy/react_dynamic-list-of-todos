import { FC, memo, useState } from 'react';
import { SelectInput } from './InputComponents/SelectInput';
import { TextInput } from './InputComponents/TextInput';
import './form.scss';

interface Props {
  onFilter: (source: string, value: string) => void
}

export const FormSection: FC<Props> = memo(({ onFilter }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState('all');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setSelected('all');
    onFilter('input', event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    setTitle('');
    onFilter('select', event.target.value);
  };

  const options = [
    { id: 1, name: 'all' },
    { id: 2, name: 'active' },
    { id: 3, name: 'completed' },
  ];

  return (
    <form onSubmit={handleSubmit} className="form">
      <TextInput
        name="title"
        label=""
        inputValue={title}
        errorMessage=""
        placeholder="Search by title"
        onChange={handleInputChange}
      />

      <SelectInput
        name="filter"
        label=""
        inputValue={selected}
        errorMessage=""
        options={options}
        onChange={handleSelectChange}
      />
    </form>
  );
});
