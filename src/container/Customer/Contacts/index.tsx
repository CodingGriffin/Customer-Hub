import { useState } from "react";
import ContactsTab from "../../../page/Customer/ContactsTab/ContactsTab"
import { Contact } from '../../../types';

function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      contact_id: 1,
      contact_name: "John Doe",
      emails: "john@example.com",
      phone_numbers: "(555) 123-4567",
      enabled: true
    },
    {
      contact_id: 2,
      contact_name: "John Doe",
      emails: "john@example.com",
      phone_numbers: "(555) 123-4567",
      enabled: true
    }
  ]);
  
  return (
    <ContactsTab contacts={contacts} setContacts={setContacts} />
  )
}

export default ContactsList