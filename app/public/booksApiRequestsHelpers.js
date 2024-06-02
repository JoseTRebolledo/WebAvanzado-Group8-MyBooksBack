const requireFields = ["title", "author_name", "cover_i", "first_publish_year", "key", "first_sentence", "isbn"];
const searchJson = "search.json?"
const booksApiPath = "https://openlibrary.org/"
const works = "/works/";
const json = ".json";
const standardLimit = 20;
const standardSortBy = "rating";
const standardPage = 1;

function replaceSpacesWithPlus(str) {
    return str.replace(/\s+/g, '+');
  }

function getTitle(title){
    return "title=" + replaceSpacesWithPlus(title);
}

function getFields(){
    return `&fields=${requireFields.join(',')}`;
}

function getLimit(limit){
    return `&limit=${limit}`;
}

function getSort(sort){
    return `&sort=${sort}`;
}

function getPage(page){
    return `&page=${page}`;
}

function getSearchByTitleQuery(title, limit=standardLimit, sortedBy=standardSortBy, page=standardPage){
    const request = `${booksApiPath}${searchJson}${
        getTitle(title)}${getFields()}${getLimit(limit)}${getSort(sortedBy)}${getPage(page)}`
    return request;
}

function calculateMaxPages(items, limit=standardLimit){
    return Math.ceil(items / limit)
}

function getSearchByKeyQuery(key){
    return `${booksApiPath}${works}${key}${json}`;
}

function getSearchAuthorQuery(key){
    return `${booksApiPath}${key}${json}`;
}


module.exports = {
    getSearchByTitleQuery,
    calculateMaxPages,
    getSearchByKeyQuery,
    getSearchAuthorQuery,
  };