
import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  Connection,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card } from '@/components/ui/card';
import { useGraphData } from '@/hooks/useGraphData';
import { PatientNode } from './nodes/PatientNode';
import { StaffNode } from './nodes/StaffNode';
import { DepartmentNode } from './nodes/DepartmentNode';
import { ResourceNode } from './nodes/ResourceNode';

const nodeTypes = {
  patient: PatientNode,
  staff: StaffNode,
  department: DepartmentNode,
  resource: ResourceNode,
};

interface KnowledgeGraphViewerProps {
  filters: {
    entityTypes: string[];
    department: string;
    timeRange: string;
  };
  selectedNode: any;
  onNodeSelect: (node: any) => void;
}

export const KnowledgeGraphViewer = ({ filters, selectedNode, onNodeSelect }: KnowledgeGraphViewerProps) => {
  const { nodes: graphNodes, edges: graphEdges, loading } = useGraphData(filters);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (graphNodes && graphEdges) {
      setNodes(graphNodes);
      setEdges(graphEdges);
    }
  }, [graphNodes, graphEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      onNodeSelect(node);
    },
    [onNodeSelect],
  );

  if (loading) {
    return (
      <Card className="bg-black/40 border-white/20 p-6 h-[600px] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p>Building knowledge graph...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-black/40 border-white/20 p-2 h-[600px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        attributionPosition="bottom-left"
        className="rounded-lg"
        style={{ 
          backgroundColor: 'transparent',
        }}
      >
        <Controls 
          className="bg-black/60 border-white/20 text-white"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />
        <MiniMap 
          className="bg-black/60 border-white/20"
          nodeColor={(node) => {
            switch (node.type) {
              case 'patient': return '#10b981';
              case 'staff': return '#3b82f6';
              case 'department': return '#f59e0b';
              case 'resource': return '#8b5cf6';
              default: return '#6b7280';
            }
          }}
        />
        <Background 
          color="#ffffff20"
          gap={20}
          size={1}
        />
      </ReactFlow>
    </Card>
  );
};
