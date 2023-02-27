import React, { useEffect, useState } from "react";
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
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import instance from "../../utils/instance";
import formatPrice from "../../utils/formatPrice";
import DrawerModal from "../../components/createModal/CreateModal";
import CreateModal from "../../components/createModal/CreateModal";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState();
  const [search, setSearch] = useState("");
  const admin = localStorage.getItem("admin");

  useEffect(() => {
    instance.get("products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const deleteProduct = async (id) => {
    await instance.delete(`products/${id}`);
    window.location.reload();
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const searchLowerCase = search.toLowerCase();

  const currentProducts = search
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchLowerCase)
      )
    : products;

  return (
    <Stack padding={"30px"} divider={<StackDivider borderColor="gray.200" />}>
      <Stack alignItems={'baseline'} gap={"10px"} flexDirection={{ base: "column", sm: "row" }}>
        <Input
          placeholder="Search a product..."
          onChange={(e) => setSearch(e.target.value)}
          variant={"filled"}
          size={"md"}
        />
        <Button width={{base: '100%', sm: '20'}} size={"md"} colorScheme={"red"} onClick={() => logout()}>
          Logout
        </Button>
      </Stack>

      <Stack
        display={"flex"}
        flexWrap={"wrap"}
        flexDirection={"row"}
        gap={"20px"}
        justifyContent={{
          base: "center",
          sm: "center",
          md: "center",
          lg: "flex-start",
        }}
      >
        {currentProducts?.map((product, i) => (
          <Link to={`/products/${product?.id}`}>
            <Card key={i} maxW="sm">
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
                  {admin === true ? (
                    <IconButton
                      onClick={() => deleteProduct(product?.id)}
                      colorScheme="red"
                      icon={<DeleteIcon />}
                    />
                  ) : (
                    ""
                  )}
                  <Button variant="solid" colorScheme="blue">
                    Buy now
                  </Button>
                  <Button variant="ghost" colorScheme="cyan">
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </Stack>
      {admin === true ? <CreateModal /> : ""}
    </Stack>
  );
};

export default Home;
