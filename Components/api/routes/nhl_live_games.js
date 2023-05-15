const express = require('express');
const router = express.Router();

const NHL_LiveGameController = require('../controllers/nhl_live_games');

router.get('/', NHL_LiveGameController.get_live_games);
router.get('/:slug', NHL_LiveGameController.get_live_game_by_slug);

module.exports = router;