import { Menu } from "@headlessui/react";

const DropdownMenuItems = ({ handleClick, options }) => {
  return options.map(({ option, value }, index) => (
    <Menu.Item
      key={index}
      as="div"
      className="flex hover:text-green-500  hover:scale-105 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out border-t py-1 px-2 cursor-pointer rounded-sm"
      onClick={() => {
        handleClick({ option, value });
      }}
    >
      <p>{option}</p>
    </Menu.Item>
  ));
};

export default DropdownMenuItems;
