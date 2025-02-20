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
    getContacts();
  }, [dispatch]);

  const getContacts = () => {
    dispatch({
      type: actions.GET_CONTACTS,
      payload: {
        mode: "getcontact",
        entities_id: 266
      }
    });
  }

  const addContact = (payload: any) => {
    dispatch({
      type: actions.ADD_CONTACT,
      payload
    });

    getContacts();
  }
  
  return (
    <ContactsTab contacts={contacts.data ? contacts.data : []} addContact={addContact} />
  )
}

export default ContactsList