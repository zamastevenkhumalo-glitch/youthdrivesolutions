// Fictional, in-memory demonstration data. Never use as real business records.
const daysAgo = (offset) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const services = [
  'Driving lessons', 'K53 preparation', 'Learner licensing',
  'PrDP assistance', 'Queue for you Registration', 'Vehicle sourcing',
  'Vehicle hire for test', 'Roadside assistance',
];

export const demoCustomers = [
  { id: 'C-001', name: 'Sample Customer 001', channel: 'Website', joined: daysAgo(138), contact: 'Example only' },
  { id: 'C-002', name: 'Sample Customer 002', channel: 'Walk-in', joined: daysAgo(111), contact: 'Example only' },
  { id: 'C-003', name: 'Sample Customer 003', channel: 'WhatsApp', joined: daysAgo(92), contact: 'Example only' },
  { id: 'C-004', name: 'Sample Customer 004', channel: 'Website', joined: daysAgo(78), contact: 'Example only' },
  { id: 'C-005', name: 'Sample Customer 005', channel: 'Phone', joined: daysAgo(65), contact: 'Example only' },
  { id: 'C-006', name: 'Sample Customer 006', channel: 'Website', joined: daysAgo(52), contact: 'Example only' },
  { id: 'C-007', name: 'Sample Customer 007', channel: 'WhatsApp', joined: daysAgo(40), contact: 'Example only' },
  { id: 'C-008', name: 'Sample Customer 008', channel: 'Website', joined: daysAgo(29), contact: 'Example only' },
  { id: 'C-009', name: 'Sample Customer 009', channel: 'Walk-in', joined: daysAgo(17), contact: 'Example only' },
  { id: 'C-010', name: 'Sample Customer 010', channel: 'Website', joined: daysAgo(7), contact: 'Example only' },
  { id: 'C-011', name: 'Sample Customer 011', channel: 'Website', joined: daysAgo(2), contact: 'Example only' },
];


// Fictional CRM fields. A real system must collect consent evidence and confirm milestones from staff records.
demoCustomers.forEach((customer, index) => {
  const milestones = {0:'Learner licence obtained',1:'Driver licence obtained',3:'Driver licence obtained',5:'Learner licence obtained',7:'Driver licence obtained'};
  customer.milestone = milestones[index] || '';
  customer.marketingConsent = [0,1,3,5,7,8,9].includes(index);
});

export const demoEnquiries = [
  { id: 'YD-101', customerId: 'C-001', service: 'K53 preparation', status: 'Completed', submitted: daysAgo(130) },
  { id: 'YD-102', customerId: 'C-002', service: 'Driving lessons', status: 'Completed', submitted: daysAgo(104) },
  { id: 'YD-103', customerId: 'C-003', service: 'PrDP assistance', status: 'Contacted', submitted: daysAgo(87) },
  { id: 'YD-104', customerId: 'C-004', service: 'Driving lessons', status: 'Completed', submitted: daysAgo(72) },
  { id: 'YD-105', customerId: 'C-005', service: 'Queue for you Registration', status: 'Quoted', submitted: daysAgo(59) },
  { id: 'YD-106', customerId: 'C-006', service: 'Learner licensing', status: 'Completed', submitted: daysAgo(47) },
  { id: 'YD-107', customerId: 'C-007', service: 'Vehicle sourcing', status: 'Contacted', submitted: daysAgo(38) },
  { id: 'YD-108', customerId: 'C-008', service: 'Driving lessons', status: 'Booked', submitted: daysAgo(26) },
  { id: 'YD-109', customerId: 'C-009', service: 'Queue for you Registration', status: 'Quoted', submitted: daysAgo(15) },
  { id: 'YD-110', customerId: 'C-010', service: 'Driving lessons', status: 'New', submitted: daysAgo(6) },
  { id: 'YD-111', customerId: 'C-011', service: 'Vehicle sourcing', status: 'New', submitted: daysAgo(2) },
];

export const demoVehicles = [
  { id: 'VR-201', customerId: 'C-003', type: 'Hatchback', budget: 125000, status: 'Matching', submitted: daysAgo(83) },
  { id: 'VR-202', customerId: 'C-007', type: 'Sedan', budget: 160000, status: 'Options shared', submitted: daysAgo(37) },
  { id: 'VR-203', customerId: 'C-011', type: 'Small SUV', budget: 230000, status: 'New', submitted: daysAgo(2) },
];

export const demoPayments = [
  { id: 'PM-301', customerId: 'C-001', service: 'K53 preparation', amount: 180, status: 'Verified', date: daysAgo(127) },
  { id: 'PM-302', customerId: 'C-002', service: 'Driving lessons', amount: 750, status: 'Verified', date: daysAgo(100) },
  { id: 'PM-303', customerId: 'C-004', service: 'Driving lessons', amount: 1100, status: 'Verified', date: daysAgo(68) },
  { id: 'PM-304', customerId: 'C-006', service: 'Learner licensing', amount: 240, status: 'Verified', date: daysAgo(43) },
  { id: 'PM-305', customerId: 'C-008', service: 'Driving lessons', amount: 650, status: 'Verified', date: daysAgo(24) },
  { id: 'PM-306', customerId: 'C-010', service: 'Driving lessons', amount: 650, status: 'Pending', date: daysAgo(6) },
  { id: 'PM-307', customerId: 'C-001', service: 'Driving lessons', amount: 720, status: 'Verified', date: daysAgo(75) },
  { id: 'PM-308', customerId: 'C-002', service: 'Driving lessons', amount: 390, status: 'Verified', date: daysAgo(31) },
  { id: 'PM-309', customerId: 'C-004', service: 'Vehicle hire for test', amount: 480, status: 'Verified', date: daysAgo(12) },
  { id: 'PM-310', customerId: 'C-006', service: 'Driving lessons', amount: 600, status: 'Verified', date: daysAgo(8) },
  { id: 'PM-311', customerId: 'C-007', service: 'K53 preparation', amount: 220, status: 'Verified', date: daysAgo(54) },
  { id: 'PM-312', customerId: 'C-009', service: 'PrDP assistance', amount: 350, status: 'Verified', date: daysAgo(16) },
];

export const statusOptions = ['New', 'Contacted', 'Quoted', 'Booked', 'Completed', 'Cancelled'];
export const vehicleStatusOptions = ['New', 'Matching', 'Options shared', 'Closed won', 'Closed lost'];

export const fmtDate = (value) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
};
export const fmtMoney = (amount) => `R ${Number(amount || 0).toLocaleString('en-ZA', { maximumFractionDigits: 2 })}`;
export const ageDays = (value) => {
  const [year, month, day] = value.split('-').map(Number);
  const now = new Date();
  const reference = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(year, month - 1, day);
  return Math.round((reference.getTime() - target.getTime()) / 86400000);
};
