async function createMembers() {
    const members = [
        new Member({
            _id: "1",
            firstName: "Tim",
            lastName: "a",
            userName: "user",
            rank: 1,
            companyId: "1",
            teamId: "",
            password: "user1",
            isApproved: true,
            profilePic:
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
        }),
        new Member({
            _id: "2",
            firstName: "Daniel",
            lastName: "a",
            userName: "daniel",
            rank: 2,
            companyId: "1",
            teamId: "1",
            password: "user",
            isApproved: true,
            profilePic:
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
        }),
        new Member({
            _id: "3",
            firstName: "David",
            lastName: "a",
            userName: "david",
            rank: 3,
            companyId: "1",
            teamId: "1",
            password: "user",
            isApproved: true,
            profilePic:
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
        }),
        new Member({
            _id: "7",
            firstName: "Mark",
            lastName: "a",
            userName: "mark",
            rank: 3,
            companyId: "1",
            teamId: "1",
            password: "user",
            isApproved: true,
            profilePic:
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
        }),
        new Member({
            _id: "8",
            firstName: "Jack",
            lastName: "a",
            userName: "jack",
            rank: 3,
            companyId: "1",
            teamId: "1",
            password: "user",
            isApproved: true,
            profilePic:
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
        }),
        new Member({
            _id: "4",
            firstName: "Bill",
            lastName: "a",
            userName: "bill",
            rank: 1,
            companyId: "2",
            teamId: "",
            password: "user",
            isApproved: true,
            profilePic:
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
        }),
        new Member({
            _id: "5",
            firstName: "Tom",
            lastName: "a",
            userName: "tom",
            rank: 2,
            companyId: "2",
            teamId: "2",
            password: "user",
            isApproved: true,
            profilePic:
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
        }),
        new Member({
            _id: "6",
            firstName: "Jone",
            lastName: "a",
            userName: "jone",
            rank: 2,
            companyId: "2",
            teamId: "3",
            password: "user",
            isApproved: true,
            profilePic:
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
        }),
        new Member({
            _id: "9",
            firstName: "Martin",
            lastName: "a",
            userName: "martin",
            rank: 3,
            companyId: "2",
            teamId: "2",
            password: "user",
            isApproved: true,
            profilePic:
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
        }),
        new Member({
            _id: "10",
            firstName: "Helen",
            lastName: "a",
            userName: "helen",
            rank: 3,
            companyId: "2",
            teamId: "3",
            password: "user",
            isApproved: true,
            profilePic:
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
        }),
    ];
    for (m of members) {
        let result = await m.save();
        console.log(result)
    }
}