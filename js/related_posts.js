  var relatedPosts = $("#related-posts"),
      labels = $(".post-label-anchor"),
      labelsLength = labels.length,
      relatedPostsUL = relatedPosts.children("div.clearfix"),
      entryTitle = $(".entry-title").text().toLowerCase().trim();

  var relatedPosts = $("#related-posts"),
      labels = $(".post-label-anchor"),
      labelsLength = labels.length,
      relatedPostsUL = relatedPosts.children("div.clearfix"),
      entryTitle = $(".entry-title").text().toLowerCase().trim();

  function getPostUrl(entry) {
          for (var j = 0; j < entry.link.length; j++) {
              if (entry.link[j].rel == "alternate") {
                  var posturl = entry.link[j].href;
                  return posturl;
              }
          }
      } // getPostUrl()

  function theHtmlCode(entry, posttitle, posturl) {
          var content = entry.content.$t,
              $content = $('<div>').html(content);

          if (content.indexOf("<img") > -1) {
              var src = $content.find('img:first').attr('src');
              var thumb = '<a class="related-post-img" href="' + posturl + '" style="background:url(&quot;' + src + '&quot;) no-repeat center; background-size: cover"></a>';
          } else {
              var thumb = '<a class="related-post-img" href="' + posturl + '" style="background:url(' + no_image_url + ') no-repeat center;background-size: cover"></a>';
          }

          var htmlcode = '<div class="related-post-item"><div class="related-thumb">' + thumb + '</div><h3 class="related-post-title"><a href="' + posturl + '">' + posttitle + '</a></h3></div>';

          relatedPostsUL.append(htmlcode);
      } // theHtmlCode()

  function removeDuplicates() {
          var posts = $(".related-post-item");
          var arr = [];

          posts.each(function(index) {
              var post = $(this);
              arr[index] = post.children(".related-post-title").text().trim();
          });

          var len = arr.length;
          var duplicates = [];

          for (var k = 0; k < len; k++) {
              for (var m = 0; m < len; m++) {
                  if (m !== k) {
                      if (arr[k] === arr[m]) {
                          duplicates.push(k);
                      }
                  }
              }
          }

          var l = duplicates.length;
          for (var s = 0; s < l - 1; s++) {
              posts.eq(duplicates[s]).remove();
          }
      } //removeDuplicates()

  function generateRelatedPosts(theLabel) {

          $.ajax({
              url: "/feeds/posts/default/-/" + theLabel + "?alt=json-in-script&max-results=30",
              type: 'get',
              dataType: "jsonp",
              success: function(data) {

                  var numOfEntries = data.feed.entry.length;

                  if (numOfEntries !== 1) {

                      if (numOfEntries > 5) {
                          var c = 0,
                              length = 5,
                              randomNumber = [];

                          for (var a = 0; a < numOfEntries; a++) {
                              randomNumber[a] = a;
                          }
                      } else {
                          length = numOfEntries;
                      }

                      for (var u = 0; u < length; u++) {
                          var entry,
                              entryToBeChoosen;

                          if (numOfEntries > 5) {
                              entryToBeChoosen = Number(randomNumber.splice(Math.floor(Math.random() * (numOfEntries - c)), 1));
                              entry = data.feed.entry[entryToBeChoosen];
                              c += 1;
                          } else {
                              entry = data.feed.entry[u];
                          }

                          var posttitle = entry.title.$t;

                          if (posttitle.toLowerCase().trim() !== entryTitle) {
                              var posturl = getPostUrl(entry);
                              theHtmlCode(entry, posttitle, posturl);
                          }
                      }
                  }
                  removeDuplicates();
              }
          });
      } // generateRelatedPosts()

  if (labelsLength) {

      if (labelsLength === 1) {
          var labelText = labels.text().trim();

          $.ajax({
              url: "/feeds/posts/default/-/" + labelText + "?alt=json-in-script&max-results=60",
              type: 'get',
              dataType: "jsonp",
              success: function(data) {

                  var numOfEntries = data.feed.entry.length;

                  if (numOfEntries === 1) {
                      relatedPosts.addClass("hide");
                  } else if (numOfEntries === 2) {

                      var entry = data.feed.entry[0];
                      var posttitle = entry.title.$t;
                      if (posttitle.toLowerCase() === entryTitle) {
                          entry = data.feed.entry[1];
                          posttitle = entry.title.$t;
                      }

                      var posturl = getPostUrl(entry);
                      theHtmlCode(entry, posttitle, posturl);

                  } else {
                      generateRelatedPosts(labelText);
                  }
              }
          });

      } else if (labelsLength === 2) {

          var theFirstLabel = labels.eq(0).text().trim();
          var theLastLabel = labels.eq(1).text().trim();

          generateRelatedPosts(theFirstLabel);
          generateRelatedPosts(theLastLabel);

      } else {

          var count = 0;
          for (var n = 0; n < 3; n++) {
              count += 1;
              var labelName = labels.eq(n).text().trim();

              generateRelatedPosts(labelName);
          }
      }
  } // if(labelsLength)
