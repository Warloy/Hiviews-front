import { Modal, Stack } from "native-base";
import { IStyledModalProps } from "@/interfaces/StyledModal.Interface";

const StyledModal = ({
  size = "md",
  header = undefined,
  closeButton = false,
  children,
  ...rest
}: IStyledModalProps) => {
  return (
    <Modal
      size={size}
      {...rest}
    >
      <Modal.Content>
        {header && <Modal.Header>{header}</Modal.Header>}
        {closeButton && <Modal.CloseButton />}
        <Modal.Header>
          <Modal.Body>
            <Stack>
              {children}
            </Stack>
          </Modal.Body>
        </Modal.Header>
      </Modal.Content>
    </Modal>
  );
};

export default StyledModal;