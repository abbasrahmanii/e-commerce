import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Layout from "../../components/layout";

const ShippingPage = () => {
  const router = useRouter();

  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      router.push("/login?redirect=/shipping");
    }
  }, []);

  return (
    <Layout>
      {session ? (
        <>
          <h1 className="mt-10 text-center text-xl">Shipping page</h1>
          <h3 className="mt-4 text-center ">Name: {session?.user.name}</h3>
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
