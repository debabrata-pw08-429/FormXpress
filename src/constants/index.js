export const FormXpressData = [
  {
    id: 0,
    header: {
      title: "Form 200",
      description: "Annual report test for students of class 5A",
      imageURL:
        "https://plus.unsplash.com/premium_photo-1679784204532-b816d1b26ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    sections: [
      {
        type: "categorize",
        title: "Categorize the following",
        description: "You can drag and drop the options",
        categories: ["Animals", "Fruits"],
        items: [
          { name: "Apple", category: "Fruits" },
          { name: "Orange", category: "Fruits" },
          { name: "Cat", category: "Animals" },
          { name: "Dog", category: "Animals" },
        ],
        image: "",
      },
      {
        type: "cloze",
        title: "Fill in the blanks",
        description: "Drag and drop the options",
        options: ["backend", "Google", "Facebook", "Frontend"],
        sentenceCase:
          "Firebase is a set of backend cloud computing services and application development platforms provided by Google.",
        PreviewCase:
          "Firebase is a set of  cloud computing services and application development platforms provided by .",
        image: "",
      },
      {
        type: "comprehension",
        title: "Read the passage carefully and answer",
        description:
          "Sand cats are named for their desert home. You might mistake one for an odd-looking house cat. Unlike a house cat, sand cats have a body made for desert life. With their sand-colored fur, sand cats disappear against the dunes. This is useful for a desert hunter, but it makes it hard for people to see them in the wild. When people do see a sand cat, the first thing they notice are its ears.",
        multipleQuestions: [
          {
            question: "Why are  they called Sand cats?",
            answers: [
              "Because of their desert home",
              "Because they are filled with sands",
            ],
          },
          {
            question: "Why it is hard for people to see them in the wild?",
            answers: [
              "sand cats disappear against the dunes beacuse of their color",
              "Because they know magic",
            ],
          },
        ],
        image:
          "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403",
      },
    ],
  },

  {
    id: 1,
    header: {
      title: "Untitled Form",
      description: "",
      imageURL: "",
    },
    sections: [
      {
        type: "categorize",
        title: "",
        description: "",
        categories: [],
        items: [{ name: "", category: "" }],
        image: "",
      },
      {
        type: "cloze",
        title: "",
        description: "",
        options: [],
        sentenceCase: "",
        PreviewCase: "",
        image: "",
      },
      {
        type: "comprehension",
        title: "",
        description: "",
        multipleQuestions: [{ question: "", answers: [] }],
        image: "",
      },
    ],
  },
];
