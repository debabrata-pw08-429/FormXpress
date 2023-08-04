// Import React Modules
import { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBinLine, RiFileAddFill } from "react-icons/Ri";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/Tb";
import { AiFillEye } from "react-icons/Ai";

// Global Variables
const API = `${import.meta.env.VITE_SOME_apiURL}/forms`;

// Import Styles
import "../App.css";
import Navbar from "../components/navbar/Navbar";

// Home Component
const Home = () => {
  const [forms, setForms] = useState([]);

  // Fetch all forms on component mount
  useEffect(() => {
    const fetchAllForms = () => {
      axios
        .get(API)
        .then((res) => {
          let formData = res.data;
          setForms(formData);
        })
        .catch((error) => {
          console.error("Error fetching forms:", error);
        });
    };
    fetchAllForms();
  }, []);

  // Adds a new form to the server and refreshes the page
  const addNewForm = () => {
    async function sendFormData() {
      const emptyForm = {
        header: { title: "New Form", description: "", imageURL: "" },
        sections: [],
      };

      try {
        const response = await axios.post(API, emptyForm);
        const data = await response.data;
        const newForm = data[0];
        setForms((prev) => [...prev, { ...newForm }]);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    sendFormData();
  };

  // Deletes a form with the specified formId from the server and refreshes the page
  const handleFormDeletion = (formId) => {
    async function deleteFormData() {
      try {
        const response = await axios.delete(`${API}/${formId}`);
        if (response.status === 200) {
          setForms((prevForms) =>
            prevForms.filter((form) => form._id !== formId)
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    deleteFormData();
  };

  // Render loading message if forms are not yet fetched
  if (forms.length <= 0) {
    return <h1 className="Noform">Loading...</h1>;
  }

  // Render the list of forms along with edit and delete buttons
  return (
    <div className="home">
      <Navbar />
      <div className="map-home">
        {forms?.map((form, index) => {
          return (
            <div key={index} className="home_form_collections">
              <div className="home_form_01">
                <div>{index + 1}</div>
                <h3 key={index}>{form.header.title}</h3>
              </div>
              <div>
                <button className="home_buttons home_edit_button">
                  <TbEdit />
                  <Link
                    to={`/edit/${form._id}`}
                    className="home_edit_button_link"
                    state={form}
                  >
                    Edit
                  </Link>
                </button>
                <button className="home_buttons home_preview_button">
                  <AiFillEye />
                  <Link
                    to={`/preview/${form._id}`}
                    className="home_preview_button_link"
                    state={form}
                  >
                    Preview
                  </Link>
                </button>

                <button
                  onClick={() => handleFormDeletion(form._id)}
                  className="home_buttons home_delete_button"
                >
                  <RiDeleteBinLine />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add new form icon */}
      <div onClick={addNewForm} className="home-add">
        <RiFileAddFill className="form-add" />
      </div>
    </div>
  );
};

export default Home;
