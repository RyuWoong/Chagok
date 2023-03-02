import styled from '@emotion/native';
import React from 'react';
import {Category} from '~/../types/chagok';
import ScrollPicker from '~/Component/Picker/ScrollPicker/ScrollPicker';
import {CATEGROY} from '~/Utils/constant';

interface Props {
  title: string;
  category: Category;
  handleCategory: (category: Category) => void;
}

function CategoryPickerLabel({title, category, handleCategory}: Props) {
  const [isVisible, setIsVisible] = React.useState(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const onSelect = (value: Category) => {
    handleCategory(value);
    closeModal();
  };

  return (
    <Container onPress={openModal}>
      <Label>{title}</Label>
      <Box>
        <CategoryLabel>{category}</CategoryLabel>
      </Box>
      <ScrollPicker
        visible={isVisible}
        title={'카테고리를 선택해요'}
        data={CATEGROY}
        onSelect={onSelect}
        onClose={closeModal}
        value={category}
      />
    </Container>
  );
}

const Container = styled.Pressable`
  margin-bottom: 20px;
  width: 100%;
`;

const Box = styled.View`
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.primaryColor};
  padding: 5px;
  height: 44px;
  justify-content: center;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.color};
  margin-bottom: 5px;
`;
const CategoryLabel = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.color};
`;

export default CategoryPickerLabel;
