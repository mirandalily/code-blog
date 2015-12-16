var tabs = function() {
  $('.articleNav').click(function(event) {
    event.preventDefault();
    $('#tab2').hide();
    $('#tab1').show();
  });
  $('.aboutNav').click(function(event) {
    event.preventDefault();
    $('#tab1').hide();
    $('#tab2').show();
  });
};

var hideParagraphs = function() {
  $('article p:not(:first-child)').hide();
  $('a.read-more').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('p').fadeIn();
    $(this).hide();
  });
};

$(document).ready(function() {
  
  $.get('template.html', function(data, msg, xhr) {
    Article.prototype.template = Handlebars.compile(data);
  });

  blog.sortRawData();
  blog.populateAuthors();
  blog.populateCategories();
  $('#tab2').hide();
  tabs();

  $.get('blogRawData.json').done(function(data) {
    blog.rawData = data;
  });
  $('select#authorfilter').on('change', function(event) {
    if (event.target.value === 'All') {
      $('.blogpost').show();
    } else {
      $('.blogpost').hide().filter(function() {
        return $(this).attr('data-author') === event.target.value.replace(/\ /g, '');
      }).show();
    }
  });
  $('select#categoryfilter').on('change', function(event){
    if (event.target.value === 'All') {
      $('.blogpost').show();
    } else {
      $('.blogpost').hide().filter(function() {
        return $(this).attr('data-category') === event.target.value;
      }).show();
    }
  });
  $( '.cross' ).hide();
  $( '.hamburger' ).click(function() {
    $( '.nav' ).slideToggle( 'slow', function() {
      $( '.hamburger' ).hide();
      $( '.cross' ).show();
    });
  });
  $( '.cross' ).click(function() {
    $( '.nav' ).slideToggle( 'slow', function() {
      $( '.cross' ).hide();
      $( '.hamburger' ).show();
    });
  });
});

$(document).ajaxSuccess(function(){
  blog.createArticles();
  hideParagraphs();
});
