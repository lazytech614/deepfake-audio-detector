"use client";

import { useState, useRef, useCallback } from "react";
import styles from "./audio-detector.module.css";

type PredictionResult = {
  prediction: "Fake" | "Real";
  confidence: number;
  real_probability: number;
  fake_probability: number;
};

type Status = "idle" | "loading" | "success" | "error";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function AudioDetector() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyze = useCallback(async (file: File) => {
    if (!file.name.endsWith(".wav") && file.type !== "audio/wav") {
      setStatus("error");
      setErrorMsg("Only WAV files are supported.");
      return;
    }

    setFileName(file.name);
    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Server error" }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data: PredictionResult = await res.json();
      setResult(data);
      setStatus("success");
    } catch (e: unknown) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Could not reach backend.");
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) analyze(file);
  }, [analyze]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) analyze(file);
  };

  const reset = () => {
    setStatus("idle");
    setFileName(null);
    setResult(null);
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isFake = result?.prediction === "Fake";
  const filledBars = result ? Math.round((result.confidence / 100) * 20) : 0;

  return (
    <div className={styles.terminal}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerDots}>
          <span className={styles.dot} style={{ background: "#ff5f57" }} />
          <span className={styles.dot} style={{ background: "#febc2e" }} />
          <span className={styles.dot} style={{ background: "#28c840" }} />
        </div>
        <span className={styles.headerTitle}>deepfake-audio-detector</span>
      </div>

      <div className={styles.body}>
        {/* Title block */}
        <div className={styles.block}>
          <div className={styles.blockInner}>
            <span className={styles.prompt}>$</span>
            <span className={styles.cmd}>deepfake_detector</span>
            <span className={styles.version}>v1.0</span>
          </div>
          <div className={styles.divider} />
        </div>

        {/* Drop zone */}
        <div
          className={`${styles.block} ${styles.dropBlock} ${dragging ? styles.dragging : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload WAV file"
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".wav,audio/wav"
            onChange={handleChange}
            className={styles.hiddenInput}
            aria-hidden="true"
          />
          <div className={styles.dropIcon}>▲</div>
          {fileName ? (
            <div className={styles.dropText}>
              <span className={styles.prompt}>&gt;</span> {fileName}
            </div>
          ) : (
            <div className={styles.dropText}>
              Drop WAV file here
              <span className={styles.textDim}> or click to browse</span>
            </div>
          )}
        </div>

        {/* Result block */}
        <div className={styles.block}>
          {status === "idle" && (
            <div className={styles.idle}>Awaiting input...</div>
          )}

          {status === "loading" && (
            <div className={styles.loading}>
              <span className={styles.spinner}>⠋</span> Analyzing audio...
            </div>
          )}

          {status === "error" && (
            <div className={styles.error}>
              <div><span className={styles.prompt}>&gt;</span> ERROR: {errorMsg}</div>
              <button className={styles.resetBtn} onClick={reset}>[ retry ]</button>
            </div>
          )}

          {status === "success" && result && (
            <div className={styles.result}>
              <div
                className={styles.predictionLabel}
                style={{ color: isFake ? "var(--fake)" : "var(--real)" }}
              >
                <span className={styles.prompt}>&gt;</span> Prediction:{" "}
                <strong>{result.prediction.toUpperCase()}</strong>
              </div>

              <div className={styles.confidenceLine}>
                <span className={styles.prompt}>&gt;</span> Confidence: {result.confidence}%
              </div>

              <div className={styles.probsLine}>
                <span className={styles.textMuted}>real:</span> {result.real_probability}%{"  "}
                <span className={styles.textMuted}>fake:</span> {result.fake_probability}%
              </div>

              <div className={styles.barWrap}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.barSeg}
                    style={{
                      background: i < filledBars
                        ? isFake ? "var(--fake)" : "var(--real)"
                        : "var(--border-dim)",
                    }}
                  />
                ))}
              </div>

              <button className={styles.resetBtn} onClick={reset}>[ analyze another ]</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}