import { ReactNode } from "react";
import { GrClose } from "react-icons/gr";

type ModalProps = {
  children: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "edit" | "add"
};

export default function Modal({ children, setOpen, type }: ModalProps) {
  return (
    <>
      <div>
        <div className="fixed inset-0  z-50 p-2 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative max-w-xs mx-auto my-6">
            {/* Content */}
            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-800 outline-none focus:outline-none">
              {/* Header */}
              <h3 className="text-xl pt-3 text-center font-semibold">
                 
                {type === "add" ? "Add a Contact" : "Edit"}
              </h3>
              {/* Body */}
              <div className="relative p-4 flex-auto">{children}</div>
              {/* Footer */}
              <div className="flex justify-center mt-4">
                <button className="active:opacity-50 active:text-gray-600 text-blue-700 no-highlight border-t border-r border-slate-200/10 py-2 w-full">
                    {type === "add" ? "Add" : "Confirm"}
                </button>
                <button onClick={() => setOpen(prevState => !prevState)} className="active:opacity-50 active:text-gray-600 text-rose-700 border-t border-slate-200/10 py-2 w-full">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/70 inset-0 absolute h-screen w-screen"></div>
    </>
  );
}
