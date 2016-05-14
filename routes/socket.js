
module.exports = function(socket){
	socket.on('timer started', function(runningMatchId){
        socket.broadcast.emit('timer started'+runningMatchId, runningMatchId);
    });

    socket.on('timer stopped', function(runningMatchId){
        socket.broadcast.emit('timer stopped'+runningMatchId, runningMatchId);
    });

    socket.on('match ended',function(runningMatchId){
    	socket.broadcast.emit('match ended'+runningMatchId,runningMatchId);
    });

	socket.on('update score',function(matchUpdates){
		socket.broadcast.emit('score updates'+matchUpdates.runningMatchId,matchUpdates);
	});

    socket.on('time out started',function(runningMatchId){
        socket.broadcast.emit('time out started'+runningMatchId,runningMatchId);
    });


}