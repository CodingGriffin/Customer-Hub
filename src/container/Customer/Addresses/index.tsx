import { useState } from "react";
import AddressesTab from "../../../page/Customer/AddressesTab";
import { Address } from '../../../types';

function AddressesList() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105'
    },
    {
      id: '2',
      street: '456 Market Street, Suite 200',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103'
    },
    {
      id: '3',
      street: '789 Howard Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107'
    }
  ]);
  
  return (
    <AddressesTab addresses={addresses} setAddresses={setAddresses} />
  )
}

export default AddressesList