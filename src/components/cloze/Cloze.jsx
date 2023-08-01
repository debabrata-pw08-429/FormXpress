// Import Styles
import "./clozeModule.css";

// Import Modules
import { MdDragIndicator } from "react-icons/Md";
import { TiDeleteOutline } from "react-icons/Ti";
import { RiDeleteBin6Line, RiImageAddFill } from "react-icons/Ri";
import { useState } from "react";
import PropTypes from "prop-types";

const Cloze = (props) => {
  // State to store the cloze object
  const [clozeObj, setClozeObj] = useState({
    title: props.title,
    description: props.description,
    options: props.options,
    sentenceCase: props.sentenceCase,
    PreviewCase: props.PreviewCase,
    image: props.image,
  });

  // Handle deleting a cloze section
  const handleDelete = (idx) => {
    props.handleSectionDelete(idx);
  };

  // Handle input change for PreviewCase and sentenceCase
  const handleClozeChange = (event) => {
    const { name, value } = event.target;
    setClozeObj((prevClozeObj) => ({
      ...prevClozeObj,
      [name]: value,
    }));
  };

  // Handle adding more options
  const handleMoreOptions = () => {
    setClozeObj((prevClozeObj) => ({
      ...prevClozeObj,
      options: [...prevClozeObj.options, ""],
    }));
  };

  // Handle options change
  const handleOptionsChange = (index, newValue) => {
    // Create a copy of the options array to modify it
    const newOptions = [...clozeObj.options];
    newOptions[index] = newValue;

    // Update the state with the new options array
    setClozeObj((prevClozeObj) => ({
      ...prevClozeObj,
      options: newOptions,
    }));
  };

  return (
    <div className="cloze">
      {/* Cloze Settings */}
      <div className="settings">
        <div>Question Type - Cloze</div>
        <div className="icons-set">
          <RiImageAddFill className="addImg" /> {/* Icon for adding an image */}
          <RiDeleteBin6Line
            className="del"
            onClick={() => handleDelete(props.index)}
          />
          {/* Icon for deleting */}
        </div>
      </div>

      {/* Cloze Preview */}
      <div className="cloze-preview">
        <label htmlFor="previewInput">Preview</label>
        <input
          type="text"
          id="previewInput"
          name="PreviewCase"
          placeholder="Preview"
          value={clozeObj.PreviewCase}
          onChange={handleClozeChange}
        />
        <hr />
        <label htmlFor="sentenceInput">Sentence</label>
        <input
          type="text"
          id="sentenceInput"
          name="sentenceCase"
          value={clozeObj.sentenceCase}
          placeholder="Underline words here to convert them into blanks"
          onChange={handleClozeChange}
        />
      </div>
      <hr />

      {/* Add Options */}
      <div className="cloze-addOptions">
        <h3>Add Options</h3>

        {clozeObj.options.map((opt, idx) => (
          <div className="option" key={idx}>
            <MdDragIndicator className="icon_react" /> {/* Icon for dragging */}
            <div className="option-div">
              <input
                type="text"
                placeholder="Option"
                value={opt}
                onChange={(event) =>
                  handleOptionsChange(idx, event.target.value)
                }
              />
            </div>
            <TiDeleteOutline className="icon_react" /> {/* Icon for deleting */}
          </div>
        ))}

        {/* Add more options */}
        <div className="option_addMore" onClick={handleMoreOptions}>
          Add more options +
        </div>
      </div>
    </div>
  );
};

// PropTypes
Cloze.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  sentenceCase: PropTypes.string.isRequired,
  PreviewCase: PropTypes.string.isRequired,
  image: PropTypes.string,
};

Cloze.propTypes = {
  handleSectionDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Cloze;
