$(document).ready(function(){

	var topics = ["Dog", "Wolf", "Lion", "Fox"];
	
  function createButtons(){
    $('#animalButton').empty();
    for (var i = 0; i < topics.length; i++){
      var newTopic = $('<button type="button" class="btn btn-default">');
      newTopic.addClass("newButton");
      newTopic.attr('data-name', topics[i]);
      newTopic.text(topics[i]);
      $('#animalButton').append(newTopic);
    }
  }
  
  createButtons();

  function createNewButtons(){
      $('#addAnimal').on('click', function(event){
        var newTopic = $('#animal-input').val().trim();
        topics.push(newTopic);
        $('#animal-input').val('');
        createButtons();
        return false;
      })
  }
  
  createNewButtons();
	
  function createGifs (){
    	var gif = $(this).attr("data-name");
    	console.log(gif);
    	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=sBn0KqtEYhmnymUFZfTMzQVVRtggNUrF&limit=10";
    	$.ajax({
          url: queryURL,
          method: "GET"
      	})
      	.then(function(response) {
      		var results = response.data;
      		console.log(response);
          $('#animals').empty();
      		for (var i = 0; i < results.length; i++){
      			var imgDiv = $("<div class='item'>");
      			var gifRating = results[i].rating;
      			var p = $('<p>').text('Rating: ' + gifRating);
        		var gifImage = $("<img>");
        		gifImage.attr('src', results[i].images.fixed_height_still.url);
            gifImage.addClass("gif");
        		imgDiv.prepend(gifImage);
            imgDiv.append(p);
        		$('#animals').prepend(imgDiv);
        	}
        });
  }

  $(document).on('click', '.newButton', createGifs);
  $('body').on('click', '.gif', function() {
    var src = $(this).attr("src");
    if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
    } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
  });
 
})

   
  

