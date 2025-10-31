import View from "./View";
import iconcs from "url:../../img/icons.svg";

class paginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    // Page 1 and there are other pages
    // Page 1 and NO other pages
    // Last page
    // Other page
  }
}

export default new paginationView();
