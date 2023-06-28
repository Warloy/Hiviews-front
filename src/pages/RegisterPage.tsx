import React from 'react'
import { NavigationProp } from '@react-navigation/native'

import Container from '../components/Container'
import RegisterForm from '../components/LoginComponents/RegisterForm';

interface RegisterPageProps {
  navigation?: NavigationProp<any>
}

const RegisterPage: React.FC<RegisterPageProps> = ({ }) => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <RegisterForm />
    </Container>
  )
}

export default RegisterPage