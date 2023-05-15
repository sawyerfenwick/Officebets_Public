const express = require('express');
const router = express.Router();
const checkAuth = require('../../config/check-auth');

const NHL_TeamsController = require('../controllers/nhl_teams');

router.get('/', checkAuth, NHL_TeamsController.teams_get_all);
router.get('/:teamId', NHL_TeamsController.teams_get_id);

module.exports = router;