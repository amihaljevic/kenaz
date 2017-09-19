var mainCarousel = document.getElementById("main-carousel");
var leftArrow = mainCarousel.getElementsByClassName("left-arrow")[0];
var rightArrow = mainCarousel.getElementsByClassName("right-arrow")[0];
var articles = mainCarousel.getElementsByTagName("article");
var width = mainCarousel.getBoundingClientRect().width;
var currentArticle = 0;

console.log(width);
var article = articles[0];
console.log(article);

leftArrow.addEventListener("click", goBack);
rightArrow.addEventListener("click", goNext);

function goBack(event) {
    currentArticle--;
    if (currentArticle <= -1) {
        currentArticle = articles.length - 1;
    }
    article.style.marginLeft = (-1 * currentArticle * width).toString() + 'px';
    //displayArticle(article);
    console.log("Go back");
}

function goNext(event) {
    currentArticle++;
    if (currentArticle >= articles.length) {
        currentArticle = 0;
    }
    article.style.marginLeft = (-1 * currentArticle * width).toString() + 'px';
    //displayArticle(article);
    console.log("Go next");
}
