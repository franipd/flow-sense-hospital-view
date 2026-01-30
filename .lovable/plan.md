

## Plan: Populate Sample Healthcare Data

Since the database is now accessible and the staff, resources, and patient_events tables are empty, we need to add sample data to make the application functional.

### Data to Add

**1. Staff Members (15 records)**
- Doctors across different departments (Emergency, ICU, General Ward, Surgery)
- Nurses for each department
- Technicians for labs and radiology
- Receptionists for front desk operations

**2. Resources (12 records)**
- Beds in various departments (Emergency, ICU, General Ward)
- Equipment (ventilators, X-ray machines, CT scanners)
- Rooms (operating rooms, consultation rooms)
- Lab facilities

**3. Patient Events (50+ records)**
- Admission events linked to existing patients
- Triage assessments
- Lab orders and results
- Imaging procedures
- Consultations
- Transfers between departments
- Discharge events

### Implementation Steps

1. Insert staff records with realistic names, roles, departments, and shift patterns
2. Insert resource records with appropriate capacities and utilization rates
3. Insert patient events linked to actual patient IDs from the existing 102 patients
4. Events will span the last 7 days to show realistic activity

### Technical Details

- Staff will have varied skills stored as JSONB
- Resources will have current utilization between 40-90%
- Patient events will include event_data with priority and acuity levels
- All timestamps will be within a realistic timeframe

