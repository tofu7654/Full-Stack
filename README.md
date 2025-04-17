# Full-Stack -  Notes on Full Stack Development Journey

## Section 1 - HTML - Hyper Text Markup Language :star:

* uses elements for structuring websites 
* elements contain attributes to further specify element function

### 1.1 - Fundamental Tags :bricks:

* **h1**; for large headers; typically only one per page, h2, h3, h4 get smaller incrementally
* **title** goes in the head tag; title appears in the browser tab of the page
* **p**; for paragraphs; write text for paragraph
* **div**; for containing HTML code and elements
* **section**; to divide sections and has semantic meaning
  * Using div and section to group together similar content together is very helpful for styling later
* **a**; for creating hyperlinks to external resources
* **label**; for labeling forms and inputs for better user experience and understanding
* **button**; placing a button onto webpage
* **input**; allowing user to input text to webpage; *placeholder* attribute for message in input bar before user types
* **head**; meta data and title that appears in browser tab for *search engine optimization*
* **nav** contains many tags with links to external resources 

### Section 2 - CSS styling

* use the *link* tag with rel="stylesheet" and href="sheetname.css" to link your stylesheet to HTML page
* whether *in-line styles* or otherwise, uses css; but not best practice
* should create a **css style sheet**
* *in-line* styling is done by adding the *style* attribute to the opening tag of an element.

-Examples: The 3 most common ways to style single tags, ids, and classes

    body{
        background: salmon;
        color: white;
    }

    #first-div{
        background: green;
    } 

    .paragraph{
        color: black;
    }

