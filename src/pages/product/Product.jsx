import React, { useEffect, useState } from "react";
import Login from "../../components/login/Login";
import SignUp from "../../components/signup/SignUp";
import instance from "../../utils/instance";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Button,
  ButtonGroup,
  Divider,
  Wrap,
  WrapItem,
  StackDivider,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";

const Product = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    instance.get(`products/${id}`).then((res) => {
      setProduct(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Stack padding={'20px'}>
      <div>
        <IconButton colorScheme="teal" icon={<ArrowBackIcon />} onClick={() => navigate(-1)} />
      </div>
      <Card border={"none"}>
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md" color="blackAlpha.800">
              {product?.name}
            </Heading>
            <Text>{product?.description}</Text>
            <Text color="green.400" fontSize="2xl" fontWeight={"black"}>
              {formatPrice(product?.price)}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="cyan">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Stack>
  );
};

export default Product;
