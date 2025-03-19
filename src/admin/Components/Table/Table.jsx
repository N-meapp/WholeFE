import React, { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import { SelectBtnModal } from '../SelectBtn/SelectBtn';
import { useEffect } from 'react';
import { CreatProduct, fetchCategorySelect, fetchProductTableList, handleDeleteproduct, ProductSerach, updateProduct } from '../../../api/adminApi';


const Table = () => {
  const [productTableData, setProductTableData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([])
  const [productName, setProductName] = useState("");
  const [productCount, setProductCount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [searchProducts, setSearchProducts] = useState('');
  const [serchedData, setSearchedData] = useState([]);
  const [category, setCategory] = useState([])
  const [fields, setFields] = useState([{ id: Date.now(), index_number: "0", from: "", to: "", rate: "" }]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selctProductId, setSelctProductId] = useState("")

  const [existingImages, setExistingImages] = useState([]); // Previously uploaded images
  const [newImages, setNewImages] = useState([]);
  const [newImageFile, setNewImageFile] = useState([])

  console.log(existingImages, "existingImages");
  console.log(newImages, "new image url");
  console.log(newImageFile, "new image file");
  
  
  


  // product update functions start...............
  const handleEditClick = (item) => {
    setSelectedProduct(item);
    setProductName(item.product_name || "");
    setProductCount(item.product_stock || "");
    setSelectedCategory(item.product_category || "");
    setDescription(item.product_description || "");
    setSelctProductId(item.id || "");
    setFields(Array.isArray(item.prize_range) && item.prize_range.length
      ? item.prize_range
      : [{ id: Date.now(), from: "", to: "", rate: "" }]
    );
    setSelectedImages(Array.isArray(item.product_images) && item.product_images.length
      ? item.product_images
      : []
    );
    setExistingImages(Array.isArray(item.product_images) && item.product_images.length
    ? item.product_images
    : []
  );

    // Open the modal after state updates
    setTimeout(() => {
      setIsOpenEdit(true);
    }, 0);
  };




  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.product_name || "");
      setProductCount(selectedProduct.product_stock || "");
      setSelectedCategory(selectedProduct.product_category || "");
      setDescription(selectedProduct.product_description || "");
      setFields(selectedProduct.prize_range?.length ? selectedProduct.prize_range : [{ id: Date.now(), from: "", to: "", rate: "" }]);
      setSelectedImages(selectedProduct.product_images && selectedProduct.product_images.length ? selectedProduct.product_images : []);
      setExistingImages(selectedProduct.product_images && selectedProduct.product_images.length ? selectedProduct.product_images : []);
    }
  }, [selectedProduct]);

  // product update functions start...............




  useEffect(() => {
    fetchProductTableList(setProductTableData)
    fetchCategorySelect(setCategory)
  }, [])

  // console.log(openModal, 'dataaaaaaa')

  const totalPages = Math.ceil(productTableData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productTableData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 6) {
      alert("You can select up to 6 images only.");
      return;
    }

    const imagePreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setSelectedImages(imagePreviews);
    setImages([...e.target.files])
  };


  const removeImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };



  const handleSubmit = async () => {
    try {
      const response = await CreatProduct(productName, productCount, selectedCategory, description, fields, images);
      console.log("Upload successful:", response);
      fetchProductTableList(setProductTableData)
      setIsOpen(false)
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateSubmit = async () => {
    try {
      const response = await updateProduct(productName, productCount, selectedCategory, description, fields, selctProductId, newImageFile, existingImages)
      console.log("product update successful:", response);
      fetchProductTableList(setProductTableData)
      setIsOpenEdit(false)
      alert("product updated succesfully")
    } catch (error) {
      console.log(error);
    }
  }

  const handleDltproduct = async (id) => {
    try {
      const deletedId = await handleDeleteproduct(id, window.alert);
      setProductTableData(prevData => prevData.filter(item => item.id !== deletedId))
      fetchProductTableList(setProductTableData)
    } catch (error) {
      console.log(error);
    }

  }

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchProducts(value);

    try {
      const result = await ProductSerach(value);
      if (result) {
        setSearchedData(result);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const addField = () => {
    setFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), index_number: `${prevFields.length}`, from: "", to: "", rate: "" }
    ]);
  };

  const handleChange = (id, field, value) => {
    setFields((prevFields) =>
      prevFields.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };





  const handleUpdateImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (newImages.length + files.length > 6) {
      alert("You can select up to 6 new images only.");
      return;
    }

    const imagePreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setNewImages((prev) => [...prev, ...imagePreviews]);
    setNewImageFile([...e.target.files])
  };

  const removeUpdateImage = (index, type) => {
    if (type === "existing") {
      setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else {
      setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };


  return (
    <>
      <div className="font-[sans-serif]">
        <div className='flex justify-between'>
          <div class="flex items-center h-10 intro-y mb-2">
            <h2 class="mr-5 text-lg font-medium truncate">Products</h2>
            <SearchBox
              valuee={searchProducts}
              onChangee={handleSearchChange}
            />
          </div>
          <div>
            <button onClick={() => setIsOpen(true)} className="px-4 py-2 text-[14px] rounded-full border-2 border-[#5764df] text-[#5764df] bg-tranparent hover:bg-[#333c8b] hover:text-[#fff] transition duration-200">
              Add Product
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className={`overflow-y-auto ${itemsPerPage > 6 ? 'max-h-[530px]' : ''} border rounded-2xl`}>
          <table className="min-w-full bg-white">
            <thead className="whitespace-nowrap">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-black">Name and Image</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Stock Count</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Category</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Min Price - Max Price</th>
                <th className="p-4 text-left text-sm font-semibold text-black">Action</th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {searchProducts.length > 0 ? serchedData.map((item) => (
                <tr key={item.id} className="odd:bg-blue-50">
                  <td className="p-4 text-sm">
                    <div className="flex items-center">
                      <img
                        src={item.product_images[0]}
                        className="w-12 h-12 rounded-full object-cover"
                        alt={item.product_name}
                      />
                      <div className="ml-4">
                        <p className="text-sm text-black">{item.product_name}</p>
                        <p className="text-xs text-gray-500">
                          {item.product_description.length > 20
                            ? item.product_description.substring(0, 20) + "..."
                            : item.product_description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-black">{item.product_stock}</td>
                  <td className="p-4 text-sm text-black">{item.product_category}</td>
                  <td className="p-4 text-sm text-black">
                    ₹{Math.min(...item.prize_range.map(range => range.price))} - ₹{Math.max(...item.prize_range.map(range => range.price))}
                  </td>
                  <td className="p-4">
                    <button className="mr-4" title="Edit" onClick={() => handleEditClick(product)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-[#5764df] hover:fill-blue-700"
                        viewBox="0 0 348.882 348.882">
                        <path
                          d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                          data-original="#000000" />
                        <path
                          d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                          data-original="#000000" />
                      </svg>
                    </button>
                    <button onClick={() => handleDltproduct(item.id)} title="Delete">
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
                :
                currentItems.map((item) => (
                  <tr key={item.id} className="odd:bg-blue-50">
                    <td className="p-4 text-sm">
                      <div className="flex items-center">
                        <img
                          src={item.product_images[0]}
                          className="w-12 h-12 rounded-full object-cover"
                          alt={item.product_name}
                        />
                        <div className="ml-4">
                          <p className="text-sm text-black">{item.product_name}</p>
                          <p className="text-xs text-gray-500">
                            {item.product_description.length > 20
                              ? item.product_description.substring(0, 20) + "..."
                              : item.product_description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-black">{item.product_stock}</td>
                    <td className="p-4 text-sm text-black">{item.product_category}</td>
                    <td className="p-4 text-sm text-black">
                      {/* ₹{Math.min(...item.prize_range.map(range => range.price))} - ₹{Math.max(...item.prize_range.map(range => range.price))} */}
                      {item.prize_range.map((price, index) => (
                        <div className='flex gap-2 text-[12px] text-[#828282]' key={index}>
                          <span className='text[]'>{price.from}</span>
                          <span>to  {price.to}</span>
                          <span className='text-[#5764df]'>= ₹{price.rate}</span>
                        </div>
                      ))}
                    </td>
                    <td className="p-4">
                      <button className="mr-4" title="Edit" onClick={() => handleEditClick(item)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-[#5764df] hover:fill-blue-700"
                          viewBox="0 0 348.882 348.882">
                          <path
                            d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                            data-original="#000000" />
                          <path
                            d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                            data-original="#000000" />
                        </svg>
                      </button>
                      <button onClick={() => handleDltproduct(item.id)} title="Delete">
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
                ))}

            </tbody>
          </table>
        </div>

        {/* Footer Controls */}
        <div className="flex justify-between items-center mt-4">
          {/* Showing Text - Left Aligned */}
          <div className="text-sm text-gray-500 flex-1">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, productTableData.length)} of {productTableData.length} entries
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
                  data-original="#000000"
                />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-4 py-2 rounded ${currentPage === index + 1
                  ? 'flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-7 h-7 rounded'
                  : 'flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded'
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
                  data-original="#000000"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Add product modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        modalClass={"hs-overlay fixed overflow-scroll inset-0 z-[80] flex items-center justify-center"}
        popupClass={"hs-overlay-animation-target scale-95 opacity-100 transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto bg-white rounded-2xl shadow-lg"}
        title="Add New Product"
        ModelContent={
          <>
            <div class="max-w-full space-y-3 w-full p-3">
              <input
                type="text"
                className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />

              <div className="flex gap-2">
                <input
                  type="number"
                  className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Product Count"
                  value={productCount}
                  onChange={(e) => setProductCount(e.target.value)}
                />
                <SelectBtnModal options={category.map((item) => (
                  <option key={item.id} value={item.category_name}>
                    {item.category_name}
                  </option>
                ))} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} />
              </div>

              <div className="space-y-3 w-full">
                <textarea
                  className="py-3 px-4 block shadow-lg w-full bg-[#fff] border-2 border-[#e8e8e8] rounded-2xl text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  rows="3"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div>
                {fields.map((field) => (
                  <div key={field.id} className="flex gap-1 mb-2">
                    <input
                      type="text"
                      className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm"
                      placeholder="From"
                      value={field.from}
                      onChange={(e) => handleChange(field.id, "from", e.target.value)}
                    />
                    <input
                      type="text"
                      className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm"
                      placeholder="To"
                      value={field.to}
                      onChange={(e) => handleChange(field.id, "to", e.target.value)}
                    />
                    <input
                      type="text"
                      className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm"
                      placeholder="Rate"
                      value={field.rate}
                      onChange={(e) => handleChange(field.id, "rate", e.target.value)}
                    />
                    <button onClick={addField} className="p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.6}
                        stroke="currentColor"
                        className="size-7 rounded-full text-gray-500 hover:text-indigo-500 hover:shadow-xl transition ease-in-out duration-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                {/* File Upload Box */}
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed 
                  rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-5 h-5 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleImageChange}
                  />
                </label>

                {/* Image Previews */}
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.url}
                          alt={`Selected ${index}`}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </>
        }
        submit={handleSubmit}
      />

      {/* Edit Modal */}
      <Modal
        isOpen={isOpenEdit}
        onClose={() => {
          setProductName("");
          setProductCount("");
          setSelectedCategory([]);
          setDescription("");
          setFields([{ id: Date.now(), from: "", to: "", rate: "" }])
          setSelectedImages([])
          setIsOpenEdit(false);
        }}
        modalClass={"hs-overlay overflow-scroll pt-[100px] fixed inset-0 z-[80] flex items-center justify-center"}
        popupClass={"hs-overlay-animation-target scale-95 opacity-100 transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto bg-white rounded-2xl shadow-lg"}
        title="Edit Product"
        ModelContent={
          <>
            <div class="max-w-full space-y-3 w-full p-3">
              <input
                type="text"
                className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Product Name"
                value={productName || ""}
                onChange={(e) => setProductName(e.target.value)}
              />

              <div className="flex gap-2">
                <input
                  type="number"
                  className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Product Count"
                  value={productCount}
                  onChange={(e) => setProductCount(e.target.value)}
                />
                <SelectBtnModal options={category.map((item) => (
                  <option key={item.id} value={item.category_name}>
                    {item.category_name}
                  </option>
                ))} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} />
              </div>

              <div className="space-y-3 w-full">
                <textarea
                  className="py-3 px-4 block shadow-lg w-full bg-[#fff] border-2 border-[#e8e8e8] rounded-2xl text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  rows="3"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div>
                {fields.map((field) => (
                  <div key={field.id} className="flex gap-1 mb-2">
                    <input
                      type="text"
                      className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm"
                      placeholder="From"
                      value={field.from}
                      onChange={(e) => handleChange(field.id, "from", e.target.value)}
                    />
                    <input
                      type="text"
                      className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm"
                      placeholder="To"
                      value={field.to}
                      onChange={(e) => handleChange(field.id, "to", e.target.value)}
                    />
                    <input
                      type="text"
                      className="py-3 px-5 block w-full shadow-lg border-2 border-[#e8e8e8] rounded-full text-sm"
                      placeholder="Rate"
                      value={field.rate}
                      onChange={(e) => handleChange(field.id, "rate", e.target.value)}
                    />
                    <button onClick={addField} className="p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.6}
                        stroke="currentColor"
                        className="size-7 rounded-full text-gray-500 hover:text-indigo-500 hover:shadow-xl transition ease-in-out duration-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                {/* File Upload Box */}
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed 
        rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-5 h-5 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleUpdateImageChange}
                  />
                </label>

                {/* Image Previews */}
                {(existingImages.length > 0 || newImages.length > 0) && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {/* Existing Images */}
                    {existingImages.map((image, index) => (
                      <div key={`existing-${index}`} className="relative">
                        <img
                          src={image.url || image}
                          alt={`Existing ${index}`}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => removeUpdateImage(index, "existing")}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* New Images */}
                    {newImages.map((image, index) => (
                      <div key={`new-${index}`} className="relative">
                        <img
                          src={image.url}
                          alt={`New ${index}`}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => removeImage(index, "new")}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </>
        }
        submit={handleUpdateSubmit}
      />

    </>
  );
};

export default Table;
