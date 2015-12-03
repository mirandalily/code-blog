var Article = function(props) {
  this.author = props.author;
  this.title = props.title;
  this.body = props.body;
  this.category = props.category;
  this.publishedOn = props.publishedOn;
  this.authorUrl = props.authorUrl;
}

Article.prototype.toHTML = function() {
  var $clonedArticle = $('article#template').clone();
  $clonedArticle.removeAttr('id');
  $clonedArticle.addClass('blogpost');
  $clonedArticle.find('h1.author').html('Published by: ' + '<a href="' + this.authorUrl + '">' + this.author + '</a>');
  $clonedArticle.find('h2.title').html(this.title);
  $clonedArticle.find('div.post').html(this.body);
  $clonedArticle.find('a.read-more').html("Read More...");
  $clonedArticle.find('h3.publishdate').html(this.publishedOn);
  $clonedArticle.find('h3.category').html('Category: ' + this.category);
  $('main').append($clonedArticle);
}
