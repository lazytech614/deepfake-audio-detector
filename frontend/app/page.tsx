import AudioDetector from "@/components/audio-detector";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <AudioDetector />
    </main>
  );
}