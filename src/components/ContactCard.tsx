import { ContactData } from "../types/types";
import { AiOutlineInfoCircle, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button from "./Button";

type ContactCardProps = {
  contactData: ContactData;
};

export default function ContactCard({ contactData }: ContactCardProps) {
  return (
    <>
      <div className="p-3 bg-zinc-500/30 shadow-inner shadow-gray-600/70 rounded-lg">
        <div className="grid grid-cols-2 xs:grid-cols-1 xs:gap-3 ">
          {/* Placeholder for photos in the future */}
          <div className="rounded-full xs:place-self-center flex items-center justify-center bg-slate-400/50 h-20 relative p-1 aspect-square">
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
                <Button>
                  <AiOutlineInfoCircle />
                </Button>
                <Button >
                  <AiOutlineEdit />
                </Button>
              </div>
              {/* Delete button */}
              <Button >
                <MdOutlineDeleteOutline />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
