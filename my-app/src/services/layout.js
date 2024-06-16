const createpost = () => {
  let popup = document.querySelector(".popup");
  popup.style.display = "block";
  popup.querySelector(".large-popup").style.display = "block";
  document.querySelector(".body").setAttribute("aria-hidden", "true");
  document.querySelector("body").style.overflow = "hidden";
  document.querySelector("#insert-img").onchange = previewFile;
  popup
    .querySelector(".large-popup")
    .querySelector("form")
    .setAttribute("onsubmit", "");
  popup
    .querySelector(".large-popup")
    .querySelector("#post-text")
    .addEventListener("input", (event) => {
      if (event.target.value.trim().length > 0) {
        popup.querySelector(".submit-btn").disabled = false;
      } else if (
        event.target.parentElement.querySelector("#img-div").style
          .backgroundImage
      ) {
        popup.querySelector(".submit-btn").disabled = false;
      } else {
        popup.querySelector(".submit-btn").disabled = true;
      }
    });
};

function remove_popup() {
  let popup = document.querySelector(".popup");
  popup.style.display = "none";
  document.querySelector(".body").style.marginRight = "0px";
  document.querySelector(".body").setAttribute("aria-hidden", "false");
  document.querySelector("body").style.overflow = "auto";
  let small_popup = document.querySelector(".small-popup");
  let large_popup = document.querySelector(".large-popup");
  let login_popup = document.querySelector(".login-popup");
  small_popup.style.display = "none";
  large_popup.style.display = "none";
  login_popup.style.display = "none";
  large_popup.querySelector("#post-text").value = "";
  large_popup.querySelector("#insert-img").value = "";
  large_popup.querySelector("#img-div").style.backgroundImage = "";
  large_popup.querySelector("#img-change").value = "false";
  large_popup.querySelector("#img-div").style.display = "none";
}

function previewFile(ImgUrl) {
  document.querySelector("#img-div").style.display = "block";
  document.querySelector("#spinner").style.display = "block";
  document.querySelector("#del-img").style.display = "none";
  document.querySelector("#del-img").addEventListener("click", del_image);
  var preview = document.querySelector("#img-div");
  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.style.backgroundImage = `url(${ImgUrl})`;
    document.querySelector(".large-popup").querySelector("#img-change").value =
      "true";
  };
  if (ImgUrl) preview.style.backgroundImage = `url(${ImgUrl})`;

  if (file) {
    //reader.addEventListener('progress', (event) => {
    //    document.querySelector('#spinner').style.display = 'block';
    //});
    document.querySelector(".form-action-btns");
    //   .querySelector("input[type=submit]").disabled = false;
    var promise = new Promise(function (resolve, reject) {
      setTimeout(() => {
        var read = reader.readAsDataURL(file);
        resolve(read);
      }, 500);
    });
    promise
      .then(function () {
        document.querySelector("#spinner").style.display = "none";
        document.querySelector("#del-img").style.display = "block";
      })
      .catch(function () {
        console.log("Some error has occured");
      });
  } else {
    document.querySelector("#spinner").style.display = "none";
    document.querySelector("#del-img").style.display = "block";
  }
}

function del_image() {
  document.querySelector("input[type=file]").value = "";
  document.querySelector("#img-div").style.backgroundImage = "";
  document.querySelector("#img-div").style.display = "none";
  document.querySelector(".large-popup").querySelector("#img-change").value =
    "true";
  if (
    document
      .querySelector(".large-popup")
      .querySelector("#post-text")
      .value.trim().length <= 0
  ) {
    document.querySelector(".large-popup").querySelector(".form-action-btns");
    //   .querySelector("input[type=submit]").disabled = true;
  }
}

export { createpost, remove_popup, previewFile };
