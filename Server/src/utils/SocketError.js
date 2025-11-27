const sendSocketError = (socket, message, code = 400, event = "error") =>{
    socket.emit(event, {
        success: false,
        code: code,
        error: message,
    })
}

module.exports = sendSocketError;