import { getProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

export default function Products() {
  // 판매상품 리스트 목록
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    "products",
    ({ pageParam }) => getProducts(pageParam),
    {
      getNextPageParam: (querySnapshot) => {
        // 다음 페이지 번호 가져오는
        console.log(querySnapshot.length, querySnapshot);
        if (querySnapshot.length < 12) {
          console.log("더이상 불러올게 없음");
          return null; // pageParam을 리턴
        } else {
          return querySnapshot[querySnapshot.length - 1].createdAt; // pageParam을 리턴
        }
      },
    }
  );
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
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
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#555555"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      <div>
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page ? (
              <div className="grid grid-cols-2 md:grid-cols-4">
                {page?.map((value: DocumentData, index: number) => {
                  return (
                    <div
                      className="flex flex-col justify-center items-center cursor-pointer"
                      key={index}
                      onClick={() => navigate("/product", { state: value as DocumentData })}
                    >
                      {value.image ? (
                        <img src={value["image"][0]} width={60} height={60} className="h-60 w-60" alt={value.name} />
                      ) : (
                        <div className="w-60 h-60 bg-zinc-100" />
                      )}
                      <div className="text-sm">{value["name"]}</div>
                      <div className="text-sm font-bold text-zinc-500">{value["price"]}원</div>
                      {/* 일단 맨 처음 있는 사진으로 하기(나중에 썸네일 설정 가능하게 바꾸기) */}
                      {/* {value["image"].map((src: string, index: number) => {
                    return <img key={index} className="h-20 w-20" src={src}></img>;
                  })} */}
                      {/* </div> */}
                    </div>
                  );
                })}
              </div>
            ) : (
              <>상품이 존재하지 않습니다.</>
            )}
          </div>
        ))}
      </div>
      <div ref={inViewRef} className="h-42 w-full">
        {/* loading indicator */}
        {isFetchingNextPage && <p>loading...</p>}
      </div>
    </>
  );
}
