import {
  SET_UPDATE_SECTIONS,
  SET_EDIT_Header,
  SET_EDIT_Categorize,
  SET_EDIT_Cloze,
  SET_EDIT_Comprehension,
  GET_EDIT_FORM,
} from "./actionTypes";

const initialState = {};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_EDIT_FORM:
      return payload;

    case SET_UPDATE_SECTIONS:
      return {
        ...state,
        sections: [...payload],
      };

    case SET_EDIT_Header:
      return {
        ...state,
        header: payload,
      };

    case SET_EDIT_Categorize:
      return {
        ...state,
        sections: [...payload],
      };

    case SET_EDIT_Cloze:
      return {
        ...state,
        sections: payload,
      };

    case SET_EDIT_Comprehension:
      return {
        ...state,
        sections: payload,
      };

    default:
      return state;
  }
};

export { reducer };
