import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import { Store } from "../context/Store";

const ShippingPage = () => {
  const router = useRouter();
  // const { data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      // router.push("/login?redirect=/shipping");
      router.push("/login");
    }
  }, []);

  return (
    <Layout>
      {userInfo ? (
        <>
          <h1 className="mt-10 text-center text-xl">Shipping page</h1>
          <h3 className="mt-4 text-center ">Name: {userInfo.name}</h3>
        </>
      ) : (
        <h1>Loading ...</h1>
      )}
    </Layout>
  );
};

export default ShippingPage;

export async function getStaticProps() {
  return {
    props: {},
  };
}
