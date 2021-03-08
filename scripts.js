function loading(loading, idElement) {
  if (loading) {
    $(idElement).addClass("loader");
  } else {
    $(idElement).removeClass("loader");
  }
}

function setStars(number, ind) {
  for (var i = 0; i < number; i++) {
    $(`.score-${ind}`).append(`<img
      class="img-score"
      src="images/star_on.png"
      alt="stars"
    />`);
  }
}

function newSlide(slides) {
  ns = $(`<div class="carousel-item pt-5 slide">
    <div class="row mx-auto" id="videos"></div>
  </div>`);

  $(slides).append(ns);

  return ns;
}

function appendVideo(slide, video, i) {
  slide.children().append(`<div class="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
    <div class="card mb-2 d-flex justify-content-center border border-0">
      <div class="card-img-top d-flex justify-content-center align-items-center">
        <img
          class="img-top"
          src="${video.thumb_url}"
          alt="${video.title}"
        />
        <img class="img-play" src="images/play.png" alt="play" />
      </div>
      <div class="card-body-tutorial">
        <h4 class="card-title-tutorial font-weight-bold mt-3">
          ${video.title}
        </h4>
        <p class="card-text-tutorial">
          ${video["sub-title"]}
        </p>
        <div class="author d-flex flex-row justify-content-start">
          <img
            class="img-author"
            src="${video.author_pic_url}"
            alt="${video.author}
          />
          <p class="name-author ml-3 align-self-center mb-0">
            ${video.author}
          </p>
        </div>
        <div class="score-time mt-2 d-flex flex-row justify-content-between">
          <div class="score score-${i}"></div>
          <p class="time">${video.duration}</p>
        </div>
      </div>
    </div>
  </div>`);
  setStars(video.star, i)
}

function appendQuote(quote) {
  $("#quotes").append(`<div class="carousel-item quote-bg py-5">
    <blockquote
      class="quote px-5 d-flex justify-content-center align-items-center"
    >
      <div class="row p-5">
        <div class="col-md-4 col-lg-3 text-center">
          <img
            class="image-quote rounded-circle"
            src="${quote.pic_url}"
            style="width: 160px; height: 160px"
          />
        </div>
        <div class="col-md-8 col-lg-9 py-3">
          <p class="text-quote text-white mt-2">
            « ${quote.text}
          </p>
          <p class="text-small-quote text-white mb-0">
            <span class="text-small-bold font-weight-bold"
              >${quote.name}</span
            >
            <br />
            <span class="font-italic">${quote.title}</span>
          </p>
        </div>
      </div>
    </blockquote>
  </div>`);
}

function getQuotes() {
  $.ajax({
    url: "https://smileschool-api.hbtn.info/quotes",
    method: "GET",
    beforeSend: loading(true, "#quotes"),
    success: function (result) {
      loading(false, "#quotes");
      result.forEach((quote) => {
        appendQuote(quote);
      });
      $(".quote-bg").first().addClass("active")
    },
  });
}

function getTutorialVideos() {
  url = "https://smileschool-api.hbtn.info/popular-tutorials"
  slides = "#tutorial-slides"

  $.ajax({
    url: url,
    method: "GET",
    beforeSend: loading(true, slides),
    success: function (result) {
      loading(false, slides),
      result.forEach((video, i) => {
        if (i%4 == 0) {
          slide = newSlide(slides);
        }

        if (i == 0) {
          slide.addClass("active")
        }

        appendVideo(slide, video, i);      
      });
      getLastestVideos();
    },
  });
}

function getLastestVideos(lastest = false) {
  url = "https://smileschool-api.hbtn.info/latest-videos"
  slides = "#lastest-slides"

  $.ajax({
    url: url,
    method: "GET",
    beforeSend: loading(true, slides),
    success: function (result) {
      loading(false, slides),
      result.forEach((video, i) => {
        if (i%4 == 0) {
          slide = newSlide(slides);
        }

        if (i == 0) {
          slide.addClass("active")
        }

        appendVideo(slide, video, i);      
      });
    },
  });
}

$(document).ready(function () {
  getQuotes();
  getTutorialVideos();
});
