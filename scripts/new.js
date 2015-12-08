var getFormData = function () {
  var grabber = new Article({
    author: $('input[name=author]').val(),
    authorUrl: $('input[name=authorUrl]').val(),
    title: $('input[name=title]').val(),
    category: $('input[name=category]').val(),
    publishedOn: $('input[name=publishedOn]').val(),
    body: marked($('textarea[name=body]').val())
  });
  return grabber;
};

$('document').ready(function() {
  $.get('template.html', function(data, message, xhr) {
    Article.prototype.template = Handlebars.compile(data);
  }).done(function() {
    $('form').change(function(event) {
      event.preventDefault();
      var temp = new Article(getFormData());
      $('#previewSection').html(temp.toHTML());
    });
    $('input[name=preview]').on('click', function(){
      $('#previewSection').toggle();
    });
    $('button.click').on('click', function(event) {
      event.preventDefault();
      var temp2 = new Article(getFormData());
      // $('pre code').each(function(i, block) {
      //   hljs().highlightBlock(block);
      // });
      $('#submitArea').text(temp2.toPlainText());
    });
  });
});
