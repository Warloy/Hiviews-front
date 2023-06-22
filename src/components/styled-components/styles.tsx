import { StyleSheet } from 'react-native'
import { colors } from '../../styled-components/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  modalBackground: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles