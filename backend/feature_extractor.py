import librosa
import numpy as np

def extract_features(audio_path):
    """
    Extract 44 audio features from a WAV file.

    Features:
    - 13 MFCC means
    - 13 MFCC stds
    - ZCR mean + std
    - Spectral Centroid mean + std
    - Spectral Bandwidth mean + std
    - 12 Chroma means

    Total = 44 features
    """

    try:
        # Load audio
        audio, sr = librosa.load(audio_path, sr=None)

        # -------------------------
        # MFCC
        # -------------------------
        mfccs = librosa.feature.mfcc(
            y=audio,
            sr=sr,
            n_mfcc=13
        )

        mfcc_mean = np.mean(mfccs, axis=1)
        mfcc_std = np.std(mfccs, axis=1)

        mfcc_features = np.concatenate([
            mfcc_mean,
            mfcc_std
        ])

        # -------------------------
        # Zero Crossing Rate
        # -------------------------
        zcr = librosa.feature.zero_crossing_rate(audio)

        zcr_features = np.array([
            np.mean(zcr),
            np.std(zcr)
        ])

        # -------------------------
        # Spectral Centroid
        # -------------------------
        centroid = librosa.feature.spectral_centroid(
            y=audio,
            sr=sr
        )

        centroid_features = np.array([
            np.mean(centroid),
            np.std(centroid)
        ])

        # -------------------------
        # Spectral Bandwidth
        # -------------------------
        bandwidth = librosa.feature.spectral_bandwidth(
            y=audio,
            sr=sr
        )

        bandwidth_features = np.array([
            np.mean(bandwidth),
            np.std(bandwidth)
        ])

        # -------------------------
        # Chroma
        # -------------------------
        chroma = librosa.feature.chroma_stft(
            y=audio,
            sr=sr
        )

        chroma_mean = np.mean(
            chroma,
            axis=1
        )

        # -------------------------
        # Final Feature Vector
        # -------------------------
        feature_vector = np.concatenate([
            mfcc_features,        # 26
            zcr_features,         # 2
            centroid_features,    # 2
            bandwidth_features,   # 2
            chroma_mean           # 12
        ])

        return feature_vector

    except Exception as e:
        print(f"Error processing {audio_path}: {e}")

        # Return zeros so pipeline doesn't crash
        return np.zeros(44)