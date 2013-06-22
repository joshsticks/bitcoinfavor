$(function () {
	$('#qrcodeCanvas').qrcode("alskdjflaksdjflkasjdflkjasldkfjalkjdfklj");

	$('#wallet-public-key').on('blur', function(){
		//should probably verify key before - whatever
		$('#qrcodeCanvas').html('');
		$('#qrcodeCanvas').qrcode($(this).val());

	});	
})
