$(document).ready(()=>{
  $('.error-message').hide();
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
  const $tweet = $(`
  <article class="tweet">          
          <header>
              <h2><img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar"/> ${tweet.user.name} </h2>
              <h3>${tweet.user.handle}</h3>
          </header>        
          <section class="tweet-text">${escape(tweet.content.text)}</section>
          <hr class="hline"/>
          <footer>            
            <time>${timeago.format(tweet.created_at)}</time>
            <span class="icons"> 
              <i class="fa-solid fa-flag"></i> 
              <i class="fa fa-retweet"></i>
              <i class="fa fa-heart"></i>         
            </span>
          </footer>
          </article>
    `)
    return $tweet;
  }

  const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
  ] 

  


  const renderTweets = function(tweetsArray) {
    //  empty tweet container
    $('.tweets-container').empty();
    for (const tweet of tweetsArray) {    
    let $tweet = createTweetElement(tweet);
    $('.tweets-container').prepend($tweet);
    }
  }

  function isTweetValid(tweetContent) {
    if (tweetContent.trim() === "") {
      return "Tweet content cannot be empty";
    }
    if (tweetContent.length > 140) {
      return "Too long. Plz respect our arbitrary limit of 140 characters.";
    }
    return true;
  }
  //  function to load the tweets on the browser.
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {       
        renderTweets(tweets);
      },
      error: function(err) {
        console.error('Error fetching tweets:', err)
      }
    })    
  }

    //  Add a submit handler
  $('#text-area-form').on('submit', function(event) {
    //  HTML not to submit the form
    event.preventDefault();

    // Slide up any visible error messages before starting validation
    $('.error-message').slideUp();

    //  Check for valid messages
    let tweetContent = $('#tweet-text').val().trim();
    let validationMessage = isTweetValid(tweetContent);
    if (validationMessage !== true){
     // If there is an error, display the error message in the div and slide it down
    $('.error-message').text(validationMessage).slideDown();
    return; // Prevent form submission
    }

    //  proceed to creat a URL-encoded notation if no error.
    let formData = $(this).serialize();
    //  use jQuery method to Post to /tweets.  
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData,
      //  use jQuery to get tweets from the server.     
    }).done (() => {     
      $.ajax({
        method: "GET",
        url: "/tweets", 
      //  call function that loads the tweet when done getting the tweet.       
      }).done(() => {
        loadTweets();
      })
    })      
  })  
  loadTweets();
})



