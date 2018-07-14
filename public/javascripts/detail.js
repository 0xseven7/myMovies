$(function () {
  $('.comment').click(function (e) {
    let target = $(this);
    let toId = target.data('tid');
    let commentId = target.data('cid');

    console.log(commentId);
    // 动态插入隐藏域

    if ($('#toId').length > 0) {
       $('#toId').val(toId)
    }else {
      $('<input>').attr({
        type: 'hidden',
        name: 'comment[tid]',
        id: 'toId',
        value: toId
      }).appendTo('#commentForm');
    }
    if ($('#commentId').length  > 0) {
      $('#commentId').val(toId);
    }else {
      $('<input>').attr({
        type: 'hidden',
        name: 'comment[cid]',
        id: 'commentID',
        value: commentId,
      }).appendTo('#commentForm')
    }
  })
});