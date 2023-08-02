import {
  GET_EDIT_FORM,
  SET_EDIT_Header,
  SET_EDIT_Categorize,
  SET_EDIT_Cloze,
  SET_EDIT_Comprehension,
  SET_UPDATE_SECTIONS,
} from "./actionTypes";

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

export {
  get_FormDetails,
  set_HeaderDetails,
  set_CategorizeDetails,
  set_ClozeDetails,
  set_ComprehensionDetails,
  Set_EditedSections,
  fetch_FormDetails,
};
