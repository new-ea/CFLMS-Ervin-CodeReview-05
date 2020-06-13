// parsing the data from JSON file
const movieData = JSON.parse(movieInfos);

// Added swiper from https://swiperjs.com
var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows : true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });

$(document).ready(function(){

    // Loop for reading the data form the parsed JSON file
    for ( let i = 0; i < movieData.length; i++) {
        const movieName = movieData[i].movie;
        const movieYear = movieData[i].year;
        const movieProduction = movieData[i].production;
        const movieImg = movieData[i].image;
        const actors = movieData[i].actors;
        
        //Variable for appending in to html
        let movieBox = `<div class="movieBox" data-like="0">
                            <div class="movieImg">
                                <img src="${movieImg}" alt="Movie Poster">
                            </div>
                            <div class="movieInfo">
                                <div class="infoBox">
                                    <h2 class="movieTitel">${movieName}</h2>
                                    <p>Production year and Country:</p>
                                    <p class="infoTxt">${movieYear} <span>${movieProduction}</span></p>
                                    <p>Actors:</p>
                                    <p class="infoTxt">${actors}</p>
                                    <hr>
                                    <p class="description"></p>
                                </div>
                                <div class="likeBox">
                                    <p class="likeSymb">LIKE &#128077</p>
                                    <p class="likeCounter">0</p>
                                </div>
                            </div>
                        </div>`;

        $(".movieContainer").append(movieBox);
        
    } //Loop end
    
    //Loop for incrementig likes on click
    let movieBoxNew = $(".movieBox");
    let likeBox = $(".likeBox");
    let likeCounter = $(".likeCounter");
    
    for ( let i = 0; i < likeBox.length; i++) {
        let counter = 0;
        $(likeBox[i]).on("click" , function(){
            counter += 1;
            $(likeCounter[i]).text(counter); 
            $(movieBoxNew[i]).attr('data-like', `${counter}`);   
        })
    }

    //Resizing divs by click event
    let movieImg = $(".movieImg");
    let descriptionTxt = $(".description");
    let infoBox = $(".infoBox");
    
    for (let i = 0; i < movieBoxNew.length; i++) {
        const description = movieData[i].description;
        const trailer = movieData[i].trailer;
        
        let iFrame = `<p class='trailer'><iframe width='400' height='225' src='${trailer}' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></p>`;
        $(movieImg[i]).on("click", function(){

            if ($(this).hasClass("hidden")){
                $(this).removeClass("hidden");
                movieBoxNew.fadeIn(1400).css("display", "flex");
                $(movieBoxNew[i]).removeClass("resizeMovieBox");
                $(movieImg[i]).removeClass("resizeImg");
                $(".trailer").remove();
                $(descriptionTxt[i]).text("");
            } else {
                $(this).addClass("hidden");
                movieBoxNew.css("display", "none");
                $(movieBoxNew[i]).fadeIn(1700).addClass("resizeMovieBox").css("display","flex");
                $(movieImg[i]).addClass("resizeImg");
                $(descriptionTxt[i]).text(`${description}`);
                $(infoBox[i]).append(iFrame);
            }
        })
    }

    //Sorting the divs by number of likes
    var $wrapper = $(".movieContainer");
    $("#sortBtn").on("click", function(){
        $wrapper.find(".movieBox").sort(function (a, b) {
            return +b.dataset.like - +a.dataset.like;
        })
        .appendTo($wrapper);
    })



})//End Document ready function
    
