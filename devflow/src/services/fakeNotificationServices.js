// level
// system: 1
// company announcement: 2
// team announcement: 3
// task: 4
// personal message: 5

// to ""

export const notifications = [
  {
    _id: "1",
    level: "1",
    from: "",
    to: "1",
    message: "Welcome to the company",
    time: "2020-03-17T22:15:00.000Z",
    isUnread: false,
  },
  {
    _id: "2",
    level: "2",
    from: "",
    to: "1",
    message: "Welcome, friend!",
    time: "2019-03-17T22:15:00.000Z",
    isUnread: false,
  },
  {
    _id: "6",
    level: "5",
    from: "1",
    to: "1",
    message: "Dinner?",
    time: "2019-03-17T22:15:00.000Z",
    isUnread: false,
  },
  {
    _id: "3",
    level: "3",
    from: "",
    to: "1",
    message: "Team lunch",
    time: "2019-03-17T22:15:00.000Z",
    isUnread: true,
  },
  {
    _id: "7",
    level: "4",
    from: "",
    to: "1",
    message: "This is a new task",
    time: "2019-03-17T22:15:00.000Z",
    isUnread: true,
  },
  {
    _id: "4",
    level: "5",
    from: "7",
    to: "1",
    message: "Sup",
    time: "2019-03-17T22:15:00.000Z",
    isUnread: true,
  },
  {
    _id: "5",
    level: "5",
    from: "3",
    to: "1",
    message: "any plan for weekend",
    time: "2019-03-17T22:15:00.000Z",
    isUnread: true,
  },
];

export function getAllNotificaitons() {
  return notifications;
}

export function readAllNotificationsById(id) {
  for (var i in notifications) {
    if (notifications[i].to == id) {
      notifications[i].isUnread = false;
    }
  }
  return notifications;
}

export function getNotificaitons(level) {
  return notifications.filter((notification) => notification.level === level);
}
