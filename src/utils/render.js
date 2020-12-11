/**
 * setLayout allows to display specific information in an HTML template
 * containing those paramters as id to text elements (h4, h5, title)
 * @param {pageTitle} pageTitle
 */
function setLayout(pageTitle) {
  
  if (pageTitle) {
    document.querySelector("title").innerText = pageTitle;
  }
  
}
export { setLayout };
