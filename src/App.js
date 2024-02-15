import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Layer, Stage } from 'react-konva';
import './App.css';
import Rectangle from './components/rectangle';
import TransformerComponent from './components/transform';


function App() {
  const [rectangles, setRectangles] = useState([
    { x: 10, y: 10, width: 100, height: 100, fill: "red", name: "rect1" },
    { x: 150, y: 150, width: 100, height: 100, fill: "green", name: "rect2" },
  ]);
  const [selectedShapeName, setSelectedShapeName] = useState("");

  const handleStageMouseDown = (e) => {
    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
      setSelectedShapeName("");
      return;
    }

    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = e.target.name();
    const rect = rectangles.find((r) => r.name === name);
    if (rect) {
      setSelectedShapeName(name);
    } else {
      setSelectedShapeName("");
    }
  };

  const handleRectChange = (index, newProps) => {
    setRectangles((prevRectangles) => {
      const updatedRectangles = [...prevRectangles];
      updatedRectangles[index] = {
        ...updatedRectangles[index],
        ...newProps,
      };
      return updatedRectangles;
    });
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleStageMouseDown}
    >
      <Layer>
        {rectangles.map((rect, i) => (
          <Rectangle
            key={i}
            {...rect}
            onTransform={(newProps) => handleRectChange(i, newProps)}
          />
        ))}
        <TransformerComponent selectedShapeName={selectedShapeName} />
      </Layer>
    </Stage>
  );
}
export default App;
