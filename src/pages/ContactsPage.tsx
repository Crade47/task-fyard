import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addContact, deleteContact, editContact, fetchContacts } from "../redux/features/contactSlice";
import { CgSpinner } from "react-icons/cg";
import { BsPersonAdd } from "react-icons/bs";
import ContactCard from "../components/ContactCard";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput";
import { ContactData } from "../types/types";
import { validateForm } from "../utils/utils";

// type Props = {}

export default function ContactsPage() {
  const contact = useAppSelector((state) => state.contact);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [creationError, setCreationError] = useState(contact.creationError)
  const [newContactForm, setNewContactForm] = useState<Omit<ContactData, "id">>(
    {
      first_name: "",
      last_name: "",
      phone_number: "",
    }
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContactForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  //Reset New Contact Form
  const resetForm = () =>{
    setNewContactForm({
      first_name: "",
      last_name: "",
      phone_number: "",
    })
  }

  //Toggling create contact modal
  const toggleAddModal = () =>{
    resetForm()
    setIsAddModalOpen(prev => !prev)
  }


  //Function for editing the contact
  const handleEditContact = async (body:ContactData) =>{
    await dispatch(editContact(body))
  }

  //Function for adding the contact
  const handleAddContact = async () =>{
    setCreationError("")
    const error = validateForm(newContactForm);
    if(error.trim() !== ""){
      setCreationError(error);
      return;
    }
    await dispatch(addContact(newContactForm))
    setIsAddModalOpen(false);
    resetForm()
  }

  //Function for adding the contact
  const handleDeleteContact = async (id:number) =>{
    await dispatch(deleteContact(id))
  }
  //Setting the document title
  useEffect(() => {
    document.title = "Contacts";
  }, []);

  //Main query for fetching all contacts 
  const query = useQuery({
    queryKey: ["contactData"],
    queryFn: () => dispatch(fetchContacts()),
    refetchOnWindowFocus:false
  });

  //Mutation hook for editing the contact and invalidatin the cache when done
  const { mutateAsync:editContactMutation,  } = useMutation({
    mutationFn: handleEditContact,
    onSuccess:() => queryClient.invalidateQueries(["contactData"])
  })

  //Mutation hook for adding the contact and invalidatin the cache when done
  const { mutateAsync:addContactMutation } = useMutation({
    mutationFn: handleAddContact,
    onSuccess:() => queryClient.invalidateQueries(["contactData"])
  })

  //Mutation hook for deleting the contact and invalidatin the cache when done
  const { mutateAsync:deleteContactMutation} = useMutation({
    mutationFn: handleDeleteContact,
    onSuccess:() => queryClient.invalidateQueries(["contactData"])
  })

  return (
    <div className="p-3">
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="flex bg-[#353535] active:opacity-20 rounded-md justify-center  hover:bg-neutral-400/50 shadow-gray-200/40 p-3 gap-2 items-center border border-gray-700/50 "
      >
        <span className="text-2xl">
          <BsPersonAdd />
        </span>
        <span>Add Contact</span>
      </button>
      {/* Rendering the loading spinner */}
      {contact.loading && (
        <div className="text-2xl flex border-lighterGray px-2 py-3 sm:gap-8  justify-center  items-center">
          <div className="animate-spin">
            <CgSpinner />
          </div>
        </div>
      )}
      {/* Rendering errors  */}
      {!contact.loading && contact.error ? (
        <p className="text-center text-rose-600">Error: {contact.error}</p>
      ) : (
        <p></p>
      )}
      {/* Rendering the contact list   */}

      {!contact.loading && contact.data.length === 0 && <p className="text-center">No Contacts Found. Add to get started!</p>}

      {/* Rendering the contact list   */}
      {!contact.loading && contact.data.length > 0 && (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mt-10">
          {contact.data.map((contact) => (
            <ContactCard key={contact.id} deleteContactMutation={deleteContactMutation} editContactMutation={editContactMutation} contactData={contact} />
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <Modal
          toggleModal={toggleAddModal}
          type="add"
          submitChanges={addContactMutation}
        >
          <form action="">
            <div className="grid grid-cols-2 gap-2">
              <TextInput
                name="first_name"
                onChangeFn={handleInputChange}
                value={newContactForm.first_name}
                placeholder="First Name"
              />
              <TextInput
                name="last_name"
                onChangeFn={handleInputChange}
                value={newContactForm.last_name}
                placeholder="Last Name"
              />
            </div>
            <TextInput
              name="phone_number"
              onChangeFn={handleInputChange}
              value={newContactForm.phone_number}
              placeholder="Phone No."
              maxLength={10}
            />
          </form>
          
        </Modal>
      )}
    </div>
  );
}
