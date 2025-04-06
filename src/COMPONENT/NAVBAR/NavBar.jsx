import React, { useContext, useEffect } from 'react';
import NavBarCSS from "./NavBar.module.css";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import { myContext } from '../AUTH-CONTXT/AutheContext';
import imgLogo from "../IMAGES/freshcart-logo.svg";
import { cartContext } from '../CART-CONTEXT/CartContext';

function NavBar() {

    let { myToken, setMyToken } = useContext(myContext);
    let { numOfCartItems } = useContext(cartContext);
    
    let MyNaviggate = useNavigate();
    let tkn = localStorage.getItem("tkn");

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    function SignOut() {
        MyNaviggate("/Login");
        localStorage.removeItem("tkn");

    }

    return (
        <>
            <Disclosure as="nav" className={ NavBarCSS.nav + "  fixed top-0 left-0 right-0 z-50 shadow-xl bg-gray-600" } >
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center  justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon  className="block size-6 group-data-[open]:hidden" />
                                <XMarkIcon  className="hidden size-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
                            <img alt="Your Company" src={imgLogo} className="h-10 w-auto mt-2" />
                            <div className="hidden sm:ml-6 sm:block">
                                {tkn ? (
                                    <div className={NavBarCSS.AllLinks + " flex space-x-4 items-center py-4"}>
                                        <NavLink className='text-white hover:text-green-300' to="/Home">Home</NavLink>
                                        <NavLink className='text-white hover:text-green-300' to="/Categores">Categories</NavLink>
                                        <NavLink className='text-white hover:text-green-300' to="/Brandes">Brands</NavLink>
                                        <NavLink className='text-white hover:text-green-300' to="/Cart">Cart </NavLink>
                                        <NavLink className='text-white hover:text-green-300' to="/Wishlist">Wishlist </NavLink>
                                        <NavLink className='text-white hover:text-green-300' to="/allOrders">All Orders </NavLink>
                                    </div>
                                ) : ""}
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {tkn ? (
                                <Menu as="div" className="relative ml-3 ">
                                    
                                    <span onClick={SignOut} className="block px-4 py-2 text-sm  rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer"> <i class="fa-solid fa-right-from-bracket text-white "></i></span>

                                </Menu>
                            ) : (
                                <div className="w-20 flex  flex-col text-center ">
                                    <NavLink className='text-white hover:text-green-300' to="/Register">Register</NavLink>
                                    <NavLink className='text-white hover:text-green-300' to="/Login">Login</NavLink>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu links */}
                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-4 px-2 pt-2 pb-3">
                            <NavLink to="/Home" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600">
                                Home
                            </NavLink>
                            <NavLink to="/Categores" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600">
                                Categories
                            </NavLink>
                            <NavLink to="/Brandes" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600">
                                Brands
                            </NavLink>
                            <NavLink to="/Cart" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600">
                                Cart
                            </NavLink>
                            <NavLink to="/Wishlist" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600">
                            Wishlist
                            </NavLink>
                            <NavLink to="/allOrders" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600">
                            All Orders
                            </NavLink>
                        </div>
                    </DisclosurePanel>
                </div>
            </Disclosure>
        </>
    );
}

export default NavBar;

