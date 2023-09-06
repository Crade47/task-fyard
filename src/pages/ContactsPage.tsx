import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchContacts } from "../redux/features/contactSlice";
import { CgSpinner } from "react-icons/cg";
import { BsPersonAdd } from "react-icons/bs";
import ContactCard from "../components/ContactCard";

// type Props = {}

export default function ContactsPage() {
  const contact = useAppSelector((state) => state.contact);
  const dispatch = useAppDispatch();

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
      <button className="flex hover:bg-[#353535] active:opacity-20 rounded-md justify-center  bg-neutral-400/50 shadow-gray-200/40 p-3 gap-2 items-center border border-gray-700/50 ">
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
    </div>
  );
}
