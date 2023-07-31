// Import Styles_
import "./comprehensionModule.css";

// Import Modules_
import { RiDeleteBin6Line, RiImageAddFill } from "react-icons/Ri";
import { MdDragIndicator } from "react-icons/Md";
import { TiDeleteOutline } from "react-icons/Ti";

const Comprehension = () => {
  return (
    <div className="comprehension">
      <div className="settings">
        <div>Question Type - Comprehension</div>
        <div className="icons-set">
          <RiImageAddFill className="addImg" />
          <RiDeleteBin6Line className="del" />
        </div>
      </div>

      <div className="comprehension-title">
        <input type="text" name="title" placeholder="Instructions" />
        <input
          type="text"
          name="description"
          placeholder="Passage (Required)"
        />
      </div>

      <div className="comprehension-mcq-box">
        <div className="comprehension-mcq">
          <input type="text" name="title" placeholder="MCQ Question" />
          <div className="mcq">
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

export default Comprehension;
