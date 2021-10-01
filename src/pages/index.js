import { Button, Container, Flex, Heading } from "@theme-ui/components";
import React, { useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

const Index = () => {
  useEffect(() => {
    netlifyIdentity.init({});
  });

  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as='h1'>JamStack Todo App</Heading>
        <Button
          sx={{ marginTop: 2, color: "black" }}
          onClick={() => {
            //alert("Clicked");
            netlifyIdentity.open();
          }}
        >
          Login
        </Button>
      </Flex>
    </Container>
  );
};

export default Index;
