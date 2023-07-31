import "./sectionsModule.css";
import Comprehension from "../comprehension/Comprehension";
import Categorize from "../categorize/Categorize";
import Cloze from "../cloze/Cloze";
import { BsPlusCircleDotted } from "react-icons/Bs";

const Section = () => {
  return (
    <div className="section">
      <Comprehension />

      <Categorize />

      <Cloze />

      <div className="add_more_section">
        <BsPlusCircleDotted className="add-section-icon" />
      </div>
    </div>
  );
};

export default Section;
