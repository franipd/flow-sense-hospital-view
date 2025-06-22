
import { useState, useEffect } from 'react';
import { Node, Edge } from '@xyflow/react';
import { patientApi, staffApi, resourcesApi, patientEventsApi } from '@/services/supabaseApi';
import type { Patient, Staff, Resource } from '@/types/database';

interface GraphFilters {
  entityTypes: string[];
  department: string;
  timeRange: string;
}

// Define the event type as we get it from the API
interface EventWithPatient {
  id: string;
  patient_id?: string;
  event_type: string;
  event_timestamp: string;
  department?: string;
  staff_id?: string;
  duration_minutes?: number;
  event_data?: any;
  created_at?: string;
  patients?: Patient;
}

export const useGraphData = (filters: GraphFilters) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateGraphData = async () => {
      setLoading(true);
      try {
        const [patients, staff, resources, events] = await Promise.all([
          filters.entityTypes.includes('patients') ? patientApi.getAll(50) : [],
          filters.entityTypes.includes('staff') ? staffApi.getAll() : [],
          filters.entityTypes.includes('resources') ? resourcesApi.getAll() : [],
          patientEventsApi.getRecentEvents(100)
        ]);

        const graphNodes: Node[] = [];
        const graphEdges: Edge[] = [];

        // Filter by department if specified
        const filterByDepartment = (item: any) => {
          if (filters.department === 'All Departments') return true;
          return item.department === filters.department || item.current_location === filters.department;
        };

        // Create patient nodes
        if (filters.entityTypes.includes('patients')) {
          const filteredPatients = patients.filter(filterByDepartment);
          filteredPatients.forEach((patient: Patient, index) => {
            graphNodes.push({
              id: `patient-${patient.id}`,
              type: 'patient',
              position: { 
                x: (index % 5) * 200, 
                y: Math.floor(index / 5) * 150 
              },
              data: {
                name: `${patient.first_name} ${patient.last_name}`,
                mrn: patient.mrn,
                status: patient.current_status || 'Unknown',
                priority: patient.triage_priority,
                connections: 0
              }
            });
          });
        }

        // Create staff nodes
        if (filters.entityTypes.includes('staff')) {
          const filteredStaff = staff.filter(filterByDepartment);
          filteredStaff.forEach((member: Staff, index) => {
            graphNodes.push({
              id: `staff-${member.id}`,
              type: 'staff',
              position: { 
                x: 800 + (index % 4) * 180, 
                y: 100 + Math.floor(index / 4) * 120 
              },
              data: {
                name: `${member.first_name} ${member.last_name}`,
                role: member.role,
                department: member.department || 'Unassigned',
                activePatients: Math.floor(Math.random() * 8) // Mock data
              }
            });
          });
        }

        // Create department nodes
        if (filters.entityTypes.includes('departments')) {
          const departments = ['Emergency', 'ICU', 'Surgery', 'Cardiology', 'Radiology'];
          departments.forEach((dept, index) => {
            if (filters.department === 'All Departments' || filters.department === dept) {
              const deptPatients = patients.filter(p => p.current_location === dept).length;
              const deptStaff = staff.filter(s => s.department === dept).length;
              
              graphNodes.push({
                id: `department-${dept}`,
                type: 'department',
                position: { 
                  x: 200 + index * 250, 
                  y: 400 
                },
                data: {
                  name: dept,
                  patientCount: deptPatients,
                  staffCount: deptStaff,
                  utilization: Math.floor(Math.random() * 100)
                }
              });
            }
          });
        }

        // Create resource nodes
        if (filters.entityTypes.includes('resources')) {
          const filteredResources = resources.filter(filterByDepartment);
          filteredResources.forEach((resource: Resource, index) => {
            graphNodes.push({
              id: `resource-${resource.id}`,
              type: 'resource',
              position: { 
                x: 100 + (index % 6) * 160, 
                y: 600 + Math.floor(index / 6) * 100 
              },
              data: {
                name: resource.resource_name,
                type: resource.resource_type,
                status: resource.status || 'available',
                utilization: resource.current_utilization
              }
            });
          });
        }

        // Create edges based on relationships
        events.forEach((event: EventWithPatient) => {
          if (event.patient_id && event.staff_id) {
            const patientNode = graphNodes.find(n => n.id === `patient-${event.patient_id}`);
            const staffNode = graphNodes.find(n => n.id === `staff-${event.staff_id}`);
            
            if (patientNode && staffNode) {
              graphEdges.push({
                id: `edge-${event.id}`,
                source: `patient-${event.patient_id}`,
                target: `staff-${event.staff_id}`,
                type: 'smoothstep',
                animated: event.event_type === 'treatment',
                style: { 
                  stroke: '#60a5fa', 
                  strokeWidth: 2,
                  opacity: 0.7
                },
                label: event.event_type
              });
            }
          }

          // Connect patients to departments
          if (event.patient_id && event.department) {
            const patientNode = graphNodes.find(n => n.id === `patient-${event.patient_id}`);
            const deptNode = graphNodes.find(n => n.id === `department-${event.department}`);
            
            if (patientNode && deptNode) {
              graphEdges.push({
                id: `edge-dept-${event.id}`,
                source: `patient-${event.patient_id}`,
                target: `department-${event.department}`,
                type: 'smoothstep',
                style: { 
                  stroke: '#fbbf24', 
                  strokeWidth: 1,
                  opacity: 0.5
                }
              });
            }
          }
        });

        // Connect staff to departments
        staff.forEach((member: Staff) => {
          if (member.department) {
            const staffNode = graphNodes.find(n => n.id === `staff-${member.id}`);
            const deptNode = graphNodes.find(n => n.id === `department-${member.department}`);
            
            if (staffNode && deptNode) {
              graphEdges.push({
                id: `edge-staff-dept-${member.id}`,
                source: `staff-${member.id}`,
                target: `department-${member.department}`,
                type: 'smoothstep',
                style: { 
                  stroke: '#a78bfa', 
                  strokeWidth: 1,
                  opacity: 0.4
                }
              });
            }
          }
        });

        setNodes(graphNodes);
        setEdges(graphEdges);
      } catch (error) {
        console.error('Error generating graph data:', error);
      } finally {
        setLoading(false);
      }
    };

    generateGraphData();
  }, [filters]);

  return { nodes, edges, loading };
};
