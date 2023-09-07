import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editContact, fetchContacts } from "../redux/features/contactSlice";
import { CgSpinner } from "react-icons/cg";
import { BsPersonAdd } from "react-icons/bs";
import ContactCard from "../components/ContactCard";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput";
import { ContactData } from "../types/types";

// type Props = {}

export default function ContactsPage() {
  const contact = useAppSelector((state) => state.contact);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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


  const handleEditContact = async (body:ContactData) =>{
    await dispatch(editContact(body))
  }

  useEffect(() => {
    document.title = "Contacts";
  }, []);

  const query = useQuery({
    queryKey: ["contactData"],
    queryFn: () => dispatch(fetchContacts()),
    refetchOnWindowFocus:false
  });

  const { mutateAsync:editContactMutation,  } = useMutation({
    mutationFn: handleEditContact,
    onSuccess:() => queryClient.invalidateQueries(["contactData"])
  })

  return (
    <div className="p-3">
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="flex hover:bg-[#353535] active:opacity-20 rounded-md justify-center  bg-neutral-400/50 shadow-gray-200/40 p-3 gap-2 items-center border border-gray-700/50 "
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
        <p className="text-center text-rose-600">Error: {}</p>
      ) : (
        <p></p>
      )}
      {/* Rendering the contact list   */}
      {!contact.loading && contact.data.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mt-10">
          {contact.data.map((contact) => (
            <ContactCard key={contact.id} editContactMutation={editContactMutation} contactData={contact} />
          ))}
        </div>
      ) : (
        <p></p>
      )}
      {isAddModalOpen && (
        <Modal
          toggleModal={() => setIsAddModalOpen((prev) => !prev)}
          type="add"
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
            />
          </form>
        </Modal>
      )}
    </div>
  );
}
