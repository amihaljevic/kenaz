var xhr = new XMLHttpRequest();
xhr.open("GET", " http://www.24sata.hr/feeds/news.xml", true);
xhr.responseType = "document";
xhr.send(null);

xhr.onload = function() {
    if (xhr.status === 200) {
        xhrResponse = xhr.responseXML;
        console.log(xhrResponse);
    }

    var items = [];
    xhrResponse.querySelectorAll("item").forEach(function(element) {
        var post = {};
        console.log(post);

        var titles = element.getElementsByTagName("title")
        console.log(titles);
        /*for (var i = 0; i < titles.length; i++) {
            var title = titles[i].innerHTML;
            console.log(title);
        }*/
        var title = titles[titles.length-1].innerHTML;
        post["title"] = title;

        var descriptions = element.getElementsByTagName("description");
        console.log(descriptions);
        for (var i = 0; i < descriptions.length; i++) {
            var description = descriptions[i].innerHTML;
            console.log(description);
        }
        post["description"] = description;

        var links = element.getElementsByTagName("link");
        console.log(links);
        for (var i = 0; i < links.length; i++) {
            var link = links[i].innerHTML;
            console.log(link);
        }
        post["link"] = link;

        var pubDates = element.getElementsByTagName("pubDate");
        console.log(pubDates);
        for (var i = 0; i < pubDates.length; i++) {
            var pubDate = pubDates[i].innerHTML;
            console.log(pubDate);
        }
        post["pubDate"] = pubDate;

        items.push(post);
    }, this);
    /*
    for (var i = 0; i < items.length; i++) {
        var post = {};
        console.log(post);
        }
    console.log(items);

    items.forEach(function(element) {
        var titles = element.getElementsByTagName("title");
        console.log(titles);

        var descriptions = element.getElementsByTagName("description");
        console.log(descriptions);

        var links = element.getElementsByTagName("link");
        console.log(links);

        var pubDates = element.getElementsByTagName("pubDate");
        console.log(pubDates);
    }, this);
    */
    console.log(items);
}