$(function() {
    var theLabel = $("#main-nav li a");
    theLabel.each(function(f) {
        var _self = $(this);
        var labelName = _self.text().trim();
        var mega = _self.attr("href");
        if (mega === "mega") {

            var megaListItem = _self.parent();
            _self.addClass("mega-icon");
            _self.attr("href", "/search/label/" + labelName + "?&max-results=10");

            if (windowWidth > 1025) {
                $.ajax({
                    url: "/feeds/posts/default/-/" + labelName + "?alt=json-in-script&max-results=4",
                    type: "get",
                    dataType: "jsonp",
                    success: function(e) {

                        var img = new Array();
                        var trtd = '';
                        var numOfEntries = e.feed.entry.length;

                        for (var i = 0; i < numOfEntries; i++) {
                            var entry = e.feed.entry[i];
                            var posttitle = entry.title.$t;
                            var posturl;

                            for (var k = 0; k < entry.link.length; k++) {
                                if (entry.link[k].rel == 'alternate') {
                                    posturl = entry.link[k].href;
                                    break;
                                }
                            }

                            if ("content" in entry) {
                                var postcontent = entry.content.$t;
                            }

                            s = postcontent;
                            a = s.indexOf("<img");
                            b = s.indexOf("src=\"", a);
                            c = s.indexOf("\"", b + 5);
                            d = s.substr(b + 5, c - b - 5);

                            if ((a != -1) && (b != -1) && (c != -1) && (d != "")) img[i] = d;

                            var tmb = img[i].replace('s1600/', 's500-c/');

                            var trtd = trtd + '<li class="mega-post clearfix"><a href="' + posturl + '" class="mega_post-image" style="background: url(' + tmb + ') no-repeat center;background-size: cover"></a><a href="' + posturl + '"><h3 class="mega_post-title">' + posttitle + '</h3></a></li>';

                        }
                        megaListItem.append('<div class="mega-menu-wrapper"><ul class="mega-menu clearfix">' + trtd + '</ul></div>');
                    }
                });
            }
        }
    });
});