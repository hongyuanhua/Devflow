export const members = [
  {
    _id: "1",
    firstName: "Tim",
    lastName: "a",
    rank: 1,
    company: { _id: "1", name: "Apple" },
  },
  {
    _id: "2",
    firstName: "a_mamger",
    lastName: "a",
    rank: 2,
    company: { _id: "1", name: "Apple" },
  },
  {
    _id: "3",
    firstName: "a_employee",
    lastName: "a",
    rank: 3,
    company: { _id: "1", name: "Apple" },
  },
  {
    _id: "8",
    firstName: "admin",
    lastName: "admin",
    password: "admin",
    rank: 1,
    company: { _id: "1", name: "Apple" },
  },

  {
    _id: "4",
    firstName: "Bill",
    lastName: "m",
    rank: 1,
    company: { _id: "2", name: "Microsoft" },
  },
  {
    _id: "5",
    firstName: "m_manager",
    lastName: "m",
    rank: 2,
    company: { _id: "2", name: "Microsoft" },
  },
  {
    _id: "6",
    firstName: "m_employee",
    lastName: "m",
    rank: 3,
    company: { _id: "3", name: "Microsoft" },
  },
];

export function getMembers() {
  return members.filter((g) => g);
}

export function getMemberById(id) {
  if (id == "") {
    return null;
  }
  return members.find((t) => t._id === id);
}
