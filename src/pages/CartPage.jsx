import { useDispatch, useSelector } from "react-redux";
import {
  incrementProduct,
  reduceOrRemoveProduct,
  removeItem,
} from "../redux/features/cart/cartSlice";
import { toast } from "sonner";

const CartPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const cartTotalPrice = products.cart.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );
  const handleRemoveItem = (product) => {
    dispatch(removeItem(product));
    toast.error(`${product.title.slice(0, 20)} was removed from cart`);
  };

  return (
    <div className="bg-gray-50 py-10">
      <h1 className="mb-10 text-center text-2xl font-bold">Your Cart</h1>

      {products.cart.length === 0 ? (
        <p className="text-center p-10">
          You do not have any item in your cart
        </p>
      ) : null}

      {products.cart.map((product) => {
        return (
          <div
            key={product.id}
            className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
          >
            <div className="rounded-lg md:w-2/3">
              <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start gap-2">
                <img
                  src={product.thumbnail}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {product.title}
                    </h2>
                    <p className="mt-1 text-md text-gray-700">
                      {product.brand}
                    </p>{" "}
                    <p className="mt-1 text-xs text-gray-700">
                      {product.description}
                    </p>
                    <p className="mt-1 text-xs text-gray-700">
                      Stock: {product.stock} units.
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100 gap-4">
                      {" "}
                      <button
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        onClick={() => dispatch(reduceOrRemoveProduct(product))}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <span>{product.quantity}</span>{" "}
                      <button
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        onClick={() => dispatch(incrementProduct(product))}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">{product.price}€</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        onClick={() => {
                          handleRemoveItem(product);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {products.cart.length === 0 ? null : (
        <div className="mx-auto rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 ">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{cartTotalPrice}€</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">Free</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{cartTotalPrice}€</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-emerald-500 py-1.5 font-medium text-emerald-50 hover:bg-emerald-600">
            Check out
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
