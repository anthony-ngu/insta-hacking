var className = '_m3m1c';
var loadMoreCommentsButton = document.getElementsByClassName(className)[0];
var secondsToSleep = 2;

var interval = setInterval(function() {
  if (loadMoreCommentsButton != undefined){
    loadMoreCommentsButton.click();
    loadMoreCommentsButton = document.getElementsByClassName(className)[0];
  }else{
    console.log("no more to click");
    clearInterval(interval);
  }
}, 1000);

