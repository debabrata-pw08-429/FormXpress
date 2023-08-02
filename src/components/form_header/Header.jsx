import { useEffect, useRef, useState } from "react";
import { RiImageAddFill } from "react-icons/Ri";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_FormDetails,
  set_HeaderDetails,
} from "../../ReduxStore/_singleForm/actions";
import "./headerModule.css";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const initHeader = useSelector((state) => state.formReducer.header);

  const [headerFiles, setHeaderFiles] = useState([]);
  const fileInputRef = useRef(null);
  const headerDataRef = useRef({});

  // Set the initial state of headerData using initHeader values or empty strings
  const [headerData, setHeaderData] = useState({
    title: initHeader?.title || "",
    description: initHeader?.description || "",
    imageURL: initHeader?.imageURL || "",
  });

  const handleAddImg = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const extractImg = () => {
      const filesArray = Array.from(headerFiles);
      const previewImg = filesArray.map((file) => ({
        imgUrl: URL.createObjectURL(file),
      }));

      const img = previewImg[0] ? previewImg[0].imgUrl : headerData.imageURL;
      headerDataRef.current = { ...headerData, imageURL: img };
    };

    const pathname = window.location.pathname;
    const formId = pathname.split("/").pop();
    const apiUrl = `${import.meta.env.VITE_SOME_apiURL}/edit/${formId}`;

    async function fetchData() {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data) {
          dispatch(fetch_FormDetails(data));
        }

        if (data.header) {
          headerDataRef.current = data.header;

          // Update headerData state with the fetched data
          setHeaderData({
            title: data.header.title || "",
            description: data.header.description || "",
            imageURL: data.header.imageURL || "",
          });

          // Dispatch the updated header data to the store
          dispatch(set_HeaderDetails(data.header));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
    extractImg();
  }, [dispatch, headerFiles]);

  return (
    <>
      <div className="header">
        <div
          className="header_image"
          onClick={handleAddImg}
          style={{ backgroundImage: `url(${headerData.imageURL})` }}
        >
          {headerData.imageURL ? "" : <RiImageAddFill className="cover-img" />}
          <input
            type="file"
            name="headerImg"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setHeaderFiles(e.target.files)}
          />
        </div>
        <div className="header_details">
          <input
            name="title"
            className="header_title"
            type="text"
            value={headerData.title}
            placeholder="From title"
            onChange={(e) =>
              setHeaderData({
                ...headerData,
                title: e.target.value,
              })
            }
          />
          <hr />
          <input
            name="description"
            className="header_description"
            value={headerData.description}
            placeholder="Form description"
            onChange={(e) =>
              setHeaderData({
                ...headerData,
                description: e.target.value,
              })
            }
          />
        </div>
      </div>
    </>
  );
};

export default Header;
