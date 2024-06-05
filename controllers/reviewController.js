const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('movieId', 'title').populate('userId', 'username');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id).populate('movieId', 'title').populate('userId', 'username');
        if (!review) return res.status(404).json({ message: 'Review hittade inte' });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const review = await Review.findByIdAndUpdate(id, updates, { new: true });
        if (!review) return res.status(404).json({ message: 'Review hittade inte' });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) return res.status(404).json({ message: 'Review hittade inte' });
        res.status(200).json({ message: 'Review raderad' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
