export const companies = [
  {
    _id: "1",
    name: "Apple",
    members: ["1", "2", "3", "7", "8"],
    bossId: "1",
    teams: ["1"],
    companyPic:
      "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202011262357",
  },

  {
    _id: "2",
    name: "Microsoft",
    members: ["4", "5", "6", "9", "10"],
    bossId: "4",
    teams: ["2", "3"],
    companyPic:
      "https://media-exp1.licdn.com/dms/image/C4D0BAQEko6uLz7XylA/company-logo_200_200/0?e=2159024400&v=beta&t=a1kve4i0YyusChyNR_Cvvn2vnHNUHhZ4H2rnYCxjQhU",
  },
];

export function getCompanies() {
  return companies.filter((g) => g);
}

export function getCompanyById(id) {
  return companies.find((g) => g._id === id);
}

export function getCompanyNameById(id) {
  let c = companies.find((g) => g._id === id);
  if (!c) {
    return undefined;
  }

  return c.name;
}
export function saveCompany(company) {
  let companyInDb = companies.find((m) => m._id === company._id) || {};
  companyInDb.name = company.name;
  companyInDb.bossId = company.bossId;
  companyInDb.members = company.members;
  companyInDb.teams = company.teams;
  companyInDb.companyPic = company.companyPic;
  if (!companyInDb._id) {
    companyInDb._id = Date.now().toString();
    companies.push(companyInDb);
  }

  return companyInDb;
}
export function deleteCompany(id) {
  const CompanyInDb = companies.find((m) => m._id === id);
  companies.splice(companies.indexOf(CompanyInDb), 1);
  return CompanyInDb;
}
