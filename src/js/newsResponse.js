(function(){

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.24sata.hr/feeds/news.xml", true);
xhr.responseType = "document";
xhr.send(null);

/**
 * Stores inner HTML of root element child with desired tag name
 * in provided object under given key.
 * @param {Object} object 
 * @param {String} key 
 * @param {HTMLElement} rootElement 
 * @param {String} tagName 
 */
function storeElementInnerHTML(object, key, rootElement, tagName) {
    var element = rootElement.getElementsByTagName(tagName);
    var value = "";
    if (element[0] != null) {
        value = element[0].innerHTML;
    }
    object[key] = value;
}

xhr.onload = function() {
    if (xhr.status === 200) {
        xhrResponse = xhr.responseXML;
        //console.log(xhrResponse);
    }
    // Create empty array to store objects in
    var posts = [];
    /*
     * From the XML response query all <item> elements and for each <item>
     * make object to store selected data, in this case stores <title>, 
     * <link>, <pubDate> and <description>
     */ 
    xhrResponse.querySelectorAll("item").forEach(function(element) {
        var post = {};

        storeElementInnerHTML(post, "title", element, "title");
        storeElementInnerHTML(post, "link", element, "link");
        storeElementInnerHTML(post, "pubDate", element, "pubDate");

        // From the <description> element select unparsed HTML with .textContent
        var descriptions = element.getElementsByTagName("description");
        var description = descriptions[0].textContent;
        post["description"] = description;

        /*
         * To select <img> "src" attribute from <description> element we first
         * must create HTML element, in this case <div> that will parse .textContent
         * as HTML so we can get <img> element
         */ 
        var div = document.createElement("div");
        div.innerHTML = description;
        // Default img value is the first <img> item
        var img = div.getElementsByTagName("img")[0];
        /*
         * If there is an image in <description> element store the "src" value in object
         * with a key of "image", after that remove the <img> from <description> and
         * update the value of key "description" in an object to trimmed HTML from the
         * div variable. 
         * .trim() is used to remove whitespace at the beginning (and the end) because 
         * of the removed <img> element.
         * If there is no <img> in <description> then store the empty string as a value
         * for key "image" in the object
         */
        if (img != null) {
            post["image"] = img.getAttribute("src");
            img.remove();
            post["description"] = div.innerHTML.trim();
        } else {
            post["image"] = "";
        }
        // Push all generated post objects in the posts array
        posts.push(post);
    }, this);
    // Map the pubDate in posts array to create custom value display for the date
    posts.map(function (e) {
        e.pubDate = new Date(e.pubDate).toLocaleDateString()
        return e
    })

    //console.log(posts);

    var mainCarousel = document.getElementById("main-carousel");
    var articles = mainCarousel.getElementsByTagName("article");

    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        var post = posts[i];
        article.getElementsByClassName("wrapper--title")[0].innerHTML = ellipsize(post.title, 65, "...");
        article.getElementsByClassName("wrapper--pubDate")[0].innerHTML = post.pubDate;
        article.getElementsByClassName("wrapper--link")[0].setAttribute("href", post.link);
        article.getElementsByClassName("wrapper--img")[0].setAttribute("src", post.image);
    }
}

})();