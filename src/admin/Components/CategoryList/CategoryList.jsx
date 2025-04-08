import React, { useState } from 'react';
import { useEffect } from 'react';
import { categoryDelete, categoryPostData, fetchCategorydata } from '../../../api/adminApi';
import { showToast } from "../../Toast/Toast";

const BASE_URL = import.meta.env.VITE_IMG_URL;

const CategoryList = () => {
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("");
    const [categoryData, setCategoryData] = useState([])



    useEffect(() => {
        fetchCategorydata(setCategoryData)
    }, [])

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    const handleInputChange = (event) => {
        setCategory(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file || !category) {
            showToast("info", "Please upload a file and enter a category.");
            return;
        }

        try {
            const response = await categoryPostData(file, category);
            showToast("success", "Login Successfully!");
            setFile(null)
            setCategory("")
            fetchCategorydata(setCategoryData)
        } catch (error) {
            console.error("Upload failed:", error);
            // alert(`Upload failed: ${error.response?.data?.message || "Please try again."}`);
            showToast("error", `${error.response?.data?.message} somthing wrong create category!`);
        }
    };

    const handleDltCategory = async (id) => {
        try {
            const deletedId = await categoryDelete(id);
            setCategoryData(prevData => prevData.filter(item => item.id !== deletedId));
            showToast("success", "Category Deleted Successfully!");
            fetchCategorydata(setCategoryData);
        } catch (error) {
            console.error("Error deleting category", error);
            showToast("error", "Somthing wrong for delete category");
        }
    };


    return (
        <>
            <div class="bg-gray-100">

                <div class="max-w-xl mx-auto my-10">
                    <div className="relative text-gray-600 mb-[15px]">
                        <form onSubmit={handleSubmit} className="relative text-gray-600 mb-4">
                            <div className="flex gap-2">
                                <div className="relative inline-block">
                                    <input
                                        type="file"
                                        name="file-input"
                                        multiple
                                        id="file-input"
                                        className="absolute w-0.5 h-0.5 opacity-0 overflow-hidden -z-10"
                                        onChange={handleFileChange}
                                    />
                                    <label
                                        htmlFor="file-input"
                                        className="cursor-pointer inline-flex items-center rounded-full text-sm font-semibold text-gray-500 px-3 py-2.5 bg-white shadow-lg hover:bg-indigo-500 hover:text-white transition"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fas"
                                            data-icon="upload"
                                            className="h-4 mr-2"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                            ></path>
                                        </svg>
                                        <span>Upload file</span>
                                    </label>
                                </div>

                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Add New Category"
                                    className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none shadow-lg"
                                    value={category}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="absolute right-0 top-0 mt-3 mr-4"
                            >
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
                        </form>
                    </div>
                    <div className='rounded-xl h-[63vh] overflow-y-auto'>
                        <div class="bg-white shadow-lg rounded-xl overflow-hidden">
                            <ul class="divide-y divide-gray-200">
                                {categoryData.map((item) => (
                                    <li class="p-3 flex justify-between items-center user-card">
                                        <div class="flex items-center">
                                            <img class="w-10 h-10 rounded-full" src={`${item.image}`} alt="Christy" />
                                            <span class="ml-3 font-medium">{item.category_name}</span>
                                        </div>
                                        <div>
                                            <button onClick={() => handleDltCategory(item.id)} class="text-gray-500 hover:text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryList;