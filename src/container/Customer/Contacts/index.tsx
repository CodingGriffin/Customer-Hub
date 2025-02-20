import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContactsTab from "../../../page/Customer/ContactsTab/ContactsTab"
import { Contact } from '../../../types';

import actions from "../../../states/Contacts/actions";

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
      payload: {
        mode: "getcontact",
        entities_id: 266
      }
    });
  }, [dispatch]);
  
  return (
    <ContactsTab contacts={contacts.data ? contacts.data : []} />
  )
}

export default ContactsList