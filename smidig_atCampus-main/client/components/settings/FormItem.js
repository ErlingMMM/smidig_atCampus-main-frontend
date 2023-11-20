import PropTypes from "prop-types";
const FormItem = ({ text, type, placeholder, value }) => {
  return (
    <div className={labelInputDiv}>
      <label htmlFor="text" className="font-semibold">
        {text}
      </label>
      <input
        type={type}
        text={text}
        placeholder={placeholder}
        className={inputClass}
        value={value}
      />
    </div>
  );
};
const labelInputDiv = "flex flex-col pt-4 text-black";
const inputClass =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline";
FormItem.protoTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

FormItem.defaultProps = {
  text: "text",
  placeholder: "",
};
export default FormItem;
