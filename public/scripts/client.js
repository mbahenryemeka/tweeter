$(document).ready(()=>{
  const createTweetElement = function (tweet) {
  const $tweet = $(`
  <article class="tweet">          
          <header>
              <h2><img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar"/> ${tweet.user.name} </h2>
              <h3>${tweet.user.handle}</h3>
          </header>        
          <section class="tweet-text">${tweet.content.text}</section>
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
    for (const tweet of tweetsArray) {    
    let $tweet = createTweetElement(tweet);
    $('.tweets-container').prepend($tweet);
    }
  }

  renderTweets(data);



  $('#text-area-form').on('submit', function(event) {
    event.preventDefault();
    console.log("lets be sure!");
    console.log('formData', this);
    let formData = $(this).serialize();
    console.log(formData);
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData,      
    })
      .then((response)=>{
      
      })
  })

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        console.log('show me how it will render', tweets );
        renderTweets(tweets);
      },
      error: function(err) {
        console.error('Error fetching tweets:', err)
      }
    })    
  }
  loadTweets();
})



