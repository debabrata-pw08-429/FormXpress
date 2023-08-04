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

const fetchFormDetailsAction = (id) => {
  return (dispatch) => {
    axios
      .get(`${API}/edit/${id}`)
      .then((res) => {
        let formData = res.data;
        dispatch(set_FormData(formData));
      })
      .catch((error) => {
        console.error("Error fetching forms:", error);
      });
  };
};

const updateFormDetailsAction = (pathname, updatedData) => {
  return (dispatch) => {
    axios
      .post(`${API}${pathname}`, updatedData)
      .then((res) => {
        let formData = res.data;
        dispatch(set_FormData(formData));
      })
      .catch((error) => {
        console.error("Error updating forms:", error);
      });
  };
};

const set_FormData = (data) => {
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

const set_CategorizeDetails = (sectionsData) => {
  // if (idx) {
  //   sectionsData[idx] = data;
  // } else {
  //   sectionsData[0] = data;
  // }
  return {
    type: SET_EDIT_Categorize,
    payload: sectionsData,
  };
};

const set_ClozeDetails = (sectionsData) => {
  return {
    type: SET_EDIT_Cloze,
    payload: sectionsData,
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

export {
  set_HeaderDetails,
  set_CategorizeDetails,
  set_ClozeDetails,
  set_ComprehensionDetails,
  Set_EditedSections,
  sendFormCloudinary,
  fetchFormDetailsAction,
  updateFormDetailsAction,
  set_FormData,
};
