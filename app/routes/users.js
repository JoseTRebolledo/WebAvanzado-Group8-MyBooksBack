var express = require('express');
var router = express.Router();


router.get('/login', async function(req, res) {
  try {
    const user = await req.app.locals.orm.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    })
    if (!user) {
      throw new Error('Usuario o contraseña incorrectos');
    }
    res.status(200);
    res.json(user);
  }
  catch (error) {
    console.error('Usuario o contraseña incorrectos', error);
    res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
  }
  
});

router.get('/getAll', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const users = await req.app.locals.orm.User.findAll({
      attributes: ['username', 'id'],
      limit: limit,
      offset: offset
    });

    const totalUsers = await req.app.locals.orm.User.count();
    const totalPages = Math.ceil(totalUsers / limit);

    // Enviar la respuesta
    res.status(200).json({
      users: users,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (error) {
    console.error('Erro obteniendo usuarios:', error);
    res.status(400).json({ error: 'Erro obteniendo usuarios' });
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const user = await req.app.locals.orm.User.findOne({
      where: {
        id: req.params.id
      }
    })
    res.status(200);
    res.json(user);
  }
  catch (error) {
    console.error('Error al intentar obtener un usuario', error);
    res.status(400).json({ error: 'Error al intentar obtener un usuario' });
  }
  
});

router.post('/', async function(req, res) {
  try {
      const {username, email, password} = req.body;
      const user = await req.app.locals.orm.User.create({
        username: username,
        email: email,
        password: password
      })
      res.json(user);
      res.status(201);
    } catch (error) {
      console.error('Error al intentar crear un usuario', error);
      res.status(500).json({ error: 'Error al intentar crear un usuario' });
    }
});

module.exports = router;
