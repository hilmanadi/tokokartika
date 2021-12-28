var klik = (data) => {
	$('#datafetchsearch').html('<tr><td><img src="./image/icon2.png"  width="50" style="-webkit-animation: fadeinout 4s linear forwards infinite;animation: fadeinout 4s linear forwards infinite;"></td><td><img src="./image/icon2.png"  width="50" style="-webkit-animation: fadeinout 4s linear forwards infinite;animation: fadeinout 4s linear forwards infinite;"></td><td><img src="./image/icon2.png"  width="50" style="-webkit-animation: fadeinout 4s linear forwards infinite;animation: fadeinout 4s linear forwards infinite;"></td></tr>');
	if(data==''){
		var obj = {"spname":"sp_select_item","nama_item":""};
	}else{
		var obj = {"spname":"sp_select_item","nama_item":data};
	}

	// $.post("http://192.168.1.9:8382/api", obj,
	$.post("https://tk-krtk.herokuapp.com/api", obj,
      function(data){
      	if(data.status==200){
      		if(data.response.length==0){
      			alert('no data');
      		}else{
      			dataList(data.response);
      		}
      	}else{
      		alert('error'+data.error)
      	}
     
    }, "json");
};

var dataList = (data) => {
	var tt = '';
 	for(var x = 0;x<data.length;x++){
 		var temp = "<tr><td>"+data[x].nama_item+"</td><td>"+data[x].harga+"</td><td><span style='background: #269bfe;border: solid #269bfe;border-radius: 10px;color:white;width:60%;display:inline-block;' onclick='editSearch("+data[x].id+",\""+data[x].nama_item+"\",\""+data[x].harga+"\")'>Edit</span><span style='background: red;border: solid red;border-radius: 10px;color:white;margin-top:5px;width:60%;display:inline-block;' onclick='deleteSearch("+data[x].id+")'>&#128465; Delete</span></td></tr>";
	 	tt +=temp;
 	};
 	$('#datafetchsearch').html(tt);		 	
};

var editSearch = (id,nama_item,harga) => {
 	var modal = document.getElementById("myModal");
 	var span = document.getElementsByClassName("close")[0];
 	span.onclick = function() {
		  modal.style.display = "none";
		}
 	modal.style.display = 'block';
 	var idd = id;
 	$('#id_item').val(id);
 	$('#nama_item_edit').val(nama_item);
 	$('#harga_item_edit').val(harga);
 };

 var getDataModal = () => {
 	var nama_item = $('#nama_item_edit').val();
 	var harga_item = $('#harga_item_edit').val();
 	var id_item = $('#id_item').val();

 	var obj = {"spname":"sp_update_item","id":id_item,"nama_item":nama_item,"harga":harga_item};
 	var json = JSON.stringify(obj);

	// $.post("http://192.168.1.9:8382/api", obj,
	$.post("https://tk-krtk.herokuapp.com/api", obj,
          function(data){
          	if(data.status==200){
          		if(data.response == 'Success'){
          			alert('Data Berhasil Diupdate');
          			window.location.href='main.html';
          		}else{
          			alert('Something Wrong');
          		}
          	}else{
          		alert('Something Wrong : '+data.error);
          	}
        }, "json");
 };

var deleteSearch = (id) => {
 	if(confirm('Yakin delete data ?')){
 		var obj = {"spname":"sp_delete_item","id":id};		 		
 		// $.post("http://192.168.1.9:8382/api", obj,
 		$.post("https://tk-krtk.herokuapp.com/api", obj,
          function(data){
          	if(data.status==200){
          		if(data.response == 'Success'){
          			alert('Data Berhasil Dihapus');
          			window.location.href='main.html';
          		}else{
          			alert('Something Wrong');
          		}
          	}else{
          		alert('Something Wrong : '+data.error);
          	}
        }, "json");
 	}else{
 		return;
 	}
};

var speakFunction = () => {
	if ('speechSynthesis' in window) {
	    console.log('Speech recognition supported 😊');
		var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
			recognition.lang = 'id';
			recognition.interimResults = false;
			recognition.maxAlternatives = 5;
			recognition.start();

			recognition.onresult = function(event) {
			    console.log('You said: ', event.results[0][0].transcript);
			    klik(event.results[0][0].transcript);
			};
	} else {
	    console.log('Speech recognition not supported 😢');
	}
}


$(document).ready(function(){
	$('#searching').on('keypress', function (e) {
     if(e.which === 13){
        $(this).attr("disabled", "disabled");
        klik($('#searching').val());
        $(this).removeAttr("disabled");
     }
	 });

	if($('#datafetchsearch').html().length==515){
		console.log('a');
	}else{
		console.log('b');
	}
	klik('');
	$('#searching').blur();
	$('#s-atasfull-bs-btn').click(function(){
		klik($('#searching').val());
	});
	$('#mic').click(function(){
		speakFunction();
	});
	$('#mdl-btn').click(function(){
		getDataModal();
	})
});