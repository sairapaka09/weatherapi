const { query, validationResult } = require('express-validator');

exports.validateInput = [
    query('lat')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Latitude cannot be empty!')
        .bail(),
    query('long')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Longitude cannot be empty!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
];