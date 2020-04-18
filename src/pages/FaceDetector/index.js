import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetect from "expo-face-detector";
import SmileFace from "../../components/SmileFace";
import SmileRepository from "../../services/smileRepository";
import { FlatList } from "react-native-gesture-handler";

export default function FaceDetector() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [sticker, setSticker] = useState("../assets/emojis/0001.png");
  const [stickers, setStickers] = useState([]);
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    _requestCameraPermission();
    _loadStickers();
  }, []);

  const _loadStickers = () => {
    setStickers(SmileRepository);
    setSticker(SmileRepository[0]);
  };

  const _requestCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
  };

  return (
    <View style={{ flex: 1 }}>
      {hasPermission && (
        <Camera
          ratio={"16:9"}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetect.Constants.Mode.fast,
            detectLandmarks: FaceDetect.Constants.Landmarks.all,
            runClassifications: FaceDetect.Constants.Classifications.none,
            tracking: true,
          }}
          style={{ flex: 1 }}
          type={type}
          autoFocus={true}
        ></Camera>
      )}

      {faces.map((face) => {
        return <SmileFace sticker={sticker} key={face.faceId} face={face} />;
      })}

      <FlatList
        style={{ position: "absolute", bottom: 10, width: "100%" }}
        data={stickers}
        horizontal={true}
        keyExtractor={(item) => item.faceId}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSticker(item);
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: item.url }}
            />
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}
