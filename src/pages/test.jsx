import React, { useState, useEffect } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import axios from 'axios';

const PostalCodeAddress = ({ control, clearErrors, setError, errors }) => {
  const [address, setAddress] = useState(null);

  // Watch for changes in the postal code input
  const postcode = useWatch({ control, name: 'postcode' });

  useEffect(() => {
    const fetchAddress = async () => {
      if (postcode && postcode.length > 0) {
        try {
          const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
          setAddress(response.data.result);
          clearErrors('postcode'); // Clear error if the postcode is valid
        } catch (error) {
          setError('postcode', {
            type: 'manual',
            message: 'Invalid postal code',
          });
          setAddress(null);
        }
      }
    };

    fetchAddress();
  }, [postcode, setError, clearErrors]);

  return (
    <div>
  
        <div>
          <label>Postal Code:</label>
          <Controller
            name="postcode"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter UK postal code"
              />
            )}
          />
          {errors.postcode && <p className="error">{errors.postcode.message}</p>}
        </div>
        {/* Add other input fields here */}
  

      {address && (
        <div>
          <h2>Address Details</h2>
          <p><strong>Postcode:</strong> {address.postcode}</p>
          <p><strong>Country:</strong> {address.country}</p>
          <p><strong>Region:</strong> {address.region}</p>
          <p><strong>Admin District:</strong> {address.admin_district}</p>
          <p><strong>Parish:</strong> {address.parish}</p>
          <p><strong>Latitude:</strong> {address.latitude}</p>
          <p><strong>Longitude:</strong> {address.longitude}</p>
          <p><strong>OS Grid Reference:</strong> {address.os_grid_reference}</p>
        </div>
      )}
    </div>
  );
};

export default PostalCodeAddress;
