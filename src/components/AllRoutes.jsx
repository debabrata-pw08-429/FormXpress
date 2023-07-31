// Import Modules_
import { Routes, Route } from "react-router-dom";

// Import Components_
import Edit from "../pages/Edit";
import Preview from "../pages/Preview";
import Responses from "../pages/Responses";
import Home from "../pages/Home";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/preview" element={<Preview />}></Route>
        <Route path="/responses" element={<Responses />}></Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
