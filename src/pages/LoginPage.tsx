import React from 'react'
import { NavigationProp } from '@react-navigation/native'

import Container from '../components/Container'
import LoginForm from '../components/LoginComponents/LoginForm'

interface LoginPageProps {
  navigation?: NavigationProp<any>
}

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <LoginForm
       navigation={navigation}
       />
    </Container>
  )
}

export default LoginPage