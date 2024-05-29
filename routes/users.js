var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const user = await req.app.locals.orm.User.create({
      username: "tottus",
      email: "tottus@gmail.com"
    })
    res.status(201);
    res.json(user);
  }
  catch (error){
    // const errorMessage = error.errors.map((e)=> e.message);
    console.log(error);
     res.send(error);
    res.status(400);
  }
  
});

router.get('/recomendation', async function(req, res, next) {
  try {
    const user = await req.app.locals.orm.User.findOne({
      where: {
        id: 1
      }
    })
    res.status(201);
    const nothing = await user.getRecomendationsReceived();
    res.json(nothing);
  }
  catch (error){
    // const errorMessage = error.errors.map((e)=> e.message);
    console.log(error);
     res.send(error);
    res.status(400);
  }
});

module.exports = router;
