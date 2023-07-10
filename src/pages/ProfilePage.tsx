import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'native-base';

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
    <ScrollView>
      <Container
        statusBarStyle='dark-content'
        navigation={navigation}
        statusBarColor={colors.white}
        backgroundTopColor={colors.white}
        backgroundBottomColor={colors.white}
      >
        <ProfileComponent
          navigation={navigation}
          user={user}
        >
          
        </ProfileComponent>
      </Container>
    </ScrollView>
  );
}

export default ProfilePage;
