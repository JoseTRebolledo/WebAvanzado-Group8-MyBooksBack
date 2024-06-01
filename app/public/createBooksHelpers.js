const { getSearchByKeyQuery } = require("./booksApiRequestsHelpers");

async function getBook(booksModel, key){
    let book =  await booksModel.findOne({
        where: {
            key: key
        }
    });
    if (!book){
        book = await booksModel.create({
            key: key
            });
    }
    return book;
}


module.exports = {
    getBook
  };