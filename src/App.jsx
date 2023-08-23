import { Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { Toaster } from "sonner";
import Nav from "./components/Nav";
import CartPage from "./pages/cartPage";
import ProductList from "./components/ProductList";
import Footer from "./components/footer";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <>
      <SkeletonTheme>
        {" "}
        <Nav />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>{" "}
        <Footer />
        <Toaster theme="dark" position="top-center" />
      </SkeletonTheme>
    </>
  );
}

export default App;
