$(function() {

  function pluck(property, collection) {
    return collection.map(function(e) {
      return e[property];
    });
  }

  function unique(collection) {
    var length = collection ? collection.length : 0;
    if (!length) return [];
    var seen = [];
    collection.forEach(function(e) {
      if (seen.indexOf(e) < 0) seen.push(e);
    });
    return seen;
  }

  function compose(func1, func2) {
    return function() {
      return func1(func2.apply(null, arguments));
    };
  }

  var distinct = compose(unique, pluck);

  var $headline = $('<h1>Stats</h1>');

  function $numberOfArticles(articles) {
    return $('<p>Number of articles: ' + articles.length + '</p>');
  }

  function $numberOfAuthors(articles) {
    var numAuthors = distinct('author', articles).length;
    return $('<p>Number of authors: ' + numAuthors + '</p>');
  }

  function $wordCount(articles) {
    var all = pluck('markdown', articles);
    var wordCount = distinct('markdown', articles);
    var count = [];
    all.forEach(function(e) {
      var div = document.createElement('div');
      div.innterHTML = e;
      var text = div.textContent || div.innerText || '';
      count.push(text.split(' ').length);
    });
    var total = count.reduce(function(a,b) {
      return a + b;
    });
    return total;
  }
    // wordCount.replace(/[^\w\s]/g, "").split(/\s+/).reduce(function(map, wordCount){
    // map[wordCount] = (map[wordCount]||0)+1;
    // return map;
    // return $('<p>Number of Words: ' + wordCount + '</p>');
    //
    // });

  var $statsComponent = function(blog) {
    var component = $('<div>');
    component.append([
      $headline,
      $numberOfArticles(blog),
      $numberOfAuthors(blog),
      $wordCount(blog)
    ]);
    return component;
  };

  function renderStats(blog) {
    $('#stats').replaceWith($statsComponent(blog));
  }

  function renderError(message, xhr) {
    $('#stats').replaceWith($('<p>Error: <code>' + message + xhr + '</code></p>'));
  }

  function stats(data, message, xhr) {
    if (xhr.status != 200) {
      renderError(message, xhr);
    } else {
      renderStats(data);
    }
  }
  $.getJSON('scripts/blogRawData.json', stats);

});
