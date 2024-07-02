import {
  fbicon,
  searchicon,
  usericon,
  signoutIcon,
  LikeIcon,
  likeicon_small,
  commentIcon,
  sendicon,
} from "./icons/icons.js";
import {
  isAuthenticated,
  getDecodedAuthToken,
  fetchPosts,
  LikeCount,
} from "./utils/utils.mjs";

const token = getDecodedAuthToken();
function ProfileMenu() {
  setTimeout(() => {
    console.log("🚀 ~ setTimeout ~ setTimeout:");
    /* -------------------------------------------------------------------------- */
    /*                               logout function                              */
    /* -------------------------------------------------------------------------- */
    document.getElementById("c121b").addEventListener("click", () => {
      localStorage.removeItem("authToken");
      window.location.href = "/";
    });
    /* -------------------------------------------------------------------------- */
    /*                             hide or show logout                            */
    /* -------------------------------------------------------------------------- */
    const documentProfileButton = document.getElementById("c122");
    const documentLogoutContainer = document.getElementById("c121");

    documentProfileButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (documentLogoutContainer.style.display === "flex") {
        documentLogoutContainer.style.display = "none";
      } else {
        documentLogoutContainer.style.display = "flex";
      }
    });
    // Hide documentLogoutContainer when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !documentLogoutContainer.contains(event.target) &&
        event.target !== documentProfileButton
      ) {
        documentLogoutContainer.style.display = "none";
      }
    });
  }, 0);
  return `
        <div id="c122">
          ${usericon}
        </div>
        <div id="c121" tabindex="0" style="display: none;">
          <div id="c121a">
            ${usericon}
            <p id="fullname1"></p>
          </div>
          <div id="c121b">
            ${signoutIcon}
            <p id="">Log Out</p>
          </div>
        </div>
  `;
}

function Nav() {
  return `
  <nav id="c1">
    <div id="c11">
      ${fbicon}
      <div id="c111">
        ${searchicon}
        <input id="searchbar" type="text" />
      </div>
    </div>
    <div id="c12">
      ${ProfileMenu()}
    </div>
  </nav>
  `;
}
async function handleAddPostRequest(event) {
  event.preventDefault();
  const PostsContainer = document.getElementById("c222d");
  const current_user_id = token.id;
  const content = document.getElementById("content").value;

  let response = await fetch("/add-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ current_user_id, content }),
  });

  response = await response.json();
  let post  = {...response.post, fullname: token.firstname + " " + token.lastname};
  post = { ...post, post_id: post.id};
  console.log(post);
  if (response.success) {
    PostsContainer.prepend( Post(post, current_user_id) );
  }
}

function PostForm() {
  setTimeout(() => {
    
    const form = document.getElementById("form");

    form.addEventListener('submit', (event) => handleAddPostRequest(event));
  }, 0);
  return `
  <div id="c221">
    ${usericon}
    <form id="form" style="width: 100%">
      <input id="content" type="text" placeholder="What's in your mind Jonas" required/>
      <button style="width: fit-content">Post</button>
    </form>
  </div>
  `;
}

async function handleUnlikeRequest(current_user_id, post_id) {
  const response = await fetch("/remove-like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ current_user_id, post_id }),
  });
}

async function handleLikeRequest(current_user_id, post_id) {
  const response = await fetch("/add-like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ current_user_id, post_id }),
  });
}

function handleLikeCountUI(LikeCountContainer, likeCount, likeicon_small) {
  console.log("🚀 ~ handleLikeCountUI ~ handleLikeCountUI:")
  let like_many = '';
  if(likeCount > 1) like_many = 's';
  const like_count = likeCount > 0 ? `${likeicon_small} ${likeCount} like${like_many}` : '';
  LikeCountContainer.innerHTML = like_count;
}
function handleUnlikeUI(likeButton, likeIcon) {
  likeIcon.style.stroke = "black";
  likeButton.style.color = "black";
}
function handleLikeUI(likeButton, likeIcon) {
  likeIcon.style.stroke = "var(--accent)";
  likeButton.style.color = "var(--accent)";
}
function CommentButton(post, commentIcon) {
  return `
        <span id="comment-button-${post.post_id}">
          ${commentIcon}
          Comment
        </span>
  `
}
function LikeButton(post, current_user_id) {
  setTimeout(() => {
    const LikeButtonRef = document.getElementById(`like-button-${post.post_id}`);
    const LikeIconRef = document.querySelector(`#like-${post.post_id} #primary`);
    const LikeCountContainer = document.getElementById(`like-count-${post.post_id}`);

    let isLiked = post.is_liked;
    let likeCount = post.like_count ? parseInt(post.like_count) : 0;
    LikeButtonRef.addEventListener("click", () => {

      console.log(isLiked);
      if (isLiked) {
        
        handleUnlikeUI(LikeButtonRef, LikeIconRef);
        isLiked = false;
        likeCount -= 1
        handleLikeCountUI(LikeCountContainer, likeCount, likeicon_small);
        handleUnlikeRequest(current_user_id, post.post_id);
        
      } else {

        handleLikeUI(LikeButtonRef, LikeIconRef);
        isLiked = true;
        likeCount += 1
        handleLikeCountUI(LikeCountContainer, likeCount, likeicon_small);
        handleLikeRequest(current_user_id, post.post_id);
        
      }
    });
  }, 0);
  return `
          <span id="like-button-${post.post_id}" class="${post.is_liked ? `liked` : ''} like-button">
            ${LikeIcon(post.post_id, post.is_liked)}
            Like
          </span>
  `
}

function Post(post, current_user_id) {
  

  const PostContainer = document.createElement('div');
  PostContainer.id = 'c222';

  PostContainer.innerHTML = `
      <div id="c222a">
        ${usericon}
        <p>${post.fullname}</p>
      </div>
      <div>
        <p>
          ${post.content}
        </p>
        <p id="like-count-${post.post_id}" class="like-count">
          ${LikeCount(likeicon_small, post.like_count, post.is_liked)}
        </p>
      </div>
      <hr />
      <div id="c222c">
        ${LikeButton(post, current_user_id)}
        ${CommentButton(post, commentIcon)}
      </div>
      <hr />
      <div id="c222b">
        ${usericon}
        <form style="width: 100%; display: flex; align-items: center">
          <input
            style="background-color: #d6f1f5"
            type="text"
            placeholder="Write a comment..."
          />
          ${sendicon}
        </form>
      </div>
  `;
  return PostContainer;
}
async function Posts() {
  queueMicrotask(async () => {
    const token = getDecodedAuthToken();
    const current_user_id = token.id;

    const PostsContainer = document.getElementById("c222d");
    PostsContainer.innerHTML = "<div>Loading...</div>";

    const posts = await fetchPosts(current_user_id);

    PostsContainer.innerHTML = "";
    posts.map((post) => {
      PostsContainer.appendChild(Post(post, current_user_id));
    });
  });
}

// print = nav, grid
// task que - profile menu
// micro que = posts

function Grid() {
  return `
  <div id="c2">
    <div id="c21">
      <div id="c211">
        ${usericon}
        <p id="fullname2"></p>
      </div>
    </div>
    <div id="c22">
      ${PostForm()}
      <div id="c222d">
        <!-- posts -->
      </div>
    </div>
  </div>
  `;
}
async function Test() {
  console.log("test");
}

function Init() {
  if (!isAuthenticated()) {
    window.location.href = "/login";
  }

  Posts();

  return `
    ${Nav()}
    ${Grid()}
    `;
}

document.querySelector("body").innerHTML = Init();
