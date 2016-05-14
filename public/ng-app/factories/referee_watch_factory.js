angular.module('vollyboard').factory('RefreeStopwatchFactory', ['$interval','socket','ScheduledMatchesFactory',function($interval,socket,ScheduledMatchesFactory){

    return function(options){

        var startTime = 0,
        currentTime = null,
        offset = 0,
        interval = null,
        isHalfTime=false,
        isBreakTime=false,
        isMatchTime=false,
        isTimeoutTimer=false,
        self = this;


        self.options = options; 

        if(!self.options.interval){
            self.options.interval = 100;
        }

        self.options.elapsedTime = new Date(0);

        self.running = false;

        function pushToLog(lap){
            if(self.options.log !== undefined){
                self.options.log.push(lap); 
            }
        }

//***********Updating time 
self.updateTime = function(){
//if it is still running
if(self.running===false){
    $interval.cancel(self.interval);
    return;
}

currentTime = new Date().getTime();
var timeElapsed = offset + (currentTime - startTime);
self.options.elapsedTime.setTime(timeElapsed);

//if it is machtime 
if(!self.isMatchTime){
    if(Math.floor(timeElapsed/60000)>=self.options[0].matchMinutes){
        self.stopOnMatchDuration();

    }
}

//When we go half time
if(!self.isHalfTime){
    if(self.options[0].matchHalfState===1 && self.options[0].matchState!="TOT"){
        if(Math.floor(timeElapsed/60000)>=self.options[0].halfTimeMinutes){
            self.stopOnMatchHalfTime();
        }
    }
}

//When we go in break time
if(self.isBreakTime){
    if(Math.floor(timeElapsed/60000)>=self.options[0].breakTimeMinutes){
        self.options[0].matchState="";
        self.stopClockForBreakTime();
    }
}
else if(self.options[0].matchState==="BRK"){

    if(Math.floor(timeElapsed/60000)>=self.options[0].breakTimeMinutes){
        self.options[0].matchState="";
        self.stopClockForBreakTime();
    }
}

if(self.isTimeoutTimer){
    if(Math.floor(timeElapsed/60000)>=self.options[0].timeoutMinutes){
        self.options[0].matchState="";
        self.stopTimeoutTime();
    }
}
else if(self.options[0].matchState==="TOT"){
    if(Math.floor(timeElapsed/60000)>=self.options[0].timeoutMinutes){
        self.options[0].matchState="";
        self.stopTimeoutTime();
    }
}


};

self.stopOnMatchDuration = function(){
    self.isMatchTime=true; 
    self.stopTimer();
    self.resetTimer();


    socket.emit('match ended',self.options[0].runningMatchId);
    setTimeout(function(){
        console.log("inside");
        ScheduledMatchesFactory.setMatchAsFinished(self.options[0].runningMatchId,self.options[0].matchId)
        .success(function(suc){
        })
        .error(function(err){

        })
    },3000);

}

self.stopOnMatchHalfTime = function(){
    self.isHalfTime=true;
    self.options[0].matchHalfState=0;
    self.stopTimer();
    self.resetTimer();

    setTimeout(function(){
        self.runClockForBreakTime();
        self.options[0].matchState="BRK";
        self.options[0].savedBreakTime=new Date();
        self.updateBreakMatchState("BRK");
    },1000)

    var updatedTime = new Date(self.options[0].matchSavedTime);
    updatedTime.setTime(updatedTime.getTime()+(self.options[0].breakTimeMinutes*60*1000));
    self.options[0].matchSavedTime = updatedTime;

    self.updateMatchTime();
}


self.runClockForBreakTime = function(){
    self.isBreakTime=true;
    startTime = new Date().getTime();
    self.options.elapsedTime.setTime(0);
    timeElapsed = offset = 0;
    self.interval = $interval(self.updateTime,self.options.interval);
    self.running = true;
};

self.stopClockForBreakTime = function(){
    self.options[0].matchState="";
    self.running = false;
    self.isBreakTime=false;
    startTime = new Date().getTime();
    self.options.elapsedTime.setTime(0);
    timeElapsed = offset = 0;
    $interval.cancel(self.interval);
    self.updateBreakMatchState("");

    self.startTimer();
};
self.takeTimeout = function(){
    if(self.options[0].matchState!="TOT" && self.options[0].matchState!="BRK")
    {
        self.stopTimer();
        self.resetTimer();

        setTimeout(function(){
            self.startTimeoutTimer();
            self.options[0].matchState="TOT";
            self.options[0].savedBreakTime=new Date();
            self.updateTimoutMatchState("TOT");
        },1000)

        var updatedTime = new Date(self.options[0].matchSavedTime);
        updatedTime.setTime(updatedTime.getTime()+(self.options[0].timeoutMinutes*60*1000));
        self.options[0].matchSavedTime = updatedTime;

        self.updateMatchTime();

    }

};

self.startTimeoutTimer = function(){
    self.isTimeoutTimer=true;
    startTime = new Date().getTime();
    self.options.elapsedTime.setTime(0);
    timeElapsed = offset = 0;
    self.interval = $interval(self.updateTime,self.options.interval);
    self.running = true;
};

self.stopTimeoutTime = function(){
    self.options[0].matchState="";
    self.running = false;
    self.isTimeoutTimer=false;

    startTime = new Date().getTime();
    self.options.elapsedTime.setTime(0);
    timeElapsed = offset = 0;

    $interval.cancel(self.interval);
    self.startTimer();

    self.updateTimoutMatchState("");
};



self.startTimer = function(){
    if(self.running === false){
        var date;
        switch(self.options[0].matchState){
            case "BRK":
            date= new Date(self.options[0].savedBreakTime);
            break;
            case "TOT":
            date= new Date(self.options[0].savedTimeoutTime);
            break;

            default:
            date = new Date(self.options[0].matchSavedTime);
        }
        startTime =  date.getTime() || new Date().getTime();
        self.interval = $interval(self.updateTime,self.options.interval);
        self.running = true;

        if(!self.options[0].matchSavedTime){
            self.options[0].matchSavedTime=new Date();
        }
    }


};

self.stopTimer = function(){
    if( self.running === false) {
        return;
    }
    self.updateTime();
    offset = offset + currentTime - startTime;
    pushToLog(currentTime - startTime);
    $interval.cancel(interval);
    self.running = false;

};

self.resetTimer = function(){
    startTime = new Date().getTime();
    self.options.elapsedTime.setTime(0);
    timeElapsed = offset = 0;
};
self.cancelTimer = function(){
    $interval.cancel(interval);
};

self.updateMatchStatusAndDate = function(){
    var date = new Date();
    ScheduledMatchesFactory.updateMatchStatusAndDate(self.options[0].runningMatchId,self.options[0].matchId,new Date())
    .success(function(res){
        self.options[0].matchSavedTime = date;
    })
    .error(function(err){

    })
}
self.updateMatchTime = function(){
    ScheduledMatchesFactory.updateMatchTime(self.options[0].matchSavedTime,self.options[0].runningMatchId)
    .success(function(res){
    })
    .error(function(err){

    })
}

self.updateBreakMatchState = function(state){
    ScheduledMatchesFactory.updateBreakMatchState(state,new Date(),self.options[0].runningMatchId)
    .success(function(res){

    })
    .error(function(err){

    })

}

self.updateTimoutMatchState = function(state){
    ScheduledMatchesFactory.updateTimeoutMatchState(state,new Date(),self.options[0].runningMatchId)
    .success(function(res){

    })
    .error(function(err){

    })
}


    self.listenForEvents=function(){
        socket.on('timer started'+self.options[0].runningMatchId,function(data){
            if(self.options[0].matchSavedTime){
            if(new Date(self.options[0].matchSavedTime).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)){
            self.options[0].matchSavedTime=null;
            }


            }
            self.startTimer(); 
        });

        socket.on('timer stopped'+self.options[0].runningMatchId,function(data){
            self.stopTimer();
        })
        socket.on('time out started'+self.options[0].runningMatchId,function(data){
            self.takeTimeout();
        })

        if(self.options[0].matchSavedTime){
            if(new Date(self.options[0].matchSavedTime).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)){
                self.options[0].matchSavedTime=null;
            }
            else{
                self.startTimer();    
            }

        }
    };


    self.listenForEvents();

    return self;

};


}]);