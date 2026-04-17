import { useContext, useRef, useState } from "react";
import ai from "../assets/ai.avif";
import { shopdatacontext } from "../context/contexts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Ai = () => {

  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  let navigate = useNavigate();
  let { showsearch, setShowsearch } = useContext(shopdatacontext);

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const startListening = () => {
    const API = typeof window !== "undefined"
      ? (window.SpeechRecognition || window.webkitSpeechRecognition)
      : null;

    if (!API) {
      toast.error("Voice recognition is not supported in this browser");
      return;
    }

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (_) {}
    }

    const recognition = new API();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase();

      if (
        transcript.includes("search") &&
        transcript.includes("open") &&
        !showsearch
      ) {
        speak("opening search");
        setTimeout(() => { setShowsearch(true); navigate("/collection"); }, 0);
      }
      else if (
        transcript.includes("search") &&
        transcript.includes("close") &&
        showsearch
      ) {
        speak("closing search");
        setTimeout(() => { setShowsearch(false); }, 0);
      }
      else if (
        transcript.includes("collection") ||
        transcript.includes("collections") ||
        transcript.includes("product") ||
        transcript.includes("products")
      ) {
        speak("opening collection page");
        setTimeout(() => { navigate("/collection"); }, 0);
      }
      else if (
        transcript.includes("about") ||
        transcript.includes("about page")
      ) {
        speak("opening about page");
        setTimeout(() => { setShowsearch(false); navigate("/about"); }, 0);
      }
      else if (
        transcript.includes("home") ||
        transcript.includes("home page")
      ) {
        speak("opening home page");
        setTimeout(() => { setShowsearch(false); navigate("/"); }, 0);
      }
      else if (transcript.includes("cart")) {
        speak("opening cart page");
        setTimeout(() => { setShowsearch(false); navigate("/cart"); }, 0);
      }
      else if (
        transcript.includes("contact") ||
        transcript.includes("contact page")
      ) {
        speak("opening contact page");
        setTimeout(() => { setShowsearch(false); navigate("/contact"); }, 0);
      }
      else if (
        transcript.includes("order") ||
        transcript.includes("orders") ||
        transcript.includes("my orders")
      ) {
        speak("opening orders page");
        setTimeout(() => { setShowsearch(false); navigate("/order"); }, 0);
      }
      else {
        toast.error("speak again");
      }
    };

    recognition.onend = () => setListening(false);

    recognition.onerror = (e) => {
      setListening(false);
      if (e.error === "not-allowed" || e.error === "permission-denied") {
        toast.error("Microphone permission denied — please allow mic access in your browser settings");
      } else if (e.error === "aborted" || e.error === "no-speech") {
      } else {
        toast.error(`Voice error: ${e.error}`);
      }
    };

    try {
      setListening(true);
      recognition.start();
    } catch (err) {
      setListening(false);
      toast.error("Could not start microphone — try again");
    }
  };

  return (
    <div
      className={`aiButton${listening ? " aiButton--listening" : ""}`}
      onClick={startListening}
      role="button"
      tabIndex={0}
      aria-label={listening ? "Listening… speak now" : "Open voice assistant"}
      aria-pressed={listening}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!listening) startListening();
        }
      }}
    >
      <span className="aiButton__ring" aria-hidden />
      <span className="aiButton__ring aiButton__ring--2" aria-hidden />
      <img src={ai} alt="" className="aiButton__img" />
    </div>
  );
};

export default Ai;
