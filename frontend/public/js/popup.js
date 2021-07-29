
const popup = (domelement,message) => {
    domelement.innerHTML+=
    `<div id="popup1" class="overlay">
        <div class="popup">
        <h2>${message}</h2>
        <a class="close" href="#">&times;</a>
        <div class="content">
        Please click the X to exit.
      </div>
    </div>
  </div>`;
}