import Products from "@/components/list/productList";
import { Helmet } from "react-helmet";

export default function Jazz() {
  return (
    <>
      <Helmet>
        <title>jazz</title>
      </Helmet>
      <Products category="jazz" />
    </>
  );
}
