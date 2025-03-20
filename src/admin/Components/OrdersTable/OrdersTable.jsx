import React, { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import { SelectBtnTow, SelectBtn } from '../SelectBtn/SelectBtn';
import { useEffect } from 'react';
import { fetchOrdersList } from '../../../api/adminApi';


const OrdersTable = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderData, setOrderData] = useState([]);

useEffect(()=>{
  fetchOrdersList(setOrderData)
},[])
  
  // Sample data
  const [data, setData] = useState([
    { 
        id: 1,
        userId: 'firoz1212', 
        useremail: 'firoz@example.com', 
        quantity: 120,
        orderddate: '01/02/2025',
        ProductName: 'nike Air 1',
        price: 1200, 
        address:'puthichira HO vndipeta Changanashery',
        pincode:'686101',
        paymentStatus: 'Cash on devlivery',
        orderStatus:'Accept',
        image: 'https://img.freepik.com/free-photo/shoes_1203-8154.jpg?w=996'
    },

  ]);
  console.log(data, "sdfds");
  const totalPages = Math.ceil(orderData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrderData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, order_status: newStatus } : item
      )
    );
  };


  // const updateSelectBtn = (id,value)=>{
  //    try {

      
  //    } catch (error) {
      
  //    }
  // }

  return (
    <div className="font-[sans-serif]">

            <div class="flex items-center h-10 intro-y mb-2">
                <h2 class="mr-5 text-lg font-medium truncate">Products</h2>
               <SearchBox />

            </div>
      {/* Scrollable Container */}
      <div className={`overflow-y-auto ${itemsPerPage > 6 ? 'max-h-[550px]' : ''} border rounded-2xl`}>
        <table className="min-w-full bg-white">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-black">Product Name and Image</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Ordered User</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Ordered Qty</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Ordered Date</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Address and pin code</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Payment Status</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {orderData.map((item) => (
              <tr key={item.id} className="odd:bg-blue-50">
                <td className="p-4 text-sm">
                  <div className="flex items-center">
                    <img src={item.product_images[0]} className="w-12 h-12 rounded-full object-cover" alt={item.product_name} />
                    <div className="ml-4">
                      <p className="text-sm text-black">{item.product_name}</p>
                      <p className="text-xs text-gray-500">{item.user_id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-black">{item.user_id}</td>
                <td className="p-4 text-sm text-black">{item.total_count}</td>
                <td className="p-4 text-sm text-black">{item.orderddate}</td>
                <td className="p-4 text-sm text-black">
                    <p>{item.address}</p>
                    <p>Pincode: {item.pincode}</p>
                </td>
                <td className="p-4 text-sm text-black">{item.paymentStatus}</td>
                <td className="p-4">

                {item.order_status == 'null' ? (
    <SelectBtn
      value={item.order_status}
      onChange={(value) => updateOrderStatus(item.id, value)}
    />
  ) : item.order_status == "accepted" ? (
    <SelectBtnTow
      value={item.order_status}
      onChange={(value) => updateOrderStatus(item.id, value)}
    />
  ) : (
    <button class="bg-gray-300 px-4 py-2 cursor-not-allowed opacity-50 text-[#ff3232] rounded-xl" disabled>
    Rejected
  </button>
  )}

                {/* {item.orderStatus === 'Select' ? (
                     <SelectBtn
                       value={item.orderStatus}
                       onChange={(value) => updateOrderStatus(item.id, value)}
                     />
                   ) : (
                     <SelectBtnTow
                       value={item.orderStatus}
                       onChange={(value) => updateOrderStatus(item.id, value)}
                     />
                   )} */}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Controls */}
      <div className="flex justify-between items-center mt-4">
        {/* Showing Text */}
        <div className="text-sm text-gray-500 flex-1">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, orderData.length)} of {orderData.length} entries
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
              className={`px-4 py-2 rounded ${
                currentPage === index + 1 ? 'flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-7 h-7 rounded' : 'flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded'
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
  );
};

export default OrdersTable;
