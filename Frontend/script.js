const imageInput = document.querySelector("#imageInput");
const uploadBtn = document.querySelector("#uploadBtn");
const fileName = document.querySelector("#fileName");
const submitBtn = document.querySelector("#submit");
const API_URL = "http://172.16.54.6:3000/upload";

//When you you click the button file picker opens
uploadBtn.addEventListener("click", () => {
  imageInput.click();
});

//Uploading the image function
submitBtn.addEventListener("click", () => {
  uploadImage();
});

//Adding the file name
imageInput.addEventListener("change", () => {
  if (imageInput.files.length > 0) {
    fileName.textContent = imageInput.files[0].name;
  file = imageInput.files[0];

  }
});

//A function that will do the upload
function uploadImage() {
  const file = imageInput.files[0];
  const formData = new FormData();
  formData.append("image", file);

  //Sending an api request to the API
  fetch(API_URL, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => alert(data.message))
    .catch((err) => console.log(err));

}
