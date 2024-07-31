import React, { Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, editCustomer, deleteCustomer } from './store/customerReducer';
import Form from './Components/Form';
import List from './Components/List';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import {motion} from "framer-motion";

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
  document.title="Register";

  return (
    <div className="relative flex flex-col items-center min-h-screen ">
      <div className="z-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-200">Customer Management</h1>
      </div>
      <div className="z-10">
        <motion.div animate={{
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
        }}  className="">
        <Form
        
        addCustomer={handleAddCustomer}
        editableCustomer={editableCustomer}
        onSave={handleSaveCustomer}
        onCancel={handleCancelEdit}
        />
        </motion.div>
      <List
        customers={customers}
        editCustomer={handleEditCustomer}
        deleteCustomer={(index) => dispatch(deleteCustomer(index))}
        handleSaveCustomer={handleSaveCustomer}
      />
      </div>
      <div className="absolute  fixed   w-[100%] h-[100%] three">
       <Suspense>
        <Canvas>
          <Experience/>
        </Canvas>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
