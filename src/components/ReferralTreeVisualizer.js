import React, { useEffect, useState } from 'react';
import { Tree } from 'react-d3-tree';
import axios from 'axios';

const ReferralTreeVisualizer = ({ userId }) => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await axios.get(`/api/users/tree/:userId${userId}`);
        const tree = response.data;
        
        // Convert the tree structure to the required format for react-d3-tree
        const formatTree = (node) => {
          if (!node) return null;
          return {
            name: node.userId,
            children: [
              node.left ? formatTree({ userId: node.left }) : null,
              node.right ? formatTree({ userId: node.right }) : null
            ].filter(Boolean),
          };
        };

        const formattedData = formatTree(tree);
        setTreeData(formattedData);
      } catch (error) {
        console.error('Error fetching referral tree:', error);
      }
    };

    fetchTreeData();
  }, [userId]);

  const treeStyles = {
    node: {
      circle: {
        fill: '#32a852',
        stroke: '#fff',
        strokeWidth: '2px',
      },
      name: {
        fill: '#fff',
        fontSize: '14px',
      },
    },
    links: {
      stroke: '#32a852',
      strokeWidth: '2px',
    },
  };

  if (!treeData) {
    return <div>user123
    ├── user456
    │   ├── user789
    │   └── user321
    ├── user654
    └── user987
        └── user432</div>;
  }

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Tree
        data={treeData}
        renderCustomNodeElement={(rd3tProps) => {
          const { nodeDatum } = rd3tProps;
          return (
            <g>
              <circle
                r="10"
                fill={treeStyles.node.circle.fill}
                stroke={treeStyles.node.circle.stroke}
                strokeWidth={treeStyles.node.circle.strokeWidth}
              />
              <text
                fill={treeStyles.node.name.fill}
                fontSize={treeStyles.node.name.fontSize}
                textAnchor="middle"
              >
                {nodeDatum.name}
              </text>
            </g>
          );
        }}
        styles={treeStyles}
        collapsible={false}
      />
    </div>
  );
};

export default ReferralTreeVisualizer;
