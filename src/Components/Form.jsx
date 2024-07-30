import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Form = ({ addCustomer, editableCustomer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    pan: '',
    fullName: '',
    email: '',
    mobile: '',
    addresses: [{ line1: '', line2: '', city: '', state: '', postcode: '' }],
  });

  const [errors, setErrors] = useState({});
  const [loadingPan, setLoadingPan] = useState(false);
  const [loadingPostcode, setLoadingPostcode] = useState(false);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const panRef = useRef(null);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const addressesRef = useRef(formData.addresses);

  useEffect(() => {
    if (editableCustomer) {
      setFormData(editableCustomer);
    } else {
      setFormData({
        pan: '',
        fullName: '',
        email: '',
        mobile: '',
        addresses: [{ line1: '', line2: '', city: '', state: '', postcode: '' }],
      });
    }
  }, [editableCustomer]);

  useEffect(() => {
    if (formData.pan.length === 10) {
      verifyPan();
    }
  }, [formData.pan]);

  useEffect(() => {
    if (formData.addresses[0].postcode.length === 6) {
      fetchPostcodeDetails();
    }
  }, [formData.addresses[0].postcode]);

  const verifyPan = async () => {
    setLoadingPan(true);
    try {
      const response = await axios.post('https://lab.pixel6.co/api/verify-pan.php', {
        panNumber: formData.pan
      });
      console.log(response.data);
      const { status, isValid, fullName } = response.data;
      if (status === "Success" && isValid) {
        setFormData(prevData => ({ ...prevData, fullName }));
      }
      setLoadingPan(false);
    } catch (error) {
      console.error('PAN verification failed:', error);
      setLoadingPan(false);
    }
  };

  const fetchPostcodeDetails = async () => {
    setLoadingPostcode(true);
    try {
      const response = await axios.post('https://lab.pixel6.co/api/get-postcode-details.php', {
        postcode: formData.addresses[0].postcode
      });
      const { status, city, state } = response.data;
      if (status === "Success") {
        setCities(city.map(c => ({ id: c.id, name: c.name })));
        setStates(state.map(s => ({ id: s.id, name: s.name })));
        setFormData(prevData => ({
          ...prevData,
          addresses: [{
            ...prevData.addresses[0],
            city: city[0]?.name || '',
            state: state[0]?.name || ''
          }]
        }));
      }
      setLoadingPostcode(false);
    } catch (error) {
      console.error('Fetching postcode details failed:', error);
      setLoadingPostcode(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate PAN
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panRef.current.value)) {
      errors.pan = 'Invalid PAN format';
    }

    // Validate Full Name
    if (!fullNameRef.current.value || fullNameRef.current.value.length > 140) {
      errors.fullName = 'Full Name is required and must be less than 140 characters';
    }

    // Validate Email
    if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      errors.email = 'Invalid email format';
    }

    // Validate Mobile
    if (!/^\+91\d{10}$/.test(mobileRef.current.value)) {
      errors.mobile = 'Mobile number must be 10 digits with +91 prefix';
    }

    // Validate Postcode
    const postcode = addressesRef.current[0].postcode;
    if (postcode.length==6) {
      errors.postcode = 'Postcode must be 6 digits';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddressChange = (i, e) => {
    const { name, value } = e.target;
    const newAddresses = [...formData.addresses];
    newAddresses[i] = { ...newAddresses[i], [name]: value };
    setFormData({ ...formData, addresses: newAddresses });
    if (name === 'postcode') {
      validateForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedFormData = {
        pan: panRef.current.value,
        fullName: fullNameRef.current.value,
        email: emailRef.current.value,
        mobile: mobileRef.current.value,
        addresses: addressesRef.current
      };
      if (editableCustomer) {
        onSave(updatedFormData);
      } else {
        addCustomer(updatedFormData);
      }
      if (!editableCustomer) {
        setFormData({
          pan: '',
          fullName: '',
          email: '',
          mobile: '',
          addresses: [{ line1: '', line2: '', city: '', state: '', postcode: '' }],
        });
        panRef.current.value=" ";
        fullNameRef.current.value=" ";
        emailRef.current.value=" ";
        mobileRef.current.value=" ";
        
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 mb-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">{editableCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700">PAN</label>
        <input
          type="text"
          ref={panRef}
          defaultValue={formData.pan}
          onChange={() => setFormData({ ...formData, pan: panRef.current.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {loadingPan && <span className="ml-2 text-gray-500">Loading...</span>}
        {errors.pan && <span className="text-sm text-red-500">{errors.pan}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          ref={fullNameRef}
          defaultValue={formData.fullName}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.fullName && <span className="text-sm text-red-500">{errors.fullName}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          ref={emailRef}
          defaultValue={formData.email}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Mobile</label>
        <input
          type="text"
          ref={mobileRef}
          defaultValue={formData.mobile}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="+91"
        />
        {errors.mobile && <span className="text-sm text-red-500">{errors.mobile}</span>}
      </div>
      {formData.addresses.map((address, i) => (
        <div key={i} className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">Address {i + 1}</h3>
          <input
            type="text"
            name="line1"
            value={address.line1}
            onChange={(e) => handleAddressChange(i, e)}
            placeholder="Line 1"
            className="w-full p-2 mb-1 border border-gray-300 rounded-md"
            required
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
            name="postcode"
            value={address.postcode}
            onChange={(e) => handleAddressChange(i, e)}
            placeholder="Postcode"
            className="w-full p-2 mb-1 border border-gray-300 rounded-md"
            required
          />
          {loadingPostcode && <span className="ml-2 text-gray-500">Loading...</span>}
          {errors.postcode && <span className="text-sm text-red-500">{errors.postcode}</span>}
          <select
            name="city"
            value={address.city}
            onChange={(e) => handleAddressChange(i, e)}
            className="w-full p-2 mb-1 border border-gray-300 rounded-md"
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
          <select
            name="state"
            value={address.state}
            onChange={(e) => handleAddressChange(i, e)}
            className="w-full p-2 mb-1 border border-gray-300 rounded-md"
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.id} value={state.name}>{state.name}</option>
            ))}
          </select>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 mr-2 text-white bg-red-500 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded-md"
        >
          {editableCustomer ? 'Save Changes' : 'Add Customer'}
        </button>
      </div>
    </form>
  );
};

export default Form;
