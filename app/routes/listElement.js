var express = require('express');
var router = express.Router();

const {getBook, checkIfBookInDataBase} = require("../public/createBooksHelpers");
const { where } = require('sequelize');

const states = {
    completed: "Completed",
    reading: "Reading",
    onHold: "On Hold",
    planToRead: "Plan to read",
    dropped: "Dropped"
}
const standardState = states.reading;

function createIncludeOptions(orm){
    const options = [
        {
          model: orm.Book,
          as: 'book',
          attributes: ["key"]
        }
      ]
    return options;
}

router.get('/userList/getByKey/:userId/:bookKey', async function(req, res) {
  try {
    const orm = req.app.locals.orm;
    const book = await checkIfBookInDataBase(orm.Book, req.params.bookKey);
    let userHasBook = true;
    let listElement = [];
    if (!book){
      userHasBook = false;
    }
    else {
      
    
    const user = await orm.User.findOne({
      where: {
        id: req.params.userId
      }
    })
    listElement = await user.getListElements({
        include: createIncludeOptions(orm),
        where: {
          bookId: book.id
        }
    });
    if (!listElement[0]){
      userHasBook = false;
    }
    }
    res.status(200);
    console.log(userHasBook);
    responseJson = {
      userHasBook: userHasBook,
      listElement: listElement[0]
    }
    res.json(responseJson);
  }
  catch (error){
    console.error('Error al intentar conseguir la lista del usuario', error);
    res.status(400).json({ error: 'Error al intentar conseguir la lista del usuario' });
  }
});

router.get('/userList/:userId', async function(req, res) {
  try {
    const { state } = req.query;
    const whereCondition = state ? { state } : {};
    const user = await req.app.locals.orm.User.findOne({
      where: {
        id: req.params.userId
      }
    })
    const listElements = await user.getListElements({
        include: createIncludeOptions(req.app.locals.orm),
        where: whereCondition
    });
    res.status(200);
    res.json(listElements);
  }
  catch (error){
    console.error('Error al intentar conseguir la lista del usuario', error);
    res.status(400).json({ error: 'Error al intentar conseguir la lista del usuario' });
  }
});


  router.post('/', async function(req, res) {
    try {
        const orm = req.app.locals.orm;
        const {userId, state = standardState, key} = req.body;

        const book = await getBook(orm.Book, key);

        const newListElement = await orm.ListElement.create({
            userId: userId,
            state: state,
            bookId: book.id
          });

        res.status(201);
        res.json(newListElement);
    }
    catch (error){
        console.error('Error al intentar al agregar el libro a la lista', error);
        res.status(500).json({ error: 'Error al intentar al agregar el libro a la lista' });
    }
  });

  router.put('/:id', async function(req, res){
    try {
        const {state, score} = req.body;
        const listElement = await req.app.locals.orm.ListElement.findOne({
            where:{
                id: req.params.id
            }
        });
        listElement.update({
            state: state,
            score: score
        })
        await listElement.save()
        res.status(201);
        res.json(listElement);
    }
    catch (error){
        console.error('Error al intentar al actualizar los valores del elemento', error);
        res.status(500).json({ error: 'Error al intentar al actualizar los valores del elemento' });
    }
  })

  router.get('/:id', async function(req, res){
    try {
        const listElement = await req.app.locals.orm.ListElement.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200);
        res.json(listElement);
    }
    catch (error){
        console.error('Error al intentar encontrar el elemento de la lista', error);
        res.status(400).json({ error: 'Error al intentar encontrar el elemento de la lista' });
    }
  })

  router.delete('/:id', async function(req, res){
    try {
        const listElement = await req.app.locals.orm.ListElement.findOne({
            where:{
                id: req.params.id
            }
        });
        listElement.destroy();
        res.status(201);
        res.send("Elemento eliminado correctamente");
    }
    catch (error){
        console.error('Error al intentar eliminar el elemento', error);
        res.status(500).json({ error: 'Error al intentar eliminar el elemento' });
    }
  })

  

module.exports = router;