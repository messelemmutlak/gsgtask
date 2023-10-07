let likeCounter = 0;
let SendTweet = document.querySelector(".SendBtn");
let username = document.querySelector(".username");
let tweetContent = document.querySelector(".tweetContent");
let TweetsDiv = document.querySelector(".tweetsDiv");

let ArrayOfTweets = [];

if (localStorage.getItem("tweets")) {
  ArrayOfTweets = JSON.parse(localStorage.getItem("tweets"));
}

getDataFromLocalStorage();

// Add Task
SendTweet.onclick = function () {
  if (username.value !== "" && tweetContent.value !== "") {
    addTweetToArray(username.value, tweetContent.value); // Add Task To Array Of Tasks
    username.value = ""; // Empty Input Field
    tweetContent.value = ""; // Empty Input Field
  }
};

function addTweetToArray(usernameText, tweetContentText) {
  // Task Data
  const tweet = {
    Username: usernameText,
    Content: tweetContentText,
    Likes: 0,
    Retweets: 0,
  };
  // Push Task To Array Of Tasks
  ArrayOfTweets.push(tweet);
  // Add Tasks To Page
  addElementsToPageFrom(ArrayOfTweets);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(ArrayOfTweets);
}

TweetsDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("delete")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-Content"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  if (
    e.target.classList.contains("like") ||
    e.target.classList.contains("like-counter")
  ) {
    if (e.target.classList.contains("like-counter")) {
      LikeIncrementCounter(
        e.target.parentElement.parentElement.getAttribute("data-Content")
      );
    }
    LikeIncrementCounter(e.target.parentElement.getAttribute("data-Content"));
    location.reload();
  }

  if (
    e.target.classList.contains("retweet") ||
    e.target.classList.contains("retweet-counter")
  ) {
    if (e.target.classList.contains("retweet-counter")) {
      RetweetIncrementCounter(
        e.target.parentElement.parentElement.getAttribute("data-Content")
      );
    }
    console.log(e.target.parentElement.getAttribute("data-Author"));
    console.log(e.target.parentElement.getAttribute("data-Content"));
    addTweetToArray(
      e.target.parentElement.getAttribute("data-Author"),
      e.target.parentElement.getAttribute("data-Content")
    );
    RetweetIncrementCounter(
      e.target.parentElement.getAttribute("data-Content")
    );
    // location.reload();
  }
});

function LikeIncrementCounter(tweetContent) {
  // console.log(tweetContent)
  ArrayOfTweets.forEach((element) => {
    if (element.Content === tweetContent) {
      // console.log(++element.Likes)
      ++element.Likes;
    }
  });
  addDataToLocalStorageFrom(ArrayOfTweets);
}

function RetweetIncrementCounter(tweetContent) {
  // console.log(tweetContent)
  ArrayOfTweets.forEach((element) => {
    if (element.Content === tweetContent) {
      // console.log(++element.Retweets)
      ++element.Retweets;
    }
  });
  addDataToLocalStorageFrom(ArrayOfTweets);
}

function deleteTaskWith(tweetContent) {
  ArrayOfTweets = ArrayOfTweets.filter(
    (tweet) => tweet.Content != tweetContent
  );
  addDataToLocalStorageFrom(ArrayOfTweets);
  // location.href = location.href
}

function addElementsToPageFrom(ArrayOfTweets) {
  // Empty Tasks Div
  TweetsDiv.innerHTML = "";
  // Looping On Array Of Tasks
  ArrayOfTweets.forEach((tweet) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "tweet";
    div.setAttribute("data-Content", tweet.Content);
    div.setAttribute("data-Author", tweet.Username);
    div.appendChild(document.createTextNode(`Author : ${tweet.Username}`));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createTextNode(`Content : ${tweet.Content}`));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    // Create Like Button
    let likeBtn = document.createElement("span");
    likeBtn.className = "like";
    likeBtn.appendChild(document.createTextNode("Like"));
    // Create Like Incrementer
    let likeCounterSpan = document.createElement("span");
    likeCounterSpan.innerHTML = `s ${tweet.Likes}`;
    likeCounterSpan.className = "like-counter";
    likeBtn.appendChild(likeCounterSpan);
    // #################################
    // Create Retweet Button
    let retweetBtn = document.createElement("span");
    retweetBtn.className = "retweet";
    retweetBtn.appendChild(document.createTextNode("Retweet"));
    // Create Retweet Incrementer
    let retweetCounterSpan = document.createElement("span");
    retweetCounterSpan.innerHTML = `s ${tweet.Retweets}`;
    retweetCounterSpan.className = "retweet-counter";
    retweetBtn.appendChild(retweetCounterSpan);
    // #################################
    // Create Delete Button
    let deleteBtn = document.createElement("span");
    deleteBtn.className = "delete";
    deleteBtn.appendChild(document.createTextNode("Delete"));
    // #################################################
    div.appendChild(likeBtn);
    div.appendChild(retweetBtn);
    div.appendChild(deleteBtn);
    TweetsDiv.insertBefore(div, TweetsDiv.firstChild);
  });
}

function addDataToLocalStorageFrom(ArrayOfTweets) {
  window.localStorage.setItem("tweets", JSON.stringify(ArrayOfTweets));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tweets");
  if (data) {
    let tweets = JSON.parse(data);
    addElementsToPageFrom(tweets);
  }
}
// localStorage.clear()
