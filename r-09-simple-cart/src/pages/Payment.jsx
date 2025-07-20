import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export const Payment = () => {
    const [method, setMethod] = useState('CARD');
    const [couponCode, setCouponCode] = useState('');
    const [couponMessage, setCouponMessage] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { getTotalPrice, getOriginalTotalPrice, applyCoupon, clearCart } = useCart();
    const navigate = useNavigate();

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        const success = applyCoupon(couponCode);
        if (success) {
            setCouponMessage('Coupon applied successfully!');
        } else {
            setCouponMessage('Invalid coupon code.');
        }
    };

    const handleCardPayment = (e) => {
        setLoading(true);
        e.preventDefault();
        console.log("Simulating card payment...");
        setTimeout(() => {
            setLoading(false);
            setPaymentSuccess(true);
            clearCart();
        }, 1500);
    };

    const handleCashOnDelivery = (e) => {
        setLoading(true);
        e.preventDefault();
        console.log("Simulating Cash On Delivery order placement...");
        setTimeout(() => {
            setLoading(false);
            setPaymentSuccess(true);
            clearCart();
        }, 1500);
    };

    const originalPrice = getOriginalTotalPrice();
    const currentTotalPrice = getTotalPrice();
    const savings = originalPrice - currentTotalPrice;

    if (paymentSuccess) {
        return (
            <div className="mx-auto mt-4 max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl text-center py-20">
                    <h2 className="text-3xl font-bold text-green-600 sm:text-4xl">Congratulations! Your Order is Placed!</h2>
                    <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                        Thank you for your purchase. Your order has been successfully processed and will be delivered soon.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => navigate('/orders')}
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                        >
                            View Your Orders
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mx-auto mt-4 max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Desired Payment Method</h2>
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                        <div
                            className="inline-flex shadow-primary-3 gap-4 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-1 dark:focus:shadow-dark-1 dark:active:shadow-dark-1"
                            role="group"
                        >
                            <button
                                type="button"
                                className={`flex flex-col items-center cursor-pointer rounded-xl px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normaltransition duration-150 ease-in-out motion-reduce:transition-none ${
                                    method === 'CARD'
                                        ? 'bg-blue-100'
                                        : 'bg-gray-50'
                                }`}
                                data-twe-ripple-init
                                data-twe-ripple-color="light"
                                onClick={() => setMethod('CARD')}
                            >
                                <img
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                                    alt="Card"
                                    className="h-6 mb-1"
                                />
                                Card Payment
                            </button>
                            <button
                                type="button"
                                className={`flex flex-col items-center px-6 cursor-pointer rounded-xl pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out motion-reduce:transition-none ${
                                    method === 'CASH'
                                        ? 'bg-blue-100'
                                        : 'bg-gray-50'
                                }`}
                                data-twe-ripple-init
                                data-twe-ripple-color="light"
                                onClick={() => {
                                    setMethod('CASH');
                                    applyCoupon('');
                                }}
                            >
                                <svg className="h-6 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <rect x="2" y="7" width="20" height="10" rx="2" fill="#fbbf24" stroke="#f59e42" />
                                    <circle cx="12" cy="12" r="3" fill="#fff" stroke="#f59e42" />
                                </svg>
                                Cash On Delivery
                            </button>
                        </div>
                        {method === 'CARD' && (
                            <form
                                action="#"
                                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
                                onSubmit={handleCardPayment} // Handle form submission
                            >
                                <div className="mb-6 grid grid-cols-2 gap-4">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name (as displayed on card)* </label>
                                        <input type="text" id="full_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Talha Anjum" required />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Card number* </label>
                                        <input type="text" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                                    </div>
                                    <div>
                                        <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card expiration* </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <input id="card-expiration-input" type="date" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                                            CVV*
                                            <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" className="text-gray-400 hover:text-gray-900 dark:text-white">
                                                <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <div id="cvv-desc" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                                The last 3 digits on back of card
                                                <div className="tooltip-arrow" data-popper-arrow />
                                            </div>
                                        </label>
                                        <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••" required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="coupon-code" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Coupon Code</label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            id="coupon-code"
                                            className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                            placeholder="e.g., DISCOUNT10"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleApplyCoupon}
                                            className="rounded-r-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {couponMessage && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{couponMessage}</p>}
                                </div>
                                {
                                    loading ?
                                    (<button type="button" className="pointer-events-none inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong" disabled>
                                    <div className="inline-block text-black h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status" />
                                    <span>Loading...</span>
                                    </button>) :
                                    <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-teal-400 focus:outline-none focus:ring-4  focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Pay now</button>
                                }
                            </form>
                        )}
                        {method === 'CASH' && (
                            <form
                                action="#"
                                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
                                onSubmit={handleCashOnDelivery} // Handle form submission for COD
                            >
                                <div className="mb-6 grid grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="cod_full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full Name* </label>
                                        <input type="text" id="cod_full_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Sheikh Rashid" required />
                                    </div>
                                    <div>
                                        <label htmlFor="shipping_address" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Shipping Address* </label>
                                        <textarea id="shipping_address" rows="3" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="123 Main St, Johar Town, G.T. Road Lahore" required></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="phone_number" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>
                                        <input type="tel" id="phone_number" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="e.g., +923330022163" required />
                                    </div>
                                </div>
                                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-teal-400 focus:outline-none focus:ring-4  focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Place Order</button>
                                {
                                    loading &&
                                    (<button type="button" className="pointer-events-none inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong" disabled>
                                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status" />
                                    <span>Loading...</span>
                                    </button>)
                                }
                            </form>
                        )}
                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">Rs. {originalPrice.toFixed(2)}</dd>
                                    </dl>
                                    {savings > 0 && (
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                            <dd className="text-base font-medium text-green-500">-Rs. {savings.toFixed(2)}</dd>
                                        </dl>
                                    )}
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Shipping</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">Rs. 99.00</dd> {/* Example shipping cost */}
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">Rs. {(currentTotalPrice * 0.05).toFixed(2)}</dd> {/* Example 5% tax */}
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total Payable</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">Rs. {(currentTotalPrice + 99 + (currentTotalPrice * 0.05)).toFixed(2)}</dd>
                                </dl>
                            </div>
                            <div className="mt-6 flex items-center justify-center gap-8">
                                <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="PayPal" />
                                <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="Visa" />
                                <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="Visa Dark" />
                                <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="Mastercard" />
                                <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="Mastercard Dark" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}