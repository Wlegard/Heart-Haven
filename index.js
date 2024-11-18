
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

 
  $body.css({
    'background-color': 'pink',  
    'font-family': 'Arial, sans-serif',  
    'margin': '0',
    'padding': '0'
  });
  

  
  
  

  
  const $tweetHolder = $('<div class="tweets-holder"></div>'); 
  const $backButton = $('<button class="back-button">Back to Home</button>');
  const $tweetInput = $('<input type="text" id="tweetInput" placeholder="Tweet Here" />'); 
  const $tweetButton = $('<button id="tweetButton">Tweet</button>'); 
  

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
  const $image2 = $('<img src="http://www.pixelstalk.net/wp-content/uploads/2014/12/Field-of-Tulip-flowers-Background.jpg" alt="Profile Picture" class="profile-image" />');
  $image2.css({
    'display': 'block',
    'margin': '0 auto',
    'border-radius': '50%',
    'max-width': '200px',
    'max-height': '200px',
    'margin-top': '50px',
    'margin-bottom': '50px',
  });
  $body.append($image);

  
  $body.css({
    'background-color': 'pink',
    'font-family': 'Arial, sans-serif',
    'margin': '0',
    'padding': '0',
    'position': 'relative', 
    'overflow': 'hidden', 
  });

  
  const createFallingHeart = () => {
    const heart = $('<div class="falling-heart">❤️</div>');
    const leftPosition = Math.random() * 100; 
    const delay = Math.random() * 2; 
    const duration = Math.random() * (5 - 3) + 3; 

    heart.css({
      'position': 'absolute',
      'top': '-50px', 
      'left': `${leftPosition}%`,
      'font-size': '30px',
      'color': 'red',
      'opacity': 0.8,
      'animation': `fall ${duration}s linear ${delay}s infinite, blink 1s linear ${delay}s infinite`,
    });

    $body.append(heart);

    setTimeout(() => heart.remove(), duration * 1000);
  };

  const style = `
    @keyframes fall {
      0% {
        top: -50px;
        opacity: 1;
      }
      100% {
        top: 100vh;
        opacity: 0;
      }
    }

    @keyframes blink {
      0% {
        opacity: 0.8;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.8;
      }
    }

    .falling-heart {
      content: '❤️';
      font-size: 30px;
      color: red;
      position: absolute;
      opacity: 0.8;
    }
  `;

  // Append the styles to the document head
  $('head').append(`<style>${style}</style>`);

  
  setInterval(createFallingHeart, 300); 


  

  $body.append($tweetHolder);  // tsweetholder add at the end of the body
 $body.prepend($tweetButton);
 $body.prepend($tweetInput);

 $body.prepend($backButton);

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

  



});
