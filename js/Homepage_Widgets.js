﻿$(".home-widgets .HTML").each(function(e){function t(e){for(var t=0;t<e.link.length;t++)if("alternate"==e.link[t].rel){var s=e.link[t].href;return s}}function a(e,t,s){if("content"in e)var a=e.content.$t;var r=a,l=r.indexOf("<img"),n=r.indexOf('src="',l),i=r.indexOf('"',n+5),c=r.substr(n+5,i-n-5);if(-1!=l&&-1!=n&&-1!=i&&""!=c){t[s]=c;var o=t[s]}else var o=no_image_url;return o}function r(e){var t=e.published.$t,s=t.split("-")[2].substring(0,2),a=t.split("-")[1],r=t.split("-")[0],l=["January","February","March","April","May","June","July","August","September","Octobor","November","December"],n=l[a-1],i=n+" "+s+", "+r;return t?i:""}function l(e){var t=e.category;t&&(t=e.category[0].term);var s='<div class="category-wrapper"><a class="category" href="/search/label/'+t+'?max-results=10">'+t+"</a></div>";return t?s:""}var n=$(this),i=n.children(".widget-content"),o=i.text().trim(),u=o.match(/[^[\]]+(?=])/g);"["===o.charAt(0)&&(u[1]=u[1].toLowerCase(),i.addClass(u[1]).addClass("clearfix"),"grids"===u[1]?$.ajax({url:"/feeds/posts/default/-/"+u[0]+"?alt=json-in-script&max-results="+gridsPostsNum,type:"get",dataType:"jsonp",success:function(e){for(var s=new Array,n="",c=e.feed.entry.length,o=0;c>o;o++){var u=e.feed.entry[o],d=u.title.$t,f=t(u),p=a(u,s,o),h=u.author[0].name.$t,g=r(u),b=l(u);n=n+'<div class="grids-post" style="background: url(&quot;'+p+'&quot;) no-repeat center;background-size: cover"><div class="grids-post-info">'+b+'<a href="'+f+'" class="post-title"><h2 class="heading">'+d+'</h2></a><span class="publish-date">'+g+'</span><span class="writer">by '+h+"</span></div></div>"}i.html(n)}}):"twocolumns"===u[1]?$.ajax({url:"/feeds/posts/default/-/"+u[0]+"?alt=json-in-script&max-results="+twocolumnsPostsNum,type:"get",dataType:"jsonp",success:function(e){for(var t=new Array,a="",r=e.feed.entry.length,l=0;r>l;l++){for(var n,o=e.feed.entry[l],f=o.title.$t,p=0;p<o.link.length;p++)if("alternate"==o.link[p].rel){n=o.link[p].href;break}var h=o.published.$t,g=h.split("-")[2].substring(0,2),v=h.split("-")[1],m=h.split("-")[0],y=["January","February","March","April","May","June","July","August","September","Octobor","November","December"],x=y[v-1],k=x+" "+g+", "+m;if("content"in o)var $=o.content.$t;if(s=$,u=s.indexOf("<img"),b=s.indexOf('src="',u),c=s.indexOf('"',b+5),d=s.substr(b+5,c-b-5),-1!=u&&-1!=b&&-1!=c&&""!=d){t[l]=d;var w=t[l]}else var w=no_image_url;var a=a+'<li class="twocolumns-item clearfix"><a href="'+n+'" class="post-image-square" style="background: url(&quot;'+w+'&quot;) no-repeat center; background-size: cover;"></a><span class="publish-date">'+k+'</span><a href="'+n+'" class="post-title anchor-hover"><h2 class="heading">'+f+"</h2></a></li>"}i.html("<ul class='clearfix'>"+a+"</ul>")}}):"bleft"===u[1]?$.ajax({url:"/feeds/posts/default/-/"+u[0]+"?alt=json-in-script&max-results=6",type:"get",dataType:"jsonp",success:function(e){for(var t=new Array,a="",r=e.feed.entry.length,l=0;r>l;l++){for(var n,o=e.feed.entry[l],f=o.title.$t,p=0;p<o.link.length;p++)if("alternate"==o.link[p].rel){n=o.link[p].href;break}if(0===l){var h='<a class="post-category" href="/search/label/'+o.category[0].term+'?max-results=7">'+o.category[0].term+"</a>";if("content"in o)var g=o.content.$t;if(s=g,u=s.indexOf("<img"),b=s.indexOf('src="',u),c=s.indexOf('"',b+5),d=s.substr(b+5,c-b-5),-1!=u&&-1!=b&&-1!=c&&""!=d){t[l]=d;var v=t[l]}else var v=no_image_url;var m='<div class="big-post clearfix" style="background: url(&quot;'+v+'&quot;) no-repeat center; background-size: cover;">'+h+'<a href="'+n+'" class="post-title"><h2>'+f+"</h2></a></div>"}else a=a+'<li class="content-item"><a href="'+n+'" class="post-title"><h2>'+f+"</h2></a></li>"}i.html(m+"<ul class='other-posts'>"+a+"</ul>")}}):"bsummary"===u[1].toLowerCase()&&$.ajax({url:"/feeds/posts/default/-/"+u[0]+"?alt=json-in-script&max-results=4",type:"get",dataType:"jsonp",success:function(e){for(var s=new Array,r="",l=e.feed.entry.length,n=0;l>n;n++){var c=e.feed.entry[n],o=c.title.$t,u=t(c),d=a(c,s,n);if(0===n)var f='<div class="big-post clearfix"><a href="'+u+'" class="post-image" style="background: url('+d+') no-repeat center; background-size: cover;"></a><a href="'+u+'" class="post-title"><h2 class="heading">'+o+"</h2></a></div>";else r=r+'<li class="content-item clearfix"><a href="'+u+'" class="post-image-square" style="background: url('+d+') no-repeat center; background-size: cover;"></a><a href="'+u+'" class="post-title"><h2 class="heading">'+o+"</h2></a></li>"}i.html(f+"<ul class='other-posts'>"+r+"</ul>")}}))});