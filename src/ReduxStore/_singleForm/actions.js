import axios from "axios";
import {
  GET_EDIT_FORM,
  SET_EDIT_Header,
  SET_EDIT_Categorize,
  SET_EDIT_Cloze,
  SET_EDIT_Comprehension,
  SET_UPDATE_SECTIONS,
} from "./actionTypes";

const API = `${import.meta.env.VITE_SOME_apiURL}`;

const getAllFormsAction = () => {
  return (dispatch) => {
    axios
      .get(`${API}/forms`)
      .then((res) => {
        let formData = res.data;
        dispatch(get_FormDetails(formData));
      })
      .catch((error) => {
        console.error("Error fetching forms:", error);
      });
  };
};

const addFormAction = (initFormData) => {
  const emptyForm = {
    header: { title: "New Form", description: "", imageURL: "" },
    sections: [],
  };

  let updatedData = {
    ...initFormData,
    emptyForm,
  };

  return (dispatch) => {
    axios.post(`${API}/forms`, updatedData).then((res) => {
      let formData = res.data;
      dispatch(get_FormDetails(formData));
    });
  };
};

const get_FormDetails = (data) => {
  return {
    type: GET_EDIT_FORM,
    payload: data,
  };
};

const fetch_FormDetails = (data) => {
  return {
    type: GET_EDIT_FORM,
    payload: data,
  };
};

const Set_EditedSections = (data) => {
  return {
    type: SET_UPDATE_SECTIONS,
    payload: data,
  };
};

const set_HeaderDetails = (data) => {
  console.log(data);
  return {
    type: SET_EDIT_Header,
    payload: data,
  };
};

const set_CategorizeDetails = (data) => {
  return {
    type: SET_EDIT_Categorize,
    payload: data,
  };
};

const set_ClozeDetails = (data) => {
  return {
    type: SET_EDIT_Cloze,
    payload: data,
  };
};

const set_ComprehensionDetails = (data) => {
  return {
    type: SET_EDIT_Comprehension,
    payload: data,
  };
};

const sendFormCloudinary = (formID, imageData) => {
  const imgAPI = `${import.meta.env.VITE_SOME_apiURL}/image`;
  const data = {
    formID: formID,
    image: imageData,
  };

  return async (dispatch) => {
    try {
      const response = await axios.post(imgAPI, data);
      const jsonData = response.data;
      console.log("sendFormCloudinary", jsonData);

      return dispatch(get_FormDetails(jsonData));
    } catch (error) {
      console.log(error);
    }
  };
};

// const fetchFormCloudinary = () => {
//   return (dispatch) => {
//     axios.get(URL).then((res) => {
//       return dispatch(redData(res.data));
//     });
//   };
// };

export {
  get_FormDetails,
  set_HeaderDetails,
  set_CategorizeDetails,
  set_ClozeDetails,
  set_ComprehensionDetails,
  Set_EditedSections,
  fetch_FormDetails,
  sendFormCloudinary,
  getAllFormsAction,
  addFormAction,
};
