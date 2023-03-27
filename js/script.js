window.onload = function() {
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2); // JavaScript months are zero-based
  let day = today.getDate();

  let formattedDate = `${year}-${month}-${day}`;
  document.querySelector('input').value = formattedDate;
  getFetch();
};

document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://api.nasa.gov/planetary/apod?api_key=ZYngjfE4qbemPmMkG1GIdaIGRVhmXrqwdr2L25f3&date=${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if (data.media_type === 'image'){
          document.querySelector('img').src = data.hdurl
          document.querySelector('iframe').src = " " //need to find a way to not show any video
          document.querySelector('#credits').innerText = data.copyright
        }
        else if (data.media_type === 'video'){
          document.querySelector('img').src = " " //need to find a way to not show any image
          document.querySelector('iframe').src = data.url
        }
        document.querySelector('#explanation').innerText = data.explanation
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
