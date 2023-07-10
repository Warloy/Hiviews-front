import React from 'react'
import { NavigationProp } from '@react-navigation/native'

import Container from '../components/Container'
import EditProfileForm from '../components/ProfileComponents/EditProfileForm';

interface EditProfilePageProps {
  navigation?: NavigationProp<any>
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ navigation }) => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <EditProfileForm />
    </Container>
  )
}

export default EditProfilePage