import { Suspense, lazy, useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PrivateRoutes from "./routes/private/admin/index.tsx";
import PublicRoutes from "./routes/public/index.tsx";
import { AuthContext } from "./context/authContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
("use client");

export default function App() {
  const userInfo = useContext(AuthContext);
  const isAdmin = localStorage.getItem("user type") == "관리자";

  const queryClient = new QueryClient();

  const Layout = lazy(() => import("./routes/index"));
  const Basket = lazy(() => import("./routes/public/basket"));
  const Order = lazy(() => import("./routes/public/order"));
  const RockPopEtc = lazy(() => import("./routes/public/category/rockpopetc"));
  const HipHopRandB = lazy(() => import("./routes/public/category/hiphopR&B"));
  const Jazz = lazy(() => import("./routes/public/category/jazz"));
  const OST = lazy(() => import("./routes/public/category/ost"));
  const KPop = lazy(() => import("./routes/public/category/kpop"));
  const Merchandise = lazy(() => import("./routes/public/category/merchandise"));
  const JPopCityPopAsia = lazy(() => import("./routes/public/category/jpopCityPopAsia"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>loading...</div>}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: "/basket", // order/basket
          element: <Basket />,
        },
        {
          path: "/order", // order/basket
          element: <Order />,
        },
        {
          path: "/category/rock-pop-etc",
          element: <RockPopEtc />,
        },
        {
          path: "/category/hiphop-r&b",
          element: <HipHopRandB />,
        },

        {
          path: "/category/jazz",
          element: <Jazz />,
        },
        {
          path: "/category/ost",
          element: <OST />,
        },
        {
          path: "/category/kpop",
          element: <KPop />,
        },
        {
          path: "/category/jpop-citypop-asia",
          element: <JPopCityPopAsia />,
        },
        {
          path: "/category/merchandise",
          element: <Merchandise />,
        },
        ...(isAdmin ? PrivateRoutes() : PublicRoutes(userInfo)),
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
