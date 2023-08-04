import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./previewPage.css";
import { FaDragon } from "react-icons/Fa";

const PreviewForm = () => {
  const location = useLocation();
  const formID = location.state._id;
  const [formData, setFormData] = useState(location.state);
  const [formResponses, setFormResponses] = useState({});

  console.log("form data =>", formData);
  // Fetch all forms on component mount
  useEffect(() => {
    const previewAPI = `${import.meta.env.VITE_SOME_apiURL}/preview/${formID}`;

    const fetchAllForms = () => {
      axios
        .get(previewAPI)
        .then((res) => {
          let formData = res.data;
          setFormData(formData);
        })
        .catch((error) => {
          console.error("Error fetching forms:", error);
        });
    };

    fetchAllForms();
  }, [formID]);

  const handleSubmit = () => {
    // You can now submit the formResponses to your backend or handle them as needed
    console.log(formResponses);
  };

  return (
    <div className="preview-form">
      <div className="preview-header">
        <div className="preview_header_img">
          {formData.header.imageURL && (
            <img src={formData.header.imageURL} alt="Header" />
          )}
        </div>
        <h1>{formData.header.title}</h1>
        <p>{formData.header.description}</p>
      </div>

      {formData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="form-section">
          {/* Type categorize Section_ */}

          {section.type === "categorize" && (
            <div className="Categorize_section">
              <div className="section_header">
                <FaDragon />
                {section.type}
              </div>
              <div className="section_title_des">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
              <div className="Categorize_section_items">
                {/* map items here_ */}
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="Categorize_section_itemBox">
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="Categorize_section_responses">
                {/* map Category here_ */}

                {section.categories.map((category, catIndex) => (
                  <div key={catIndex} className="Category_container">
                    <div className="Category_heading">{category}</div>
                    <div className="Category_responseBox">
                      {"response box"}{" "}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Type cloze Section_ */}
          {section.type === "cloze" && (
            <div className="Cloze_section">
              <div className="section_header">
                <FaDragon /> {section.type}
              </div>

              <div className="section_title_des">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>

              <div className="Cloze_section_options">
                {/* map items here_ */}
                {section.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="Cloze_section_optionBox">
                    {option}
                  </div>
                ))}
              </div>

              <div className="Cloze_section_preview">{section.PreviewCase}</div>
            </div>
          )}

          {/* Type comprehension Section_ */}
        </div>
      ))}

      <button onClick={handleSubmit} className="preview_submit_buttom">
        Submit
      </button>
    </div>
  );
};

export default PreviewForm;
