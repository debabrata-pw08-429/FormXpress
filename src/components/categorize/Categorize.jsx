// Import Styles_
import "./categorizeModule.css";

// Import Modules_
import { MdAddCircle, MdDragIndicator } from "react-icons/Md";
import { RiDeleteBin6Line, RiImageAddFill } from "react-icons/Ri";
import { TiDeleteOutline } from "react-icons/Ti";

const Categorize = () => {
  return (
    <div className="categorize">
      <div className="settings">
        <div>Question Type - Categorize</div>
        <div className="icons-set">
          <RiImageAddFill className="addImg" />
          <RiDeleteBin6Line className="del" />
        </div>
      </div>
      <div className="categorize-title">
        <input type="text" name="title" placeholder="Question" />
        <input
          type="text"
          name="description"
          placeholder="Description (Optional)"
        />
      </div>

      <div className="categorize-addCategory">
        <h3>Add Categories</h3>
        <div>
          <div className="type-category-box">
            <input type="text" placeholder="Type Category" />
          </div>

          <MdAddCircle
            className="add-icon"
            onClick={() => console.log("add")}
          />
        </div>
      </div>

      <div className="categorize-addItems">
        <h3>All Items</h3>
        <div className="item">
          <MdDragIndicator className="icon_react" />
          <div className="item-div">
            <input type="text" placeholder="Item" />
            <select name="" id="">
              <option value="">Select Category </option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
          </div>
          <TiDeleteOutline className="icon_react" />
        </div>
        <div className="item_addMore">Add more items +</div>
      </div>
    </div>
  );
};

export default Categorize;
