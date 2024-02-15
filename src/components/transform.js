import React, { useEffect, useRef } from "react";
import { Transformer } from "react-konva";

function TransformerComponent({ selectedShapeID }) {
    const transformerRef = useRef(null);

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
    }, [selectedShapeID, transformerRef]);

    return (
        <Transformer
            ref={transformerRef}
            keepRatio={false}
            rotateAnchorOffset={25}
        />
    );
}

export default TransformerComponent