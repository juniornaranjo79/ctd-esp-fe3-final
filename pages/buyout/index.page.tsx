import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { useRouter } from "next/router";
import React from "react";
import Container from "@mui/material/Container";
import CardComfirm from "dh-marvel/components/cardConfirm/CardConfirm";

const BuyOutPage = () => {
  const router = useRouter();

  const { name, price, image, address } = router.query;

  return (
    <LayoutCheckout>
      <Container sx={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <CardComfirm
          name={(name as string) || ""}
          price={(price as string) || ""}
          image={(image as string) || ""}
          address={(address as string) || ""}
        />
      </Container>
    </LayoutCheckout>
  );
};

export default BuyOutPage;
