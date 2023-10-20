const microphone = document.getElementById('microphone');
const microphoneCircle = document.getElementById('microphone-circle');
const microphoneHead = document.getElementById('microphone-head');
const translationResult = document.getElementById('translation-result');
const translatedSpeech = document.getElementById('translated-speech');
let isMicrophoneOn = false;

// Variables para el reconocimiento de voz y traducción
let recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES'; // Establece el idioma del reconocimiento
recognition.continuous = true; // Reconocimiento de voz continuo
let isTranslating = false; // Indica si se está traduciendo actualmente

microphone.addEventListener('click', () => {
    if (!isMicrophoneOn) {
        isMicrophoneOn = true;
        microphoneCircle.style.backgroundColor = '#00ff00'; // Verde para indicar que está encendido

        recognition.start();

        recognition.onresult = (event) => {
            let speech = event.results[event.results.length - 1][0].transcript;
            if (!isTranslating) {
                isTranslating = true;
                translateSpeech(speech);
            }
        };
    } else {
        isMicrophoneOn = false;
        microphoneCircle.style.backgroundColor = '#ff0000'; // Rojo para indicar que está apagado
        isTranslating = false;
        recognition.stop();
        translationResult.style.display = 'none'; // Oculta el resultado de la traducción
    }
});
 // Reemplaza la función translateSpeech
 function translateSpeech(speech) {
    const targetLanguage = 'en'; // Idioma de destino (en este caso, inglés)
    const googleTranslateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURI(speech)}`;

    fetch(googleTranslateUrl)
        .then(response => response.json())
        .then(data => {
            const translatedText = data[0][0][0];
            translatedSpeech.textContent = translatedText;
            translationResult.style.display = 'block'; // Muestra el resultado de la traducción
            isTranslating = false;

            // Llama a la función para hablar la traducción
            speakTranslation(translatedText);
        })
        .catch(error => {
            console.error('Error en la traducción:', error);
            isTranslating = false;
        });
    }