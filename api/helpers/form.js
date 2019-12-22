module.exports = {
    success: (res, data) => {
        res.json({
            status: 200,
            msg: 'Success!',
            data,
        });
    },
};