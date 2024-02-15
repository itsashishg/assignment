import React, { useEffect, useRef } from "react";
import { Circle, Transformer } from "react-konva";

function TransformerComponent({ selectedShapeID, unSelectShape, onDelete, stageScale }) {
    const transformerRef = useRef(null);
    const deleteButton = useRef();

    const handleDelete = () => {
        unSelectShape(null);
        onDelete(transformerRef.current);
    };

    const checkNode = () => {
        const stage = transformerRef.current.getStage();
        const selectedNode = stage.findOne("." + selectedShapeID);
        if (selectedNode === transformerRef.current.node()) {
            return;
        }

        if (selectedNode) {
            transformerRef.current.attachTo(selectedNode);
        } else {
            transformerRef.current.detach();
        }
        transformerRef.current.getLayer().batchDraw();
    };

    useEffect(() => {
        checkNode();
    });

    return (
        <Transformer ref={transformerRef} keepRatio={false} rotateAnchorOffset={25}>
            <Circle radius={8} fill="red" ref={deleteButton} onClick={handleDelete} x={(transformerRef?.current?.width() ?? 1) * stageScale}></Circle>
        </Transformer>
    );
}

export default TransformerComponent