const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ message: 'Film hittade inte' });
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const movie = await Movie.findByIdAndUpdate(id, updates, { new: true });
        if (!movie) return res.status(404).json({ message: 'Film hittad inte' });
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) return res.status(404).json({ message: 'Film hittade inte' });
        res.status(200).json({ message: 'Deleted film!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReviewsByMovieId = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await Review.find({ movieId: id }).populate('userId', 'username');
        if (!reviews.length) return res.status(404).json({ message: 'Inga review hittade!' });

        const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        res.status(200).json({ averageRating, reviews });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReviewsOnAllMovies = async (req, res) => {
    try {
        const moviesWithRatings = await Movie.aggregate([
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'movieId',
                    as: 'reviews',
                },
            },
            {
                $project: {
                    title: 1,
                    director: 1,
                    releaseYear: 1,
                    genre: 1,
                    averageRating: { $avg: '$reviews.rating' },
                },
            },
        ]);

        res.status(200).json(moviesWithRatings);
    } catch (error) {
        res.status(500).json({ message: 'Misslyckades filmer med deras betyg' });
    }
};
