﻿function getPostUrl(e){for(var t=0;t<e.link.length;t++)if("alternate"==e.link[t].rel){var a=e.link[t].href;return a}}function theHtmlCode(e,t,a){var l=e.content.$t,r=$("<div>").html(l);if(l.indexOf("<img")>-1)var s=r.find("img:first").attr("src"),n='<a class="related-post-img" href="'+a+'" style="background:url(&quot;'+s+'&quot;) no-repeat center; background-size: cover"></a>';else var n='<a class="related-post-img" href="'+a+'" style="background:url('+no_image_url+') no-repeat center;background-size: cover"></a>';var o='<div class="related-post-item"><div class="related-thumb">'+n+'</div><h3 class="related-post-title"><a href="'+a+'">'+t+"</a></h3></div>";relatedPostsUL.append(o)}function removeDuplicates(){var e=$(".related-post-item"),t=[];e.each(function(e){var a=$(this);t[e]=a.children(".related-post-title").text().trim()});for(var a=t.length,l=[],r=0;a>r;r++)for(var s=0;a>s;s++)s!==r&&t[r]===t[s]&&l.push(r);for(var n=l.length,o=0;n-1>o;o++)e.eq(l[o]).remove()}function generateRelatedPosts(e){$.ajax({url:"/feeds/posts/default/-/"+e+"?alt=json-in-script&max-results=30",type:"get",dataType:"jsonp",success:function(e){var t=e.feed.entry.length;if(1!==t){if(t>5)for(var a=0,l=5,r=[],s=0;t>s;s++)r[s]=s;else l=t;for(var n=0;l>n;n++){var o,i;t>5?(i=Number(r.splice(Math.floor(Math.random()*(t-a)),1)),o=e.feed.entry[i],a+=1):o=e.feed.entry[n];var d=o.title.$t;if(d.toLowerCase().trim()!==entryTitle){var f=getPostUrl(o);theHtmlCode(o,d,f)}}}removeDuplicates()}})}var relatedPosts=$("#related-posts"),labels=$(".post-label-anchor"),labelsLength=labels.length,relatedPostsUL=relatedPosts.children("div.clearfix"),entryTitle=$(".entry-title").text().toLowerCase().trim(),relatedPosts=$("#related-posts"),labels=$(".post-label-anchor"),labelsLength=labels.length,relatedPostsUL=relatedPosts.children("div.clearfix"),entryTitle=$(".entry-title").text().toLowerCase().trim();if(labelsLength)if(1===labelsLength){var labelText=labels.text().trim();$.ajax({url:"/feeds/posts/default/-/"+labelText+"?alt=json-in-script&max-results=60",type:"get",dataType:"jsonp",success:function(e){var t=e.feed.entry.length;if(1===t)relatedPosts.addClass("hide");else if(2===t){var a=e.feed.entry[0],l=a.title.$t;l.toLowerCase()===entryTitle&&(a=e.feed.entry[1],l=a.title.$t);var r=getPostUrl(a);theHtmlCode(a,l,r)}else generateRelatedPosts(labelText)}})}else if(2===labelsLength){var theFirstLabel=labels.eq(0).text().trim(),theLastLabel=labels.eq(1).text().trim();generateRelatedPosts(theFirstLabel),generateRelatedPosts(theLastLabel)}else for(var count=0,n=0;3>n;n++){count+=1;var labelName=labels.eq(n).text().trim();generateRelatedPosts(labelName)}