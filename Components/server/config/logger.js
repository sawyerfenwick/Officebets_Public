//Return and Post LOGS and Error Codes 

exports.error_401 = (res) => {
    return res.status(401).json({
        message: 'Authorization Failed'
    });
}

exports.error_404 = (res, message) => {
    return res.status(404).json({
        message: message
    });
}

exports.log_message = () => {
    
}