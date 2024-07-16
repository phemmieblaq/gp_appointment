import React, { useState, useEffect } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import axios from 'axios';
import { useContext } from 'react';
import { AddressContext } from '../../pages/contextApi';

const PostalCodeAddress = ({ control, clearErrors, setError, errors }) => {
    const { setAddress } = useContext(AddressContext);

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
  }, [postcode, setError, clearErrors, setAddress]);

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
  

      
    </div>
  );
};

export default PostalCodeAddress;
