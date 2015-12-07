var blog = {};
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
    var temp = new Article (blog.rawData[i]);
    blog.articles.push(temp);
    temp.toHTML();
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

$(document).ready(function() {
  blog.sortRawData();
  blog.createArticles();
  blog.populateAuthors();
  blog.populateCategories();
  $('#tab2').hide();
  tabs();

  $('article p:not(:first-child)').hide();
  $('a.read-more').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('p').fadeIn();
    $(this).hide();
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
// option 2
// $(function () {
//   blog.sortRawData();
//   blog.createArticles();
// });
