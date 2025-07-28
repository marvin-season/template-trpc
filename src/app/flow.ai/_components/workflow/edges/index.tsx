import { memo, useCallback, useState } from 'react';
import type { EdgeProps } from 'reactflow';
import { BaseEdge, Position, getBezierPath } from 'reactflow';

export const CustomEdge = memo(({
    id,
    data,
    source,
    sourceHandleId,
    target,
    targetHandleId,
    sourceX,
    sourceY,
    targetX,
    targetY,
    selected,
}: EdgeProps) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX: sourceX - 8,
        sourceY,
        sourcePosition: Position.Right,
        targetX: targetX + 8,
        targetY,
        targetPosition: Position.Left,
        curvature: 0.16,
    });

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                style={{
                    stroke: selected || data?._connectedNodeIsHovering || data?._runned ? '#2970FF' : '#D0D5DD',
                    strokeWidth: 2,
                }}
            />
        </>
    );
});

CustomEdge.displayName = 'CustomEdge'
