export interface Scenario {
  id: string;
  industry: string;
  badge: string;
  title: string;
  client: string;
  metric: string;
  metricLabel: string;
  description: string;
  image: string;
  location: string;
  telemetry: {
    dockType: string;
    bvlosStatus: string;
    responseDelta: string;
    siteCoordinates: string;
  };
  highlights: string[];
}

export interface SpeakerOrg {
  id: string;
  name: string;
  logo: string;
  category: 'Enterprise' | 'Public Sector' | 'OEM & Hardware' | 'Regulatory';
  speaker: string;
  title: string;
  topic: string;
  trackTag: string;
  quote: string;
}

export const HERO_TELEMETRY = {
  activeDocks: "1,420+",
  bvlosHours: "850,000+",
  incidentRate: "0.0001%",
  systemStatus: "NOMINAL // GLOBAL GRID ACTIVE",
};

export const BOTTLENECK_STAGES = [
  {
    step: "01",
    label: "FACILITY INSPECTION LIMITS",
    title: "Manual Patrols Face Human Fatigue & Physical Constraints",
    copy: "Human inspectors cover less than 12% of critical infrastructure per shift, leaving dangerous blind spots across high-risk industrial assets.",
    stat: "12% Coverage / Shift",
    tag: "CAPACITY CEILING",
    image: "/images/bottleneck-facility.jpg",
    svgType: "facility"
  },
  {
    step: "02",
    label: "MARITIME PORT SCALING",
    title: "Container Terminals Outgrow Manual Response Speed",
    copy: "When incident response relies on ground transport, perimeter breach resolution times stretch to 45+ minutes across sprawling port acreage.",
    stat: "45m Avg Incident Response",
    tag: "RESPONSE DELAY",
    image: "/images/bottleneck-port.jpg",
    svgType: "port"
  },
  {
    step: "03",
    label: "CONTROL ROOM OVERLOAD",
    title: "Operator Saturation At 1:1 Pilot-to-Drone Ratios",
    copy: "Central control rooms drowning in raw camera streams cannot scale operations. 1 pilot per drone is economically and operationally impossible.",
    stat: "1:1 Pilot Ratio Bottleneck",
    tag: "SCALING WALL",
    image: "/images/bottleneck-monitoring.jpg",
    svgType: "control"
  }
];

export const BRIDGE_DATA = {
  eyebrow: "SECTION 02.5 — RE-ARCHITECTING REACH",
  title: "Drones Don't Replace Humans. They Multiply Reach by 100x.",
  subtitle: "Autonomous docking stations and BVLOS software turn single operators into commanders of automated multi-drone fleets.",
  stats: [
    { value: "1:10+", label: "OPERATOR TO FLEET RATIO" },
    { value: "<3 MIN", label: "AUTONOMOUS DISPATCH SPEED" },
    { value: "24/7", label: "CONTINUOUS DOCK ROTATION" }
  ]
};

export const INDUSTRY_SCENARIOS: Scenario[] = [
  {
    id: "public-safety",
    industry: "Public Safety",
    badge: "DFR / EMERGENCY RESPONSE",
    title: "First Responder Drone Docks Slash Response Times to Under 180s",
    client: "Pearland PD & Chula Vista DFR Initiative",
    metric: "82%",
    metricLabel: "Reduction in 911 Arrival Time",
    description: "Automated roof docks dispatch autonomous drones upon CAD emergency calls, arriving on scene 3 to 5 minutes before ground officers to provide live tactical ISR.",
    image: "/images/scenario-public-safety.jpg",
    location: "Texas & California Operational Zones",
    telemetry: {
      dockType: "FlytDock Matrix 400",
      bvlosStatus: "FAA Part 91/107 Waiver Active",
      responseDelta: "-4m 12s Faster Than Vehicle Patrol",
      siteCoordinates: "29.5639° N, 95.2860° W"
    },
    highlights: [
      "Automated dispatch tied directly to 911 Computer-Aided Dispatch (CAD)",
      "Zero pilot manual takeoff required — automated pre-flight checks",
      "Live thermal scene clearing before ground personnel enter hazard zones"
    ]
  },
  {
    id: "oil-gas",
    industry: "Oil & Gas",
    badge: "AUTONOMOUS LEAK & PERIMETER",
    title: "Continuous Methane Detection Across 5,000-Acre Refineries",
    client: "Shell & Chevron Upstream Facilities",
    metric: "99.4%",
    metricLabel: "Automated Gas Leak Detection Rate",
    description: "Scheduled autonomous dock launches carry optical gas imaging payloads across piping networks, detecting micro-leaks long before pressure sensor trips.",
    image: "/images/scenario-oil-gas.jpg",
    location: "Permian Basin & Gulf Coast Refineries",
    telemetry: {
      dockType: "Weather-Shield CyberDock X",
      bvlosStatus: "Radar-Integrated Airspace Clearance",
      responseDelta: "Continuous 2-Hour Dock Rotation",
      siteCoordinates: "31.8657° N, 102.3676° W"
    },
    highlights: [
      "Automated optical gas imaging (OGI) payload telemetry",
      "Explosion-proof hazardous location dock enclosures",
      "Instant automated AI thermal alert routing to safety command"
    ]
  },
  {
    id: "construction",
    industry: "Construction",
    badge: "3D VOLUMETRIC SCANNING",
    title: "Daily Autonomous Site Progress Mapping & Stockpile Audits",
    client: "Skanska & Bechtel Infrastructure Projects",
    metric: "14x",
    metricLabel: "Faster Volumetric Surveying",
    description: "Every morning before crews arrive, docked drones execute autonomous photogrammetry passes, updating BIM models with millimeter-level accuracy.",
    image: "/images/scenario-construction.jpg",
    location: "High-Speed Rail Corridor & Mega-Site B",
    telemetry: {
      dockType: "RTK Precision Dock Dock-V2",
      bvlosStatus: "Automated Geofence Lock",
      responseDelta: "Daily 06:00 AM Auto-Survey",
      siteCoordinates: "37.7749° N, 122.4194° W"
    },
    highlights: [
      "Sub-centimeter RTK automated site mapping",
      "Direct integration with Autodesk BIM 360",
      "Automated contractor progress verification reporting"
    ]
  },
  {
    id: "mining",
    industry: "Mining & Heavy Industry",
    badge: "HAZARD ZONE TELEMETRY",
    title: "24/7 Autonomous Blast Zone Inspection & Quarry Monitoring",
    client: "BHP & Rio Tinto Open-Pit Mines",
    metric: "100%",
    metricLabel: "Personnel Removal from High-Vibe Zones",
    description: "Eliminating human entry into unstable high-wall quarry areas. Drones deploy from hardened docks post-blasting to inspect stability and haul routes.",
    image: "/images/scenario-mining.jpg",
    location: "Pilbara Iron Ore Operations",
    telemetry: {
      dockType: "Heavy-Duty ClimateDock Steel",
      bvlosStatus: "Detect-and-Avoid Radar Link",
      responseDelta: "Immediate Post-Blast Inspection",
      siteCoordinates: "22.3193° S, 118.5447° E"
    },
    highlights: [
      "Autonomous 3D pit wall thermal stability analysis",
      "Automated haul truck collision avoidance hazard flagging",
      "All-weather operation in extreme 50°C dust environments"
    ]
  },
  {
    id: "maritime",
    industry: "Maritime & Ports",
    badge: "BERTH SECURITY & BVLOS",
    title: "Automated Container Vessel Inspection & Berth Perimeter DFR",
    client: "Port of Antwerp-Bruges & Port of Singapore",
    metric: "65%",
    metricLabel: "Reduction in Port Security Overhead",
    description: "Fully automated fleet operations monitoring berth arrivals, hull inspections, and perimeter security across 10+ kilometers of port waters.",
    image: "/images/scenario-maritime.jpg",
    location: "Antwerp Harbor Operational Hub",
    telemetry: {
      dockType: "Marine-Grade CyberDock SaltShield",
      bvlosStatus: "AIS Vessel Radar Matrix Integrated",
      responseDelta: "< 90 Seconds to Waterway Patrol",
      siteCoordinates: "51.2194° N, 4.4025° E"
    },
    highlights: [
      "AIS vessel tracking integration for target interception",
      "Automated pollution and oil-sheen detection on water",
      "Night vision thermal maritime patrol loops"
    ]
  }
];

export const SPEAKERS_AND_ORGS: SpeakerOrg[] = [
  {
    id: "org-1",
    name: "Skydio Enterprise",
    logo: "SKYDIO",
    category: "OEM & Hardware",
    speaker: "Dr. Adam Bry",
    title: "CEO & Co-Founder",
    topic: "Scaling Autonomy Without Human Safety Drivers",
    trackTag: "SESSION 01 // HARDWARE ARCHITECTURE",
    quote: "The future of physical AI isn't building a better joystick. It's building systems where joystick inputs are illegal."
  },
  {
    id: "org-2",
    name: "Pearland Police DFR",
    logo: "PEARLAND DFR",
    category: "Public Sector",
    speaker: "Assistant Chief Brandon Escalante",
    title: "Director of Autonomous Operations",
    topic: "What Happens When Drones Arrive Before 911 Call Takers Hang Up",
    trackTag: "SESSION 02 // UNFILTERED PUBLIC SAFETY",
    quote: "We don't talk about pilot training anymore. We talk about API integrations between CAD systems and roof docks."
  },
  {
    id: "org-3",
    name: "Shell Autonomous Logistics",
    logo: "SHELL UPSTREAM",
    category: "Enterprise",
    speaker: "Elena Rostova",
    title: "Head of Remote Robotics",
    topic: "The Procurement Brutality: Scaling from 2 Docks to 140 Docks Across 4 Continents",
    trackTag: "SESSION 03 // ENTERPRISE WAR STORIES",
    quote: "Pilots work in PowerPoint. Scaling requires wrestling with site cybersecurity, power grids, and local weather limits."
  },
  {
    id: "org-4",
    name: "FAA Airspace Office",
    logo: "FAA REGULATORY",
    category: "Regulatory",
    speaker: "Marcus Thorne",
    title: "Senior Director, BVLOS Authorizations",
    topic: "Beyond Part 107: The Standardized BVLOS Matrix for 2026 and Beyond",
    trackTag: "SESSION 04 // AIRSPACE REGULATION",
    quote: "We are moving from individual waiver petitions to automated algorithmic air-space authorizations."
  },
  {
    id: "org-5",
    name: "Port of Antwerp Robotics",
    logo: "PORT OF ANTWERP",
    category: "Enterprise",
    speaker: "Jan De Smet",
    title: "Chief Digital Officer",
    topic: "Replacing 24/7 Security Patrols With Autonomous Drone Swarms",
    trackTag: "SESSION 05 // MARITIME AUTONOMY",
    quote: "When a container ship arrives at 3 AM in heavy fog, autonomous docking stations are the only eyes on the water."
  },
  {
    id: "org-6",
    name: "FlytBase Core Eng",
    logo: "FLYTBASE CORE",
    category: "Enterprise",
    speaker: "Nitin Gupta",
    title: "Founder & CEO, FlytBase",
    topic: "Physical AI at the Edge: Dock Operating System (FlytOS 5.0) Roadmap",
    trackTag: "KEYNOTE // NESTGEN '26 REVEAL",
    quote: "NestGen '26 is where the physical AI industry stops showing concept renders and starts showing real telemetry."
  }
];

export const AGENDA_HIGHLIGHTS = [
  {
    time: "09:00 EST",
    title: "OPENING KEYNOTE: PHYSICAL AI & THE DEATH OF THE JOYSTICK",
    speaker: "Nitin Gupta (FlytBase) + Special Guests",
    desc: "Unveiling the next generation of autonomous dock networks, cloud BVLOS control, and edge AI fleet management."
  },
  {
    time: "10:30 EST",
    title: "EXECUTIVE ROUNDTABLE: THE $10M BVLOS SCALING WAR STORIES",
    speaker: "Shell, Chevron, Pearland PD, & Port of Antwerp",
    desc: "No PR fluff. Unfiltered post-mortems on procurement failures, dock battery fatigue, and how they conquered site operations."
  },
  {
    time: "12:00 EST",
    title: "LIVE SWARM DEMO & FLYTOS 5.0 LIVE DEPLOYMENT",
    speaker: "FlytBase Engineering Team",
    desc: "Live stream deployment from automated docks in Texas, Antwerp, and Singapore executing real-time multi-drone missions."
  },
  {
    time: "14:00 EST",
    title: "REGULATORY BREAKTHROUGHS & FAA 2026/2027 BVLOS FRAMEWORK",
    speaker: "FAA Airspace Directorate & EASA Representatives",
    desc: "Direct guidance on securing site-wide automated flight approvals without visual observers."
  }
];
