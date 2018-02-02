$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

$('.toggle').click(function() {
  $('.toggle-target').toggle('slow');
});
$('.description').each(function (i, e) {
  var that = $(this);
  if (that.find('span.pWrap').length) {
    // already added
    return;
  }
  that.contents().wrapAll('<span class="pWrap" />');
  var span = that.find('span.pWrap'),
    sHeight = span.height();
  that.data({
    'fullHeight': sHeight,
    'minHeight': that.height()
  });
  if (that.height() < sHeight) {
    $('<i />', {
      'href': '',
      'text': 'Read more',
      'class': 'readMore'
    }).appendTo(that);
  }
  var link = that.find('i.readMore');
  link.on('click', function (e) {
    var that = $(this),
      p = $(this).closest('p'),
      fullHeight = p.data('fullHeight') + 40,
      minHeight = p.data('minHeight'),
      toHeight = p.height() == fullHeight ? minHeight : fullHeight;
    p.animate({
      'max-height': toHeight,
      'height': toHeight
    }, 1000);
    that.text(function (i, t) {
      return t == 'Read more' ? 'Show less' : 'Read more';
    });
  })
});
