import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, editCustomer, deleteCustomer } from './store/customerReducer';
import Form from './Components/Form';
import List from './Components/List';

const App = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);
  const [editableCustomer, setEditableCustomer] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddCustomer = (customer) => {
    dispatch(addCustomer(customer));
  };

  const handleEditCustomer = (index) => {
    setEditingIndex(index);
    setEditableCustomer({ ...customers[index] });
  };

  const handleSaveCustomer = (index, updatedCustomer) => {
    dispatch(editCustomer({ index, updatedCustomer }));
    setEditingIndex(null);
    setEditableCustomer(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditableCustomer(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-300">
      <h1 className="mb-6 text-3xl font-bold text-red-600">Customer Management</h1>
      <Form
        addCustomer={handleAddCustomer}
        editableCustomer={editableCustomer}
        onSave={handleSaveCustomer}
        onCancel={handleCancelEdit}
      />
      <List
        customers={customers}
        editCustomer={handleEditCustomer}
        deleteCustomer={(index) => dispatch(deleteCustomer(index))}
        handleSaveCustomer={handleSaveCustomer}
      />
    </div>
  );
};

export default App;
