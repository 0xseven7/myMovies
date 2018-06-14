$(function () {
  console.log('1');
  $('.del').click(function (e) {
    let target = $(e.target);
    let id = target.data('id');
    let tr = $('.item-id-' + id);
    console.log(tr);
    $.ajax({
      type: 'DELETE',
      url: '/admin/list?id=' + id
    }).done(function (results) {
      if (results.success === 1) {
        if (tr.length > 0) {
          tr.html('');
        }
      }
    })
  })
});