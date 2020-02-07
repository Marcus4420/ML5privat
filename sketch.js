 // Classify Variable
  let classifier;
  let INFOBUTTON;

  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/TV5B6ZWS/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "Loading...";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(800, 400);
    // Create the video
    video = createCapture(VIDEO);
    video.size(300, 240);
    video.hide();
    flippedVideo = ml5.flipImage(video)
    // Begins classification
    classifyVideo();



    INFOBUTTON = createButton("Info");
    INFOBUTTON.position(170, 300);
    INFOBUTTON.size(64);
    INFOBUTTON.mousePressed(infopress);

  }

  function draw() {
    // Draw the video
    flippedVideo = ml5.flipImage(video)
    flippedVideo.remove();
    image(flippedVideo, 0, 0);
    infobox();

    //Vi definerer dyret, så vi kan arbejde videre med projektet udover machine learning delen.
    //Vi går over til variablen "animal" over "label" for at skille variablerne ad 
    if (label == "Kat") {
    } else if (label == "Papegøje") {
    } else if (label == "Hund") {
    } else if (label == "Marsvin") {
    } else if (label == "kanin") {
    }
  }


  
  // Get a prediction for the current video frame
  function classifyVideo() {
    classifier.classify(flippedVideo, gotResult);
  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    console.log(results[0]);
    label = results[0].label;
    // Classifiy again! - 2 second delay
    setTimeout(classifyVideo,2000);
  }


  function infopress() {
    CurrAni = animal;
    console.log(CurrAni);
    if (CurrAni == "Hund") {
    }
    if (CurrAni == "Kat") {

    }
    if (CurrAni == "Papegøje") {

    }
    if (CurrAni == "Marsvin") {

    }
    if (CurrAni == "Kanin") {

    }
  }

  function infobox() {
    document.getElementById("infokasse").innerHTML = label;
  }