import { useState } from "react";
import "../App.css";
import Header from "../components/form_header/Header";
import Section from "../components/form_sections/Section";
import { FormXpressData } from "../constants/index";
import { BsPlusCircleDotted } from "react-icons/Bs";

const Edit = () => {
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [formHeader, setFormHeader] = useState(FormXpressData[0].header);
  const [formSections, setFormSections] = useState(FormXpressData[0].sections);

  // Function to add a new section based on the selected question type
  const handleAddSection = () => {
    // Check if a question type is selected
    if (selectedQuestionType === "") {
      alert("Please select a question type.");
      return;
    }

    let newSection = {};

    // Create a new section based on the selected question type
    if (selectedQuestionType === "categorize") {
      newSection = {
        type: "categorize",
        title: "",
        description: "",
        categories: [],
        items: [{ name: "", category: "" }],
        image: "",
      };
    } else if (selectedQuestionType === "comprehension") {
      newSection = {
        type: "comprehension",
        title: "",
        description: "",
        multipleQuestions: [{ question: "", answers: [] }],
        image: "",
      };
    } else if (selectedQuestionType === "cloze") {
      newSection = {
        type: "cloze",
        title: "",
        description: "",
        options: [],
        sentenceCase: "",
        PreviewCase: "",
        image: "",
      };
    }

    // Add the new section to the current list of form sections
    setFormSections([...formSections, newSection]);

    // Clear the selected question type after adding the section
    setSelectedQuestionType("");
  };

  // Function to delete a section
  const handleSectionDelete = (index) => {
    const updatedItems = [...formSections];
    updatedItems.splice(index, 1);
    setFormSections(updatedItems);
  };

  return (
    <div className="edit_form">
      {/* Form Header */}
      <Header formHeader={formHeader} setFormHeader={setFormHeader} />

      {/* Render all sections */}
      {formSections.map((ele, index) => {
        return (
          <Section
            key={index}
            {...ele}
            handleSectionDelete={handleSectionDelete}
            index={index}
          />
        );
      })}

      {/* Section for adding a new section */}
      <div className="add_more_section">
        {/* Dropdown to select the question type */}
        <select
          className="question-type-dropdown"
          value={selectedQuestionType}
          onChange={(e) => setSelectedQuestionType(e.target.value)}
        >
          <option value="">Select Question Type</option>
          <option value="categorize">Categorize</option>
          <option value="comprehension">Comprehension</option>
          <option value="cloze">Cloze</option>
        </select>

        {/* Button to add a new section */}
        <BsPlusCircleDotted
          className="add-section-icon"
          onClick={handleAddSection}
        />
      </div>
    </div>
  );
};

export default Edit;
