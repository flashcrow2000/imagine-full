// ---------
// TOOLTIP

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// ---------
// JOINERS

// $('.Show').click(function() {
//     $('#target').show(500);
//     $('.Show').hide(0);
//     $('.Hide').show(0);
// });
// $('.Hide').click(function() {
//     $('#target').hide(500);
//     $('.Show').show(0);
//     $('.Hide').hide(0);
// });
$('.toggle').click(function() {
    $('.toggle-target').toggle('slow');
});

// ---------
// READ MORE

$('.description').each(function (i, e) {
    var that = $(this);
    if (that.find('span.pWrap').length) {
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
    span.on('click', 'i.readMore', function (e) {
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
    });
})
