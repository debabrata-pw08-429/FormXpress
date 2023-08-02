// Import necessary modules and components
import { useEffect, useRef, useState } from "react"; // React hooks for handling state and side effects
import { RiImageAddFill } from "react-icons/Ri"; // Icon component for image upload
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for accessing the store

// Import Redux actions
import { set_HeaderDetails } from "../../ReduxStore/_singleForm/actions";

// Import styles
import "./headerModule.css";

// Header component definition
const Header = () => {
  // Redux setup
  const dispatch = useDispatch(); // Redux dispatcher
  const headerData = useSelector((state) => {
    return state.formReducer.header; // Get header data from Redux store
  });

  // React refs for file input and header data
  const fileInputRef = useRef(null); // Reference to the file input element
  const headerDataRef = useRef(headerData); // Reference to the header data

  // Local state for storing uploaded image files
  const [headerFiles, setHeaderFiles] = useState([]);

  // Function to handle adding an image
  const handleAddImg = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };

  // Side effect using useEffect to handle image extraction and update Redux store
  useEffect(() => {
    // Function to extract image URL from the uploaded files and update header data
    const extractImg = () => {
      const filesArray = Array.from(headerFiles);
      const previewImg = filesArray.map((file) => ({
        imgUrl: URL.createObjectURL(file),
      }));

      const img = previewImg[0]
        ? previewImg[0].imgUrl
        : headerDataRef.current.imageURL;

      headerDataRef.current = { ...headerDataRef.current, imageURL: img };
    };

    // Call the extractImg function
    extractImg();

    // Dispatch the updated header data to the Redux store
    dispatch(set_HeaderDetails(headerDataRef.current));
  }, [headerFiles, dispatch]);

  return (
    <>
      <div className="header">
        {/* Container for displaying the header image */}
        <div
          className="header_image"
          onClick={handleAddImg}
          style={{ backgroundImage: `url(${headerData.imageURL})` }}
        >
          {/* Show a "+" icon if there is no image */}
          {headerData.imageURL ? "" : <RiImageAddFill className="cover-img" />}

          {/* Hidden file input for uploading images */}
          <input
            type="file"
            name="headerImg"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setHeaderFiles(e.target.files)}
          />
        </div>
        {/* Container for displaying header details */}
        <div className="header_details">
          {/* Input field for the header title */}
          <input
            name="title"
            className="header_title"
            type="text"
            value={headerData.title}
            placeholder="From title"
            onChange={(e) =>
              dispatch(
                set_HeaderDetails({ ...headerData, title: e.target.value })
              )
            }
          />
          <hr />
          {/* Input field for the header description */}
          <input
            name="description"
            className="header_description"
            value={headerData.description}
            placeholder="Form description"
            onChange={(e) =>
              dispatch(
                set_HeaderDetails({
                  ...headerData,
                  description: e.target.value,
                })
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default Header;
