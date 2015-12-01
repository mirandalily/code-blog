var blog = {};
blog.articles = [];

blog.sortRawData = function() {
  blog.rawData.sort(function(a, b) {
    if (a.publishedOn > b.publishedOn) {return -1;}
    if (a.publishedOn < b.publishedOn) {return 1;}
    return 0;
  });
}

blog.createArticles = function() {
  for (var i = 0; i < blog.rawData.length; i++) {
    var temp = new Article (blog.rawData[i]);
    blog.articles.push(temp);
    temp.toHTML();
  }
}

$(document).ready(function() {
  blog.sortRawData();
  blog.createArticles();
});
