const dataList = {
    books: [
      {
        id: "B001",
        title: "Understanding Algorithms",
        genre: "Education",
        category: "Computer Science",
        authorIDs: ["A001", "A002"],
        publisherId: "P001"
      },
      {
        id: "B002",
        title: "The Art of Programming",
        genre: "Technology",
        category: "Programming",
        authorIDs: ["A003"],
        publisherId: "P002"
      }
    ],
    authors: [
      {
        id: "A001",
        name: "John Doe",
        phone: "123-456-7890",
        email: "john.doe@example.com"
      },
      {
        id: "A002",
        name: "Jane Smith",
        phone: "234-567-8901",
        email: "jane.smith@example.com"
      },
      {
        id: "A003",
        name: "Emily Johnson",
        phone: "345-678-9012",
        email: "emily.johnson@example.com"
      }
    ],
    publishers: [
      {
        id: "P001",
        name: "TechBooks Publishing",
        phone: "456-789-0123",
        email: "contact@techbookspub.com",
        address: "123 Tech St, Silicon Valley, CA"
      },
      {
        id: "P002",
        name: "CodeWorld Publishers",
        phone: "567-890-1234",
        email: "info@codeworldpub.com",
        address: "234 Code Ave, Programmer City, TX"
      }
    ],
    catalogs: [
      {
        id: "C001",
        bookId: "B001",
        numberOfCopies: 10,
        availableCopies: 7
      },
      {
        id: "C002",
        bookId: "B002",
        numberOfCopies: 5,
        availableCopies: 5
      }
    ],
    members: [
      {
        id: "M001",
        residentID: "S1001",
        firstname: "Alice",
        lastname: "Green",
        address: "789 Library Ln, Education Town, MA",
        phone: "678-901-2345",
        email: "alice.green@example.com"
      }
    ],
    transactions: [
      {
        id: "T001",
        bookId: "B001",
        memberId: "M001",
        borrowedDate: "2024-05-01",
        returnedDate: "2024-05-15"
      }
    ],
    users: [
      {
        id: "U001",
        name: "yitbarek",
        email: "yit"
      }
    ]
  }

  export default dataList;