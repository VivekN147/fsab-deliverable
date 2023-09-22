import {useState} from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {Button, Input, Textarea, VStack, ScaleFade} from "@chakra-ui/react";
import axios from "axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewPictureModal = ({isOpen, onClose}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  function sendFormData(e: any) {
    e.preventDefault();

    setIsLoading(true);

    axios
      .post("http://localhost:8080/pictures", {
        image_address: e.target.image_address.value,
        alt_text: e.target.alt_text.value,
      })
      .then(function (response) {
        onClose();
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        setIsLoading(false);
      });
  }


  return (
    <ScaleFade initialScale={0.9} in={isOpen}>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={sendFormData}>
          <ModalContent>
            <ModalHeader>Add a new image to your gallery!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={2}>
                <Input required name="image_address" placeholder="Image address" />
                <Textarea required name="alt_text" placeholder="Alternate text" />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </ScaleFade>
    
  );
};

export default NewPictureModal;
