import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { cart, clearCart, getTotalPrice, getTotalItems, setQuantity, removeFromCart } = useCart();

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 w-full">
      <div className="bg-white shadow-lg border border-slate-200 rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-slate-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => {
              if(item.quantity <= 0) return;
              return (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div>
                    <h4 className="text-slate-800 font-semibold">{item.title}</h4>
                    <p className="text-slate-600 text-sm">
                      {item.quantity} x Rs. {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center ml-2 mr-5">
                  <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 mr-2 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  onClick={() => setQuantity(item.id, item.quantity-1)}
                  >
                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                  </button>
                  {item.quantity}
                  <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 ml-2 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  onClick={() => setQuantity(item.id, item.quantity+1)}
                  >
                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
                <div className="font-bold text-slate-800 w-fit">
                  Rs. {(item.quantity * item.price).toFixed(2)}
                </div>
                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                onClick={() => removeFromCart(item.id)}
                >
                  <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                  </svg>
                  Remove
                </button>
              </div>
              )
            })}

            <div className="font-bold text-cyan-800 mb-2">
              <h2 className="text-zinc-950 text-2xl">Order Summary</h2>
              Total Items: {getTotalItems()}
              <br/>
              Total Price: Rs. {getTotalPrice().toFixed(2)}
            </div>

            <div className="font-bold text-cyan-950 mb-2">
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={clearCart}
                className="px-5 py-2 rounded-md cursor-pointer bg-red-600 text-white hover:bg-red-700 transition-all"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
