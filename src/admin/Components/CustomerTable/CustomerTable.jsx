import React, { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import { SelectBtnModal } from '../SelectBtn/SelectBtn';
import { useEffect } from 'react';
import { customerDelete, fetchCustomerTableList, postCreatCostumer, updateCustomer, updateStatus } from '../../../api/adminApi';
import { alert } from '@material-tailwind/react';
import { showToast } from "../../Toast/Toast";

const BASE_URL = import.meta.env.VITE_IMG_URL;


const CustomerTable = () => {
  const [costumerTableData, setCostumerTableData] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [discount, setDiscount] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedCustomer, setSelectedcustomer] = useState('')
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectUpdateCustomer, setSelectUpdateCustomer] = useState([])


  useEffect(() => {
    fetchCustomerTableList(setCostumerTableData)
  }, [])


  // Sample data
  const [data, setValue] = useState([
    { id: 1, name: 'Gladys Jones', email: 'gladys@example.com', block: true, username: 'gladys@example.com', price: 1200, image: 'https://readymadeui.com/profile_6.webp' },
    { id: 2, name: 'John Doe', email: 'john@example.com', block: false, username: 'gladys@example.com', price: 1100, image: 'https://readymadeui.com/profile_3.webp' },
    { id: 3, name: 'Emma Smith', email: 'emma@example.com', block: false, username: 'gladys@example.com', price: 1300, image: 'https://readymadeui.com/profile_5.webp' },
    { id: 4, name: 'Michael Brown', email: 'michael@example.com', block: false, username: 'gladys@example.com', price: 900, image: 'https://readymadeui.com/profile_6.webp' },
    { id: 5, name: 'Alice Green', email: 'alice@example.com', block: false, username: 'gladys@example.com', price: 1400, image: 'https://readymadeui.com/profile_3.webp' },
    { id: 6, name: 'Robert White', email: 'robert@example.com', block: false, username: 'gladys@example.com', price: 1500, image: 'https://readymadeui.com/profile_5.webp' },
    { id: 7, name: 'Jessica Black', email: 'jessica@example.com', block: false, username: 'gladys@example.com', price: 1600, image: 'https://readymadeui.com/profile_6.webp' },
    { id: 8, name: 'Sophia Johnson', email: 'sophia@example.com', block: false, username: 'gladys@example.com', price: 1700, image: 'https://readymadeui.com/profile_3.webp' },
    { id: 9, name: 'Liam Wilson', email: 'liam@example.com', block: false, username: 'gladys@example.com', price: 950, image: 'https://readymadeui.com/profile_5.webp' },
  ]);

  const filteredCustomers = (costumerTableData || [])?.filter((customer) =>
    customer?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer?.permanent_address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic applied to filteredCustomers
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);



  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSubmit = async () => {
    try {

      if (password === confirmPassword) {
        const response = await postCreatCostumer(userName, confirmPassword, discount)
        showToast("success", "Created Customer Successfully!");
        fetchCustomerTableList(setCostumerTableData)
        setIsOpen(false)

      } else {
        showToast("error", "password not matched!");

      }

    } catch (error) {
      console.log(error);

    }
  }

  const handleDltCustomer = async (id) => {
    try {
      const deletedId = await customerDelete(id, window.alert);
      setCostumerTableData(prevData => prevData.filter(item => item.id !== deletedId));
      showToast("success", "Deleted Customer succsessfully");
      fetchCustomerTableList(setCostumerTableData);
    } catch (error) {
      console.error("Error deleting customer", error);
      showToast("eroor", "Something error deleting Customer");
    }
  };


  // update functions 
  const [formData, setFormData] = useState({
    username: costumerTableData?.username || "",
    password: "",
    confirmPassword: "",
    discount_individual: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleUpdate = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await updateCustomer(
        selectedCustomer,
        formData.username,
        formData.password,
        formData.discount_individual,
        setIsOpenEdit
      );

      console.log(response, "update customers response");

      if (response) {
        setIsOpenEdit(false);
        fetchCustomerTableList(setCostumerTableData);
        showToast("success", "Updated Customer Successfully!");
      } else {
        throw new Error("No response received from server.");
      }

    } catch (error) {
      console.log("Error updating customer:", error);
      showToast("error", `Something went wrong: ${error.message || error}`);
      fetchCustomerTableList(setCostumerTableData);
    }
  };



  // const filteredCustomers = costumerTableData?.filter((customer) =>
  // (customer?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   customer?.permanent_address?.toLowerCase().includes(searchTerm.toLowerCase()))
  // );

  // const filteredCustomers = (costumerTableData || [])?.filter((customer) =>
  //   customer?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   customer?.permanent_address?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (

    <>
      <div className="font-[sans-serif]">
        <div className='flex justify-between'>
          <div class="flex items-center h-10 intro-y mb-2">
            <h2 class="mr-5 text-lg font-medium truncate">Customers</h2>
            <SearchBox
              valuee={searchTerm}
              onChangee={(e) => setSearchTerm(e.target.value)}
            />

            {/* <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /> */}
          </div>
          <div>
            <button onClick={() => setIsOpen(true)} className="px-4 py-2 text-[14px] rounded-full border-2 border-[#5764df] text-[#5764df] bg-tranparent hover:bg-[#333c8b] hover:text-[#fff] transition duration-200">
              Create Customers
            </button>
          </div>
        </div>
        {/* Scrollable Container */}
        <div className={`overflow-y-auto ${itemsPerPage > 6 ? 'max-h-[550px]' : ''} border rounded-2xl`}>
          <table className="min-w-full bg-white">
            <thead className="whitespace-nowrap">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-black">Name and Image</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Block</th>
                <th className="p-4 text-left text-sm font-semibold text-black">User Name</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Discount</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Action</th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (

                  <tr key={item.id} className="odd:bg-blue-50">
                    <td className="p-4 text-sm">
                      <div className="flex items-center">
                        <img src={`${item.profile_image}`} className="w-12 h-12 rounded-full object-cover" alt={item.username} />
                        <div className="ml-4">
                          <p className="text-sm text-black">{item.username}</p>
                          <p className="text-xs text-gray-500">{item.permanent_adress}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-black">

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.status}
                          onChange={async () => {
                            try {
                              const updatedStatus = !item.status;
                              await updateStatus(item.id, updatedStatus);
                              setCostumerTableData((prevData) =>
                                prevData.map((dataItem) =>
                                  dataItem.id === item.id
                                    ? { ...dataItem, status: updatedStatus }
                                    : dataItem
                                )
                              );
                            } catch (error) {
                              console.error("Error updating status", error);
                            }
                          }}
                          className="sr-only"
                        />

                        <div
                          className={`w-12 h-6 rounded-full transition-all duration-300 relative ${item.status ? "bg-[#5764df]" : "bg-gray-300"
                            }`}
                        >
                          <div
                            className={`absolute top-1 w-4 h-4 bg-white border border-gray-300 rounded-full 
                                transition-all duration-300 ${item.status ? "translate-x-7" : "left-1"}`}
                          ></div>
                        </div>
                      </label>


                    </td>
                    <td className="p-4 text-sm text-black">{item.username}</td>
                    <td className="p-4 text-sm text-black">{item.discount_individual} %</td>
                    <td className="p-4">
                      <button className="mr-4" title="Edit" onClick={() => {
                        setIsOpenEdit(true);
                        setSelectedcustomer(item.id);

                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-[#5764df] hover:fill-[#4e5ef0]"
                          viewBox="0 0 348.882 348.882">
                          <path
                            d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                            data-original="#000000" />
                          <path
                            d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                            data-original="#000000" />
                        </svg>
                      </button>
                      <button onClick={() => handleDltCustomer(item.id)} title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                          <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000" />
                          <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000" />
                        </svg>
                      </button>
                    </td>
                  </tr>

                ))
              ) : (
                <tr>
                  <td className="p-4 text-center" colSpan="4">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Controls */}
        <div className="flex justify-between items-center mt-4">
          {/* Showing Text */}
          <div className="text-sm text-gray-500 flex-1">
            Showing {filteredCustomers.length === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} entries
          </div>


          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            <label className="flex items-center text-sm text-gray-500">
              Display
              <select
                className="text-sm text-gray-500 border border-gray-400 rounded h-7 mx-4 px-1 outline-none"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </label>
            <button
              className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-7 h-7 rounded' : 'flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded'
                  }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000" />
              </svg>
            </button>
          </div>
        </div>
      </div>


      {/* Create costumer modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Costumer"
        modalClass={"hs-overlay overflow-scroll fixed inset-0 z-[80] flex items-center justify-center"}
        popupClass={"hs-overlay-animation-target scale-95 opacity-100 transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto bg-white rounded-2xl shadow-lg"}
        ModelContent={
          <>
            <form>
              <div class="max-w-full space-y-3 w-full p-3">
                <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" class="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="User Name" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" class="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Password" />
                <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" class="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Password" />
                <input
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    if (value < 0) value = 0;
                    if (value > 100) value = 100;
                    setDiscount(value);
                  }}
                  value={discount}
                  type="number"
                  min="1"
                  max="100"
                  class="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter Discount (1-100%)"
                />

              </div>
            </form>
          </>
        }
        submit={handleSubmit}
      />

      {/* Costumer Edit Modal */}
      <Modal
        isOpen={isOpenEdit}
        onClose={() => {
          setIsOpenEdit(false)
          setFormData({ username: '', password: '', })
        }}
        title="Edit Customer"
        modalClass={"hs-overlay overflow-scroll fixed inset-0 z-[80] flex items-center justify-center"}
        popupClass={"hs-overlay-animation-target scale-95 opacity-100 transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto bg-white rounded-2xl shadow-lg"}
        ModelContent={
          <>
            <form>
              <div className="max-w-full space-y-3 w-full p-3">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="User Name"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Password"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Confirm Password"
                />
                <input
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    if (value < 0) value = 0;
                    if (value > 100) value = 100;

                    setFormData((prevData) => ({
                      ...prevData,
                      discount_individual: value, // Update formData directly
                    }));
                  }}
                  value={formData.discount_individual} // Use formData
                  type="number"
                  min="1"
                  max="100"
                  name="discount_individual"
                  class="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter Discount (1-100%)"
                />
                {/* <button
              onClick={}
              className="w-full py-3 px-5 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
            >
              Update Customer
            </button> */}
              </div>
            </form>
          </>
        }
        submit={handleUpdate}
      />

    </>

  );
};

export default CustomerTable;
