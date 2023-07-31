export const FormXpressData = {
  header: {
    title: "",
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
};

export const initialFormData = {
  formID: 0,
  header: { title: "Untitled Form", description: "", img: "" },
  sections: [
    {
      secID: 0,
      title: "Untitled Question",
      description: "",
      imageURL: "",
      previewURL: "",
      responses: [],
      required: false,
      inputType: {
        name: "Default",
        details: {
          categories: ["category 1", "category 2"],
          items: [
            {
              itemName: "item 1",
              categoryName: "category 1",
            },
          ],
        },
      },
    },
    {
      secID: 1,
      title: "What is FormXpress?",
      description:
        "It is a custom form builder, basically an alternative to goolge forms!",
      imageURL: "",
      previewURL: "",
      responses: [],
      required: true,
      inputType: {
        name: "Default",
        details: {
          categories: ["category 1", "category 2"],
          items: [
            {
              itemName: "item 1",
              categoryName: "category 1",
            },
          ],
        },
      },
    },
  ],
};
