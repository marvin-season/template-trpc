import {memo} from 'react';
import {BaseEdge, EdgeProps, getBezierPath} from 'reactflow';
import './index.css'; // Import the CSS file for animations

export const BezierEdge = memo(({
                                  id,
                                  sourceX,
                                  sourceY,
                                  targetX,
                                  targetY,
                                  selected,
                                }: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sourceX,
    sourceY,
    targetX: targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: 'none',
        }}
        markerEnd="url(#arrowhead)"
      />
      <path
        d={edgePath}
        className={'flowing-edge-path'}
        style={{
          stroke: '#2970FF',
          fill: 'none'
        }}
      />
    </>
  );
});

BezierEdge.displayName = 'SmoothEdge';
