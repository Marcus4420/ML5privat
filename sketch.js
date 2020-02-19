KatInfo = "Tamkatten (Felis catus[1][2] eller Felis silvestris catus[3]) er et lille, tæmmet, kødædende pattedyr oftest med pels. Den kaldes huskat eller bare kat, når der ikke er grund til at skelne den fra andre kattedyr. Katten er værdsat af mennesker for dens selskab og evne til at jage mus og rotter. Mange huskatte bliver op mod 20 år gamle." 
HundInfo = "Tamhunden (Canis lupus familiaris på latin) er det husdyr, som tidligst blev tæmmet af mennesket, og som derfor har den længste historie til fælles med os. Den har gennem historien været brugt til jagt, som vagthund, krigshund (eks. anti-tank-hunde), sporhund, redningshund, eller som følgesvend. Desuden som servicehund for blinde og handicappede, som politi- og redningshund, som narkohund eller som terapihund. Hunde kan også lugte sig frem til kræftsvulster,[2] termitangreb og forudsige epilepsianfald.[3]"
PapeInfo = "Papegøjer er en orden af fugle, på latin kaldet Psittaciformes. Herunder findes 3 familier: Orden: Papegøjer Familie: Kakaduer Familie: Egentlige papegøjer eks.: Alexanderparakit, Ara, Dværgpapegøje, Undulat Familie: Uglepapegøjer eks.: Kakapo, Kea, Kaka Inden for disse 3 familier findes over 390 forskellige arter."
KaninInfo = "Vildkanin eller europæisk vildkanin (Oryctolagus cuniculus) hører ligesom hare til ordenen støttetandede. Det betyder, at de bag de øverste fortænder har to ekstra tænder. Vildkanin har kortere bagben end hare, men minder ellers meget om denne. Kaninens ører er forholdsvis korte. De når kun ud til snudespidsen, mens harens når 2-3 centimeter udenfor. Vildkaniner vejer 1½-2 kg."
MarsvinInfo = "Marsvin er flokdyr og bør dermed aldrig leve i ensomhed, men derimod med an artsfælle. Det er uhensigtsmæssigt at have et fertil hanmarsvin og et fertilt hunmarsvin gående permanent sammen, da hunmarsvinet straks går i brunst og dermed kan være drægtig med det samme igen efter fødsel, hvilket er til stor belastning for hunnen. Derfor er det bedre at have 2 marsvin af samme køn - eller alternativt en kasteret han og en eller flere hunner. Hanner kan sagtens gå sammen, hvis man sørger for, der er en klar størrelses- og aldersmæssigt forskel, så som 4-8 uger gammel hanunge og en ældre han +5 måneder."
TempInfo = "Her kommer fakta om det valgte dyr til at ses. Tryk på 'info' for at komme igang."
 // Classify Variable
  let classifier;
  let INFOBUTTON;
  let kamera;

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
    video.size(300, 250);
    video.hide();
    flippedVideo = ml5.flipImage(video)
    // Begins classification
    classifyVideo();
    document.getElementById("infokasse").innerHTML = TempInfo   ;



    INFOBUTTON = createButton("Info");
    INFOBUTTON.position(170, 400);
    INFOBUTTON.size(64);
    INFOBUTTON.mousePressed(infopress);

  }

  function draw() {
    // Draw the video
    fill(122);
    rect(0,0,320,270,10);
    flippedVideo = ml5.flipImage(video)
    flippedVideo.remove();
    image(flippedVideo, 10, 10);
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
    setTimeout(classifyVideo,1000);
  }

  function infopress() {
    if (label == "Papegøje") {
    document.getElementById("infokasse").innerHTML = PapeInfo;
  }
  else if (label == "Kat") {
    document.getElementById("infokasse").innerHTML = KatInfo;
  }
  else if (label == "Hund") {
    document.getElementById("infokasse").innerHTML = HundInfo;
  }
  else if (label == "Marsvin") {
    document.getElementById("infokasse").innerHTML = MarsvinInfo;
  }
  else if (label == "Kanin") {
    document.getElementById("infokasse").innerHTML = KaninInfo;
  }
}