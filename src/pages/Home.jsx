// Import React Modules
import { useEffect, useState } from "react";
import axios from "axios";
import { RiFileAddFill } from "react-icons/Ri";

// Import Styles
import "../App.css";

// Global Variables
const API = `${import.meta.env.VITE_SOME_apiURL}/forms`;

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

  // Redirects to the edit page for a specific form
  const redirectToEditPage = (formId) => {
    window.location = `/edit/${formId}`;
  };

  // Adds a new form to the server and refreshes the page
  const addNewForm = () => {
    const emptyForm = {
      header: { title: "New Form", description: "", imageURL: "" },
      sections: [],
    };

    async function sendFormData() {
      try {
        const response = await axios.post(API, emptyForm);
        const data = await response.data;
        setForms([...data]);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    sendFormData();

    // Adding the new form to the current state
    setForms((prevForms) => [...prevForms, { ...emptyForm }]);

    // Reload the page to display the new form
    window.location.reload();
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

    // Reload the page to reflect the form deletion
    window.location.reload();
  };

  // Render loading message if forms are not yet fetched
  if (forms.length <= 0) {
    return <h1 className="Noform">Loading...</h1>;
  }

  // Render the list of forms along with edit and delete buttons
  return (
    <div className="home">
      <div>
        {forms?.map((form, index) => {
          return (
            <div key={index} className="home_form_collections">
              <div className="home_form_01">
                <div>{index + 1}</div>
                <h3 key={index}>{form.header.title}</h3>
              </div>
              <div>
                <button onClick={() => redirectToEditPage(form._id)}>
                  Edit
                </button>

                <button onClick={() => handleFormDeletion(form._id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add new form icon */}
      <div onClick={addNewForm}>
        <RiFileAddFill className="form-add" />
      </div>
    </div>
  );
};

export default Home;
