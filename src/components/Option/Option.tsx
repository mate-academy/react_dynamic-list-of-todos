interface Props {
  optionValue: string;
}

export const Option: React.FC<Props> = ({ optionValue }) => {
  return <option value={optionValue.toLowerCase()}>{optionValue}</option>;
};
