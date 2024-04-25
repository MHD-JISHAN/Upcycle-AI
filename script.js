const imageUpload = document.getElementById('imageUpload');
const uploadedImage = document.getElementById('uploadedImage');
const predictionText = document.getElementById('prediction');

// Load the MobileNet model
async function loadModel() {
    const model = await mobilenet.load();
    return model;
}

// Make predictions when an image is uploaded
imageUpload.addEventListener('change', async function () {
    const model = await loadModel();
    const image = await loadImage(this);
    uploadedImage.src = image.src;
    const predictions = await model.classify(image);
    displayPredictions(predictions);
});

// Load the image
function loadImage(input) {
    return new Promise((resolve, reject) => {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            const img = new Image();
            img.src = reader.result;
            img.onload = function () {
                resolve(img);
            };
        };

        reader.onerror = function (error) {
            reject(error);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            reject('No file selected');
        }
    });
}

// Display predictions
function displayPredictions(predictions) {
    let predictionString = 'Predictions:<br>';
    predictions.forEach(prediction => {
        predictionString += `${prediction.className}: ${Math.round(prediction.probability * 100)}%<br>`;
    });
    predictionText.innerHTML = predictionString;
}


