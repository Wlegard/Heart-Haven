
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); //clear the body (.html('')clears whatever tag)
  
  





  
  const $header = $('<header class="page-header">Heart Haven </header>');
  $header.css({
    'background-color': 'violet',  
    'color': 'white',               
    'padding': '20px',              
    'text-align': 'center',         
    'font-size': '28px',            
    'font-weight': 'bold',          
    'border-radius': '5px',         
    'box-shadow': '0 2px 5px rgba(0, 0, 0, 0.1)'
  });

  const $image = $('<img src="https://cdn.vectorstock.com/i/1000v/97/08/beating-heart-background-vector-919708.jpg" alt="Profile Picture" class="profile-image" />'); 
  $image.css({
    'display': 'block',        
    'margin': '0 auto',        
    'border-radius': '50%',    
    'max-width': '200px',      
    'max-height': '200px',     
    'margin-top': '50px', 
    'margin-bottom': '50px',      
     
  });

  

  
  
  

  
  const $tweetHolder = $('<div class="tweets-holder"></div>'); 
  const $backButton = $('<button class="back-button">Back to Home</button>');
  const $tweetInput = $('<input type="text" id="tweetInput" placeholder="Tweet Here" />'); 
  const $tweetButton = $('<button id="tweetButton">Tweet</button>'); 
  

  function createFallingHeart() {
    const $heart = $('<div class="falling-heart">❤️</div>');
    const startPositionX = Math.random() * $body.width(); // Random horizontal position
    const duration = Math.random() * 5000 + 3000; // Random duration for falling animation

    // Set initial position and styling
    $heart.css({
      'position': 'absolute',
      'left': startPositionX,
      'top': -50, // Start above the screen
      'font-size': '30px',
      'z-index': '1000',
      'pointer-events': 'none', // Prevent hearts from interacting with other elements
    });

    $body.append($heart);

    // Animate the heart falling
    $heart.animate({
      'top': $body.height() + 50, // Move it out of the screen
    }, duration, 'linear', function() {
      // After animation ends, remove the heart
      $(this).remove();
    });
  }

  // Continuously create new falling hearts every 500ms
  setInterval(createFallingHeart, 1000);






  $backButton.css({
    'padding': '10px',
    'margin': '10px',
    'background-color': 'violet',
    'color': 'white',
    'border': 'none',
    'cursor': 'pointer',
    'border-radius': '5px'
  });

  $tweetInput.css({
    'width': '80%',
    'padding': '10px',
    'margin': '10px',
    'font-size': '14px',
    'border': '1px solid #ccc',
    'border-radius': '5px'
  });

  $tweetButton.css({
    'padding': '10px 20px',
    'background-color': 'violet',
    'color': 'white',
    'border': 'none',
    'cursor': 'pointer',
    'border-radius': '5px'
  });
  
  
  $body.css({
    'background-color': 'pink',
    'font-family': 'Arial, sans-serif',
    'margin': '0',
    'padding': '0',
    'position': 'relative', 
    'overflow': 'auto', 
  });

  



  

  $body.append($tweetHolder);
  $body.prepend($backButton);
  $body.prepend($tweetInput);

  // tsweetholder add at the end of the body
 $body.prepend($tweetButton);


  $body.prepend($image)
    $body.prepend($header);  

  let currentTimeline = 'home';
  window.visitor = 'currentUser'; 

  

  const timeStamp = function(time){
  
    const dateTime = moment(time).format('MMMM DD, YYYY h:mm a'); 
    const relativeTime = moment(time).fromNow()

    return    { dateTime, relativeTime };

  } 

    
    
  // show new tweets:
  //put the code that creates and add tweets into a function that you call over again

  // make addNewTweets function take in an array so that it can either loop over streams home or streams.users['username]
  //then those tweets will show up on the page
  function addNewTweets() {
    $tweetHolder.html(''); 
    const tweets = currentTimeline === 'home' ? streams.home : streams[currentTimeline];

     tweets.forEach((tweet) => {
      const $tweet = $('<div class="tweet"></div>'); // set class to "tweet"
      // seperate the user from the message in the tweet (the username should be in it'sown tag)
      // create a tag for username
      // add the username to the $tweet div
      // give the username the click handler function
      const $username = $(`<p class="username">@${tweet.user}</p>`)
      const text = `${tweet.message}`;
  
      const {dateTime, relativeTime} = timeStamp(tweet.created_at);
      const $time = $(`<div class="tweet-time">
                       <span class="date-time">${dateTime}</span><br>
                       <span class="relative-time">${relativeTime}</span>
                     </div>`);  

      $tweet.css({
        'background-color': 'violet',
        'border': '1px solid #ddd',
        'border-radius': '10px',
        'padding': '15px',
        'margin-bottom': '15px',
        'box-shadow': '0 2px 5px rgba(0, 0, 0, 0.1)',
      });

      $tweet.text(text);
      $tweet.prepend($username) 

      $tweet.append($time);
      $tweetHolder.prepend($tweet)
      

      
      return $tweet;
    });
  
  }
 
function usernameClick(event) {
  event.preventDefault();
  const username = $(this).text().slice(1)
  //console.log(currentTimeline)
    currentTimeline = username;
    addNewTweets()
  }


$backButton.click(function()  {
  currentTimeline = 'home'; 
  addNewTweets();
});

$body.on('click', '.username', usernameClick);

function writeTweet() {
  const message = $('#tweetInput').val();  
  if (message) {
    const username = window.visitor; 
    const tweet = {
      user: username,
      message: message,
      created_at: new Date().toISOString(),  
    };
    streams.home.push(tweet);  
    if (!streams[username]) {
      streams[username] = []; 
    }
    streams[username].push(tweet);  
    addNewTweets();  
    $('#tweetInput').val('');  
  }
}

// Event listener for the tweet button
$('#tweetButton').click(writeTweet);





  addNewTweets()
  
  //find out what function will execute code automatically at a certain time
  setInterval(function(){
    addNewTweets()
  },3000);

  
})