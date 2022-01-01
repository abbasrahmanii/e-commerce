import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Store } from "../../context/Store";

const ShippingPage = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  if (!userInfo) {
    router.push("/login?redirect=/shipping");
  }

  return <div>Shipping page</div>;
};

export default ShippingPage;
