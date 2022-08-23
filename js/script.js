/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optTagsListSelector = '.post-tags .list';


const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  console.log('Link was clicked!');
  console.log(event);


  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log(clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';


  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

/* moduł 7 */

const articleTags = 'data-tags';

const generateTags = function () {

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsList = article.querySelector(optTagsListSelector);
    const articleTags = article.getAttribute('data-tags');
    const tags = articleTags.split(' ');

    let html = '';
    for (let tag of tags) {
      const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      html = html + tagLinkHTML;
    }

    tagsList.innerHTML = html;

  }
}

function tagClickHandler(event) {

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute("href");

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeLinks = document.querySelector('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (const link of activeLinks) {

    /* remove class active */

    targetTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const relatedLinks = document.querySelector('a[href="#tag-' + tag + '"]');

  /* START LOOP: for each found tag link */

  for (const tagLink of relatedLinks) {

    /* add class active */

    tagLink.class.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

const allTagLink = document.querySelectorAll('href');

  /* START LOOP: for each link */

for(tagLink of tagLinks){

  /* add tagClickHandler as event listener for that link */



  /* END LOOP: for each link */
  }
}

function generateAuthors() {

}

addClickListenersToTags();
generateTitleLinks();
generateTags();
generateTitleLinks('[data-tags~="' + tag + '"]');