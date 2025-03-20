const SelectBtn = ({ value, onChange }) => {
    return (
      <div className="relative inline-block w-full max-w-xs border-none">
      <select
        value={value} // Controlled value
        onChange={(e) => onChange(e.target.value)} // Handle change
        className="block bg-[#a8b0ff] cursor-pointer text-[#fff] appearance-none w-full hover:border-gray-400 px-4 py-2 pr-8 rounded-xl shadow-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      >
        <option value="null" className="cursor-pointer">
          Select
        </option>
        <option value="Accept" className="bg-green-400 cursor-pointer">
          Accept
        </option>
        <option value="Reject" className="bg-red-400 cursor-pointer">
          Reject
        </option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
    );
  };
  



  const SelectBtnTow = ({ value, onChange }) => {
    return (
      <div className="relative inline-block w-full max-w-xs border-none">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)} 
          className="block bg-[#3eda68] cursor-pointer text-[#fff] appearance-none w-full hover:border-gray-400 px-4 py-2 pr-8 rounded-xl shadow-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        >
          <option value="Select" className="cursor-pointer">
            Select status
          </option>
          <option value="Packed" className="cursor-pointer">
            Packed
          </option>
          <option value="Shipped" className="cursor-pointer">
            Shipped
          </option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    );
  };

  const SelectBtnModal = ({ value, onChange, options }) => {
    return (
      <select
        className="py-3 px-4 pe-9 block text-[#c8c8c8] shadow-md w-full border-2 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        value={value} 
        onChange={onChange}
      >
        <option value="">Select Category</option>
        {options}

      </select>
    );
  };
  
  
  export { SelectBtn, SelectBtnTow, SelectBtnModal };