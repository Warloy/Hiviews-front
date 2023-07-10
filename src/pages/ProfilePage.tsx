import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Stack } from 'native-base';
import Container from '../components/Container';
import { colors } from '../styled-components/colors';
import ProfileComponent from '../components/ProfileComponents/ProfileComponent';
import { TUser } from '../types';

interface ProfilePageProps {
  navigation?: NavigationProp<any>;
  route?: any
}

const ProfilePage: React.FC<ProfilePageProps> = ({ navigation, route }) => {
  const user:TUser = route.params.user
  
  return (
    <Container
      statusBarStyle='dark-content'
      navigation={navigation}
      statusBarColor={colors.white}
      backgroundTopColor={colors.white}
      backgroundBottomColor={colors.white}
    >
      <Stack
        w='100%'
        maxH='100%'
        minH='100%'
        py={1}
      >
      <ProfileComponent
        navigation={navigation}
        user={user}
      />
      </Stack>
    </Container>
  );
}

export default ProfilePage;
