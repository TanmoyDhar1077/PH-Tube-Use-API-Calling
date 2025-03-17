//Remove Active Class
function removeActiveClass() {
  const activeBtns = [...document.getElementsByClassName("active")];
  activeBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
}

// Categories Load
function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

// video load
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("all-btn").classList.add("active");
      displayVideos(data.videos);
    });
}

// video category load
function loadVideosByCategory(id) {
  url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedBtn = document.getElementById(`btn-${id}`);
      clickedBtn.classList.add("active");
      displayVideos(data.category);
    });
}

// video details load
function loadVideoDetails(id) {
  console.log(id);
  url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    });
}

// Display Categories
function displayCategories(categories) {
  // console.log(categories);
  const categoryContainer = document.getElementById("categories-container");
  categories.forEach((data) => {
    const categoriesDiv = document.createElement("div");
    categoriesDiv.innerHTML = `
        <button onclick="loadVideosByCategory(${data.category_id})" id="btn-${data.category_id}" class="btn btn-sm border-none  hover:bg-[#ff617b] hover:text-white">${data.category}</button>
        `;
    categoryContainer.appendChild(categoriesDiv);
  });
}

// Display Videos
function displayVideos(videos) {
  const videoContainer = document.getElementById("videos-container");

  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center gap-8 col-span-full py-40">
            <img src="./assets/img/Icon.png" alt="">
            <h2 class="font-bold text-4xl text-center">Oops!! Sorry, There is no <br> content here</h2>
        </div>`;
    return;
  }

  videos.forEach((data) => {
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-48 object-cover"
                src="${data.thumbnail}"
                alt="Thumbnail" />
                <span class="absolute bottom-2 right-2 text-sm text-white bg-black/50 p-1 rounded-md">
                    3hrs 56 min ago
                </span>
            </figure>
            <div class="card-body flex-row gap-4 px-0">
                <div class="profile">
                    <img class="w-10 h-10 rounded-full" src="${data.authors[0].profile_picture}" alt="">
                </div>
                <div class="intro flex flex-col gap-2">
                    <h2 class="text-base font-bold">${data.title}</h2>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-[#171717]/70">${data.authors[0].profile_name}</span>
                        <img src="./assets/img/verified.png" alt="" class="w-4 h-4">
                    </div>
                    <span class="text-sm text-[#171717]/70">${data.others.views} views</span>
                </div>
              </div>
                <button onclick="loadVideoDetails('${data.video_id}')" class="btn btn-block">See Details</button>
        </div>`;
    videoContainer.appendChild(videoDiv);
  });
}
loadCategories();
