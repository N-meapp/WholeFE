import { useState } from "react";

const Table2 = () => {
  const [selectedValues, setSelectedValues] = useState({});

  const options = ["Option 1", "Option 2", "Option 3"];
  const tableData = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
    { id: 3, name: "Product C" },
  ];

  const handleSelectChange = (id, value) => {
    setSelectedValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="p-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2 text-center">{row.id}</td>
              <td className="border border-gray-300 px-4 py-2">{row.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  className="p-2 border border-gray-300 rounded-md"
                  value={selectedValues[row.id] || ""}
                  onChange={(e) => handleSelectChange(row.id, e.target.value)}
                >
                  <option value="">-- Select --</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
