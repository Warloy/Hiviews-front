import { Modal, Text, Stack } from "native-base";
import { colors } from "@/constants/Colors";
import { Icons } from "@/constants/Icons";
import { IIconProps, IModal } from "@/interfaces/Modal.Interface";

const CustomModal = ({
  header = undefined,
  closeButton = false,
  footer = undefined,
  maxH = undefined,
  maxHeight = undefined,
  iconGroup = undefined,
  iconName = undefined,
  iconColor = undefined,
  iconSize = undefined,
  description = undefined,
  children,
  ...props
}: IModal) => {
  const Icon = Icons[iconGroup ?? "Ionicons"];

  const iconProps: IIconProps = {
    name: iconName ?? "check",
    color: iconColor ?? colors.primary,
    size: iconSize ?? 30
  };

  return (
    <Modal {...props} >
      <Modal.Content
        maxH={maxH}
        maxHeight={maxHeight}
      >
        {header && <Modal.Header>{header}</Modal.Header>}
        {closeButton && <Modal.CloseButton />}
        <Modal.Body>
          <Stack
            space={2}
            justifyContent="center"
            alignItems="center"
          >
            {iconGroup && <Icon {...iconProps} />}
            {description &&
              <Text
                fontSize="sm"
                color={colors.gray3}
                textAlign="center"
              >
                {description}
              </Text>
            }
            {children}
          </Stack>
        </Modal.Body>
        {footer && <Modal.Footer>{footer}</Modal.Footer>}
      </Modal.Content>
    </Modal >
  );
}


const useCustomModal = () => {

  const SuccessModal = ({
    header = undefined,
    closeButton = false,
    footer = undefined,
    maxH = undefined,
    maxHeight = undefined,
    iconGroup = "AntDesign",
    iconName = "checkcircleo",
    iconColor = colors.primary,
    iconSize = undefined,
    description = undefined,
    children,
    ...props
  }: IModal) => {
    return (
      <CustomModal
        header={header}
        closeButton={closeButton}
        footer={footer}
        maxH={maxH}
        maxHeight={maxHeight}
        iconGroup={iconGroup}
        iconName={iconName}
        iconColor={iconColor}
        iconSize={iconSize}
        description={description}
        {...props}
      >
        {children}
      </CustomModal>
    )
  }

  const WarningModal = ({
    header = undefined,
    closeButton = false,
    footer = undefined,
    maxH = undefined,
    maxHeight = undefined,
    iconGroup = "AntDesign",
    iconName = "warning",
    iconColor = colors.error.warning,
    iconSize = undefined,
    description = undefined,
    children,
    ...props
  }: IModal) => (
    <CustomModal
      header={header}
      closeButton={closeButton}
      footer={footer}
      maxH={maxH}
      maxHeight={maxHeight}
      iconGroup={iconGroup}
      iconName={iconName}
      iconColor={iconColor}
      iconSize={iconSize}
      description={description}
      {...props}
    >
      {children}
    </CustomModal>
  )

  const InfoModal = ({
    header = undefined,
    closeButton = false,
    footer = undefined,
    maxH = undefined,
    maxHeight = undefined,
    iconGroup = "SimpleLineIcons",
    iconName = "info",
    iconColor = colors.secondary,
    iconSize = undefined,
    description = undefined,
    children,
    ...props
  }: IModal) => (
    <CustomModal
      header={header}
      closeButton={closeButton}
      footer={footer}
      maxH={maxH}
      maxHeight={maxHeight}
      iconGroup={iconGroup}
      iconName={iconName}
      iconColor={iconColor}
      iconSize={iconSize}
      description={description}
      {...props}
    >
      {children}
    </CustomModal>
  )

  const ErrorModal = ({
    header = undefined,
    closeButton = false,
    footer = undefined,
    maxH = undefined,
    maxHeight = undefined,
    iconGroup = "MaterialIcons",
    iconName = "error-outline",
    iconColor = colors.error.primary,
    iconSize = undefined,
    description = undefined,
    children,
    ...props
  }: IModal) => (
    <CustomModal
      header={header}
      closeButton={closeButton}
      footer={footer}
      maxH={maxH}
      maxHeight={maxHeight}
      iconGroup={iconGroup}
      iconName={iconName}
      iconColor={iconColor}
      iconSize={iconSize}
      description={description}
      {...props}
    >
      {children}
    </CustomModal>
  );

  return {
    SuccessModal,
    InfoModal,
    WarningModal,
    ErrorModal
  };
}

export default useCustomModal;