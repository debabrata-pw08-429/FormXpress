import { useState } from "react";
import "../App.css";
import { FormXpressData } from "../constants/index";

const Home = () => {
  const [forms, setForms] = useState(FormXpressData);

  return (
    <div className="home">
      <div>
        {forms.length <= 0 ? (
          <h1>No Forms Available</h1>
        ) : (
          forms.map((ele, idx) => {
            return (
              <>
                <div className="home_form_collections" key={idx}>
                  <div className="home_form_01">
                    <div>{idx + 1}</div>
                    <h3 key={idx}>{ele.header.title}</h3>
                  </div>
                  <div>
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
      <div onClick={() => (window.location.href = "./edit")}>
        + Add New Form
      </div>
    </div>
  );
};

export default Home;
