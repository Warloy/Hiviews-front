import React, { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import Container from '../components/Container';
import NewPostComponent from '../components/PostComponents/NewPostComponent';

interface NewPostPageProps {
  navigation?: NavigationProp<any>;
}

const NewPostPage: React.FC<NewPostPageProps> = ({ navigation }) => {
  return (
    <Container
      hiddenNavBar={false}
    >
      <NewPostComponent
        navigation={navigation}
      />
    </Container>
  );
}

export default NewPostPage;
