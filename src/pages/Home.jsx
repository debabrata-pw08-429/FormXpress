import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { get_FormDetails } from "../ReduxStore/_singleForm/actions";

const emptyForm = {
  header: { title: "New Form", description: "", imageURL: "" },
  sections: [],
};

const apiUrl = `${import.meta.env.VITE_SOME_apiURL}/forms`;

const Home = () => {
  const dispatch = useDispatch();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const Url = `${import.meta.env.VITE_SOME_apiURL}/forms`;
      // Function to fetch data from the API
      try {
        const response = await axios.get(Url);
        const data = await response.data;
        setForms(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    // Call the fetchData function when the component mounts
    fetchData();
  }, [forms]);

  // Function to handle the "Edit" button click
  const handleEdit = (editData) => {
    if (editData) {
      dispatch(get_FormDetails(editData));
      const formId = editData._id;
      window.location.href = `/edit/${formId}`;
    }
  };

  const addNewForm = () => {
    setForms((prevForms) => [...prevForms, { ...emptyForm }]);

    async function sendFormData() {
      try {
        const response = await axios.post(apiUrl, emptyForm);
        const data = await response.data;
        setForms([...data]);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    sendFormData();
  };

  const handleFormDeletion = async (formId) => {
    try {
      // Make a DELETE request to the API to delete the form with the given formId
      const response = await axios.delete(`${apiUrl}/${formId}`);

      // If the deletion is successful, remove the form from the local state
      if (response.status === 200) {
        setForms((prevForms) =>
          prevForms.filter((form) => form._id !== formId)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="home">
      <div>
        {forms?.length <= 0 ? (
          <h1>No Forms Available</h1>
        ) : (
          forms?.map((ele, idx) => {
            return (
              <div key={idx} className="home_form_collections">
                <div className="home_form_01">
                  <div>{idx + 1}</div>
                  <h3 key={idx}>{ele.header.title}</h3>
                </div>
                <div>
                  {/* Add an onClick event to handleEdit when "Edit" button is clicked */}
                  <button onClick={() => handleEdit(ele)}>Edit</button>
                  {/* Pass the form._id to the handleFormDeletion function */}
                  <button onClick={() => handleFormDeletion(ele._id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Add a clickable element to redirect to the edit page */}
      <div onClick={addNewForm}>+ Add New Form</div>
    </div>
  );
};

export default Home;
