import { Dimensions } from 'react-native'
import { useToast, Avatar, Text, HStack, Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../styled-components/colors'
import { IToastProps } from '../interfaces/useCustomToast.Interface'

const { width } = Dimensions.get('window')

const Toast = ({ id = 'unique', text = '', color = colors.primary, bgColor = colors.secondary }: IToastProps) => (
  <HStack
    id={id}
    h='20'
    w={width}
    bottom={-50}
    backgroundColor={bgColor}
    px={10}
    pr={20}
    space={2}
    alignItems='center'
  >
    <Avatar bgColor={color}>
      <Icon
        as={Ionicons}
        name='ios-information-circle-outline'
        size={6}
        color='white'
      />
    </Avatar>
    <Text color={color} bold pr={2} textAlign='justify' >
      {text}
    </Text>
  </HStack>
)

const useCustomToast = () => {
  const toast = useToast()

  const showSuccessToast = (text = '') => {
    toast.show({
      render: ({ id }) => {
        return <Toast id={id} text={text} bgColor={colors.base} />
      },
    })
  }

  const showErrorToast = (text = '') => {
    toast.show({
      render: ({ id }) => {
        return <Toast id={id} text={text} color={colors.error.primary} bgColor={colors.error.bgError} />
      },
    })
  }

  return {
    showSuccessToast,
    showErrorToast,
  }
}

export default useCustomToast