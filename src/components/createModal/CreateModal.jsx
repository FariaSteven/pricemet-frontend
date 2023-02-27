import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../utils/instance";

const CreateModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const btnRef = React.useRef(null);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const handleSubmit = async () => {
    if (title && description && price) {
      await instance
        .post("products", {
          name: title,
          description: description,
          price: price,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        icon={<AddIcon />}
      />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new product</ModalHeader>
          <ModalCloseButton />
          <FormControl>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    pointerEvents="none"
                    color="teal"
                    fontWeight={"bold"}
                    fontSize="1.2em"
                    children="R$"
                  />
                  <Input
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                type="submit"
                onClick={() => handleSubmit()}
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateModal;
