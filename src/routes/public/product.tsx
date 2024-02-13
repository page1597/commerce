import DrawerBasket from "@/components/drawerBasket";
import ProductDetail from "@/components/productDetail";
import ProductInfo from "@/components/productInfo";
import RecommandProducts from "@/components/recommandProducts";
import { Button } from "@/components/ui/button";
import { DrawerRight, DrawerRightContent, DrawerRightTrigger } from "@/components/ui/drawerRight";
import { AuthContext } from "@/context/authContext";
import useCheckIsInBasket from "@/hooks/basket/useCheckIsInBasket";
import useGetProduct from "@/hooks/product/useGetProduct";
import { addToBasket } from "@/services/local/basket";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// 구매자가 보는 상품 상세 페이지
export default function Product() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id"); // param 으로 가져오는 product id
  const userId = useContext(AuthContext)?.id || null;
  const { loading, product } = useGetProduct(productId);
  const { isAdded, setIsAdded, quantity, setQuantity } = useCheckIsInBasket(productId);

  return (
    <div className="flex flex-col">
      {!loading && product ? (
        <ProductInfo product={product} isAdmin={false} quantity={quantity} setQuantity={setQuantity} />
      ) : (
        <></>
      )}
      <div className="w-full md:right-0 flex justify-center md:justify-end items-center gap-3 mt-5">
        <DrawerRight direction="right">
          {!isAdded ? (
            <Button
              onClick={() => {
                addToBasket(userId, product!, quantity);
                setIsAdded(true);
              }}
              className="bg-zinc-0 border border-zinc-500 text-zinc-900 w-28 hover:bg-zinc-100"
            >
              장바구니 추가
            </Button>
          ) : (
            <DrawerRightTrigger>
              <div className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded text-sm font-medium ring-offset-background transition-colors bg-zinc-0 border border-zinc-400 text-zinc-700 w-28 hover:bg-zinc-100">
                장바구니 보기
              </div>
            </DrawerRightTrigger>
          )}
          <DrawerRightContent className="w-[350px]">
            {productId ? <DrawerBasket setIsAdded={setIsAdded} productId={productId} /> : <></>}
          </DrawerRightContent>
        </DrawerRight>

        <Button className="bg-zinc-400 w-28 hover:bg-zinc-500">구매하기</Button>
      </div>
      <hr className="mt-8" />
      {product ? <RecommandProducts category={product.category} productId={product.id} /> : <></>}
      <hr className="mt-10" />
      {product ? <ProductDetail product={product} /> : <></>}
    </div>
  );
}
