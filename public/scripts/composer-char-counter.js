$(document).ready(function() {
  const textarea = $('#tweet-text');
  const counter = $('.new-tweet .counter');
  
  textarea.on('input', () => {
    const maxChars = 140;
    const currentChars = textarea.val().length;
    const remainingChars = maxChars - currentChars; 
    
    //  Put the value of remainingChars as text for counter.
    counter.text(remainingChars);

    if (remainingChars < 0) {
      //counter.classList.add('exceeded-limit'); 
      counter.addClass('exceeded-limit');    
    } else {
      //counter.classList.remove('exceeded-limit');      
      counter.removeClass('exceeded-limit');
    }  

  }); 

});





