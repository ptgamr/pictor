(function($) {
  $('#openCropperBtn').click(function openCropperDialog() {
    var src = $('#sourceIdEdit').val();

    var cropper = $('.cropper').cropper();
    $('#cropperDialog')
      .on('shown.bs.modal', function () {
        cropper.setImage('/pictor/' + src);
      })
      .modal('show');
    $('#cropper_okBtn').click(function (event) {
      var data = $.extend({src: src}, cropper.getParams());

      var convertAndDownloadRequestUrl = '/pictor/convert?' + $.param(data);
      $('#convertAndDownloadRequestText').html(convertAndDownloadRequestUrl);
      $('#convertAndDownloadResponseImg').attr('src', convertAndDownloadRequestUrl);

      var convertReq = {method:'post', url:'/pictor/convert', type:'json', data: data};
      $('#convertRequestText').html(JSON.stringify(convertReq));

      $.ajax(convertReq).then(function (data, status, xhr) {
        $('#convertResponseText').html(JSON.stringify(data));

        var downloadVariantRequestUrl = '/pictor/' + src + '/' + data.id;
        $('#downloadVariantRequestText').html(downloadVariantRequestUrl);
        $('#downloadVariantResponseImg').attr('src', downloadVariantRequestUrl);
      });
    });
  });
}(jQuery));
