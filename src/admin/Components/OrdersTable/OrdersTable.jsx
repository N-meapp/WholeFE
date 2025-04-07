import React, { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import { SelectBtnTow, SelectBtn } from '../SelectBtn/SelectBtn';
import { useEffect } from 'react';
import { fetchOrdersList, OrdersSerach, singleOrderStatusUpdating, updateAcceptAllRejectAllStatus, updateOrderTrackingStatus } from '../../../api/adminApi';
import Modal from '../Modal/Modal';
import { Await } from 'react-router-dom';
import { showToast } from "../../Toast/Toast";

const OrdersTable = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderData, setOrderData] = useState([]);
  const [searchOrders, setSearchOrders] = useState('');
  const [serchedData, setSearchedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selctOrderdata, setSelctOrderData] = useState([])
  const [singleRejectedData, setSingleRejectedData] = useState({
    userId: "",
    orderId: "",
    rejected_products: [],
  });

  const [acceptAndRejectedData, setAcceptAndRejectedData] = useState({
    userId: "",
    orderId: "",
    rejected_products: [],
    order_track: "",
    id: ""
  });

  const [orderTrackingStatus, setOrderTrackingStatus] = useState({
    id: "",
    order_track: "",
  });

  const [selectedStatus, setSelectedStatus] = useState("");
  // const [rejectallData, setRejectAllData] =useState([])


  console.log(serchedData, "dddddddddddddddddddddddddddddddddddd");
  


  useEffect(() => {
    fetchOrdersList(setOrderData)
  }, [])

  useEffect(() => {
    if (acceptAndRejectedData?.orderId) {
      sentUpdateTrackingStatus(acceptAndRejectedData);
    }
  }, [acceptAndRejectedData]); // Runs when state updates




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
      address: 'puthichira HO vndipeta Changanashery',
      pincode: '686101',
      paymentStatus: 'Cash on devlivery',
      orderStatus: 'Accept',
      image: 'https://img.freepik.com/free-photo/shoes_1203-8154.jpg?w=996'
    },

  ]);

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

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchOrders(value);

    try {
      const result = await OrdersSerach(value);
      if (result) {
        setSearchedData(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = (productId) => {
    setSingleRejectedData((prevState) => ({
      ...prevState, // Keep existing state properties
      rejected_products: [...(prevState.rejected_products || []), productId] // Ensure rejected_products exists before spreading
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await singleOrderStatusUpdating(singleRejectedData)
      console.log(response, "tttttttt");

      if (response.message == "Order updated successfully") {
        fetchOrdersList(setOrderData)
        setIsOpen(false)
        showToast("success", `${response.message}`);
      }

      console.log("updated successfully", response);
    } catch (error) {
      console.log(error);

    }
  }


  const updateTrackingStatus = (value, orderId, userid, Oid, orderProducts = []) => {
    const rejectedProducts = value === "Reject"
      ? orderProducts.filter(product => product.order_status === "Reject").map(product => product.product_id)
      : [];

    setAcceptAndRejectedData((prevData) => ({
      ...prevData,
      order_track: value,
      orderId: orderId,
      userId: userid,
      rejected_products: rejectedProducts,
      id: Oid // Store rejected product IDs
    }));
  };



  const setRejectAllData = (orderProducts) => {
    if (!orderProducts || orderProducts.length === 0) {
      console.warn("No order products found");
      return;
    }
  
    const rejectedProductIds = orderProducts.map(product => product.product_id);
    console.log(rejectedProductIds, "rejectedProductIds");
  
    setAcceptAndRejectedData(prevData => ({
      ...prevData,
      rejected_products: rejectedProductIds, // Ensure state updates correctly
    }));
  };

  // Send updated tracking status
  const sentUpdateTrackingStatus = async (data) => {
    try {
      const resp = await updateAcceptAllRejectAllStatus(data, data.id);
      console.log(resp, "status updated");
      fetchOrdersList(setOrderData);
    } catch (error) {
      console.log(error);
    }
  };


  const orderTrackingChange = (id, value) => {
    const updatedState = {
      id: id,
      order_track: value,
    };

    setOrderTrackingStatus(updatedState);  // Update state
    sentOrderTrackingStatus(updatedState); // Pass the updated state immediately
  };

  const sentOrderTrackingStatus = async (updatedState) => {
    try {
      const resp = await updateOrderTrackingStatus(updatedState); // Use the passed state
      console.log(resp, "order tracking updated");
      fetchOrdersList(setOrderData);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="font-[sans-serif]">

      <div class="flex items-center h-10 intro-y mb-2">
        <h2 class="mr-5 text-lg font-medium truncate">Orders</h2>
        <SearchBox
          valuee={searchOrders}
          onChangee={handleSearchChange}
        />

      </div>
      {/* Scrollable Container */}
      <div className={`overflow-y-auto ${itemsPerPage > 6 ? 'max-h-[550px]' : ''} border rounded-2xl`}>
        <table className="min-w-full bg-white">
          <thead className="whitespace-nowrap">
            {/* userid and image, address, order id, date, tottel ammount */}
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-black">UserId and user image</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Address and Pincode</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Order Id</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Orderd date</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Total Ammount</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Payment Status</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {searchOrders.length > 0 ? serchedData.map((item) => {
              const products = item.order_products;

              // Check order status conditions
              const allNull = products.every((product) => product.order_status === "null");
              const allAccepted = products.every((product) => product.order_status === "Accept");
              const allRejected = products.every((product) => product.order_status === "Reject");
              const rejectedCount = products.filter((product) => product.order_status === "Reject").length;
              const hasRejection = rejectedCount > 0;// At least one product is rejected

              // Function to update all order statuses
              const updateAllOrderStatus = (orderId, status) => {
                products.forEach((product) => updateOrderStatus(product.product_id, status));
                setSelectedStatus(status); // Update UI state
              };

              return (
                <tr key={item.id} className="odd:bg-blue-50">
                  <td className="p-4 text-sm">
                    <div className="flex items-center">
                      <img src={item.profile_image} className="w-12 h-12 rounded-full object-cover" alt={item.username} />
                      <div className="ml-4">
                        <p className="text-sm text-black">{item.username}</p>
                        <p className="text-xs text-gray-500">{item.userid}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-black">{item.address}</td>
                  <td className="p-4 text-sm text-black">{item.order_id}</td>
                  <td className="p-4 text-sm text-black">{item.date}</td>
                  <td className="p-4 text-sm text-black">{item.final_amount}</td>
                  {/* <td className="p-4 text-sm text-black">{item.total_amount}</td> */}

                  <td className="p-4">

                    {products.length === 0 ? (
                      <span className="text-gray-500">No actions available</span>
                    ) : allNull ? (
                      // If all products are null, show SelectBtn
                      <SelectBtn
                      value={acceptAndRejectedData.order_track}
                      onChange={(value) => {
                        updateTrackingStatus(value, item.order_id, item.userid, item.id);
                 //     updateTrackingStatus(value, item.order_id, item.userid, item.id);

                        if (value === "Reject" && item.order_details.order_products?.length > 0) {
                          setRejectAllData(item.order_details.order_products);
                        }
                        sentUpdateTrackingStatus();
                      }}
                    />

                    ) : allAccepted ? (
                      // If all products are accepted, show SelectBtnTow
                      <SelectBtnTow
                        value={item.order_track}
                        onChange={(value) => orderTrackingChange(item.order_details.id, value)}
                      />
                    ) : allRejected ? (
                      // If all products are rejected, show the disabled button
                      <button className="bg-gray-300 px-4 py-2 cursor-not-allowed opacity-50 text-[#ff3232] rounded-xl" disabled>
                        Rejected
                      </button>
                    ) : (
                      // If some are rejected, show SelectBtnTow + rejected count
                      <div>
                        <SelectBtnTow
                          value={item.order_track}
                          onChange={(value) => orderTrackingChange(item.order_details.id, value)}
                        />
                        <p className="text-red-500 mt-2 text-[11px]">
                          {rejectedCount} ordered product{rejectedCount > 1 ? "s" : ""} rejected
                        </p>
                      </div>
                    )}


                  </td>

                  <td>
                    <button onClick={() => {
                      setIsOpen(true);
                      setSelctOrderData(item.order_products)
                    }
                    }>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </td>

                  {/* Orderd Product modal */}
                  <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    modalClass={"hs-overlay fixed inset-0 z-[80] flex items-center justify-center"}
                    popupClass={" hs-overlay-animation-target scale-95 opacity-100 transition-all duration-200 sm:max-w- sm:w-full m-3 sm:mx-auto bg-white rounded-2xl shadow-lg"}

                    title="Orderd Products"
                    ModelContent={
                      <>


                        <table className="min-w-full bg-white">
                          <thead className="whitespace-nowrap">
                            <tr>
                              <th className="p-4 text-left text-sm font-semibold text-black">Product Name and Image</th>
                              <th className="p-4 text-left text-sm font-semibold text-black">Category</th>
                              <th className="p-4 text-left text-sm font-semibold text-black">Ordered Qty</th>
                              <th className="p-4 text-left text-sm font-semibold text-black">Product Id</th>
                              <th className="p-4 text-left text-sm font-semibold text-black">Tottal Ammount</th>
                              <th className="p-4 text-left text-sm font-semibold text-black">Payment Status</th>
                              <th className="p-4 text-left text-sm font-semibold text-black">Action</th>
                            </tr>
                          </thead>

                          <tbody className="whitespace-nowrap">
                            {selctOrderdata.map((product, productIndex) => (
                              <tr className="odd:bg-blue-50">
                                <td className="p-4 text-sm">
                                  <div className="flex items-center">
                                    <img src={product.product_images[0]} className="w-12 h-12 rounded-full object-cover" alt={product.product_name} />
                                    <div className="ml-4">
                                      <p className="text-sm text-black">{product.product_category}</p>
                                      <p className="text-xs text-gray-500">{product.product_name}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 text-sm text-black">{product.product_category}</td>
                                <td className="p-4 text-sm text-black">{product.count}</td>
                                <td className="p-4 text-sm text-black">{product.product_id}</td>
                                <td className="p-4 text-sm text-black">{product.total_amount}</td>
                                <td className="p-4 text-sm text-black">SDFDS</td>
                                <td className="p-4">

                                  {product.order_status === "null" ? (
                                    <button
                                      onClick={() => handleReject(product.product_id, item.order_details.userid, item.order_details.order_id)}
                                      class="bg-gray-300 px-4 py-2 text-[#ff3232] rounded-xl">
                                      Reject
                                    </button>
                                  ) : product.order_status === "accepted" ? (
                                    <p className='text-sm text-[#3abe2f]'>Accepetd</p>
                                  ) : (
                                    <p className='text-sm text-[#e92f2f]'>Rejected</p>
                                  )
                                  }
                                </td>
                              </ tr>
                            ))}
                          </tbody>
                        </ table >

                      </>
                    }
                    submit={handleSubmit}
                  />

                </tr>
              )
            })
              :
              // orderData 
              currentItems.map((item) => {
                const products = item.order_details.order_products;

                // Check order status conditions
                const allNull = products.every((product) => product.order_status === "null");
                const allAccepted = products.every((product) => product.order_status === "Accept");
                const allRejected = products.every((product) => product.order_status === "Reject");
                const rejectedCount = products.filter((product) => product.order_status === "Reject").length;
                const hasRejection = rejectedCount > 0; // At least one product is rejected

                // Function to update all order statuses
                const updateAllOrderStatus = (orderId, status) => {
                  products.forEach((product) => updateOrderStatus(product.product_id, status));
                  setSelectedStatus(status); // Update UI state
                };

                return (
                  <tr key={item.id} className="odd:bg-blue-50">
                    <td className="p-4 text-sm">
                      <div className="flex items-center">
                        <img src={item.order_details.profile_image} className="w-12 h-12 rounded-full object-cover" alt={item.order_details.username} />
                        <div className="ml-4">
                          <p className="text-sm text-black">{item.order_details.username}</p>
                          <p className="text-xs text-gray-500">{item.order_details.userid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-black">{item.order_details.address}</td>
                    <td className="p-4 text-sm text-black">{item.order_details.order_id}</td>
                    <td className="p-4 text-sm text-black">{item.order_details.date}</td>
                    <td className="p-4 text-sm text-black">{item.order_details.final_amount}</td>
                    {/* <td className="p-4 text-sm text-black">{item.total_amount}</td> */}

                    <td className="p-4">

                      {products.length === 0 ? (
                        <span className="text-gray-500">No actions available</span>
                      ) : allNull ? (
                        // If all products are null, show SelectBtn
                        <SelectBtn
                          value={acceptAndRejectedData.order_track}
                          onChange={(value) => {
                            updateTrackingStatus(value, item.order_details.order_id, item.order_details.userid, item.order_details.id);

                            if (value === "Reject" && item.order_details.order_products?.length > 0) {
                              setRejectAllData(item.order_details.order_products);
                            }

                            sentUpdateTrackingStatus();
                          }}
                        />


                  

                      ) : allAccepted ? (
                        // If all products are accepted, show SelectBtnTow
                        <SelectBtnTow
                          value={item.order_details.order_track}
                          onChange={(value) => orderTrackingChange(item.order_details.id, value)}
                        />
                      ) : allRejected ? (
                        // If all products are rejected, show the disabled button
                        <button className="bg-gray-300 px-4 py-2 cursor-not-allowed opacity-50 text-[#ff3232] rounded-xl" disabled>
                          Rejected
                        </button>
                      ) : (
                        // If some are rejected, show SelectBtnTow + rejected count
                        <div>
                          <SelectBtnTow
                            value={item.order_details.order_track}
                            onChange={(value) => orderTrackingChange(item.order_details.id, value)}
                          />
                          <p className="text-red-500 mt-2 text-[11px]">
                            {rejectedCount} ordered product{rejectedCount > 1 ? "s" : ""} rejected
                          </p>
                        </div>
                      )}
                    </td>

                    <td>
                      <button onClick={() => {
                        setIsOpen(true);
                        setSelctOrderData(item.order_details.order_products)
                        setSingleRejectedData({
                          userId: item.order_details.userid,
                          orderId: item.order_details.order_id
                        })
                      }
                      }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    </td>

                    {/* Orderd Product modal */}
                    <Modal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      modalClass={"hs-overlay fixed inset-0 z-[80] flex items-center justify-center"}
                      popupClass={" hs-overlay-animation-target scale-95 opacity-100 transition-all duration-200 sm:max-w- sm:w-full m-3 sm:mx-auto bg-white rounded-2xl shadow-lg"}

                      title="Orderd Products"
                      ModelContent={
                        <>


                          <table className="min-w-full bg-white">
                            <thead className="whitespace-nowrap">
                              <tr>
                                <th className="p-4 text-left text-sm font-semibold text-black">Product Name and Image</th>
                                <th className="p-4 text-left text-sm font-semibold text-black">Category</th>
                                <th className="p-4 text-left text-sm font-semibold text-black">Ordered Qty</th>
                                <th className="p-4 text-left text-sm font-semibold text-black">Product Id</th>
                                <th className="p-4 text-left text-sm font-semibold text-black">Tottal Ammount</th>
                                <th className="p-4 text-left text-sm font-semibold text-black">Payment Status</th>
                                <th className="p-4 text-left text-sm font-semibold text-black">Action</th>
                              </tr>
                            </thead>

                            <tbody className="whitespace-nowrap">
                              {selctOrderdata.map((product, productIndex) => (
                                <tr className="odd:bg-blue-50">
                                  <td className="p-4 text-sm">
                                    <div className="flex items-center">
                                      <img src={product.product_images[0]} className="w-12 h-12 rounded-full object-cover" alt={product.product_name} />
                                      <div className="ml-4">
                                        <p className="text-sm text-black">{product.product_category}</p>
                                        <p className="text-xs text-gray-500">{product.product_name}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4 text-sm text-black">{product.product_category}</td>
                                  <td className="p-4 text-sm text-black">{product.count}</td>
                                  <td className="p-4 text-sm text-black">{product.product_id}</td>
                                  <td className="p-4 text-sm text-black">{product.total_amount}</td>
                                  <td className="p-4 text-sm text-black">SDFDS</td>
                                  <td className="p-4">

                                    {product.order_status === "null" ? (
                                      <button
                                        onClick={(e) => {
                                          // Change button color permanently
                                          e.target.classList.remove("bg-gray-300", "text-[#ff3232]");
                                          e.target.classList.add("bg-red-500", "text-white");

                                          // Call function only if product ID exists
                                          if (product?.product_id) {
                                            handleReject(product.product_id);
                                          } else {
                                            console.error("Product ID is missing or incorrect!");
                                          }
                                        }}
                                        className="bg-gray-300 px-4 py-2 text-[#ff3232] rounded-xl transition-colors duration-300"
                                      >
                                        Reject
                                      </button>
                                    ) : product.order_status === "Accept" ? (
                                      <p className='text-sm text-[#3abe2f]'>Accepetd</p>
                                    ) : (
                                      <p className='text-sm text-[#e92f2f]'>Rejected</p>
                                    )
                                    }
                                  </td>
                                </ tr>
                              ))}
                            </tbody>
                          </ table >

                        </>
                      }
                      submit={handleSubmit}
                    />

                  </tr>
                )
              })

            }
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
  );
};

export default OrdersTable;
