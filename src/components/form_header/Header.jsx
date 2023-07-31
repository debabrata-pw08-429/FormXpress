import { useEffect, useRef, useState } from "react";
import "./headerModule.css";
import { RiImageAddFill } from "react-icons/Ri";

const Header = () => {
  const [headerDetails, setHeaderDetails] = useState({
    title: "Untitled Form",
    description: "",
  });
  const [headerImg, setHeaderImg] = useState("");
  const [headerFiles, setHeaderFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleAddImg = () => {
    fileInputRef.current.click();
  };

  // Get Preview Image from header files_
  useEffect(() => {
    const extractImg = () => {
      const filesArray = Array.from(headerFiles);
      const previewImg = filesArray.map((file) => ({
        imgUrl: URL.createObjectURL(file),
      }));

      const img = previewImg[0] ? previewImg[0].imgUrl : "";
      setHeaderImg(img);
    };

    extractImg();
  }, [headerFiles]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const obj = {
      ...headerDetails,
      [name]: value,
    };

    setHeaderDetails({ ...obj });
  };
  return (
    <>
      <div className="header">
        <div
          className="header_image"
          onClick={handleAddImg}
          style={{ backgroundImage: `url(${headerImg})` }}
        >
          {headerImg ? "" : "Add Header Image"}
          <RiImageAddFill className="cover-img" />
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
            value={headerDetails.title}
            placeholder="From title"
            onChange={handleChange}
          />
          <hr />
          <input
            name="description"
            className="header_description"
            placeholder="Form description"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
