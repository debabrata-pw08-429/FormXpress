// Import React Modules
import { useEffect, useRef, useState } from "react";
import { BsPlusCircleDotted } from "react-icons/Bs";
import { RiImageAddFill } from "react-icons/Ri";
import axios from "axios";

// Import Local Utilities
import Section from "../components/form_sections/Section";
import { useDispatch, useSelector } from "react-redux";
import {
  Set_EditedSections,
  fetch_FormDetails,
} from "../ReduxStore/_singleForm/actions";
import {
  newCategorizeObj,
  newClozeObj,
  newComprehensionObj,
} from "../constants";

// Import Styles
import "../App.css";
import "../components/form_header/headerModule.css";

// Global Variables
const pathname = window.location.pathname;
const formId = pathname.split("/").pop();
const apiUrl = `${import.meta.env.VITE_SOME_apiURL}/edit/${formId}`;

const Edit = () => {
  // State and Ref Hooks
  const dispatch = useDispatch();
  const initFormData = useSelector((state) => {
    return state.formReducer;
  });
  const [formData, setFormData] = useState(initFormData);
  const [formHeader, setFormHeader] = useState(formData.header || {});
  const [formSections, setFormSections] = useState(formData.sections || []);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [headerImage, setHeaderImage] = useState(formHeader.imageURL);
  const fileInputRef = useRef(null);

  // Fetch form data from API on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        console.log("fetch_FormDetails", data);

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

  // Add a new section to the form
  const handleAddSection = () => {
    if (selectedQuestionType === "") {
      alert("Please select a question type.");
      return;
    }

    let newSection = {};

    if (selectedQuestionType === "categorize") {
      newSection = newCategorizeObj;
    } else if (selectedQuestionType === "comprehension") {
      newSection = newComprehensionObj;
    } else if (selectedQuestionType === "cloze") {
      newSection = newClozeObj;
    }

    setFormSections((prevSections) => [...prevSections, newSection]);
    dispatch(Set_EditedSections([...formSections, newSection]));
    setSelectedQuestionType("");
  };

  // Delete a section from the form
  const handleSectionDelete = (index) => {
    const updatedItems = [...formSections];
    updatedItems.splice(index, 1);
    setFormSections(updatedItems);
    dispatch(Set_EditedSections([...updatedItems]));
  };

  // Handle file change for the header image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    transformFileFunc(file);
  };

  // Transform the selected file into a base64 URL
  const transformFileFunc = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setHeaderImage(reader.result);
      };
    } else {
      setHeaderImage(formHeader.imageURL);
    }
  };

  // Handle the upload event for the header image
  const handleUploadEvent = () => {
    fileInputRef.current.click();
  };

  // Handle form save
  const handleFormSave = async () => {
    const apiUrl = `${import.meta.env.VITE_SOME_apiURL}/edit/${formId}`;

    const newFormData = {
      ...formData,
      header: {
        title: formHeader.title,
        description: formHeader.description,
        imageURL: headerImage,
      },
      sections: formSections,
    };

    try {
      const response = await axios.post(apiUrl, newFormData);
      const data = await response.data;
      setFormData(data);
      window.location.href = "/";
    } catch (error) {
      console.error("Error while saving form:", error);
    }
  };

  // Render loading message if data is not yet available
  if (!initFormData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="edit_form">
      <>
        <div className="header">
          <div
            className="header_image"
            onClick={handleUploadEvent}
            style={{
              backgroundImage: `url(${headerImage ? headerImage : null})`,
            }}
          >
            {headerImage ? null : <RiImageAddFill className="cover-img" />}
            {/* File Input */}
            <input
              type="file"
              name="headerImg"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <div className="header_details">
            <input
              name="title"
              className="header_title"
              type="text"
              value={formHeader.title}
              placeholder="From title"
              onChange={(e) =>
                setFormHeader({ ...formHeader, title: e.target.value })
              }
            />
            <hr />
            <input
              name="description"
              className="header_description"
              value={formHeader.description}
              placeholder="Form description"
              onChange={(e) =>
                setFormHeader({ ...formHeader, description: e.target.value })
              }
            />
          </div>
        </div>
      </>
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
