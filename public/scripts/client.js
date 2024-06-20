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
            <time>${new Date(tweet.created_at).toLocaleString()}</time>
            <span class="icons"> 
              <i class="fa-solid fa-flag"></i> 
              <i class="fa fa-retweet"></i>
              <i class="fa fa-heart">'</i>         
            </span>
          </footer>
        </article>
  `)
  return $tweet;
}

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

// Driver code for testing
const $tweet = createTweetElement(tweetData);
console.log($tweet); // Check the structure
$('.tweets-container').append($tweet);