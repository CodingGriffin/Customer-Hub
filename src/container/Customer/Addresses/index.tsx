import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddressesTab from "../../../page/Customer/AddressesTab/AddressesTab";
import { Address } from '../../../types';

import actions from "../../../states/Addresses/actions";

function AddressesList() {

  const dispatch = useDispatch();
  
  const {
    addresses,
    loading,
    error,
  } = useSelector((state: any) => state.addresses);
  
  useEffect(() => {
    getAddresses();
  }, [dispatch]);

  const getAddresses = () => {
    dispatch({
      type: actions.GET_ADDRESSES,
      payload: {
        mode: "getaddress",
        entities_id: 266
      }
    });
  }

  const addAddress = (payload: any) => {
    dispatch({
      type: actions.ADD_ADDRESS,
      payload
    });

    getAddresses();
  }

  const editAddress = (payload: any) => {
    dispatch({
      type: actions.EDIT_ADDRESS,
      payload
    });

    getAddresses();
  }

  const deleteAddress = (payload: any) => {
    dispatch({
      type: actions.DELETE_ADDRESS,
      payload
    });

    getAddresses();
  }
  
  return (
    <AddressesTab addresses={addresses.data ? addresses.data : []} addAddress={addAddress} editAddress={editAddress} deleteAddress={deleteAddress} />
  )
}

export default AddressesList