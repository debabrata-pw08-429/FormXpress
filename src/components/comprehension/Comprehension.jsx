// Import Styles
import "./comprehensionModule.css";
import PropTypes from "prop-types";

// Import Modules
import { RiDeleteBin6Line, RiImageAddFill } from "react-icons/Ri";
import { MdDragIndicator } from "react-icons/Md";
import { TiDeleteOutline } from "react-icons/Ti";

const Comprehension = (props) => {
  const handleDelete = (idx) => {
    props.handleSectionDelete(idx);
  };

  return (
    <div className="comprehension">
      {/* Settings */}
      <div className="settings">
        <div>Question Type - Comprehension</div>
        <div className="icons-set">
          <RiImageAddFill className="addImg" />
          <RiDeleteBin6Line
            className="del"
            onClick={() => handleDelete(props.index)}
          />
        </div>
      </div>

      {/* Comprehension Title and Description */}
      <div className="comprehension-title">
        <input type="text" name="title" placeholder="Instructions" />
        <input
          type="text"
          name="description"
          placeholder="Passage (Required)"
        />
      </div>

      {/* Comprehension MCQ Box */}
      <div className="comprehension-mcq-box">
        <div className="comprehension-mcq">
          <input type="text" name="title" placeholder="MCQ Question" />
          <div className="mcq">
            {/* MCQ Options */}
            <div className="mcq-option">
              <MdDragIndicator className="icon_react" />
              <div className="mcq-option-div">
                <input type="text" placeholder="Option" />
              </div>
              <TiDeleteOutline className="icon_react" />
            </div>
            <button className="mcq-option-addMore">Add Option</button>
          </div>
        </div>
      </div>
      <div className="item_addMore">Add More Question</div>
    </div>
  );
};

// PropTypes Validation
Comprehension.propTypes = {
  handleSectionDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Comprehension;
