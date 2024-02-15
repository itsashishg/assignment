import React from "react";
import { Circle } from "react-konva";

function CircleShape({ x, y, name, onTransform }) {
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
        <Circle x={x} y={y} name={name} stroke="black" draggable radius={50} onDragEnd={handleChange}
            onTransformEnd={handleChange} />
    );
}

export default CircleShape;