import Sidebar from "../components/global/Navbar";
import { useRecoilValue } from "recoil";
import {
  tokenState,
  userState,
  groupsState,
  activeGroupSelector,
} from "../stores/atoms";

import RightBar from "../components/global/RightBar";

export default function Home() {
  const token = useRecoilValue(tokenState);
  const user = useRecoilValue(userState);
  const groups = useRecoilValue(groupsState);
  const activeGroup = useRecoilValue(activeGroupSelector);

  return (
    <div className="w-full">
      <Sidebar currentUrl={"index"} />
      <RightBar />
      <div className="px-16 py-8  w-full flex justify-center items-center space-y-4 flex-col overflow-x-hidden">
        <h1 className="font-bold text-3xl">
          Velkommen til AtCampus {user.firstName}
        </h1>
        <div>
          <h2>Token</h2>
          <h2>{token}</h2>
        </div>
        <div>
          <h2>User</h2>
          <h2>{JSON.stringify(user)}</h2>
        </div>
        <div>
          <h2>Groups</h2>
          <h2>{JSON.stringify(groups)}</h2>
        </div>
        <div>
          <h2>Active Group</h2>
          <h2>{JSON.stringify(activeGroup)}</h2>
        </div>
      </div>
    </div>
  );
}
