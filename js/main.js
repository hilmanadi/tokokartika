var search = () => {
	$('#bottom').html('');
	$('#bottom').load('search.html');
	$('#searchbar').css('background','#269bfe');
	$('#inputbar').css('background','#ffffff');
	$('#searchbar').css('color','#ffffff');
	$('#inputbar').css('color','#000000');
};
var input = () => {
	$('#bottom').html('');
	$('#bottom').load('input.html');
	$('#searchbar').css('background','#ffffff');
	$('#inputbar').css('background','#269bfe');
	$('#inputbar').css('color','#ffffff');
	$('#searchbar').css('color','#000000');

};

$(document).ready(function(){
	$('#bottom').load('search.html');
	$('#searchbar').css('background','#269bfe');
	$('#searchbar').css('color','#ffffff');
	$('#searchbar').click(function(){
      search();
	});
	$('#inputbar').click(function(){
      input();
	});
});