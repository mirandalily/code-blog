var Article = function(props) {
  this.author = props.author;
  this.authorSlug = props.author.replace(/\ /g, '');
  this.title = props.title;
  this.body = props.body;
  this.category = props.category;
  this.publishedOn = props.publishedOn;
  this.authorUrl = props.authorUrl;
};

Article.prototype.template = '';

Article.prototype.toHTML = function() {
  return this.template(this);
};

Article.prototype.toPlainText = function() {
  return JSON.stringify(this);
};
