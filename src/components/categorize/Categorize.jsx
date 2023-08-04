// Import React Modules
import { useEffect, useState } from "react";
import { MdAddCircle, MdDragIndicator } from "react-icons/Md";
import { RiDeleteBin6Line, RiImageAddFill } from "react-icons/Ri";
import { TiDeleteOutline } from "react-icons/Ti";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

// Import Local Utilities
import { set_CategorizeDetails } from "../../ReduxStore/_singleForm/actions";

// Import Styles
import "./categorizeModule.css";

const Categorize = (props) => {
  // Manage Current State_
  const [categorizeObj, setCategorizeObj] = useState({
    type: "categorize",
    title: props.title || "",
    description: props.description || "",
    categories: props.categories || [],
    items: props.items || [],
    image: props.image || "",
  });

  // Redux Setup_
  const dispatch = useDispatch();

  useEffect(() => {
    return dispatch(set_CategorizeDetails(categorizeObj));
  }, [dispatch, categorizeObj]);

  // Handle deleting a cloze section
  const handleDelete = (idx) => {
    props.handleSectionDelete(idx);
  };

  // Function to handle changes in the Categorize component's data
  const handleCategorize = (e) => {
    const { name, value } = e.target;
    const obj = {
      ...categorizeObj,
      [name]: value,
    };
    setCategorizeObj(obj);
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
          onChange={handleCategorize}
        />
        <input
          type="text"
          name="description"
          placeholder="Description (Optional)"
          value={categorizeObj.description}
          onChange={handleCategorize}
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
  title: PropTypes.string,
  description: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      category: PropTypes.string,
    })
  ),
  image: PropTypes.string,
  index: PropTypes.number,
  handleSectionDelete: PropTypes.func,
};

export default Categorize;
