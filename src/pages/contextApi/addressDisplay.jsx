import React, { useContext } from 'react';
import { AddressContext } from '.';


const AddressDisplay = () => {
  const { address } = useContext(AddressContext);

  if (!address) {
    return null;
  }

  console.log('AddressDisplay received address:', address);

  return (
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
  );
};

export default AddressDisplay;
