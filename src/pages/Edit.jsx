import { useEffect, useState } from "react";
import "../App.css";
import Header from "../components/form_header/Header";
import Section from "../components/form_sections/Section";
import { BsPlusCircleDotted } from "react-icons/Bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Set_EditedSections,
  fetch_FormDetails,
} from "../ReduxStore/_singleForm/actions";

const Edit = () => {
  const dispatch = useDispatch();
  const initFormData = useSelector((state) => {
    return state.formReducer;
  });

  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [formData, setFormData] = useState(initFormData);
  const [formHeader, setFormHeader] = useState(initFormData.header || {});
  const [formSections, setFormSections] = useState(initFormData.sections || []);

  useEffect(() => {
    const pathname = window.location.pathname;
    const formId = pathname.split("/").pop();
    const apiUrl = `${import.meta.env.VITE_SOME_apiURL}/edit/${formId}`;

    async function fetchData() {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data) {
          setFormData(data);
          dispatch(fetch_FormDetails(data));
        }

        if (data.header) {
          setFormHeader(data.header);
        }

        if (data.sections) {
          setFormSections(data.sections);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [dispatch]);

  const handleAddSection = () => {
    if (selectedQuestionType === "") {
      alert("Please select a question type.");
      return;
    }

    let newSection = {};

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

    setFormSections((prevSections) => [...prevSections, newSection]);
    dispatch(Set_EditedSections([...formSections, newSection]));

    setSelectedQuestionType("");
  };

  const handleSectionDelete = (index) => {
    const updatedItems = [...formSections];
    updatedItems.splice(index, 1);
    setFormSections(updatedItems);

    dispatch(Set_EditedSections([...updatedItems]));
  };

  const handleFormSave = async () => {
    const pathname = window.location.pathname;
    const formId = pathname.split("/").pop();
    const apiUrl = `${import.meta.env.VITE_SOME_apiURL}/edit/${formId}`;

    const newFormData = {
      ...formData,
      header: formHeader,
      sections: formSections,
    };

    try {
      const response = await axios.post(apiUrl, newFormData);
      const data = response.data;
      setFormData(data);
    } catch (error) {
      console.error("Error while saving form:", error);
    }
  };

  if (!initFormData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="edit_form">
      <Header />
      {formSections?.map((ele, index) => {
        return (
          <Section
            key={index}
            {...ele}
            handleSectionDelete={handleSectionDelete}
            index={index}
          />
        );
      })}
      <div className="add_more_section last_section">
        <div onClick={handleFormSave}>save</div>
        <div>
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
          <BsPlusCircleDotted
            className="add-section-icon"
            onClick={handleAddSection}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
