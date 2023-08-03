// Import React Modules
import { useEffect, useRef, useState } from "react";
import { BsPlusCircleDotted } from "react-icons/Bs";
import { RiImageAddFill } from "react-icons/Ri";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Import Local Utilities
import Section from "../components/form_sections/Section";
import {
  Set_EditedSections,
  fetchFormDetailsAction,
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
import { useNavigate } from "react-router-dom";

// Global Variables
const pathname = window.location.pathname;
const formId = pathname.split("/").pop();
const API = `${import.meta.env.VITE_SOME_apiURL}`;

const Edit = () => {
  const dispatch = useDispatch();
  const initFormData = useSelector((state) => {
    return state.formReducer;
  });

  console.log(initFormData);

  const [formHeader, setFormHeader] = useState({
    ...initFormData.header,
    imageURL: initFormData.header?.imageURL || "",
  });

  const [formSections, setFormSections] = useState(initFormData.sections);
  const [headerImage, setHeaderImage] = useState(formHeader.imageURL);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFormDetailsAction(formId));
    // async function fetchData() {
    //   try {
    //     const response = await axios.get(`${API}/edit/${formId}`);
    //     const data = response.data;
    //     console.log(data);
    //     if (data.header) {
    //       console.log("data.header,", data.header);
    //       setFormHeader(data.header);
    //     }

    //     if (data.sections) {
    //       setFormSections(data.sections);
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // }

    // fetchData();
  }, [dispatch]);

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
    dispatch(Set_EditedSections([...formSections]));
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
      setHeaderImage(formHeader.imageURL);
    }
  };

  const handleUploadEvent = () => {
    fileInputRef.current.click();
  };

  const handleFormSave = () => {
    const newFormData = {
      ...initFormData,
      header: {
        ...formHeader,
        imageURL: headerImage,
      },
      sections: formSections,
    };

    dispatch(updateFormDetailsAction(formId, newFormData));
    navigate("/");
  };

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
