import React from "react";
import { Rect } from "react-konva";

function Rectangle({ x, y, width, height, fill, name, onTransform }) {
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
        <Rect x={x} y={y} width={width} height={height} scaleX={1} scaleY={1} fill={fill} name={name} onDragEnd={handleChange}
            onTransformEnd={handleChange} draggable
        />
    );
}

export default Rectangle;