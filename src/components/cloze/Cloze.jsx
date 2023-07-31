// Import Styles_
import "./clozeModule.css";

// Import Modules_
import { MdDragIndicator } from "react-icons/Md";
import { TiDeleteOutline } from "react-icons/Ti";
import { RiDeleteBin6Line, RiImageAddFill } from "react-icons/Ri";

const Cloze = () => {
  return (
    <div className="cloze">
      <div className="settings">
        <div>Question Type - Cloze</div>
        <div className="icons-set">
          <RiImageAddFill className="addImg" />
          <RiDeleteBin6Line className="del" />
        </div>
      </div>
      <div className="cloze-preview">
        <label htmlFor="">Preview</label>
        <input type="text" name="title" placeholder="Preview" />
        <hr />
        <label htmlFor="">Sentence</label>
        <input
          type="text"
          name="title"
          placeholder="Underline words here to convert them into blanks"
        />
      </div>
      <hr />
      <div className="cloze-addOptions">
        <h3>Add Options</h3>
        <div className="option">
          <MdDragIndicator className="icon_react" />
          <div className="option-div">
            <input type="text" placeholder="Option" />
          </div>
          <TiDeleteOutline className="icon_react" />
        </div>
        <div className="option_addMore">Add more options +</div>
      </div>
    </div>
  );
};

export default Cloze;
