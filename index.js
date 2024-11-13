
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); //clear the body (.html('')clears whatever tag)
  const $tweetHolder = $('<div class="tweets-holder"></div>'); //
  $body.append($tweetHolder);  // sweetholder add at the end of the body


  const timeStamp = function(){}

  const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<div class="tweet"></div>'); // set class to "tweet"
    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text);

    return $tweet;
  });
  $tweetHolder.append($tweets);//

  const newTweet = function(tweet){ //
    const $tweet = $('<div class="tweet"></div>'); //
    const text = `@${tweet.user}: ${tweet.message}`; //
    $tweet.text(text);//
    $tweetHolder.prepend($tweet)//
  }






});
