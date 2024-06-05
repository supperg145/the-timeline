let users = [
    {
      "name": "John Doe",
      "createdAt": "01-05-2022",
      "message": "Hello, world!"
    },
    {
      "name": "Alice Smith",
      "createdAt": "15-09-2023",
      "message": "Nice to meet you!"
    },
    {
      "name": "Bob Johnson",
      "createdAt": "10-03-2024",
      "message": "Lorem ipsum dolor sit amet."
    },
    {
      "name": "Emma Brown",
      "createdAt": "28-11-2022",
      "message": "This is a test message."
    },
    {
      "name": "David Lee",
      "createdAt": "07-07-2023",
      "message": "Coding is fun!"
    },
    {
      "name": "Sophia Wang",
      "createdAt": "19-12-2023",
      "message": "Happy holidays!"
    },
    {
      "name": "Oliver Kim",
      "createdAt": "02-02-2024",
      "message": "Keep learning and growing."
    },
    {
      "name": "Isabella Chen",
      "createdAt": "14-08-2022",
      "message": "Have a great day!"
    },
    {
      "name": "William Liu",
      "createdAt": "30-04-2023",
      "message": "Stay curious!"
    },
    {
      "name": "Michael Choi",
      "createdAt": "23-01-2013",
      "message": "This is my message    This is my message This is my message This is my messageThis is my message"
    }
  ]
  


const getUsers = (req, res, next) => {
    res.render("index", {
      sortedUsers: users
    })
}

module.exports = getUsers