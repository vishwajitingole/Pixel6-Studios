import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const List = ({ customers, editCustomer, deleteCustomer, handleSaveCustomer }) => {
  const [editableCustomer, setEditableCustomer] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (editingIndex !== null) {
      setEditableCustomer({ ...customers[editingIndex] });
    }
  }, [editingIndex, customers]);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    editCustomer(index); 
  };

  const handleSaveClick = () => {
    if (editableCustomer) {
        setEditingIndex(null);
      handleSaveCustomer(editingIndex, editableCustomer); 
    }
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditableCustomer(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableCustomer({ ...editableCustomer, [name]: value });
  };

  const handleAddressChange = (i, e) => {
    const { name, value } = e.target;
    const newAddresses = [...editableCustomer.addresses];
    newAddresses[i] = { ...newAddresses[i], [name]: value };
    setEditableCustomer({ ...editableCustomer, addresses: newAddresses });
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="mb-4 text-2xl font-bold text-center text-black animate-bounce">Customer List</h2>
      {customers.length == 0 ? (
        <p className="text-lg font-semibold text-center text-black">No customers added yet.</p>
      ) : (
        <ul className="space-y-4">
          {customers.map((customer, index) => (
            <motion.li
              key={index}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold">{customer.fullName}</h3>
                <p className="text-gray-600">{customer.email}</p>
                <p className="text-gray-600">{customer.mobile}</p>
                <p className="text-gray-600">{customer.pan}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(index)}
                  className="px-3 py-1 text-white bg-yellow-500 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCustomer(index)}
                  className="px-3 py-1 text-white bg-red-500 rounded-md"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
      {editingIndex !== null && editableCustomer && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Edit Customer</h2>
          <form onSubmit={(e) => e.preventDefault()} className="p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={editableCustomer.fullName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={editableCustomer.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={editableCustomer.mobile}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">PAN</label>
              <input
                type="text"
                name="pan"
                value={editableCustomer.pan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {editableCustomer.addresses.map((address, i) => (
              <div key={i} className="mb-4">
                <h3 className="mb-2 text-lg font-semibold">Address {i + 1}</h3>
                <input
                  type="text"
                  name="line1"
                  value={address.line1}
                  onChange={(e) => handleAddressChange(i, e)}
                  placeholder="Line 1"
                  className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="line2"
                  value={address.line2}
                  onChange={(e) => handleAddressChange(i, e)}
                  placeholder="Line 2"
                  className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={(e) => handleAddressChange(i, e)}
                  placeholder="City"
                  className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={(e) => handleAddressChange(i, e)}
                  placeholder="State"
                  className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="postcode"
                  value={address.postcode}
                  onChange={(e) => handleAddressChange(i, e)}
                  placeholder="Postcode"
                  className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCancelClick}
                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveClick}
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default List;
