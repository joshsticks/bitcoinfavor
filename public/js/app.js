$(function () {
	$('#wallet-public-key').on('blur', function(){
		//should probably verify key before - whatever
		var pk = $(this).val();
		$.ajax({
			url: "/balance/" + pk,
			success: function ( data ) {
				$( "#balance" ).html( "<strong>Balance: " + data.wallet.final_balance + " BTC</strong>" );
				var dates = [];
				var date = null;
				var dataPoints = [];
				var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
				$("#transactions").html('');
				$("#transactions").append('<li data-role="list-divider" data-theme="a">Transactions</li>');
				$.each(data.txs, function(index, value) {
					dataPoints.push(value.balance);
					date = new Date(value.time * 1000);
					$("#transactions").append("<li>" + months[date.getMonth()] + " " + date.getDay() + " Amount: " + value.result+ " BTC</li>")
				});


				$("#transactions").listview('refresh');

			},
			error: function ( data ) {
  				//do something
  			}
  		});

		$('#qrcodeCanvas').html('');
		$('#qrcodeCanvas').qrcode(pk);
	});	

	$('#wallet-public-key').trigger('blur');

	var inputElement = document.getElementById("mypic");
	inputElement.addEventListener("change", handleFiles, false);
	function handleFiles() {
		var fileList = this.files; /* now you can work with the file list */
		var f = fileList[0];
		var reader = new FileReader();

		reader.onload = (function(theFile) {
			return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
          '" title="', escape(theFile.name), '"/>'].join('');
          //document.getElementById('list').insertBefore(span, null);
          $("#preview").html('');
          $("#preview").append(span);
      };
  })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);

  }

  if(window.navigator.standalone == false) {
  	$.mobile.changePage("#landing-page");
  } else if ( window.navigator.standalone == true && location.hash == "#landing-page") {
  	$.mobile.changePage("#home-page");
  }

});
