import { Button, Container, Flex, Heading } from "@theme-ui/components";
import React from "react";

const index = () => {
  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as='h1'>JamStack Todo App</Heading>
        <Button
          sx={{ marginTop: 2, color: "black" }}
          onClick={() => {
            alert("Clicked");
          }}
        >
          Login
        </Button>
      </Flex>
    </Container>
  );
};

export default index;
