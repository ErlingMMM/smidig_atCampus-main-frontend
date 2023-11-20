import { atom, selector } from "recoil";

export const userState = atom({
  key: "user",
  default: {},
});

export const tokenState = atom({
  key: "token",
  default: "",
});

export const groupsState = atom({
  key: "groups",
  default: [{}],
});

export const activeGroupIdState = atom({
  key: "activeGroupId",
  default: null,
});

export const activeGroupSelector = selector({
  key: "activeGroup",
  get: ({ get }) => {
    const groups = get(groupsState);
    const activeGroupId = get(activeGroupIdState);
    if (activeGroupId) {
      return groups.find((group) => group.id === activeGroupId);
    } else {
      return groups[0];
    }
  },
});
