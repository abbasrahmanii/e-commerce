import { useRouter } from "next/router";
import Layout from "../../components/layout";

const ShippingPage = () => {
  const router = useRouter();
  // ????
  router.push("/login");
  return (
    <Layout>
      <div></div>
    </Layout>
  );
};

export default ShippingPage;
