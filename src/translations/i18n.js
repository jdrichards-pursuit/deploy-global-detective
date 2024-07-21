import english from "./english";
import spanish from "./spanish";
import french from "./french";

let currentLanguage = english;

function getCurrentLanguage() {
  return currentLanguage;
}

function changeLanguage(language) {
  switch (language) {
    case "English":
      currentLanguage = english;
      break;
    case "Spanish":
      currentLanguage = spanish;
      break;
    case "French":
      currentLanguage = french;
      break;
    default:
      currentLanguage = english;
  }
}

export default {
  getCurrentLanguage,
  changeLanguage,
};
