# Full-Stack
 Everything I've learned in Full Stack Development

#HTML - Hyper Text Markup Language; uses elements for structuring websites
* Web page structure: HTML = text, links, videos CSS = Styling , JS = interactivity
##Elements 
* <p> content </p>
* void elements - elements w/ no closing tag i.e <img>
    - <figure> <figcaption></figcaption> </figure> associates caption to image
* attribute - value used to adjust element behavior <img src=”image location” alt=”Cat sleeping in the grass”>
    - placed inside the opening tag of an element
    - alt attribute is a description of pic; displayed if image fails to load
    - <div id=”root”></div> ; <element attrbute = “value”>
* <input type=”checkbox” checked/> //checked box

* Link Element - used to link external resources

<link rel=”stylesheet” href=”./styles.css” />

target = “_blank” opens link in a new tab

- rel is the relationship b/w linked resource and HTML doc
- . at beginning is current dir
- must specify this is stylesheet
- best practice to separate html and css

<link rel=”icon” href=”favicon.ico” /> //favorite icon displayed on browser tab

##HTML Boilerplate - ready made template for webpages; contains essential elements; great starting point 

- <!DOCTYPE html> //version of html
- <html lang=”en”> wraps around entire doc and specifies language
- <head> </head> machine readable info ; link stylesheets here
- <meta name = “viewport” …> details about previews and others
- <title> </title> title that appears in browser window
- <body> </body> where all your content goes

UTF-8 - standardized character encoding; chars stores as bytes (8-bits) ; supports all characters <meta charset=”UTF-8” /> 

<main> unique content </main>; content in main should be unique and not repeated in other parts of the doc

- <ul> <li> milk </li> </ul> unordered list with list iteams
- <ol> </ol> ordered list

<em></em> emphasize a word

<strong></strong> bolds a words

Day 2

Divs - content division element; can be anything you want it to be; can have a height, width or colors; can also be used in basic form

Semantics - meanings of words or phrases; use a section element for browser to pickup this section as a language; dev dont got this

<section>

<h1>This has semantic meaning. </h1>

</section>

id attribute - adds a unique identifier to an HTML element; should be unique to the element (no other elements has same id)

- #title { color: red;} //the # referencing an element with title id
- cannot have spaces in id attribute; leads to unwanted issues
- should only contain letters, numbers, dashes etc

class attribute - does not need to be unique and can have spaces, multiple classes are seperated with a space

- .box //. is used to target a class with the following value

Classes are used when you want to set styles to many elements

Ids are used when you want to target specific elements

HTML entities - or character reference, set of characters used to represent reserved character in HTML; If HTML sees < or >then it automatically thinks of it as element

- &lt; &gt; //these are treated as normal text, not as an html element < >
- can also use decimal/hex reference &#60; and &#x3c;

Script element - used to embed executable code code; usually js

- interactive games, dynamic forms, sliders

<script src=”path-to-js-file.js”>

</script>

- could write all js code in HTML file, but best practice to linke HTML file to an external app.js file
- each section should address a separate issue

SEO - search engine optimization; optimizes web pages to rank higher on search engines

- can increase SEO by setting a page description for webpage
- <meta name=”description” content=”This page is amazing because it…../> //don’t make too long because will be truncated
- these are located under the google search link, a strong description could get more traffic to site

Open Graph protocol - controls how web content appears across social media platforms; can set through collection of meta elements

Open Graph tags:

- <meta content=”example.com” property=”og:title”>
- <meta property=”og:type” content=”website”> //type of content that will be displayed
- <meta content=”img_link” property=”og:image”>
- these should all be at least 1200 x 630 pixels or generally very good quality
- and many more; well-crafted OG’s can attract more traffic

```html
<meta property="og:url" content="https://www.freecodecamp.org" />
```

Replaced Element - content determined by external resource rather than CSS; 

- element is replaced by the img, site etc; but can’t modify the site or image itself
- video and embed;

<input type=”image” alt=”Descriptoin text” src=”example-img-url”>

- above is considered to be a replaced element but can be another input type like text or email

Optimize media assets - size, format, compression

- size: may have 640x480 (hxw)
- format: png, jpg but consider webp or avif which are better
- compression: jpgs will get worse quality if compressed

img licenses - protected by copyright regulations; default are all rights reserved;

1. must receive written permission
2. purchase a license
3. fair use (use of image is limited) 

images on public domain can be used without any restrictions (creative commons 0) pixabay and unsplash has free images

SVGs - scalable vector grapher, can be scaled to any size without impacting quality; can store data in xml so can use in html directly; stores paths, lines, points

- great for icons and webpage logos
- png and jpg are raster format (pixel based), they do not upscale well

<audio> and <video> allow adding video and sound to element

- .mp4, .ogg, .webm
- .mp3

<audio src=”dasf.mp3” controls></audio> //allows you to see the audio player

- loop attribute makes it play from the beginning again
- muted started muted

```html
<audio controls>
	<source src="audio.ogg" type="audio/ogg" />
	<source src="audio.wav" type="audio/wav" />
	<source src="audio.mp3" type="audio/mpeg" />
</audio>
```

- browsers take different sources, so this will allow browser to use the first one it recognizes

iframe element - inline frame; used to embed HTML content into HTML page; can embed YT videos onto pages. have to use youtube.com/embed/

- used to embed webpages, not just videos like the video element

<iframe

src=”video-url” //url of page

width=”width-value” //width

height=”height-value”

allowfullscreen //allows user to display iframe in fullscreen

></iframe>

- can embed maps using this element
- srcdoc element is used to embed HTML into the iframe

target attributes - tells browser where to open the URL for that anchor element 

- _self //opens in current browsing context
- _blank //opens a new browsing context
- _parent //opens in the parent
- _top //always opens in the whole window

Absolute and relative paths

- paths - specifies location of files
- absolute path - complete link that starts from the root directory and the protocol (http:// or file://)
    - use when linking to external website
    - consistently works regardless of location
- relative path - specifies location of file relative to directory of current file; no protocol or domain name
    - cleaner to maintain during dev
    - use during local testing
    - linking resources on same website
- file paths (3 syntaxes)
    1. / is a directorybn
    2. . is the current directory
    3. .. is the parent directory

Link States - link becomes purple for example

- default :link
- :visited - can change how this looks
- :hover - color changes when link is hovered over
- :focus - focus
- :active - color changes when clicked
- lvha is the order you should put css in