import { useState } from "react";
import "../App.css";
import Header from "../components/form_header/Header";
import Section from "../components/form_sections/Section";

import { FormXpressData } from "../constants/index";
import { BsPlusCircleDotted } from "react-icons/Bs";

const Edit = () => {
  const [formHeader, setFormHeader] = useState(FormXpressData[0].header);
  const [formSections, setFormSections] = useState(FormXpressData[0].sections);

  return (
    <div className="edit_form">
      <Header formHeader={formHeader} setFormHeader={setFormHeader} />

      <>
        {formSections.map((ele, idx) => {
          return <Section key={idx} {...ele} />;
        })}
      </>

      <div className="add_more_section">
        <BsPlusCircleDotted className="add-section-icon" />
      </div>
    </div>
  );
};

export default Edit;
