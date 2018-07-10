$(function () {
  $('.comment').click(function (e) {
    let target = $(this);
    let toId = target.data('tid');
    let commentId = target.data('cid');

    console.log(commentId);
    // 动态插入隐藏域

    $('<input>').attr({
      type: 'hidden',
      name: 'comment[tid]',
      value: toId
    }).appendTo('#commentForm');

    $('<input>').attr({
      type: 'hidden',
      name: 'comment[cid]',
      value: commentId,
    }).appendTo('#commentForm')

  })
});