import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef } from "react";
import { Layer, Stage } from 'react-konva';
import './App.css';
import Rectangle from './components/rectangle';
import TransformerComponent from './components/transform';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
// import Circle from './components/circle';


function getShapesData(type) {
  return [...Array(2)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    width: 100,
    height: 100,
    rotation: 0,
    fill: 'red',
    isDragging: false,
    name: type + i.toString()
  }));
}

function App() {
  const stageRef = useRef(null);
  const width = window.innerWidth;
  const height = 950;
  var [circle, setCircles] = useState(getShapesData('circle', 3));
  const [rectangles, setRectangles] = useState(getShapesData('rectangle'));
  const [selectedShapeID, setSelectedShapeID] = useState("");

  const handleStageMouseDown = (e) => {
    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
      setSelectedShapeID("");
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
      setSelectedShapeID(name);
    } else {
      setSelectedShapeID("");
    }
  };

  const handleChange = (index, newProps, type) => {
    setRectangles((prevRectangles) => {
      const updatedRectangles = [...prevRectangles];
      updatedRectangles[index] = {
        ...updatedRectangles[index],
        ...newProps,
      };
      return updatedRectangles;
    });
  };

  const [stage, setStage] = useState({ scale: 1, x: 0, y: 0 });

  const scaleRelativeToPoint = (point, increaseScale) => {
    const scaleBy = 1.02;
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: point.x / oldScale - stage.x() / oldScale,
      y: point.y / oldScale - stage.y() / oldScale
    };

    const newScale = increaseScale ? oldScale * scaleBy : oldScale / scaleBy;

    setStage({
      scale: newScale,
      x: (point.x / newScale - mousePointTo.x) * newScale,
      y: (point.y / newScale - mousePointTo.y) * newScale
    });
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    scaleRelativeToPoint(
      e.target.getStage().getPointerPosition(),
      e.evt.deltaY < 0
    );
  };

  function addNewCircle() {
    let temp = circle;
    temp.push({ id: temp.length + 1, x: 500, y: 500, rotation: 0, isDragging: false, fill: "#89b717" });
    circle = temp;
    console.log(temp);
    setCircles(temp);
  }

  function addNewRectangle() {
    console.log('addNewRectangle');
  }



  return (
    <>
      <div className='row py-2 m-0'>
        <div className='col-sm-4'>
          <span className='d-flex justify-content-evenly'>
            <span>
              <Button variant="outline-primary" onClick={() => { addNewCircle() }}>Add circle</Button>
            </span>
            <span>
              <Button variant="outline-primary" onClick={() => { addNewRectangle() }}>Add rectangle</Button>
            </span>
          </span>
        </div>
        <div className='col-sm-4'>
          Welcome
        </div>
      </div>
      <Stage width={width} height={height} onWheel={handleWheel} scaleX={stage.scale} scaleY={stage.scale} x={stage.x} y={stage.y} ref={stageRef} onMouseDown={handleStageMouseDown}>

        <Layer>
          {rectangles.map((rect, i) => (
            <Rectangle
              key={i}
              {...rect}
              onTransform={(newProps) => handleChange(i, newProps)}
            />
          ))}
          {/* {circle.map((circle, i) => (
          <Circle
            key={i}
            {...circle}
            onTransform={(newProps) => handleChange(i, newProps, 'circle')}
          />
        ))} */}
          <TransformerComponent selectedShapeID={selectedShapeID} />
        </Layer>
      </Stage>
    </>
  );
}
export default App;
