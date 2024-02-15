import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef } from "react";
import { Layer, Stage } from 'react-konva';
import './App.css';
import Rectangle from './components/rectangle';
import TransformerComponent from './components/transform';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import CircleShape from './components/circle';

function getShapesData(type) {
  return [...Array(2)].map((_, i) => ({
    id: i.toString(), x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, width: 100, height: 100, rotation: 0, fill: 'red', isDragging: false, name: type + i.toString()
  }));
}

function App() {
  const stageRef = useRef(null);
  const width = 1850;
  const height = 750;
  const [circle, setCircles] = useState(getShapesData('circle'));
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
    const findSelected = [...rectangles,...circle].find((r) => r.name === name);

    if (findSelected) {
      setSelectedShapeID(name);
    } else {
      setSelectedShapeID("");
    }
  };

  const handleChange = (index, newProps, type) => {
    if (type === 'rectangle') {
      setRectangles((prevRectangles) => {
        const updatedRectangles = [...prevRectangles];
        updatedRectangles[index] = {
          ...updatedRectangles[index],
          ...newProps,
        };
        return updatedRectangles;
      });
    } else {
      setCircles((prevCircle) => {
        const updatedCircles = [...prevCircle];
        updatedCircles[index] = {
          ...updatedCircles[index],
          ...newProps,
        };
        return updatedCircles;
      });
    }
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
    temp.push({ id: temp.length + 1, x: 500, y: 500, rotation: 0, isDragging: false, fill: "#89b717", name: temp.length + 1 });
    setCircles(temp);
  }

  function addNewRectangle() {
    let temp = rectangles;
    temp.push({
      x: 100, y: 100, width: 100, height: 100, fill: "red", name: 'rectangle' + rectangles.length + 1, id: rectangles.length + 1
    });
    setRectangles(temp);
  }



  return (
    <>
      <div className='row py-2 m-0'>
        <div className='col-sm-4'>
          <span className='d-flex justify-content-evenly h-100 align-items-center'>
            <span>
              <Button variant="outline-primary" onClick={() => { addNewCircle() }}>Add circle</Button>
            </span>
            <span>
              <Button variant="outline-primary" onClick={() => { addNewRectangle() }}>Add rectangle</Button>
            </span>
          </span>
        </div>
        <div className='col-sm-8 d-flex flex-column'>
          <span className='h4'>
            Welcome
          </span>
          <span>
            <span>Usage guide</span>
            <ol>
              <li>scroll in and out to change zoom of canvas</li>
              <li>click on add buttons to add new shaped</li>
              <li>click on shapes to rotate/resize them</li>
              <li>drag any shape to change it's location</li>
            </ol>
          </span>
        </div>
      </div>
      <div className='canvas-border'>
        <Stage width={width} height={height} onWheel={handleWheel} scaleX={stage.scale} scaleY={stage.scale} x={stage.x} y={stage.y} ref={stageRef} onMouseDown={handleStageMouseDown}>

          <Layer>
            {rectangles.map((rect, i) => (
              <Rectangle
                key={i}
                {...rect}
                onTransform={(newProps) => handleChange(i, newProps, 'rectangle')}
              />
            ))}
            {circle.map((circle, i) => (
              <CircleShape
                key={i}
                {...circle}
                onTransform={(newProps) => handleChange(i, newProps, 'circle')}
              />
            ))}
            <TransformerComponent selectedShapeID={selectedShapeID} />
          </Layer>
        </Stage>
      </div>
    </>
  );
}
export default App;
