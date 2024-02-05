// root of the project
import { Header } from "@/components/header";
// import {
//   DrawerLeft,
//   DrawerLeftTrigger,
//   DrawerLeftContent,
//   DrawerLeftHeader,
//   DrawerLeftTitle,
//   DrawerLeftFooter,
//   DrawerLeftClose,
// } from "@/components/ui/drawerLeft";
import {
  DrawerRight,
  DrawerRightTrigger,
  DrawerRightContent,
  DrawerRightHeader,
  // DrawerRightFooter,
  // DrawerRightClose,
} from "@/components/ui/drawerRight";
import DocsSidebarNav from "@/components/sidebar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "src/assets/logo.png";
import { Input } from "@/components/ui/formInput";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { HeaderNavItem } from "@/types";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/errorFallback";
import SearchFilterProducts from "@/components/searchFilterProducts";
import { SearchXIcon } from "lucide-react";

export const sidebarNav = [
  {
    title: "ROCK/POP/ETC",
    href: "/category/rock-pop-etc",
  },
  {
    title: "HIP HOP/R&B",
    href: "/category/hiphop-r&b",
  },
  {
    title: "JAZZ",
    href: "/category/jazz",
  },
  {
    title: "OST",
    href: "/category/ost",
  },
  {
    title: "K-POP",
    href: "/category/kpop",
  },
  {
    title: "J-POP/CITY POP/ASIA",
    href: "/category/jpop-citypop-asia",
  },
  {
    title: "MERCHANDISE",
    href: "/category/merchandise",
  },
];

export default function Layout() {
  const userInfo = useContext(AuthContext);
  const isAdmin = userInfo?.type === "관리자" ? true : false;
  const navigate = useNavigate();
  // 전역관리 유저타입 저장
  const headerNav: HeaderNavItem[] = [
    userInfo ? { title: "로그아웃", href: "/" } : { title: "로그인", href: "/login" },
    { title: "장바구니", href: "/basket" },
    !userInfo ? { title: "회원가입", href: "/signup" } : { title: "", href: "" },
    !isAdmin ? { title: "마이페이지", href: "/mypage" } : { title: "주문조회", href: "/orders" },
    // isAdmin && { title: "주문조회", href: "/orders" },
  ].filter((item) => item.title !== "" && item.href !== "");

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => navigate("/")}>
      <div className="w-full flex flex-col h-screen">
        <Header items={headerNav} />

        {/* 반응형 구현 */}
        <div className="md:px-12 md:py-8 md:flex md:flex-row md:flex-grow md:h-full">
          <div className="hidden md:inline-block">
            <Link to={"/"} className="flex flex-col mb-7">
              <img src={logo} width={120} height={120} alt={"logo"} />
            </Link>
            <DocsSidebarNav items={sidebarNav} />
          </div>

          <div className="md:hidden px-5 py-3 flex justify-between">
            <DocsSidebarNav items={sidebarNav} />
            <Link to={"/"}>
              <img src={logo} width={70} height={70} alt={"logo"} />
            </Link>
            {/* <div></div> */}
            <DrawerRight direction="right">
              <DrawerRightTrigger name="search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </DrawerRightTrigger>
              <DrawerRightContent className="w-[300px]">
                <SearchFilterProducts />
              </DrawerRightContent>
            </DrawerRight>
          </div>
          {/* <div className="md:flex-grow h-full px-6"> */}
          <div className="md:flex-grow md:px-0 h-full px-6">
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => navigate("/")}>
              <Outlet />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
