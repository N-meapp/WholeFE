import React, { useState } from "react";
import Dashboard from "../../Components/Dashboard/Dashboard";
import ProductList from "../ProductList/ProductList";
import CustomerList from "../CustomerList/CustomerList";
import OrdersTable from "../../Components/OrdersTable/OrdersTable";
import SearchBox from "../../Components/SearchBox/SearchBox";
import CategoryList from "../../Components/CategoryList/CategoryList";
import Enquery from "../../Components/Enquery/Enquery";
import { useDispatch, useSelector } from "react-redux";

const NavbarAndTabs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const admin = useSelector((state) => state.admin.admin);


  const handleLogout = () => {
    dispatch({ type: "ADMIN_LOGOUT" }); // Clears both user and admin
};

  const dispatch = useDispatch();
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div><Dashboard /></div>;
      case 'products':
        return <div><ProductList /></div>;
      case 'costumers':
        return <div><CustomerList /></div>;
      case 'orders':
        return <div><OrdersTable /></div>;
      case 'category':
        return <div><CategoryList /></div>;
      case 'enquiry':
        return <div><Enquery /></div>;
      case 'profile':
        return <div>Edit your Profile here.</div>;
      case 'settings':
        return <div>Change your Settings here.</div>;
      case 'logout':
        return <div>You have logged out!</div>;
      default:
        return <div>Select a menu item to see the content.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[#5764df] text-white flex flex-col transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-lg font-bold ${isSidebarOpen ? "block" : "hidden"}`}>WholeApp</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-4 mt-7">
          <ul className="space-y-4">
            <li onClick={() => setActiveTab('dashboard')} className={`flex items-center cursor-pointer gap-4 hover:bg-[#ffffff] hover:text-[#3e447b] transition ease-in-out duration-300 p-2 rounded-xl ${
                  activeTab === 'dashboard' ? 'text-[#3e447b] border-indigo-500 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-[#ffffff] rounded-xl' : 'text-[#fff]'
                }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    //               <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
    //               <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    //             </svg>
             <span className={isSidebarOpen ? "block" : "hidden"}>Dashboard</span>
            </li>

            <li onClick={() => setActiveTab('products')} className={`flex items-center cursor-pointer gap-4 hover:bg-[#ffffff] hover:text-[#3e447b] transition ease-in-out duration-300 p-2 rounded-xl ${
                  activeTab === 'products' ? 'text-[#3e447b] border-indigo-500 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-[#ffffff] rounded-xl' : 'text-[#fff]'
                }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    //              <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    //             </svg>
              <span className={isSidebarOpen ? "block" : "hidden"}>Product</span>
            </li>

            <li onClick={() => setActiveTab('costumers')} className={`flex items-center cursor-pointer gap-4 hover:bg-[#ffffff] hover:text-[#3e447b] transition ease-in-out duration-300 p-2 rounded-xl ${
                  activeTab === 'costumers' ? 'text-[#3e447b] border-indigo-500 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-[#ffffff] rounded-xl' : 'text-[#fff]'
                }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    //               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    //             </svg>
              <span className={isSidebarOpen ? "block" : "hidden"}>Customers</span>
            </li>

            <li onClick={() => setActiveTab('orders')} className={`flex items-center cursor-pointer gap-4 hover:bg-[#ffffff] hover:text-[#3e447b] transition ease-in-out duration-300 p-2 rounded-xl ${
                  activeTab === 'orders' ? 'text-[#3e447b] border-indigo-500 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-[#ffffff] rounded-xl' : 'text-[#fff]'
                }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    //               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    //             </svg>
              <span className={isSidebarOpen ? "block" : "hidden"}>Orders</span>
            </li>

            <li onClick={() => setActiveTab('category')} className={`flex items-center cursor-pointer gap-4 hover:bg-[#ffffff] hover:text-[#3e447b] transition ease-in-out duration-300 p-2 rounded-xl ${
                  activeTab === 'category' ? 'text-[#3e447b] border-indigo-500 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-[#ffffff] rounded-xl' : 'text-[#fff]'
                }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
    //               <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
    //             </svg>
              <span className={isSidebarOpen ? "block" : "hidden"}>category
              </span>
            </li>
            <li onClick={() => setActiveTab('enquiry')} className={`flex items-center cursor-pointer gap-4 hover:bg-[#ffffff] hover:text-[#3e447b] transition ease-in-out duration-300 p-2 rounded-xl ${
                  activeTab === 'enquiry' ? 'text-[#3e447b] border-indigo-500 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-[#ffffff] rounded-xl' : 'text-[#fff]'
                }`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
              <span className={isSidebarOpen ? "block" : "hidden"}>Enquiry
              </span>
            </li>
          </ul>
        </nav>

        <div className="mt-auto p-4">
          <button className="flex items-center gap-4 hover:bg-[#ff5252] p-2 rounded-xl w-full transition ease-in-out duration-300">
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-1">
    //      <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
    //    </svg>
            <span className={isSidebarOpen ? "block" : "hidden"}>Logout</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <SearchBox />
          </div>

          <div className="hs-dropdown relative inline-flex">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        id="hs-dropdown-custom-trigger"
        type="button"
        className="hs-dropdown-toggle py-1 ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        aria-haspopup="menu"
        aria-expanded={isDropdownOpen ? "true" : "false"}
        aria-label="Dropdown"
      >
        <img
          className="w-8 h-auto rounded-full"
          src="https://img.freepik.com/free-vector/young-prince-vector-illustration_1308-174367.jpg?t=st=1738060653~exp=1738064253~hmac=8742b1467d69cce14637fd4f79982d3e1a27ea01bc51bf58b8ea6f297689571b&w=740"
          alt="Avatar"
        />
        <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-neutral-400">
        {admin?.admin}
        </span>
        <svg
          className={`hs-dropdown-open:rotate-180 size-4 ${isDropdownOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          className="absolute right-0 py-2 w-48 z-10 mt-12 hs-dropdown-menu duration min-w-60 bg-white shadow-lg rounded-xl dark:bg-neutral-800 dark:border dark:border-neutral-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="hs-dropdown-custom-trigger"
        >
          <div className="p-1 space-y-0.5">
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              href="#"
            >
              Messages
            </a>
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              href="#"
            >
              Settings
            </a>
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              href="#"
            >
              Downloads
            </a>
            <a onClick={handleLogout}
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-red-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              href="#"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
        </header>

        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default NavbarAndTabs;
