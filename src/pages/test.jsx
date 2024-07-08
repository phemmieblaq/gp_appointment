import React from 'react'
import { InputWithLabel } from "components/input";

const test = () => {
  return (
    <div>
         <InputWithLabel
                  placeholder="Enter your last name"
                  label="Last name"
                  type="text"
                  name="last_name"
                />
      
    </div>
  )
}

export default test
