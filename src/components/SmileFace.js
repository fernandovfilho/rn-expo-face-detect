import React from "react";
import { Image } from "react-native";
import faceImg from "../assets/face.png";

export default function SmileFace(props) {
  const faceSize = props.face.bounds.size.width - 35;
  const facePositionTop = props.face.bounds.origin.y - 10;
  const facePositionLeft = props.face.bounds.origin.x + 15;
  let rotateY = 0;

  let img = faceImg;

  return (
    <Image
      source={img}
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
