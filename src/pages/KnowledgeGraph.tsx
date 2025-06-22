
import React, { useState } from 'react';
import { TopNavigation } from '@/components/TopNavigation';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Footer } from '@/components/Footer';
import { KnowledgeGraphViewer } from '@/components/knowledge-graph/KnowledgeGraphViewer';
import { GraphFilters } from '@/components/knowledge-graph/GraphFilters';
import { NodeDetails } from '@/components/knowledge-graph/NodeDetails';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const KnowledgeGraph = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [filters, setFilters] = useState({
    entityTypes: ['patients', 'staff', 'departments', 'resources'],
    department: 'All Departments',
    timeRange: '24h'
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <TopNavigation />
        
        <div className="relative z-10 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Knowledge Graph
                </h1>
                <p className="text-xl text-white/80 max-w-3xl mx-auto">
                  Visualize relationships between patients, staff, departments, and resources
                </p>
              </div>

              <GraphFilters 
                filters={filters}
                onFiltersChange={setFilters}
              />

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <KnowledgeGraphViewer 
                    filters={filters}
                    selectedNode={selectedNode}
                    onNodeSelect={setSelectedNode}
                  />
                </div>
                <div className="lg:col-span-1">
                  <NodeDetails 
                    node={selectedNode}
                    onClose={() => setSelectedNode(null)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default KnowledgeGraph;
