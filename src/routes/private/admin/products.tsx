import { getProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, QueryClient } from "@tanstack/react-query";

export default function Products() {
  // 판매상품 리스트 목록
  const navigate = useNavigate();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getProducts(pageParam, 12),
    initialPageParam: 0,
    getNextPageParam: (querySnapshot: DocumentData) => {
      if (querySnapshot.length < 12) {
        return null;
      } else {
        return querySnapshot[querySnapshot.length - 1].createdAt;
      }
    },
  });
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <h3 className="text-xl">전체 상품</h3>

      <button
        title="상품 등록"
        className="fixed right-10 bottom-10 bg-zinc-200 rounded-full p-2"
        onClick={() => navigate("/add-product")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#555555"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="md:w-14 md:h-14"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      <div className="mt-8">
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-20">
                {page?.map((product: DocumentData) => (
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    key={product.id}
                    onClick={() => navigate("/product", { state: product as DocumentData })}
                  >
                    <div>
                      {product.image ? (
                        <img
                          src={product["image"][0]}
                          width={60}
                          height={60}
                          className="h-60 w-60 object-contain"
                          alt={product.name}
                        />
                      ) : (
                        <div className="w-60 h-60 bg-zinc-100" />
                      )}
                      <div className="flex flex-col">
                        <div className="text-sm mt-2">{product["name"]}</div>
                        <div className="text-sm mt-1 font-bold text-zinc-500">{product["price"]}원</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>상품이 존재하지 않습니다.</p>
            )}
          </div>
        ))}
      </div>

      <div ref={inViewRef} className="h-42 w-full">
        {isFetchingNextPage && <p>loading...</p>}
      </div>
    </>
  );
}