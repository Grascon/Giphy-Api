$(document).ready(function(){

//create array of topics
	var topics = ["Dog", "Wolf", "Lion", "Fox"];

//dynamically create buttons of the topics array by running a for loop and making buttons of each index
//and adding class, attribute and text. Then appending to html area of button display
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

//running function to create buttons when opening page 
  createButtons();

//function to create new buttons when entering them in the form
//this is done by obtaining the value of what is typed and adding it to the topics array and running the create 
//buttons with the added animal
//if blanks are submitted a new button will not be added and you will get an alert
//the form area will become blank after entering animal
  function createNewButtons(){
      $('#addAnimal').on('click', function(event){
        var newTopic = $('#animal-input').val().trim();
        $('#animal-input').val('');
        if (newTopic == ''){
          alert('Please type an Animal');
          return false;
        }
        topics.push(newTopic);
        createButtons();
        return false;
      })
  }

//running the createnewbuttons function
  createNewButtons();

//function to create new gifs using the giphy api. the attribute of data-name is stored in a variable from  button and is used to search in giphy api
//a for loop is used to go through the results variable which is response.data.
//the area where the gifs are displayed is emptied each time to add the new images
//A div is created for each result as well as a img element with the src of the still image to be able to display the images.
//the rating is also stored from the results variable in another variable
//this is then added to the new div and added to the html area where the images and ratings will be displayed
//a class is added to the image to later be able to start and pause the gif
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
  //on click function on buttons that will call createGifs function from the giphy api
  $(document).on('click', '.newButton', createGifs);
  
  //on click function that will start and pause gif images; the gif class was added in the createGifs function
  //source for this code: https://stackoverflow.com/questions/44298501/how-to-pause-and-start-gif-using-jquery-ajax
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

   
  

