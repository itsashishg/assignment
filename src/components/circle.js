import React from "react";
import { Rect } from "react-konva";

function Circle({ x, y, width, height, fill, name, onTransform }) {
    const handleChange = (e) => {
        const shape = e.target;
        onTransform({
            x: shape.x(),
            y: shape.y(),
            width: shape.width() * shape.scaleX(),
            height: shape.height() * shape.scaleY(),
            rotation: shape.rotation(),
        });
    };

    return (
        <Circle x={x} y={y} stroke="black" draggable radius={50} />
    );
}

export default Circle;