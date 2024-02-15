import React, { useEffect, useRef } from "react";
import { Transformer } from "react-konva";

function TransformerComponent({ selectedShapeName }) {
    const transformerRef = useRef(null);

    const checkNode = () => {
        const stage = transformerRef.current.getStage();
        const selectedNode = stage.findOne("." + selectedShapeName);
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
    }, [selectedShapeName, transformerRef]);

    return (
        <Transformer
            ref={transformerRef}
            keepRatio={false}
            rotateAnchorOffset={25}
        />
    );
}

export default TransformerComponent