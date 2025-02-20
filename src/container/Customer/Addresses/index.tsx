import { useState } from "react";
import AddressesTab from "../../../page/Customer/AddressesTab/AddressesTab";
import { Address } from '../../../types';

function AddressesList() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      address_id: 1,
      address_street1: '123 Main Street',
      address_city: 'San Francisco',
      address_state: 'CA',
      address_code: '94105'
    },
    {
      address_id: 2,
      address_street1: '456 Market Street, Suite 200',
      address_city: 'San Francisco',
      address_state: 'CA',
      address_code: '94103'
    },
    {
      address_id: 3,
      address_street1: '789 Howard Street',
      address_city: 'San Francisco',
      address_state: 'CA',
      address_code: '94107'
    }
  ]);
  
  return (
    <AddressesTab addresses={addresses} />
  )
}

export default AddressesList