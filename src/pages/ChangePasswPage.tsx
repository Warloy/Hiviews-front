import React from 'react'
import { NavigationProp } from '@react-navigation/native'

import Container from '../components/Container'
import ChangePasswForm from '../components/ProfileComponents/ChangePasswForm';

interface ChangePasswPageProps {
  navigation?: NavigationProp<any>
}

const ChangePasswPage: React.FC<ChangePasswPageProps> = ({ navigation }) => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <ChangePasswForm />
    </Container>
  )
}

export default ChangePasswPage