// https://gist.github.com/gre/1650294
var EasingFunctions = {
    // no easing, no acceleration
    linear: function (t) { return t },
    // accelerating from zero velocity
    easeInQuad: function (t) { return t*t },
    // decelerating to zero velocity
    easeOutQuad: function (t) { return t*(2-t) },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    // accelerating from zero velocity 
    easeInCubic: function (t) { return t*t*t },
    // decelerating to zero velocity 
    easeOutCubic: function (t) { return (--t)*t*t+1 },
    // acceleration until halfway, then deceleration 
    easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
    // accelerating from zero velocity 
    easeInQuart: function (t) { return t*t*t*t },
    // decelerating to zero velocity 
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
    // accelerating from zero velocity
    easeInQuint: function (t) { return t*t*t*t*t },
    // decelerating to zero velocity
    easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
    // acceleration until halfway, then deceleration 
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}

// Elements
var mainCarousel = document.getElementById("main-carousel");
var leftArrow = mainCarousel.getElementsByClassName("left-arrow")[0];
var rightArrow = mainCarousel.getElementsByClassName("right-arrow")[0];
var articles = mainCarousel.getElementsByTagName("article");
var article = articles[0];

// Helpers
var articleWidth = mainCarousel.getBoundingClientRect().width;
var currentArticle = 0;
var currentMarginLeft = 0;
var nextMarginLeft = 0;
var startTime = null;
var endTime = 1500;

leftArrow.addEventListener("click", goBack);
rightArrow.addEventListener("click", goNext);

setInterval(goNext, 5000);

function goBack(event) {
    if (startTime !== null) {
        return;
    }

    currentArticle--;
    if (currentArticle <= -1) {
        currentArticle = articles.length - 1;
    }

    displayArticle();
}

function goNext(event) {
    if (startTime !== null) {
        return;
    }

    currentArticle++;
    if (currentArticle >= articles.length) {
        currentArticle = 0;
    }

    displayArticle();
}

function displayArticle() {
    currentMarginLeft = parseInt(article.style.marginLeft) || 0;
    nextMarginLeft = -1 * currentArticle * articleWidth;

    requestAnimationFrame(step);
}

function step(currentTime) {
    if (startTime === null) {
        startTime = currentTime;
    }

    var timePassedSinceStart = currentTime - startTime;
    var timeProgressRatio = timePassedSinceStart / endTime;

    var marginLeft = lerp(currentMarginLeft, nextMarginLeft, timeProgressRatio);
    article.style.marginLeft = marginLeft + 'px';

    if (timePassedSinceStart < endTime) {
        requestAnimationFrame(step);
    } else {
        startTime = null;
    }
}

function lerp(start, end, step) {
    var step = Math.max(0, Math.min(1, step));
    step = EasingFunctions.easeInOutCubic(step);
    return (1 - step) * start + step * end;
}

window.addEventListener("resize", function() {
    articleWidth = mainCarousel.getBoundingClientRect().width;
});
