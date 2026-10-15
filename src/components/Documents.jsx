import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, UploadCloud, Mic } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function Documents() {
  const [files, setFiles] = useState([]);
  const [fileTexts, setFileTexts] = useState({});
  const [summaries, setSummaries] = useState({});
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingFile, setLoadingFile] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  /* ================= SPEECH SETUP ================= */

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.onerror = (event) => {
      console.log("Voice error:", event.error);
      setIsListening(false);
    };
  }, []);

  const startVoiceInput = () => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.log("Already listening...");
    }
  };

  /* ================= FILE HANDLING ================= */

  const handleFiles = async (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...fileArray]);

    for (const file of fileArray) {
      if (file.type === "application/pdf") {
        await extractPDFText(file);
      }
    }
  };

  const extractPDFText = async (file) => {
    setLoadingFile(file.name);

    const fileReader = new FileReader();

    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + " ";
      }

      if (!fullText.trim()) {
        fullText = "No readable text found (maybe scanned image PDF).";
      }

      setFileTexts((prev) => ({
        ...prev,
        [file.name]: fullText,
      }));

      setLoadingFile(null);
    };

    fileReader.readAsArrayBuffer(file);
  };

  /* ================= SUMMARY ================= */

  const summarizeFile = (fileName) => {
    const text = fileTexts[fileName];
    if (!text) return;

    const summary = text.split(" ").slice(0, 120).join(" ") + "...";

    setSummaries((prev) => ({
      ...prev,
      [fileName]: summary,
    }));
  };

  /* ================= Q&A ENGINE ================= */

  const generateAnswer = () => {
    const combinedText = Object.values(fileTexts).join(" ");

    if (!combinedText.trim()) {
      setAnswer("⚠ No PDF text extracted yet.");
      return;
    }

    if (!question.trim()) {
      setAnswer("⚠ Please ask a question.");
      return;
    }

    const cleanText = combinedText
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .toLowerCase();

    const cleanQuestion = question.toLowerCase();
    const chunks = cleanText.split(". ");

    const scoredChunks = chunks.map((chunk) => {
      let score = 0;
      cleanQuestion.split(" ").forEach((word) => {
        if (chunk.includes(word)) score++;
      });
      return { chunk, score };
    });

    scoredChunks.sort((a, b) => b.score - a.score);

    const bestMatches = scoredChunks
      .filter((item) => item.score > 0)
      .slice(0, 3);

    if (bestMatches.length === 0) {
      setAnswer("🤖 Could not find exact match, but document text is available.");
      return;
    }

    const formatted = bestMatches
      .map((item) => `• ${item.chunk.trim()}`)
      .join("\n\n");

    setAnswer(`🧠 Relevant information:\n\n${formatted}`);
  };

  /* ================= UI ================= */

  return (
    <div className="documents-container">

      <motion.div className="upload-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <UploadCloud size={40} />
        <h2>AI PDF Intelligence</h2>
        <button
          className="primary-btn"
          onClick={() => fileInputRef.current.click()}
        >
          Upload PDF
        </button>

        <input
          type="file"
          accept="application/pdf"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </motion.div>

      <div className="file-grid">
        {files.map((file, index) => (
          <div key={index} className="doc-card">
            <div className="doc-header">
              <FileText size={18} />
              <div>
                <h4>{file.name}</h4>
                <span>{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            </div>

            <button
              className="secondary-btn"
              onClick={() => summarizeFile(file.name)}
              disabled={loadingFile === file.name}
            >
              {loadingFile === file.name ? "Extracting..." : "Summarize"}
            </button>

            {summaries[file.name] && (
              <div className="doc-summary">
                {summaries[file.name]}
              </div>
            )}
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <div className="doc-qa">
          <h3>Ask About Your PDF</h3>

          <div className="qa-input">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask something about the document..."
            />

            <button onClick={startVoiceInput}>
              {isListening ? "Listening..." : "🎤 Speak"}
            </button>

            <button onClick={generateAnswer}>
              Ask
            </button>
          </div>

          {answer && (
            <div className="doc-answer">
              <pre style={{ whiteSpace: "pre-wrap" }}>{answer}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Documents;