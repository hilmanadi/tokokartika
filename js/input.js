var submitInput = () => {
     var nama_item = $('#nama_item').val();
     var harga_item = $('#harga').val();

     if(nama_item==''||harga_item==''){
          alert('semua field harus diisi');
     }else{
          var obj = {"spname":"sp_insert_item","nama_item":nama_item,"harga":harga_item};
     
          $.post("https://tk-krtk.herokuapp.com/api", obj,
          // $.post("http://192.168.1.9:8382/api", obj,
          function(data){
               if(data.status==200){
                    if(data.response == 'Success'){
                         alert('Data Berhasil Diinput');
                         $('#nama_item').val('');
                         $('#harga').val('');
                    }else{
                         alert('Something Wrong');
                    }
               }else{
                    alert('Something Wrong : '+data.error);
               }
        }, "json");
     }
}

$( document ).ready(function() {
     $('#submitinput').click(function(){
          submitInput();
     });
});
