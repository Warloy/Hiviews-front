import React from 'react'
import { NavigationProp } from '@react-navigation/native'

import Container from '../components/Container'
import PasswRecoveryForm from '../components/LoginComponents/PasswRecoveryForm'


interface PasswRecoveryPageProps {
  navigation?: NavigationProp<any>
}

const PasswRecoveryPage: React.FC<PasswRecoveryPageProps> = ({ navigation }) => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <PasswRecoveryForm
       navigation={navigation}
       />
    </Container>
  )
}

export default PasswRecoveryPage