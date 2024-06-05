const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/', authenticate, authorize(['admin']), movieController.createMovie);
router.get('/', movieController.getAllMovies);
router.get('/ratings', authenticate, movieController.getReviewsOnAllMovies);
router.get('/:id', movieController.getMovieById);
router.put('/:id', authenticate, authorize(['admin']), movieController.updateMovie);
router.delete('/:id', authenticate, authorize(['admin']), movieController.deleteMovie);
router.get('/:id/reviews', movieController.getReviewsByMovieId);

module.exports = router;
