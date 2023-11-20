import FormItem from "./FormItem.js";
import { useRecoilValue } from "recoil";
import { userState } from "../../stores/atoms.js";

const Account = ({ info }) => {
  const user = useRecoilValue(userState);

  return (
    <div className={accountDiv}>
      <p className="border-b-4 border-indigo-200 border-x-indigo-500 text-center text-3xl mb-8">
        Min konto
      </p>
      <p className="font-semibold text-1xl mb-2">Informasjon om konto:</p>
      <p className=" text-1xl italic underline ">
        Noe av informasjonen nedenfor vil bli vist offentlig
      </p>

      <form className="flex flex-col pt-3 md:pt-8">
        <FormItem text={"Fornavn"} value={user.firstName} />
        <FormItem text={"Etternavn"} value={user.lastName} />
        <FormItem text={"Skole"} value={user.schools[0].name} />
        <label htmlFor="avatar" className="mt-3 font-semibold">
          Bilde
        </label>
        <svg
          className="h-8 w-10  shadow border rounded px-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path d="M274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM413.3 480H34.66C33.2 480 32 478.8 32 477.3C32 399.4 95.4 336 173.3 336H274.7C352.6 336 416 399.4 416 477.3C416 478.8 414.8 480 413.3 480zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM224 32c52.94 0 96 43.06 96 96c0 52.93-43.06 96-96 96S128 180.9 128 128C128 75.06 171.1 32 224 32zM624 208h-64v-64C560 135.2 552.8 128 544 128s-16 7.156-16 16v64h-64C455.2 208 448 215.2 448 224s7.156 16 16 16h64v64c0 8.844 7.156 16 16 16s16-7.156 16-16v-64h64C632.8 240 640 232.8 640 224S632.8 208 624 208z"></path>
        </svg>
        <FormItem
          text={"E-post"}
          type={"email"}
          placeholder={"name@email.com"}
          value={user.email}
        />
        <input
          type="submit"
          value="Lagre"
          className="bg-black text-white border rounded font-bold text-lg hover:bg-gray-700 p-2 mt-8"
        />
      </form>

      <div className="text-center pt-12 pb-12">
        <p>
          Feil konto information?{" "}
          <a href="mail.html" className="underline font-semibold">
            Kontakt oss her.
          </a>
        </p>
      </div>
    </div>
  );
};
const accountDiv =
  " flex flex-col mt-9 md:w-3/5 justify-center md:justify-start pt-12 md:pt-0 px-8 md:px-24 lg:px-32 md:pl-12 md:-mb-24";

export default Account;
