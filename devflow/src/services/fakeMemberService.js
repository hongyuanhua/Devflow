// rank
// admin: 0
// boss: 1
// team leader: 2
// member: 3

import { companies } from "./fakeCompanyServices";

export const members = [
  {
    _id: "1",
    firstName: "Tim",
    lastName: "a",
    userName: "timaaaa",
    rank: 1,
    companyId: "1",
    teamId: "",
    password: "user",
    profilePic:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
  },
  {
    _id: "2",
    firstName: "Daniel",
    lastName: "a",
    userName: "daniel",
    rank: 2,
    companyId: "1",
    teamId: "1",
    password: "user",
    profilePic:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
  },
  {
    _id: "3",
    firstName: "David",
    lastName: "a",
    userName: "david",
    rank: 3,
    companyId: "1",
    teamId: "1",
    password: "user",
    profilePic:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
  },
  {
    _id: "7",
    firstName: "Mark",
    lastName: "a",
    userName: "mark",
    rank: 3,
    companyId: "1",
    teamId: "1",
    password: "user",
    profilePic:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
  },
  {
    _id: "8",
    firstName: "Jack",
    lastName: "a",
    userName: "jack",
    rank: 3,
    companyId: "1",
    teamId: "1",
    password: "user",
    profilePic:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
  },
  {
    _id: "4",
    firstName: "Bill",
    lastName: "a",
    userName: "bill",
    rank: 1,
    companyId: "2",
    teamId: "",
    password: "user",
    profilePic:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
  },
  {
    _id: "5",
    firstName: "Tom",
    lastName: "a",
    userName: "tom",
    rank: 2,
    companyId: "2",
    teamId: "2",
    password: "user",
    profilePic:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
  },
  {
    _id: "6",
    firstName: "Jone",
    lastName: "a",
    userName: "jone",
    rank: 2,
    companyId: "2",
    teamId: "3",
    password: "user",
    profilePic:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
  },
  {
    _id: "9",
    firstName: "Martin",
    lastName: "a",
    userName: "martin",
    rank: 3,
    companyId: "2",
    teamId: "2",
    password: "user",
    profilePic:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
  },
  {
    _id: "10",
    firstName: "Helen",
    lastName: "a",
    userName: "helen",
    rank: 3,
    companyId: "2",
    teamId: "3",
    password: "user",
    profilePic:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
  },
];

export function getMembers() {
  return members.filter((g) => g);
}

export function getMemberById(id) {
  if (id === "") {
    return null;
  }
  return members.find((t) => t._id === id);
}

export function getNameById(id) {
  return [getMemberById(id).firstName, getMemberById(id).lastName];
}

export function getFullNameById(id) {
  return getMemberById(id).firstName + " " + getMemberById(id).lastName;
}

export function getMembersByCompanyId(id) {
  return members.filter((member) => member.companyId === id);
}

export function getMemberByCompanyId_NoTeam(id) {
  return members.filter(
    (member) => member.companyId === id && member.teamId === ""
  );
}
export function saveMemberFromCompany(companyMembers, companyId) {
  const notMembers = members.filter((m) => m.companyId !== companyId);
  notMembers.push(companyMembers);
  members = notMembers;
}
export function getMemberByTeam(id, team) {
  return members.filter(
    (member) => member.companyId === id && member.teamId === team
  );
}
export function deleteMember(id) {
  let MemberInDb = members.find((m) => m._id === id);
  members.splice(members.indexOf(MemberInDb), 1);
  return MemberInDb;
}
