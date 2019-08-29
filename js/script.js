class API {
  constructor(artist, song) {
    this.artist = artist;
    this.song = song;
  }
  async queryAPI() {
    const url = await fetch(`https://api.lyrics.ovh/v1/${this.artist}/${this.song}`);
    const lyric = await url.json();

    return {
      lyric
    }
  }
}

const searchForm = document.querySelector('#search-form')
const searchDiv = document.querySelector('#search')
const resultDiv = document.querySelector('#result')
const messageDiv = document.querySelector('#messages');

const main = document.querySelector('main');
const artistName = document.querySelector('.artist-name');
const songName = document.querySelector('.song-name');



searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  main.style.marginTop = "30px";
  const artist = document.querySelector('#artist').value
  const song = document.querySelector('#song').value;



  setTimeout(() => {
    document.querySelector('#artist').value = '';
    document.querySelector('#song').value = '';
  }, 3000);

  if (artist === '' || song === '') {
    messageDiv.innerHTML = 'Error... Both fields are required';
    messageDiv.classList.add('error');

    setTimeout(() => {
      messageDiv.innerHTML = '';
      messageDiv.classList.remove('error');
    }, 3000);
  } else {
    const api = new API(artist, song);
    api.queryAPI()
      .then(data => {
        if (data.lyric.lyrics) {
          let result = data.lyric.lyrics;
          resultDiv.textContent = result;
          artistName.textContent = "Artist: " + artist;
          songName.textContent = "Song: " + song;
        } else {
          messageDiv.innerHTML = 'No Lyrics Found';
          messageDiv.classList.add('error');
          setTimeout(() => {
            messageDiv.innerHTML = '';
            messageDiv.classList.remove('error');
          }, 3000);
        }
      })
  }
});



//! Back top button

document.addEventListener('DOMContentLoaded', function () {
  let gototop = document.querySelector('.gototop');
  let body = document.documentElement;

  window.addEventListener('scroll', check);

  function check() {
    pageYOffset >= 500 && gototop.classList.add('visible');
    pageYOffset < 500 && gototop.classList.remove('visible');
  }


  let circ = timeFraction =>
    1 - Math.sin(Math.acos(timeFraction > 1 ? timeFraction = 1 : timeFraction));

  let makeEaseOut = timing => timeFraction => 1 - timing(1 - timeFraction);
  let gogototopEaseOut = makeEaseOut(circ);
});

function animate(options) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / options.duration;
    timeFraction > 1 && (timeFraction = 1);

    let progress = options.timing(timeFraction)

    options.draw(progress);
    timeFraction < 1 && requestAnimationFrame(animate);
  });
}