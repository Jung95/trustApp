"use strict";

/* Aside & Navbar: dropdowns */
Array.from(document.getElementsByClassName('dropdown')).forEach(function (elA) {
  elA.addEventListener('click', function (e) {
    if (e.currentTarget.classList.contains('navbar-item')) {
      e.currentTarget.classList.toggle('active');
    } else {
      var dropdownIcon = e.currentTarget.getElementsByClassName('mdi')[1];
      e.currentTarget.parentNode.classList.toggle('active');
      dropdownIcon.classList.toggle('mdi-plus');
      dropdownIcon.classList.toggle('mdi-minus');
    }
  });
});
/* Aside Mobile toggle */

Array.from(document.getElementsByClassName('mobile-aside-button')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    var dropdownIcon = e.currentTarget.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0];
    document.documentElement.classList.toggle('aside-mobile-expanded');
    dropdownIcon.classList.toggle('mdi-forwardburger');
    dropdownIcon.classList.toggle('mdi-backburger');
  });
});
/* NavBar menu mobile toggle */

Array.from(document.getElementsByClassName('--jb-navbar-menu-toggle')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    var dropdownIcon = e.currentTarget.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0];
    document.getElementById(e.currentTarget.getAttribute('data-target')).classList.toggle('active');
    dropdownIcon.classList.toggle('mdi-dots-vertical');
    dropdownIcon.classList.toggle('mdi-close');
  });
});
/* Modal: open */

Array.from(document.getElementsByClassName('--jb-modal')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    var modalTarget = e.currentTarget.getAttribute('data-target');
    document.getElementById(modalTarget).classList.add('active');
    document.documentElement.classList.add('clipped');
  });
});
/* Modal: close */

Array.from(document.getElementsByClassName('--jb-modal-close')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.currentTarget.closest('.modal').classList.remove('active');
    document.documentElement.classList.remove('is-clipped');
  });
});
/* Notification dismiss */

Array.from(document.getElementsByClassName('--jb-notification-dismiss')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.currentTarget.closest('.notification').classList.add('hidden');
  });
});

function LoadingWithMask() {
  //화면의 높이와 너비를 구합니다.
  var maskHeight = $(document).height();
  var maskWidth = window.document.body.clientWidth;

  //화면에 출력할 마스크를 설정해줍니다.
  var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";

  //화면에 레이어 추가
  $('body')
    .append(mask)

  //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
  $('#mask').css({
    'width': maskWidth,
    'height': maskHeight,
    'opacity': '0.3'
  });

  //마스크 표시
  $('#mask').show();

  //로딩중 이미지 표시
  $('#loadingImg').show();
}

function closeLoadingWithMask() {
  $('#mask').hide();
  $('#mask').empty();
}