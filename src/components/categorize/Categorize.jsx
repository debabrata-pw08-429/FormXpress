// Import Modules
import { useState } from "react";
import { MdAddCircle, MdDragIndicator } from "react-icons/Md";
import { RiDeleteBin6Line, RiImageAddFill } from "react-icons/Ri";
import { TiDeleteOutline } from "react-icons/Ti";

// Import Styles
import "./categorizeModule.css";

// Import PropTypes for type-checking props
import PropTypes from "prop-types";

const Categorize = (props) => {
  // State to manage the Categorize component's data
  const [categorizeObj, setCategorizeObj] = useState({
    title: props.title,
    description: props.description,
    categories: props.categories,
    items: props.items,
    image: props.image,
  });

  // Function to handle deletion of the Categorize component
  const handleDelete = (idx) => {
    props.handleSectionDelete(idx);
  };

  // Function to handle changes in the Categorize component's data
  const handleCategorizeChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCategories = [...categorizeObj.categories];
    updatedCategories[index] = value;
    const obj = {
      ...categorizeObj,
      [name]: value,
      categories: updatedCategories,
    };
    setCategorizeObj(obj);
  };

  // Function to add a new category
  const handleAddCategory = () => {
    const updatedCategorizeObj = {
      ...categorizeObj,
      categories: [...categorizeObj.categories, ""],
    };
    setCategorizeObj(updatedCategorizeObj);
  };

  // Function to add a new item
  const handleAddItem = () => {
    const newItem = {
      name: "New Item",
      category: "", // Initialize the new item with an empty category
    };
    const updatedCategorizeObj = {
      ...categorizeObj,
      items: [...categorizeObj.items, newItem],
    };
    setCategorizeObj(updatedCategorizeObj);
  };

  // Function to handle the selection of an item's category
  const handleItemSelect = (e, index) => {
    const { value } = e.target;

    const updatedItems = [...categorizeObj.items];
    updatedItems[index].category = value;

    const obj = {
      ...categorizeObj,
      items: updatedItems,
    };

    setCategorizeObj(obj);
  };

  // Function to handle changes in an item's name
  const handleItemName = (e, index) => {
    const { value } = e.target;

    const updatedItems = [...categorizeObj.items];
    updatedItems[index].name = value;

    const obj = {
      ...categorizeObj,
      items: updatedItems,
    };

    setCategorizeObj(obj);
  };

  return (
    <div className="categorize">
      {/* Header */}
      <div className="settings">
        <div>Question Type - Categorize</div>
        <div className="icons-set">
          <RiImageAddFill className="addImg" />
          <RiDeleteBin6Line
            className="del"
            onClick={() => handleDelete(props.index)}
          />
        </div>
      </div>

      {/* Title and Description Inputs */}
      <div className="categorize-title">
        <input
          type="text"
          name="title"
          placeholder="Question"
          value={categorizeObj.title}
          onChange={handleCategorizeChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description (Optional)"
          value={categorizeObj.description}
          onChange={handleCategorizeChange}
        />
      </div>

      {/* Categories */}
      <div className="categorize-addCategory">
        <h3>Add Categories</h3>
        <div>
          {categorizeObj.categories.map((Category, index) => (
            <div className="type-category-box" key={index}>
              <input
                type="text"
                placeholder="Type Category"
                value={Category}
                onChange={(e) => handleCategorizeChange(e, index)}
              />
            </div>
          ))}
          <MdAddCircle className="add-icon" onClick={handleAddCategory} />
        </div>
      </div>

      {/* Items */}
      <div className="categorize-addItems">
        <h3>All Items</h3>

        {categorizeObj.items.map((item, index) => (
          <div className="item" key={index}>
            <MdDragIndicator className="icon_react" />

            <div className="item-div">
              <input
                type="text"
                placeholder="Item"
                value={item.name}
                onChange={(e) => handleItemName(e, index)}
              />

              <select
                value={item.category}
                id={index}
                onChange={(e) => handleItemSelect(e, index)}
              >
                {categorizeObj.categories.map((cat, idx) => (
                  <option value={cat} key={idx}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <TiDeleteOutline className="icon_react" />
          </div>
        ))}

        <div className="item_addMore" onClick={handleAddItem}>
          Add more items +
        </div>
      </div>
    </div>
  );
};

// PropTypes for type-checking props to ensure the correct data types are passed
Categorize.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  image: PropTypes.string,
};

Categorize.propTypes = {
  handleSectionDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Categorize;
