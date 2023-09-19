import { Modal, Stack } from "native-base";
import { IStyledModalProps } from "@/interfaces/StyledModal.Interface";

const StyledModal = ({
  size = "md",
  header = undefined,
  closeButton = false,
  bodyM = 2,
  bodyP = 2,
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
        <Modal.Header
          m={bodyM}
          p={bodyP}
        >
          <Modal.Body
          m={bodyM}
          p={bodyP}
          >
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