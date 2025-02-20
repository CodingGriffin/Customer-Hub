import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddressesTab from "../../../page/Customer/AddressesTab/AddressesTab";
import { Address } from '../../../types';

import actions from "../../../states/Addresses/list/actions";

function AddressesList() {

  const dispatch = useDispatch();
  
  const {
    addresses,
    loading,
    error,
  } = useSelector((state: any) => state.addresses);
  
  useEffect(() => {
    dispatch({
      type: actions.GET_ADDRESSES,
      payload: {
        mode: "getaddress",
        entities_id: 266
      }
    });
  }, [dispatch]);
  
  return (
    <AddressesTab addresses={addresses.data ? addresses.data : []} />
  )
}

export default AddressesList