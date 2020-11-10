export const companies = [
    {
        _id: "1",
        name: "Apple",
        members: ["1", "2", "3"]
    },

    {
        _id: "2",
        name: "Microsoft",
        members: ["4", "5", "6"]
    }

];

export function getCompanies() {
    return companies.filter(g => g);
}
