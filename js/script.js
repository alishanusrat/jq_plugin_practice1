  
//1
  $(document).ready(function() {
$('.count').counterUp({
    delay: 5,
    time: 500
});


  
  } );
  
//2
  wow = new WOW( {
  boxClass:     'wow',     
   animateClass: 'animated', 
   offset:       0,         
     mobile:       true,      
     live:         true       
    }
   )
    wow.init();




//3
    var countdown = $("#countdown2").countdown360({

    radius      : 60,

    seconds     : 100,

    fontColor   :'#333333',

    autostart   :true,

    onComplete  :function () { console.log('done') }

});
    countdown.start();


    //4
    window.addEventListener('load', function () {
    // console.log("Windows loading");

    //Getting dashboard  ( Checking if we are in dashboard or not)
    var dashboard = document.getElementById("page_name");
    //Start button 
    var start_button = document.getElementById("start_button");
    //Stop button
    var stop_button = document.getElementById("timer_submit");
    //timer 
    var hour = document.getElementById("hour");
    var mint = document.getElementById("min");
    var secd = document.getElementById("sec");

    // console.log(timer.innerHTML);

    if (dashboard != null && localStorage.getItem('start_button') == null) {
        // console.log("in Dashboard and start button not clicked");
        //Declaring variable  
        var hr = 0;
        var min = 0;
        var sec = 0;

    } else if ((dashboard != null && localStorage.getItem('start_button') != null)) {
        $("#start_button").prop("disabled", true);
        $("#start_button").removeClass("btn-outline-success");
        $("#start_button").addClass("btn-light");
        start_button.innerHTML = "Running";

    }




    if (start_button) {
        start_button.addEventListener('click', function () {
            // console.log('start button working');
            localStorage.setItem('start_button', 'clicked');
            $("#start_button").prop("disabled", true);
            $("#start_button").removeClass("btn-outline-success");
            $("#start_button").addClass("btn-light");
            start_button.innerHTML = "Running";
            var total_time = document.getElementById("total_time");
            if (total_time) {
                total_time.innerHTML = "Counting...";
            }
            timerCycle();

        })
    }
    if (stop_button) {
        stop_button.addEventListener('click', function () {

            // saveData(hr, min, sec);                          To get data after stop button active this fuction
            localStorage.clear();
            hour.innerHTML = '00';
            mint.innerHTML = '00';
            secd.innerHTML = '00';
            var total_time = document.getElementById("total_time");
            if (total_time) {
                total_time.innerHTML = hr + ':' + min + ':' + sec;
            }
            //Stopping the cycle
            clearTimeout(cycle);
            hr = 0;
            min = 0;
            sec = 0;
            $("#start_button").prop("disabled", false);
            $("#start_button").addClass("btn-success");
            $("#start_button").removeClass("btn-light");
            start_button.innerHTML = "Start";


        })
    }
    //continue timer on other pages 
    if (dashboard == null && localStorage.getItem('start_button') != null) {
        sec = localStorage.getItem('sec');
        min = localStorage.getItem('min');
        hr = localStorage.getItem('hr');
        timerCycle();
        //continue timer on coming back Dashboard
    } else if (dashboard != null && localStorage.getItem('start_button') != null) {
        sec = localStorage.getItem('sec');
        min = localStorage.getItem('min');
        hr = localStorage.getItem('hr');
        timerCycle();
    }
    function timerCycle() {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }

        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }
        if (hr < 10 || hr == 0) {
            hr = '0' + hr;
        }

        localStorage.setItem('hr', hr);
        localStorage.setItem('min', min);
        localStorage.setItem('sec', sec);
        // console.log(timer);
        // console.log(timer.innerHTML);

        hour.innerHTML = hr;
        mint.innerHTML = min;
        secd.innerHTML = sec;

        // if (dashboard == null && localStorage.getItem('start_button') != null) {
        //     var side_timer = document.getElementById('time_title');
        //     if (side_timer) {
        //         handling other counter changeing URL        [Put Where you want to show your counter after URL change]
        //         hour.innerHTML = hr;
        //         min.innerHTML = min;
        //         sec.innerHTML = sec;
        //     }

        // } else {

        // }


        cycle = setTimeout(timerCycle, 1000);
    }

    //AJax funtion to save the data


    // function saveData(hr, min, sec) {

    //     $.ajax({
    //         headers: {
    //             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //         },
    //         type: 'POST',
    //         url: '/timer',
    //         data: {

    //             'hr': hr,
    //             'min': min,
    //             'sec': sec,

    //         },
    //         success: function (data) {
    //             document.getElementById("time_msg").innerHTML = data.msg;
    //             $("#time_msg").slideDown(1000);
    //             $("#time_msg").delay(3000).slideUp(1000);
    //         },
    //         error: function (data, textStatus, errorThrown) {
    //             console.log("Error:");
    //             console.log(data);

    //         },
    //     });

    // }

})

  //5
  var segments = {
  0:   ['a', 'b', 'c',    'e', 'f', 'g'],
  1:   [   'c','f'   ],
  2:   ['a',    'c', 'd', 'e',    'g'],
  3:   ['a',    'c', 'd',    'f', 'g'],
  4:   [   'b', 'c', 'd',    'f'   ],
  5:   ['a', 'b',    'd',    'f', 'g'],
  6:   ['a', 'b',    'd', 'e', 'f', 'g'],
  7:   ['a',    'c',   'f'   ],
  8:   ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  9:   ['a', 'b', 'c', 'd',    'f', 'g'],
  'all': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  '-':   [     'd'     ]
};

var lightSegments = function(number, clazz) {
  segments['all'].forEach(function(seg) {
    $(clazz + '.' + seg).css("background-color", 'red');

var opacity = 0.15;
if ($.inArray(seg, segments[number]) > -1) {
  opacity = 1;
}
$(clazz + '.' + seg).fadeTo(300, opacity);
  });
};

var i1 = 0;
var i2 = 0;
var counter = function () {
  lightSegments(i1, 'div.d1 div');
  lightSegments(i2, 'div.d2 div');

  i1++;
  if (i1 == 10) {
    i1 = 0;
    i2++;
  }
  if (i2 == 10) {
    i2 = 0;
  }
};

$(document).ready(function () {
  lightSegments('-', 'div.d1 div');
  lightSegments('-', 'div.d2 div');

  var myTimer = window.setInterval(function () {
    counter();
  }, 1000); // 1000ms

});


/*-----------animation3
$(function(){
    $('.image-link').viewbox({
        setTitle: true,
        margin: 20,
        resizeDuration: 300,
        openDuration: 200,
        closeDuration: 200,
        closeButton: true,
        navButtons: true,
        closeOnSideClick: true,
        nextOnContentClick: true
    });
});



$('.thumbnail').viewbox({

  // template
  template: '<div class="viewbox-container"><div class="viewbox-body"><div class="viewbox-header"></div><div class="viewbox-content"></div><div class="viewbox-footer"></div></div></div>',

  // loading spinner
  loader: '<div class="loader"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>',

  // show title
  setTitle: true,

  // margin in px
  margin: 20,

  // duration in ms
  resizeDuration: 300,
  openDuration: 200,
  closeDuration: 200,

  // show close button
  closeButton: true,

  // show nav buttons
  navButtons: true,

  // close on side click
  closeOnSideClick: true,

  // go to next image on content click
  nextOnContentClick: true,

  // enable touch gestures
  useGestures: true,

  // image extensions
  // used to determine if a target url is an image file
  imageExt: ['png','jpg','jpeg','webp','gif']
  
});


animation4
$(function(){
$('.gallery a').simpleLightbox({

// default source attribute
sourceAttr: 'href',

// shows fullscreen overlay
overlay: true,

// shows loading spinner
spinner: true,

// shows navigation arrows
nav: true,

// text for navigation arrows
navText: ['&larr;','&rarr;'],

// shows image captions
captions: true,
captionDelay: 0,
captionSelector: 'img',
captionType: 'attr',
captionPosition: 'bottom',
captionClass: '',
captionHTML: false,

// captions attribute (title or data-title)
captionsData: 'title',

// shows close button
close: true,

// text for close button
closeText: 'X',

// swipe up or down to close gallery
swipeClose: true,

// show counter
showCounter: true,

// file extensions
fileExt: 'png|jpg|jpeg|gif',

// weather to slide in new photos or not, disable to fade
animationSlide: true,

// animation speed in ms
animationSpeed: 250,

// image preloading
preloading: true,

// keyboard navigation
enableKeyboard: true,

// endless looping
loop:  true,

// group images by rel attribute of link with same selector
rel: false,

// closes the lightbox when clicking outside
docClose:  true,

// how much pixel you have to swipe
swipeTolerance: 50,

// lightbox wrapper Class
className: 'simple-lightbox',

// width / height ratios
widthRatio: 0.8,
heightRatio: 0.9,

// scales the image up to the defined ratio size
scaleImageToRatio: false,

// disable right click
disableRightClick: false,

// disable page scroll
disable<a href="https://www.jqueryscript.net/tags.php?/Scroll/">Scroll</a>: true,

// show an alert if image was not found
alertError:  true,

// alert message
alertErrorMessage: 'Image not found, next image will be loaded',

// additional HTML showing inside every image
additionalHtml: false,

// enable history back closes lightbox instead of reloading the page
history: true,

// time to wait between slides
throttleInterval: 0,

// Pinch to <a href="https://www.jqueryscript.net/zoom/">Zoom</a> feature for touch devices
doubleTapZoom: 2,
maxZoom: 10,

// adds class to html element if lightbox is open
htmlClass: 'has-lightbox',

// RTL mode
rtl: false,

// elements with this class are fixed and get the right padding when lightbox opens
fixedClass: 'sl-fixed',

// fade speed in ms
fadeSpeed: 300,

// whether to uniqualize images
uniqueImages: true,

// focus the lightbox on open to enable tab control
focus: true,



});
});
-------*/

/*
var gallery = $('.gallery a').simpleLightbox();
gallery.on('show.simplelightbox', function () {
   
});
*/
