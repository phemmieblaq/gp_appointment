import React, { useContext } from 'react';
import { AddressContext } from '.';
import { InputWithLabel } from '../../components/input';
import { DoubleGridWrapper } from '../auth/userRegistration/styles';


const AddressDisplay = () => {
  const { address } = useContext(AddressContext);
  //console.log(address);

  if (!address) {
    return null;
  }

  //console.log('AddressDisplay received address:', address);

  return (
    <div>
       <DoubleGridWrapper>
   
            <InputWithLabel
                
                label="County"
                value={address.admin_county}
                type = "text"
                disable={true}
                name="county"
              />

              <InputWithLabel
                
                label="District"
                value={address.admin_district}
                type = "text"
                disable={true}
                name='adminDistrict'
              />

</DoubleGridWrapper>

    </div>
  );
};

export default AddressDisplay;
