//Const. af teksten til infoboksen
const KatInfo = "Tamkatten (Felis catus eller Felis silvestris catus) er et lille, tæmmet, kødædende pattedyr oftest med pels. Den kaldes huskat eller bare kat, når der ikke er grund til at skelne den fra andre kattedyr. Katten er værdsat af mennesker for dens selskab og evne til at jage mus og rotter. Mange huskatte bliver op mod 20 år gamle." 
const HundInfo = "Tamhunden (Canis lupus familiaris på latin) er det husdyr, som tidligst blev tæmmet af mennesket, og som derfor har den længste historie til fælles med os. Den har gennem historien været brugt til jagt, som vagthund, krigshund (eks. anti-tank-hunde), sporhund, redningshund, eller som følgesvend. Desuden som servicehund for blinde og handicappede, som politi- og redningshund, som narkohund eller som terapihund. Hunde kan også lugte sig frem til kræftsvulster, termitangreb og forudsige epilepsianfald."
const PapeInfo = "Papegøjer er en orden af fugle, på latin kaldet Psittaciformes. Herunder findes 3 familier: Orden: Papegøjer Familie: Kakaduer Familie: Egentlige papegøjer eks.: Alexanderparakit, Ara, Dværgpapegøje, Undulat Familie: Uglepapegøjer eks.: Kakapo, Kea, Kaka Inden for disse 3 familier findes over 390 forskellige arter."
const KaninInfo = "Vildkanin eller europæisk vildkanin (Oryctolagus cuniculus) hører ligesom hare til ordenen støttetandede. Det betyder, at de bag de øverste fortænder har to ekstra tænder. Vildkanin har kortere bagben end hare, men minder ellers meget om denne. Kaninens ører er forholdsvis korte. De når kun ud til snudespidsen, mens harens når 2-3 centimeter udenfor. Vildkaniner vejer 1½-2 kg."
const MarsvinInfo = "Marsvin er flokdyr og bør dermed aldrig leve i ensomhed, men derimod med an artsfælle. Det er uhensigtsmæssigt at have et fertil hanmarsvin og et fertilt hunmarsvin gående permanent sammen, da hunmarsvinet straks går i brunst og dermed kan være drægtig med det samme igen efter fødsel, hvilket er til stor belastning for hunnen. Derfor er det bedre at have 2 marsvin af samme køn - eller alternativt en kasteret han og en eller flere hunner. Hanner kan sagtens gå sammen, hvis man sørger for, der er en klar størrelses- og aldersmæssigt forskel, så som 4-8 uger gammel hanunge og en ældre han +5 måneder."
const TempInfo = "Her kommer fakta om det valgte dyr til at ses. Tryk på 'info' for at komme igang."
 // Interaktive elementer.
  let classifier;
  let INFOBUTTON;
  let kamera;

  // Model URL
  const imageModelURL = 'https://teachablemachine.withgoogle.com/models/TV5B6ZWS/';
  
  // Video setup
  let video;
  let flippedVideo;
  // Label for classifieren - Starter som Loading så længe den loader.
  let label = "Loading...";

  // Loader den trænede model inden den kan starte.
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(800, 400);
    // Starter video
    video = createCapture(VIDEO);
    video.size(300, 250);
    video.hide();
    flippedVideo = ml5.flipImage(video)
    // Starter klassifikation
    classifyVideo();

    //Håndterer infoboks
    document.getElementById("infokasse").innerHTML = TempInfo;
    INFOBUTTON = createButton("Info");
    INFOBUTTON.position(200, 400);
    INFOBUTTON.size(64);
    INFOBUTTON.mousePressed(infopress);

  }

  function draw() {
    // Draw the video + baggrundskasse
    fill(122);
    rect(0,0,320,270,10);
    flippedVideo = ml5.flipImage(video)
    flippedVideo.remove();
    image(flippedVideo, 10, 10);
  }


  
  // Gætte funktion
  function classifyVideo() {
    classifier.classify(flippedVideo, gotResult);
  }

  // Vores resultat
  function gotResult(error, results) {
    // Hvis der nu er en fejl
    if (error) {
      console.error(error);
      return;
    }
    //Håndterer result
    console.log(results[0]);
    label = results[0].label;
    // Gætter igen - 1 sekund imellem.
    setTimeout(classifyVideo,1000);
  }


  //Håndterer når der trykkes på "infobutton"
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