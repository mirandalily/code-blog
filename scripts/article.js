var Article = function(props) {
  this.author = props.author;
  this.authorSlug = props.author.replace(/\ /g, '');
  this.title = props.title;
  this.body = props.body;
  this.category = props.category;
  this.publishedOn = props.publishedOn;
  this.authorUrl = props.authorUrl;
}

Article.prototype.toHTML = function() {
  var source = $("#articletemplate").html();
  var template = Handlebars.compile(source);
  var result = template(this);
  $('.blogart').append(result);
}
