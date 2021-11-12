// スワイプページでしか処理を実行しない
if(location.pathname == "/users") {
  $(function () {
    // スワイプするユーザーのカード情報を全て取得
    let allCards = document.querySelectorAll('.swipe--card');
    let swipeContainer = document.querySelector('.swipe');

    function initCards() {

      // この行を追加する
      let newCards = document.querySelectorAll('.swipe--card:not(.removed)');

      // この行を編集する
      newCards.forEach(function (card, index) {
        card.style.zIndex = allCards.length - index;
        card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
        card.style.opacity = (10 - index) / 10;
      });

      if (newCards.length == 0) {
    $(".no-user").addClass("is-active");
  }
    }

    initCards();

    allCards.forEach(function (el) {
      let hammertime = new Hammer(el);

      hammertime.on('pan', function (event) {
        // 中略
      });

      // ==========ここから追加する==========
      hammertime.on('panend', function (event) {
        el.classList.remove('moving');
        swipeContainer.classList.remove('swipe_like');
        swipeContainer.classList.remove('swipe_dislike');

        let moveOutWidth = document.body.clientWidth;

        let keep = Math.abs(event.deltaX) < 200;
        event.target.classList.toggle('removed', !keep);

        if (keep) {
          event.target.style.transform = '';
        } else {
          let endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth) + 100;
          let toX = event.deltaX > 0 ? endX : -endX;
          let endY = Math.abs(event.velocityY) * moveOutWidth;
          let toY = event.deltaY > 0 ? endY : -endY;
          let xMulti = event.deltaX * 0.03;
          let yMulti = event.deltaY / 80;
          let rotate = xMulti * yMulti;

          event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';

          initCards();
        }
      });
      // ==========ここまで追加する==========

    });
    function createButtonListener(reaction) {

      let cards = document.querySelectorAll('.swipe--card:not(.removed)');

  if (!cards.length) return false;

  let moveOutWidth = document.body.clientWidth * 2;

  let card = cards[0];
  card.classList.add('removed');

  if (reaction == "like") {
    card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
  } else {
    card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
  }

  initCards();
    }

    $('#like').on('click', function() {
      createButtonListener("like");
    });

    $('#dislike').on('click', function() {
      createButtonListener("dislike");
    });

  });
}
