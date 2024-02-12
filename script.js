// HTML content variables
const offerBlock = $('.content__block--offer');
const yesBlock = $('.content__block--yes');
const noBlock = $('.content__block--no');
const sliderYes = $('.slider--yes');
const sliderNo = $('.slider--no');
const buttons = $('.content__buttons');
const buttonYes = $('.content__button--yes');
const buttonNo = $('.content__button--no');
const clue = $('.clue');
const classToToggle = 'hidden';

// Aditional variables
let counter = 0;
let toggleClassTimeout;
const notificationInstance = new Noty({
  theme: 'sunset',
  type: 'error',
  text: `<img src="./assets/notification.gif"><p>Oops! Something happened, and you can't more interact with this button, he-he!</p>`,
  container: '.notification',
  layout: 'topRight',
  timeout: 3000,
});

// functions that detect needeble height and width
function heightDetect(percent) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return (percent * (height - 6)) / 100;
}
function widthDetect(percent) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  return (percent * width) / 100;
}
// function that set responsive font size
function setResponsiveFontSize() {
  $('.wrapper').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
}
// function that update rotate block visibility
function updateRotateBlockVisibility() {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  $('.rotate__block').toggleClass('visible', isPortrait);
}

$(document).ready(function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();

  // initiate slick slider in blocks
  sliderYes.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  });
  sliderNo.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  });

  // buttons click controllers
  buttonYes.on('click', () => {
    if (notificationInstance) {
      notificationInstance.close();
    }

    offerBlock.addClass(classToToggle);
    yesBlock.removeClass(classToToggle);
    noBlock.addClass(classToToggle)
    buttons.addClass(classToToggle)
  })

  buttonNo.on('click', () => {
    if (toggleClassTimeout) {
      clearTimeout(toggleClassTimeout);
    }
  
    offerBlock.addClass(classToToggle);
    noBlock.removeClass(classToToggle);
  
    if (!noBlock.hasClass(classToToggle) && counter !== 0 && counter < 4) {
      sliderNo.slick('slickNext');
    }
  
    if (counter >= 4) {
      clue.removeClass(classToToggle);

      toggleClassTimeout = setTimeout(() => {
        clue.addClass(classToToggle);
      }, 3500);

      notificationInstance.show();
    }
  
    counter++;
  })
});

// window event listeners
$(window).on('resize', function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('orientationchange', function () {
  updateRotateBlockVisibility();
});
