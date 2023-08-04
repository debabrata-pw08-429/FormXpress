// Import Modules_
import { Routes, Route } from "react-router-dom";

// Import Components_
import Edit from "../pages/Edit";

import Responses from "../pages/Responses";
import Home from "../pages/Home";
import PreviewForm from "../pages/PreviewPage/PreviewForm";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/edit/:formID" element={<Edit />}></Route>
        <Route path="/preview/:formID" element={<PreviewForm />}></Route>
        <Route path="/responses/:formID" element={<Responses />}></Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
