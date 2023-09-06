import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchContacts } from "../redux/features/contactSlice";
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
  const selectedContactId = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newContactForm, setNewContactForm] = useState<Omit<ContactData, "id">>(
    {
      first_name: "",
      last_name: "",
      phone_number: "string",
    }
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContactForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  // const getContacts = () => console.log("lskdfj")
  // const getContacts = async ():Promise<any> => dispatch(fetchContacts())

  const query = useQuery({
    queryKey: ["contactData"],
    queryFn: () => dispatch(fetchContacts()),
    staleTime: Infinity,
  });

  // useEffect(()=>{
  //   // dispatch(fetchContacts())
  //   console.log(contact.data)
  // },[contact])

  return (
    <div className="p-3">
      <button onClick={() => setIsAddModalOpen(true)} className="flex hover:bg-[#353535] active:opacity-20 rounded-md justify-center  bg-neutral-400/50 shadow-gray-200/40 p-3 gap-2 items-center border border-gray-700/50 ">
        <span className="text-2xl">
          <BsPersonAdd />
        </span>
        <span>Add Contact</span>
      </button>
      {contact.loading && (
        <div className="text-2xl flex border-lighterGray px-2 py-3 sm:gap-8  justify-center  items-center">
          <div className="animate-spin">
            <CgSpinner />
          </div>
        </div>
      )}
      {!contact.loading && contact.error ? (
        <p className="text-center text-rose-600">Error: {}</p>
      ) : (
        <p></p>
      )}
      {!contact.loading && contact.data.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {contact.data.map((contact) => (
            <ContactCard key={contact.id} contactData={contact} />
          ))}
        </div>
      ) : (
        <p></p>
      )}
      {isAddModalOpen && (
        <Modal setOpen={setIsAddModalOpen} type="add">
          <form action="">
            <div className="grid grid-cols-2 gap-2">
              <TextInput
                name="first_name"
                onChangeFn={handleInputChange}
                value=""
                placeholder="First Name"
              />
              <TextInput
                name="last_name"
                onChangeFn={handleInputChange}
                value=""
                placeholder="Last Name"
              />
            </div>
            <TextInput
              name="phone_number"
              onChangeFn={handleInputChange}
              value=""
              placeholder="Phone No."
            />
          </form>
        </Modal>
      )}
    </div>
  );
}
