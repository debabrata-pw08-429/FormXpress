// Import React Modules
import { useEffect, useRef, useState } from "react";
import { BsPlusCircleDotted } from "react-icons/Bs";
import { RiImageAddFill } from "react-icons/Ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Import Local Utilities
import Section from "../components/form_sections/Section";
import {
  set_FormData,
  Set_EditedSections,
  updateFormDetailsAction,
} from "../ReduxStore/_singleForm/actions";
import {
  newCategorizeObj,
  newClozeObj,
  newComprehensionObj,
} from "../constants";

// Import Styles
import "../App.css";
import "../components/form_header/headerModule.css";
import axios from "axios";

const Edit = () => {
  const currLocation = useLocation();
  const [formData, setCurrFormData] = useState(currLocation.state);
  const [formHeader, setFormHeader] = useState(formData.header);
  const [formSections, setFormSections] = useState(formData.sections);
  const [headerImage, setHeaderImage] = useState(formData.header.imageURL);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const reduxFormData = useSelector((state) => state.formReducer);
  const API = `${import.meta.env.VITE_SOME_apiURL}`;

  useEffect(() => {
    // Fetch data from API and update local state
    axios
      .get(`${API}${currLocation.pathname}`)
      .then((res) => {
        let response = res.data;
        setCurrFormData(response);
      })
      .catch((error) => {
        console.error("Error fetching forms:", error);
      });
  }, [currLocation.pathname, API]);

  // Merge API data and Redux store data into form data
  useEffect(() => {
    setCurrFormData((prevData) => ({
      ...prevData,
      ...reduxFormData,
    }));
  }, [reduxFormData]);

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

  const handleSectionDelete = (index) => {
    const updatedItems = [...formSections];
    updatedItems.splice(index, 1);
    setFormSections(updatedItems);
    dispatch(Set_EditedSections([...updatedItems]));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    transformFileFunc(file);
  };

  const transformFileFunc = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setHeaderImage(reader.result);
      };
    } else {
      setHeaderImage(headerImage);
    }
  };

  const handleUploadEvent = () => {
    fileInputRef.current.click();
  };

  const handleFormSave = async () => {
    let newFormData = {
      ...formData,
      header: {
        ...formHeader,
        imageURL: headerImage,
      },
      sections: formSections,
    };

    setCurrFormData(newFormData);
    dispatch(updateFormDetailsAction(currLocation.pathname, newFormData));

    alert("Form Saved!");
    window.location.pathname = "/";
  };

  if (!formHeader) {
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
              backgroundImage: `url(${headerImage})`,
            }}
          >
            {headerImage ? null : <RiImageAddFill className="cover-img" />}

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
            index={index}
            {...ele}
            handleSectionDelete={handleSectionDelete}
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
