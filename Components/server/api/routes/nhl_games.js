const express = require('express');
const router = express.Router();

const NHL_GamesController = require('../controllers/nhl_games');

router.get('/', NHL_GamesController.get_game);
router.get('/:date', NHL_GamesController.get_game_by_date);

module.exports = router;