/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/
// 1--create section 4 in the web page By copying section3
let section3 = document.getElementById('section3');
let section4 = section3.cloneNode(true);
// set attributes to the new section
section4.setAttribute("id" , "section4") ;
section4.setAttribute("data-nav" , "Section 4");
// modify the name of the section
section4.firstElementChild.firstElementChild.textContent = "Section 4"
// position the new section in the document
section3.insertAdjacentElement("afterend", section4 );


// 2--Define all sections in the web page
const sections = document.querySelectorAll('section');


// 3--Build the navigation menu
function buildMenu () {
  menu = document.getElementById('navbar__list');
  // Add list item in the navBar List for every section
  for (let section of sections) {
    newListItem = document.createElement('li');

    //Get id and name of every section
    let sectionId = section.id;
    let sectionName = section.getAttribute('data-nav');

    // Add class "menu__link" to every list item
    newListItem.className = "menu__link";
    // Add id to every list item based on its section
    newListItem.id = ("A" + section.id);
    // Add list items(anchors) to the navigation menu
    newListItem.innerHTML = sectionName;
    // Add event to the button to scroll into view of the section
    newListItem.addEventListener('click', function () {
    section.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
});
    // Add the List Item to the List
    menu.appendChild(newListItem);
  }
}
buildMenu ()


// 4--Get the active Element displayed in the screen
function getActiveSection() {

  // Assume first section as active in the beginning
  let activeSection = document.getElementById('section1');

  // Get the active section based on its BoundingClientRect
  minimum = 2000;
  for (section of sections) {
    let bounding = section.getBoundingClientRect();
    if (bounding.top > -300 & bounding.top < minimum ){
      minimum = bounding.top;
      activeSection = section;
    };
  };
  return activeSection;
};
getActiveSection ();


// 5--Add class 'active' to the section when near top of viewport
function active() {

    // Add event listener to activate this function upon scrolling
    window.addEventListener('scroll',function (event){

    // Get the active section and add "your-active-class" to it
    let theActiveSection = getActiveSection();
    theActiveSection.classList.add("your-active-class");

    //remove (your-active-class) from other sections
    for (let section of sections) {
        if (section.id != theActiveSection.id & section.classList.contains('your-active-class')){
        section.classList.remove('your-active-class')}
      };
    }
  );
};
active();


// 6--Highlight the current section on the Navigation menu
// Add event listener to activate this function upon scrolling
window.addEventListener('scroll',function (event){
  // Get the active section and its id
  let theActiveSection = getActiveSection();
  let sectionId = theActiveSection.getAttribute("id");
  // Get the array of list items of the navigation bar
  let listOfItems = Array.from(document.getElementsByClassName('menu__link'));

  //iterate over the list of anchors to highLight the active menu link
  for (item of listOfItems) {
    let itemId = item.id.slice(1)
    if (itemId === sectionId  ) {
      item.style.backgroundColor = "black" ;
      item.style.color = "white";
    }

  //remove highLight from inActive menu link
    if(itemId != sectionId  ){
      item.style.backgroundColor = "white" ;
      item.style.color = "black";
    }
  }
})

// End
