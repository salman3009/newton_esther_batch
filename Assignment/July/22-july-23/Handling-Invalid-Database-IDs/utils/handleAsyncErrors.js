const handleAsyncErrors = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };
};

module.exports = handleAsyncErrors;