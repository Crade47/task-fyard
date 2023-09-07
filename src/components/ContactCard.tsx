import { ContactData } from "../types/types";
import { AiOutlineInfoCircle, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button from "./Button";
import Modal from "./Modal";
import { useState } from "react";
import TextInput from "./TextInput";

type ContactCardProps = {
  contactData: ContactData;
};

export default function ContactCard({ contactData }: ContactCardProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [contactForm, setContactForm] = useState<Omit<ContactData, "id">>({
    first_name: contactData.first_name,
    last_name: contactData.last_name,
    phone_number: contactData.phone_number,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const editModalToggler = () => {
    setContactForm({
      first_name: contactData.first_name,
      last_name: contactData.last_name,
      phone_number: contactData.phone_number,
    });
    setOpenEdit((prev) => !prev);
  };

  return (
    <>
      <div className="p-3 bg-zinc-500/30 shadow-inner shadow-gray-600/70 rounded-lg">
        <div className="grid grid-cols-2 xs:grid-cols-1 xs:gap-3 ">
          {/* Placeholder for photos in the future */}
          <div className="-z-10 rounded-full md:mt-3 xs:place-self-center flex items-center justify-center bg-slate-400/50 h-20 relative p-1 aspect-square">
            <div className="inset-0">
              {contactData.first_name.charAt(0).toUpperCase()}
              {contactData.last_name?.charAt(0).toUpperCase()}
            </div>
          </div>
          {/* NAME AND INFO/DELETE BUTTONS */}
          <div className="flex flex-col justify-between">
            <h1 className="xs:text-center">
              {contactData.first_name} {contactData.last_name}
            </h1>
            {/* Info and Delete buttons container */}
            <div className="flex justify-between xs:mt-5 items-center">
              {/* Info button */}
              <div className="flex gap-3 items-end justify-center">
                <Button onClick={() => setOpenInfo(true)}>
                  <AiOutlineInfoCircle />
                </Button>
                {/* Edit button */}
                <Button onClick={() => setOpenEdit(true)}>
                  <AiOutlineEdit />
                </Button>
              </div>
              {/* Delete button */}
              <Button>
                <MdOutlineDeleteOutline />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {openEdit && (
        <Modal toggleModal={editModalToggler} type="edit">
          <form action="">
            <div className="grid grid-cols-2 gap-2">
              <TextInput
                name="first_name"
                onChangeFn={handleInputChange}
                value={contactForm.first_name}
                placeholder="First Name"
              />
              <TextInput
                name="last_name"
                onChangeFn={handleInputChange}
                value={contactForm.last_name}
                placeholder="Last Name"
              />
            </div>
            <TextInput
              name="phone_number"
              onChangeFn={handleInputChange}
              value={contactForm.phone_number}
              placeholder="Phone No."
              maxLength={10}
            />
          </form>
        </Modal>
      )}
      {openInfo && (
        <Modal toggleModal={() => setOpenInfo((prev) => !prev)} type="info">
          <div className="grid grid-cols-1 p-3">
            <div className=" rounded-full mt-3 place-self-center flex items-center justify-center bg-slate-400/50 h-20 relative p-1 aspect-square">
              <div className="inset-0">
                {contactData.first_name.charAt(0).toUpperCase()}
                {contactData.last_name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="mt-5">
              <h1 className="">
                <span className="text-slate-300/50">Name:</span>{" "}
                {contactData.first_name} {contactData.last_name}
              </h1>
              <h1 className="mt-5">
                <span className="text-slate-300/50">Phone:</span>{" "}
                {contactData.phone_number}
              </h1>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
