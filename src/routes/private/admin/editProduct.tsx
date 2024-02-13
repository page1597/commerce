import AddProductForm from "@/components/addProductForm";
import useGetProduct from "@/hooks/product/useGetProduct";
import { useSearchParams } from "react-router-dom";

export default function EditProduct() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const { loading, product } = useGetProduct(productId);

  return (
    <div>
      <h3 className="text-xl">상품수정</h3>
      <hr className="mt-5" />
      <div className="mt-8">{loading ? <p>Loading...</p> : product && <AddProductForm product={product} />}</div>
    </div>
  );
}
