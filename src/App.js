import React from 'react';
import { Canvas, extend } from '@react-three/fiber';
import DatGui, { DatColor, DatNumber, DatSelect } from "react-dat-gui";
import { Text } from 'troika-three-text';

import "react-dat-gui/dist/index.css";
import './App.css';

extend({ Text });
const text = "There are many variations of passages of Lorem Ipsum available.";

export default function App() {
  const [rotation, setRotation] = React.useState([0, 0, 0]);
  const [opts, setOpts] = React.useState({
    font: "Philosopher",
    fontSize: 30,
    color: "#99ccff",
    maxWidth: 500,
    lineHeight: 1,
    letterSpacing: 0,
    materialType: "MeshPhongMaterial"
  });

  const onMouseMove = e => {
    setRotation([
      ((e.clientY / e.target.offsetHeight - 0.5) * -Math.PI) / 8,
      ((e.clientX / e.target.offsetWidth - 0.5) * -Math.PI) / 8,
      0
    ]);
  };

  return (
    <div 
      onMouseMove={onMouseMove}
      className="App">
      <Canvas
        camera={{ fov: 75, position: [0, 0, 7] }}
        pixelRatio={window.devicePixelRatio}
      >
        <text
          position-z={-180}
          rotation={rotation}
          {...opts}
          text={text}
          anchorX="center"
          anchorY="middle"
        >
          {opts.materialType === "MeshPhongMaterial" ? (
            <meshPhongMaterial attach="material" color={opts.color} />
          ) : null}
        </text>

        <pointLight position={[-100, 0, -160]} />
      </Canvas>

      <DatGui data={opts} onUpdate={setOpts}>
        <DatNumber path="fontSize" min={1} max={50} step={1} />
        <DatNumber path="maxWidth" min={50} max={500} step={1} />
        <DatNumber path="lineHeight" min={0.5} max={2} step={0.1} />
        <DatNumber path="letterSpacing" min={-0.1} max={0.5} step={0.01} />
        <DatSelect
          path="textAlign"
          options={["left", "center", "right", "justify"]}
        />
        <DatSelect
          path="materialType"
          label="material"
          options={["MeshBasicMaterial", "MeshPhongMaterial"]}
        />
        <DatColor path="color" />
      </DatGui>
    </div>
  )
}