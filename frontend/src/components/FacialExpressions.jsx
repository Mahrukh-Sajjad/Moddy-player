import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import "./FacialExpressions.css";
import axios from "axios";
export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };
  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    let mostProabaleExpression = 0;
    let _expression = " ";
    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }
    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProabaleExpression) {
        mostProabaleExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }

    axios
      .get(`http://localhost:3000/songs?mood=${_expression}`)
      .then((response) => {
        console.log(response.data);
        setSongs(response.data.songs);
      });
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);
  return (
    <div className="mood-element">
      <video ref={videoRef} autoPlay muted className="user-video-feed" />
      <div className="right">
        <p>
          Our app detects your facial expressions in real-time and suggests
          songs that match your mood. Whether you’re happy, sad, or relaxed, it
          curates a playlist that resonates with your emotions for a more
          personalized music experience.
        </p>
        <button onClick={detectMood}>Detect Mood</button>
      </div>
    </div>
  );
}
