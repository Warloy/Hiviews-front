import React from 'react'
import { NavigationProp } from '@react-navigation/native'

import Container from '../components/Container'
import RegisterForm from '../components/LoginComponents/RegisterForm';

interface RegisterPageProps {
  navigation?: NavigationProp<any>
}

const RegisterPage: React.FC<RegisterPageProps> = ({ navigation }) => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <RegisterForm
        navigation={navigation}
      />
    </Container>
  )
}

export default RegisterPage