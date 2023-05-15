const express = require('express');
const router = express.Router();

const NHL_PlayersController = require('../controllers/nhl_players');

router.get('/', NHL_PlayersController.players_get_all);
router.get('/:playerId', NHL_PlayersController.players_get_id);

module.exports = router;