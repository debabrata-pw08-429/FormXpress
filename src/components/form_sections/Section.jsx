import "./sectionsModule.css";
import Comprehension from "../comprehension/Comprehension";
import Categorize from "../categorize/Categorize";
import Cloze from "../cloze/Cloze";

const Section = (props) => {
  const { type } = props;

  return (
    <div className="section">
      {type === "Categorize" ? <Categorize {...props} /> : null}
      {type === "comprehension" ? <Comprehension /> : null}
      {type === "cloze" ? <Cloze /> : null}
    </div>
  );
};

export default Section;
