$(document).on("change", "#profile_image_upload", function(e) {
  if (e.target.files.length) {
    // ファイルの有無を判定
    let reader = new FileReader;
    // FileReaderオブジェクトを使用すると、アプリケーションは、ユーザーのコンピュータに保存されているファイルの内容を非同期に読み取れる
    reader.onload = function(e) {
      $('.hidden').removeClass();
      $('.profile-default-img').removeClass();
      $('#profile-img').remove();
      $('#profile-img-prev').attr('src', e.target.result);
      // プレビューする前の画像やクラスを削除
      // readAsDataURLメソッドは、指定されたファイルの読み込みを実行
    };
    return reader.readAsDataURL(e.target.files[0]);
  }
});