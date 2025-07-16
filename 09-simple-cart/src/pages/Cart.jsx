import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { cart, clearCart, getTotalPrice, getTotalItems } = useCart();

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="bg-white shadow-lg border border-slate-200 rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-slate-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
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
                <div className="font-bold text-slate-800 w-fit">
                  Rs. {(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="font-bold text-blue-800"> Total Items: 
              {getTotalItems()}
            </div>

            <div className="font-bold text-blue-800"> Total Price: 
              Rs. {getTotalPrice()}
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
