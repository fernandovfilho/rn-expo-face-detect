import React from "react";
import { Image } from "react-native";

export default function SmileFace(props) {
  const faceSize = props.face.bounds.size.width * props.sticker.resizeScale;
  const facePositionTop = props.face.bounds.origin.y - 20;
  const facePositionLeft = props.face.bounds.origin.x;
  let rotateY = 0;

  return (
    <Image
      key={props.face.faceId}
      source={{
        uri: props.sticker.url,
      }}
      resizeMethod="scale"
      style={{
        position: "absolute",
        width: faceSize,
        height: faceSize,
        top: facePositionTop,
        left: facePositionLeft,
        transform: [
          { rotateZ: props.face.rollAngle + "deg" },
          { rotateY: rotateY + "deg" },
        ],
      }}
    />
  );
}
