/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optTagsListSelector = '.post-tags .list',
  optTagsCloudList = '.sidebar .tags',
  optAuthorsListSelector = '.authors .list';

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
};

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

const calculateTagsParams = function (allTags) {

  const params = {
    max: 0,
    min: 99999
  };

  for (let tag in allTags) {
    if (allTags[tag] > params.max) {
      params.max = allTags[tag];
    }
    if (allTags[tag] < params.min) {
      params.min = allTags[tag];
    }
  }
  return params;
};

const calculateTagClass = function (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (5 - 1) + 1);

  return 'tag-size-' + classNumber;
};

const generateTags = function () {

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsList = article.querySelector(optTagsListSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const tags = articleTags.split(' ');
    for (let tag of tags) {
      const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      html = html + tagLinkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsList.innerHTML = html;
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsCloudList);
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log(tagsParams);

  /* [NEW] START LOOP: for each tag in allTags: */
  let allTagsHTML = '';

  for (let tag in allTags) {
    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ')' + '</a></li>';
  }

  /* [NEW] create variable for all links HTML code */
  tagList.innerHTML = allTagsHTML;
};

function tagClickHandler(event) {

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (const link of activeLinks) {

    /* remove class active */

    link.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const relatedLinks = document.querySelectorAll('a[href="#tag-' + tag + '"]');

  /* START LOOP: for each found tag link */

  for (const tagLink of relatedLinks) {

    /* add class active */

    tagLink.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

  const allTagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */

  for (const tagLink of allTagLinks) {

    /* add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {
    const authorWrapper = article.querySelector('p.post-author');
    const author = article.getAttribute('data-author');
    const linkHTML = 'by <a href="#author-' + author + '">' + author + '</a>';
    authorWrapper.innerHTML = linkHTML;
  
    if(!allAuthors[author]) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }

  const authorsList = document.querySelector(optAuthorsListSelector);
  const allAuthorsData = {authors: []};
  for(let author in allAuthors){
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    }
    )
  }
}

function authorClickHandler(event) {

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for (const link of activeLinks) {

    link.classList.remove('active');

  }

  const relatedLinks = document.querySelectorAll('a[href="#author-' + author + '"]');

  for (const link of relatedLinks) {

    link.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors() {
  const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (const link of allAuthorLinks) {

    link.addEventListener('click', authorClickHandler);

  }

}

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
authorClickHandler();
addClickListenersToAuthors();
