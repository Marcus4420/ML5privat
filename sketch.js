 // Classify Variable
  let classifier;
  let animal;
  let INFOBUTTON;
  let CurrAni;
  let txtbox;
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
    createCanvas(800, 270);
    // Create the video
    video = createCapture(VIDEO);
    video.size(300, 240);
    video.hide();
    flippedVideo = ml5.flipImage(video)
    // Begins classification

    classifyVideo();
    INFOBUTTON = createButton("Info");
    INFOBUTTON.position(150, 300);
    INFOBUTTON.size(64);
    INFOBUTTON.mousePressed(infopress);

  }

  function draw() {
    background(255);
    // Draw the video
    flippedVideo = ml5.flipImage(video)
    image(flippedVideo, 0, 0);
    // Draw the label
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text(label, 150, height - 5);


    //Vi definerer dyret, så vi kan arbejde videre med projektet udover machine learning delen.
    //Vi går over til variablen "animal" over "label" for at skille variablerne ad 
    if (label == "Kat") {
      console.log("Dette er en kat <3");
      animal = "Kat";
    } else if (label == "Papegøje") {
      console.log("Dette er en papegøje <3");
      animal = "Papegøje";
    } else if (label == "Hund") {
      console.log("Dette er en hund <3");
      animal = "Hund";
    }
    else if (label == "Marsvin") {
      console.log("Dette er en marsvin <3");
      animal = "Marsvin";
    }
    else if (label == "kanin") {
      console.log("Dette er en kanin <3");
      animal = "Kanin";
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
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again! - 2 second delay
    setTimeout(classifyVideo,2000);
  }


  function infopress() {
    CurrAni = animal;
    console.log(CurrAni);
    if (CurrAni == "Hund") {
      fill(0);
      text(txtbox, 400, 200);
    }
  }