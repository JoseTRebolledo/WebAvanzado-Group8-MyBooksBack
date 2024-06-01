const { getSearchByTitleQuery, calculateMaxPages, getSearchByKeyQuery, 
  getSearchAuthorQuery
} = require('../public/booksApiRequestsHelpers');

var express = require('express');
var router = express.Router();

const axios = require('axios');




router.get('/searchByTitle', async function(req, res) {
    try {
        const { title, limit, sortedBy, page} = req.body;
        const query = getSearchByTitleQuery(title, limit, sortedBy, page);
        const apiResponse = await axios.get(query);
        const maxPages = calculateMaxPages(apiResponse.data.numFound, limit);
        const response = {
          books: apiResponse.data.docs,
          maxPages: maxPages
        }
        res.json(response);
        res.status(200);
      } catch (error) {
        console.error('Error al realizar la solicitud a la API externa:', error);
        res.status(500).json({ error: 'Error al obtener datos de la API externa' });
      }
});

router.get('/searchByKey', async function(req, res) {

    try {
        const key = req.body.key;
        const booksQuery = getSearchByKeyQuery(key);
        const apiBookResponse = await axios.get(booksQuery);
        const authors = await findBookAuthors(apiBookResponse.data.authors);
        const response = {
          book: apiBookResponse.data,
          authors: authors
        }
        res.json(response);
        res.status(200);
      } catch (error) {
        console.error('Error al realizar la solicitud a la API externa:', error);
        res.status(500).json({ error: 'Error al obtener datos de la API externa' });
      }
});

async function findBookAuthors(authors){
  const authorPromises = authors.map(async (authorObj) => {
    const authorKey = authorObj.author.key;
    const authorQuery = getSearchByKeyQuery(authorKey);
    const response = await axios.get(authorQuery);
    return response.data.name;
  });

  const authorNames = await Promise.all(authorPromises);

  return authorNames;
}

module.exports = router;