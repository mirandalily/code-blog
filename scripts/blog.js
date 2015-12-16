var blog = {};
blog.rawData = [];
blog.articles = [];

blog.sortRawData = function() {
  blog.rawData.sort(function(a, b) {
    if (a.publishedOn > b.publishedOn) {return -1;}
    if (a.publishedOn < b.publishedOn) {return 1;}
    return 0;
  });
};

blog.createArticles = function() {
  for (var i = 0; i < blog.rawData.length; i++) {
    var temp = new Article(blog.rawData[i]);
    blog.articles.push(temp);
    $('.blogart').append(temp.toHTML());
  }
};

blog.populateAuthors = function() {
  for (var i = 0; i < this.articles.length; i++) {
    var currentAuthor = blog.articles[i].author;
    var $populateAuthor = $('#authoroption').clone();
    $populateAuthor.removeAttr('id').text(currentAuthor);
    $('#authorfilter').append($populateAuthor);
  }
};

blog.populateCategories = function() {
  for (var i = 0; i < this.articles.length; i++) {
    var currentCategory = blog.articles[i].category;
    var $populateCategory = $('#categoryoption').clone();
    $populateCategory.removeAttr('id').text(currentCategory);
    $('#categoryfilter').append($populateCategory);
  }
};



// option 2
// $(function () {
//   blog.sortRawData();
//   blog.createArticles();
// });
