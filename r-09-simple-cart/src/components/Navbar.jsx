import { NavLink } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export const Navbar = () => {
    const { getTotalItems } = useCart();

    return (
        <nav className="block w-full max-w-screen-lg px-4 mx-auto bg-white shadow-md rounded-md lg:px-8 lg:py-3 mt-2 hover:bg-gray-200">
            <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                <span className="mr-4 block py-1.5 text-base text-slate-800 font-semibold">
                    Simple Add to Cart Program
                </span>
                <div className="hidden lg:block">
                    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                        <li className="flex items-center cursor-pointer p-1 text-sm gap-x-2 text-slate-600 hover:text-fuchsia-950 hover:scale-110">
                            <NavLink to="/">
                                Products Listings
                            </NavLink>
                        </li>
                        <li className="flex items-center cursor-pointer p-1 text-sm gap-x-2 text-slate-600">
                            <NavLink to="/cart">
                                <div className="relative inline-flex">
                                    <div >
                                        <button
                                            className="inline-grid cursor-pointer min-h-[36px] min-w-[36px] select-none place-items-center rounded-md border border-slate-200 bg-slate-200 text-center align-middle font-sans text-sm font-medium leading-none text-slate-800 transition-all duration-300 ease-in hover:bg-slate-100">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="h-5 w-5">
                                                <path
                                                    d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <span className="absolute right-[6%] top-[6%] grid min-h-[10px] min-w-[10px] -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border border-slate-800 bg-slate-800 px-1 py-0.5 text-xs leading-none text-slate-50">
                                        { getTotalItems() }
                                    </span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}