import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import DropdownMenuItems from "./DropdownMenuItems";

const Dropdown = ({ options, setDropdownValue, dropdownValue }) => {
  const handleClick = ({ option, value }) => {
    setDropdownValue({ option, value });
  };

  return (
    <Menu as="div" className="flex justify-center">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-between w-64 rounded-md border border-gray-300 shadow-sm px-4 py-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500">
              {dropdownValue}
              {!open ? (
                <ChevronDownIcon
                  className=" -mr-1 ml-20 h-5 w-5"
                  aria-hidden="true"
                />
              ) : (
                <ChevronUpIcon
                  className=" -mr-1 ml-20 h-5 w-5 "
                  aria-hidden="true"
                />
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="flex flex-col justify-center absolute mt-14 w-44 rounded-md shadow-lg bg-white ring-4 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-20">
              <div className="py-1 flex flex-col justify-between px-2">
                <DropdownMenuItems
                  handleClick={handleClick}
                  options={options}
                />
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
export default Dropdown;
