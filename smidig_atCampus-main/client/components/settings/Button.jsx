import PropTypes from "prop-types";

const Button = ({ text, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        text === "Logg ut" ? "bg-red-400" : "bg-[#6664AC]"
      } z-10 hover:text-black text-gray-300 no-underline mb-1 hover:underline font-bold  py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900`}
    >
      <p className="flex flex-row justify-center">{icon}</p> <p>{text}</p>
    </button>
  );
};

Button.protoTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  text: "",
};

export default Button;
