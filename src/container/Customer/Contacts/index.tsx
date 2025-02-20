import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContactsTab from "../../../page/Customer/ContactsTab/ContactsTab"
import { Contact } from '../../../types';

import actions from "../../../states/Contacts/list/actions";

function ContactsList() {

  const dispatch = useDispatch();
  
  const {
    contacts,
    loading,
    error,
  } = useSelector((state: any) => state.contacts);
  
  useEffect(() => {
    dispatch({
      type: actions.GET_CONTACTS,
      // payload: {
      //   sortby: "InHandsDate",
      //   order: "ASC",
      //   joblimit: 25,
      //   p: 1,
      //   d: 1,
      //   e_n: "PrairieIT"
      // }
    });
  }, [dispatch]);
  
  return (
    <ContactsTab contacts={contacts} />
  )
}

export default ContactsList