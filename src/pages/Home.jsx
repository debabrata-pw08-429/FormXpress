import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { get_FormDetails } from "../ReduxStore/_singleForm/actions";

const Home = () => {
  const dispatch = useDispatch();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_SOME_apiURL}/forms`;

    async function fetchData() {
      // Function to fetch data from the API
      try {
        const response = await axios.get(apiUrl);
        const data = await response.data;
        setForms([...data]);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // Function to handle the "Edit" button click
  const handleEdit = (editData) => {
    if (editData) {
      dispatch(get_FormDetails(editData));
      const formId = editData._id;
      window.location.href = `/edit/${formId}`;
    }
  };

  return (
    <div className="home">
      <div>
        {forms.length <= 0 ? (
          <h1>No Forms Available</h1>
        ) : (
          forms.map((ele, idx) => {
            return (
              <div key={idx} className="home_form_collections">
                <div className="home_form_01">
                  <div>{idx + 1}</div>
                  <h3 key={idx}>{ele.header.title}</h3>
                </div>
                <div>
                  {/* Add an onClick event to handleEdit when "Edit" button is clicked */}
                  <button onClick={() => handleEdit(ele)}>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Add a clickable element to redirect to the edit page */}
      <div onClick={() => (window.location.href = "./edit")}>
        + Add New Form
      </div>
    </div>
  );
};

export default Home;
