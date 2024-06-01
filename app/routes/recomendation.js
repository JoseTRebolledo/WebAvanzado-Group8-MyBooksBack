var express = require('express');
var router = express.Router();

const {getBook} = require("../public/createBooksHelpers");

function createIncludeOptions(orm){
    const options = [
        {
          model: orm.Book,
          as: 'book',
          attributes: ["key"]
        },
        {
          model: orm.User,
          as: 'userWhoGetsRecomended',
          attributes: ["username"] 
        },
        {
          model: orm.User,
          as: 'userWhoRecomends',
          attributes: ["username"]
        }
      ]
    return options;
}


router.get('/received/:userId', async function(req, res) {
  try {
    const user = await req.app.locals.orm.User.findOne({
      where: {
        id: req.params.userId
      }
    })
    const recomendations = await user.getRecomendationsReceived({
        include: createIncludeOptions(req.app.locals.orm)
    });
    res.status(200);
    res.json(recomendations);
  }
  catch (error){
    console.error('Error al intentar conseguir las recomendaciones recividas', error);
    res.status(400).json({ error: 'Error al intentar conseguir las recomendaciones recividas' });
  }
});

router.get('/made/:userId', async function(req, res) {
    try {
      const user = await req.app.locals.orm.User.findOne({
        where: {
          id: req.params.userId
        }
      })
      const recomendations = await user.getRecomendationsMade({
        include: createIncludeOptions(req.app.locals.orm)
      });
      res.status(200);
      res.json(recomendations);
    }
    catch (error){
      console.error('Error al intentar conseguir las recomendaciones realizadas', error);
      res.status(500).json({ error: 'Error al intentar conseguir las recomendaciones realizadas' });
    }
  });

  router.post('/', async function(req, res) {
    try {
        const orm = req.app.locals.orm;
        const {userWhoRecomendsId, userWhoGetsRecomendedId, content, key} = req.body;

        const book = await getBook(orm.Book, key);

        const newRecommendation = await orm.Recomendation.create({
            recommenderId: userWhoRecomendsId,
            recommendedToId: userWhoGetsRecomendedId,
            content: content,
            bookId: book.id
          });

        res.status(201);
        res.json(newRecommendation);
    }
    catch (error){
        console.error('Error al intentar crear la recomendacion', error);
        res.status(500).json({ error: 'Error al intentar crear la recomendacion' });
    }
  });

  router.get('/:id', async function(req, res){
    try {
        const recomendation = await req.app.locals.orm.Recomendation.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200);
        res.json(recomendation);
    }
    catch (error){
        console.error('Error al intentar encontrar la recomendacion', error);
        res.status(400).json({ error: 'Error al intentar encontrar la recomendacion' });
    }
  });

module.exports = router;