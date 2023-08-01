import "./sectionsModule.css";
import Comprehension from "../comprehension/Comprehension";
import Categorize from "../categorize/Categorize";
import Cloze from "../cloze/Cloze";

const Section = (props) => {
  const { type } = props;

  return (
    <div className="section">
      {type === "categorize" ? <Categorize {...props} /> : null}
      {type === "comprehension" ? <Comprehension {...props} /> : null}
      {type === "cloze" ? <Cloze {...props} /> : null}
    </div>
  );
};

export default Section;
