import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetect from "expo-face-detector";
import SmileFace from "../../components/SmileFace";

export default function FaceDetector() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    _requestCameraPermission();
  }, []);

  const _requestCameraPermission = async () => {
    await Camera.requestPermissionsAsync();
  };

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ratio={"16:9"}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetect.Constants.Mode.fast,
          detectLandmarks: FaceDetect.Constants.Landmarks.all,
          runClassifications: FaceDetect.Constants.Classifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
        style={{ flex: 1 }}
        type={type}
        autoFocus={true}
      ></Camera>

      {faces.map((face) => {
        return <SmileFace key={face.faceId} face={face} />;
      })}
    </View>
  );
}
