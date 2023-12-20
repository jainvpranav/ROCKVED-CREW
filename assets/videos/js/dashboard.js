'use strict';
import { createToast } from '../toast/script.js';
import { supabase } from './supa.js';


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Popup window for learning
document.getElementById("learn1").addEventListener("click", () => {
  document.getElementById("extracontainer").classList.add("open");
  document.getElementById("video").src = "../assets/videos/ekadikena.mp4";
})
document.getElementById("learn2").addEventListener("click", () => {
  document.getElementById("extracontainer").classList.add("open");
  document.getElementById("video").src = "../assets/videos/eka.mp4";
})
document.getElementById("learn3").addEventListener("click", () => {
  document.getElementById("extracontainer").classList.add("open");
  document.getElementById("video").src = "../assets/videos/Nikhilam.mp4";
})
// document.getElementById("learn4").addEventListener("click", () => {
//   document.getElementById("extracontainer").classList.add("open");
//   document.getElementById("video").src = "learn4.mp4";
// })
document.getElementById("learn5").addEventListener("click", () => {
  document.getElementById("extracontainer").classList.add("open");
  document.getElementById("video").src = "../assets/videos/Urdhva.mp4";
})
// document.getElementById("learn6").addEventListener("click", () => {
//   document.getElementById("extracontainer").classList.add("open");
//   document.getElementById("video").src = "learn6.mp4";
// })
document.getElementById("close").addEventListener("click", () => {
  document.getElementById("video").src = "";
  document.getElementById("extracontainer").classList.remove("open");
})

//Game Logic

//Feedback logic
const feedback = async (e) => {
  e.preventDefault();
  let email = document.getElementById("feedbackemail").value ; 
  let name = document.getElementById("feedbackname").value ; 
  let message = document.getElementById("feedbackmessage").value ; 
    const { error } = await supabase
    .from('feedback')
    .insert({email: email, name: name, text: message})
    if(!error){ 
      createToast("success", "Feedback submitted"); 
    }
    if(error) {
        createToast("error", "Feedback not Submitted");
        console.log(error);
    }
    document.getElementById("feedbackemail").value=''
    document.getElementById("feedbackname").value=''
    document.getElementById("feedbackmessage").value=''
}
document.getElementById("feedbacksubmit").addEventListener("click", feedback);


const clearvalue=(a=null,b=null, c=null) => {
  if(a!=null)
  a.value=''
  if(a!=null)
  b.value=''
  if(c!=null)
  c.value=''
}

function astropop() {
  const astro = document.getElementById("astro");
  const oneimgPath = "../assets/hints/one.png";
  const twoimgPath = "../assets/hints/two.png";
  const oneaudioPath = "../assets/hints/one.mp3";
  const durationToChangeImage = 4.5;

  const createAudioElement = () => {
    const audioElement = document.createElement("audio");
    // audioElement.autoplay = true;
    audioElement.controls = true;
    audioElement.innerHTML = `
      <source src="${oneaudioPath}" type="audio/mpeg">
      Your browser does not support the audio element.`;
    return audioElement;
  };

  const createImageElement = (src) => {
    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.alt = "Hint Image";
    return imgElement;
  };

  const replaceImage = () => {
    oneimg.src = twoimgPath;
    // Additional logic or actions can be added here
  };

  const oneimg = createImageElement(oneimgPath);
  const oneaudio = createAudioElement();

  oneaudio.addEventListener('timeupdate', () => {
    const currentTime = oneaudio.currentTime;
    if (currentTime >= durationToChangeImage) {
      replaceImage();
    }
  });
  oneaudio.addEventListener('ended', () => {
    astro.innerHTML='';
    astro.style.display = 'none';
  });
  astro.appendChild(oneimg);
  astro.appendChild(oneaudio);
}
function astropop2() {
  const astro = document.getElementById("astro");
  astro.style.display='block';
  const oneimgPath = "../assets/hints/three.png";
  const twoimgPath = "../assets/hints/four.png";
  const oneaudioPath = "../assets/hints/two.mp3";
  const durationToChangeImage = 3;

  const createAudioElement = () => {
    const audioElement = document.createElement("audio");
    audioElement.autoplay = true;
    audioElement.controls = true;
    audioElement.innerHTML = `
      <source src="${oneaudioPath}" type="audio/mpeg">
      Your browser does not support the audio element.`;
    return audioElement;
  };

  const createImageElement = (src) => {
    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.alt = "Hint Image";
    return imgElement;
  };

  const replaceImage = () => {
    oneimg.src = twoimgPath;
    // Additional logic or actions can be added here
  };

  const oneimg = createImageElement(oneimgPath);
  const oneaudio = createAudioElement();

  oneaudio.addEventListener('timeupdate', () => {
    const currentTime = oneaudio.currentTime;
    if (currentTime >= durationToChangeImage) {
      replaceImage();
    }
  });
  oneaudio.addEventListener('ended', () => {
    // let journey = document.getElementById("journey");
    astro.innerHTML='';
    astro.style.display = 'none';
  });
  astro.appendChild(oneimg);
  astro.appendChild(oneaudio);
} 
function astropop3() {
  const astro = document.getElementById("astro");
  astro.style.display='block';
  const oneimgPath = "../assets/hints/five.png";
  const twoimgPath = "../assets/hints/six.png";
  const oneaudioPath = "../assets/hints/three.mp3";
  const durationToChangeImage = 7;

  const createAudioElement = () => {
    const audioElement = document.createElement("audio");
    audioElement.autoplay = true;
    audioElement.controls = true;
    audioElement.innerHTML = `
      <source src="${oneaudioPath}" type="audio/mpeg">
      Your browser does not support the audio element.`;
    return audioElement;
  };

  const createImageElement = (src) => {
    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.alt = "Hint Image";
    return imgElement;
  };

  const replaceImage = () => {
    oneimg.src = twoimgPath;
    // Additional logic or actions can be added here
  };

  const oneimg = createImageElement(oneimgPath);
  const oneaudio = createAudioElement();

  oneaudio.addEventListener('timeupdate', () => {
    const currentTime = oneaudio.currentTime;
    if (currentTime >= durationToChangeImage) {
      replaceImage();
    }
  });
  oneaudio.addEventListener('ended', () => {
    // let journey = document.getElementById("journey");
    astro.innerHTML='';
    astro.style.display = 'none';
  });
  astro.appendChild(oneimg);
  astro.appendChild(oneaudio);
}
function astropop4() {
  const astro = document.getElementById("astro");
  astro.style.display='block';
  const oneimgPath = "../assets/hints/seven.png";
  // const twoimgPath = "../assets/hints/six.png";
  const oneaudioPath = "../assets/hints/four.mpeg";
  // const durationToChangeImage = 7;

  const createAudioElement = () => {
    const audioElement = document.createElement("audio");
    audioElement.autoplay = true;
    audioElement.controls = true;
    audioElement.innerHTML = `
      <source src="${oneaudioPath}" type="audio/mpeg">
      Your browser does not support the audio element.`;
    return audioElement;
  };

  const createImageElement = (src) => {
    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.alt = "Hint Image";
    return imgElement;
  };

  // const replaceImage = () => {
  //   oneimg.src = twoimgPath;
  //   // Additional logic or actions can be added here
  // };

  const oneimg = createImageElement(oneimgPath);
  const oneaudio = createAudioElement();

  // oneaudio.addEventListener('timeupdate', () => {
  //   const currentTime = oneaudio.currentTime;
  //   if (currentTime >= durationToChangeImage) {
  //     replaceImage();
  //   }
  // });
  oneaudio.addEventListener('ended', () => {
    // let journey = document.getElementById("journey");
    astro.innerHTML='';
    astro.style.display = 'none';
  });
  astro.appendChild(oneimg);
  astro.appendChild(oneaudio);
}
function astropop5() {
  const astro = document.getElementById("astro");
  astro.style.display = 'block';

  const oneimgPath = "../assets/hints/eight.png";
  const twoimgPath = "../assets/hints/nine.png";
  const threeimgPath = "../assets/hints/ten.png";
  const oneaudioPath = "../assets/hints/five.mpeg";
  const durationToChangeImage1 = 8;
  const durationToChangeImage2 = 18;

  const createAudioElement = () => {
    const audioElement = document.createElement("audio");
    audioElement.autoplay = true;
    audioElement.controls = true;
    audioElement.innerHTML = `
      <source src="${oneaudioPath}" type="audio/mpeg">
      Your browser does not support the audio element.`;
    return audioElement;
  };

  const createImageElement = (src) => {
    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.alt = "Hint Image";
    return imgElement;
  };

  const replaceImage = () => {
    oneimg.src = twoimgPath;
    // Additional logic or actions can be added here
  };

  const replaceImage2 = () => {
    oneimg.src = threeimgPath;
    // Additional logic or actions can be added here
  };

  const oneimg = createImageElement(oneimgPath);
  const oneaudio = createAudioElement();

  oneaudio.addEventListener('timeupdate', () => {
    const currentTime = oneaudio.currentTime;
    
    if (currentTime >= durationToChangeImage1 && currentTime < durationToChangeImage2) {
      replaceImage();
    } else if (currentTime >= durationToChangeImage2) {
      replaceImage2();
    }
  });

  oneaudio.addEventListener('ended', () => {
    astro.innerHTML = '';
    astro.style.display = 'none';
  });

  astro.appendChild(oneimg);
  astro.appendChild(oneaudio);
}

function openFullscreen() {
  var iframe = document.getElementById('fullscreenIframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { /* Firefox */
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE/Edge */
        iframe.msRequestFullscreen();
    }
}
function openFullscreen1() {
  var iframe = document.getElementById('fullscreenIframe1');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { /* Firefox */
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE/Edge */
        iframe.msRequestFullscreen();
    }
}
function openFullscreen2() {
  var iframe = document.getElementById('fullscreenIframe2');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { /* Firefox */
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE/Edge */
        iframe.msRequestFullscreen();
    }
}
function openFullscreen3() {
  var iframe = document.getElementById('fullscreenIframe3');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { /* Firefox */
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE/Edge */
        iframe.msRequestFullscreen();
    }
}

// document.getElementById("game1").addEventListener("click", () => {
//   // document.getElementById("extracontainer2").classList.add("open");
//   let a = `<iframe src="https://i.simmer.io/@RockVed/flappy" id="fullscreenIframe1"></iframe>
//   <button id="closeframe" class="closeframe">
//     <div class="icon-box">
//       <ion-icon name="close-outline"></ion-icon>
//     </div>
//   </button>`;
//   document.getElementById("games").innerHTML = a;
//   openFullscreen();
// });
// document.getElementById("closeframe").addEventListener("click", () => {
//   let a = ``;
//   document.getElementById("games").innerHTML = a;
// });
// document.getElementById("close2").addEventListener("click", () => {
//   document.getElementById("extracontainer2").classList.remove("open");
// })


const rocket = document.getElementById('rocket');
const earth = document.getElementById("earth");
const moon = document.getElementById("moon");
const mars = document.getElementById("mars");
const sun = document.getElementById("sun");
let flag=3;
earth.addEventListener("click", function () {  
    let a = `<iframe src="https://rockved1.netlify.app/" id="fullscreenIframe"></iframe>
              <button id="closeframe" class="closeframe">
                <div class="icon-box">
                  <ion-icon name="close-outline"></ion-icon>
                </div>
              </button>`;
    document.getElementById("games").innerHTML = a;
    openFullscreen();
    var rect = rocket.getBoundingClientRect();
    console.log('Bottom: ' + rect.bottom); 
    document.getElementById("closeframe").addEventListener("click", () => {
        let a = ``;
        document.getElementById("games").innerHTML = a;
        progressbar(6);
        // if(Number(localStorage.getItem("record")) == 6 ) {
        // if(rect.bottom < 700 && rect.bottom >= 600 && Number(localStorage.getItem("record")) >= 6 ) {
        rocket.classList.add('animated1');
            let b = `<audio autoplay>
                      <source src="../assets/audio/rocketlaunch.mp3" type="audio/mpeg">
                      Your browser does not support the audio element.
                    </audio>`
            document.getElementById("games").innerHTML = b;
            setTimeout(function () {
                rocket.classList.remove('animated1');
                rocket.style.bottom= `20%`
                rocket.style.left= `25%` 
                rocket.style.rotate = `45deg`
                moon.style.opacity = `1`;
                earth.classList.remove("glow");
                moon.classList.add("glow");
                astropop2();
                flag=1;
            }, 3300);
        // }
    })
    
});
rocket.addEventListener("click", function () {  
  if(flag==1) {
    let a = `<iframe src="https://i.simmer.io/@RockVed/flappy" id="fullscreenIframe1"></iframe>
              <button id="closeframe" class="closeframe">
                <div class="icon-box">
                  <ion-icon name="close-outline"></ion-icon>
                </div>
              </button>`;
    document.getElementById("games").innerHTML = a;
    openFullscreen1();
    document.getElementById("closeframe").addEventListener("click", () => {
      let a = ``;
      document.getElementById("games").innerHTML = a;
      progressbar(25);
      rocket.classList.add('animated2');
      let b = `<audio autoplay>
                      <source src="../assets/audio/rocketlaunch.mp3" type="audio/mpeg">
                      Your browser does not support the audio element.
                    </audio>`
            document.getElementById("games").innerHTML = b;
      setTimeout(function () {
          rocket.classList.remove('animated2');
          rocket.style.top= `45%`
          rocket.style.left= `60%` 
          rocket.style.rotate = `285deg`
          mars.style.opacity = `1`;
          moon.classList.remove("glow");
          mars.classList.add("glow");
          astropop3();
          flag=2;
      }, 3300);
    })
  }
  if(flag==2) {
    let a = `<iframe src="https://atomgame1.netlify.app/" id="fullscreenIframe2"></iframe>
              <button id="closeframe" class="closeframe">
                <div class="icon-box">
                  <ion-icon name="close-outline"></ion-icon>
                </div>
              </button>`;
    document.getElementById("games").innerHTML = a;
    openFullscreen2();
    document.getElementById("closeframe").addEventListener("click", () => {
      let a = ``;
      document.getElementById("games").innerHTML = a;
      progressbar(25);
      rocket.classList.add('animated3');
      let b = `<audio autoplay>
                      <source src="../assets/audio/rocketlaunch.mp3" type="audio/mpeg">
                      Your browser does not support the audio element.
                    </audio>`
            document.getElementById("games").innerHTML = b;
      setTimeout(function () {
          rocket.classList.remove('animated3');
          rocket.style.top= `25%`
          rocket.style.left= `15%` 
          sun.style.opacity = `1`;
          mars.classList.remove("glow");
          sun.classList.add("glow");
          astropop4();
          flag=3;
      }, 3300);
    })
  }

  if(flag==3) {
    let a = `<iframe src="https://i.simmer.io/@NavaprettamN/candle-runner" id="fullscreenIframe3"></iframe>
              <button id="closeframe" class="closeframe">
                <div class="icon-box">
                  <ion-icon name="close-outline"></ion-icon>
                </div>
              </button>`;
    document.getElementById("games").innerHTML = a;
    openFullscreen3();
    document.getElementById("closeframe").addEventListener("click", () => {
      let a = ``;
      document.getElementById("games").innerHTML = a;
      progressbar(25);
      rocket.classList.add('animated3');
      let b = `<audio autoplay>
                      <source src="../assets/audio/rocketlaunch.mp3" type="audio/mpeg">
                      Your browser does not support the audio element.
                    </audio>`
            document.getElementById("games").innerHTML = b;
      setTimeout(function () {
          rocket.classList.remove('animated3');
          rocket.style.top= `25%`
          rocket.style.left= `15%` 
          astropop5();  
          document.getElementById("closebiimg").classList.remove("closebi");
          
      }, 3300);
    })
  }
});
const scoreboard = async () => {
  const { data, error } = await supabase
  .from('userscore')
  .select('*')
  .order("score", { ascending: false })
  let score = document.getElementById("score");
  let rank = document.getElementById("rank");
  let first = document.getElementById("firstleader");
  let second = document.getElementById("secondleader");
  let third = document.getElementById("thirdleader");

  first.innerHTML = data[0]['email'];
  second.innerHTML = data[1]['email'];
  third.innerHTML = data[2]['email'];


  if(error) console.log(error);

  for (let index = 0; index < data.length; index++) {
    if(data[index]['email']===localStorage.getItem("email")) {
      score.innerHTML = data[index]["score"];
      rank.innerHTML = index+1;
    }
  }
}


astropop();
scoreboard();

const progressbar = async (score1) => {
  const { data, error } = await supabase
  .from('userscore')
  .select("*")
  .eq('email', localStorage.getItem("email"))
  
  let score = data[0]['score'] + score1;
  let progress = data[0]['progress'] + 1;
  console.log(score)
  console.log(progress)

  const { error1 } = await supabase
  .from('userscore')
  .update({ score: score, progress: progress })
  .eq('email', localStorage.getItem("email"))

}

document.getElementById("badgesi").addEventListener("click", () => {
  document.getElementById("badges").classList.add("open");
})
document.getElementById("close3").addEventListener("click", () => {
  document.getElementById("badges").classList.remove("open");
})