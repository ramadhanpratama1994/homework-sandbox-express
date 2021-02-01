exports.success = (response) => {
    return {
        success: true,
        message: response.message ?
            response.message : "successfull",
        data: response.data ?
            response.data : [],
    };
};

exports.failed = (response) => {
    return {
        success: false,
        message: response.message ?
            response.message : "failed",
        data: response.data ?
            response.data : [],
    };
};