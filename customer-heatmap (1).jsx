import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, MapPin, X, Check, Search, Zap, List, Plus, Kanban, User, Building2, Users, ShoppingCart } from 'lucide-react';

// Unified color scheme - same colors for matching orgs across Users and Buyers
const serviceColors = {
  'Army': { bg: '#1a2e1a', border: '#22c55e', text: '#4ade80', badge: '#166534' },
  'Air Force': { bg: '#1a1a2e', border: '#3b82f6', text: '#60a5fa', badge: '#1e40af' },
  'Space Force': { bg: '#1e1a2e', border: '#8b5cf6', text: '#a78bfa', badge: '#5b21b6' },
  'Navy': { bg: '#1a2a2e', border: '#0ea5e9', text: '#38bdf8', badge: '#0369a1' },
  'Marine Corps': { bg: '#2e1a1a', border: '#ef4444', text: '#f87171', badge: '#b91c1c' },
  'SOCOM': { bg: '#2e2a1a', border: '#f59e0b', text: '#fbbf24', badge: '#b45309' },
  'CYBERCOM': { bg: '#1a2e2e', border: '#14b8a6', text: '#2dd4bf', badge: '#0f766e' },
  'Joint': { bg: '#2e1a2e', border: '#d946ef', text: '#e879f9', badge: '#a21caf' },
  'STRATCOM': { bg: '#2e1a2e', border: '#ec4899', text: '#f472b6', badge: '#be185d' },
  'NSA': { bg: '#1a1a1a', border: '#71717a', text: '#a1a1aa', badge: '#3f3f46' },
  'OSD': { bg: '#1e293b', border: '#64748b', text: '#94a3b8', badge: '#475569' },
  'DARPA': { bg: '#1a1a2e', border: '#818cf8', text: '#a5b4fc', badge: '#4f46e5' },
  'Consortium': { bg: '#2e2a1a', border: '#fbbf24', text: '#fde047', badge: '#a16207' },
  'DOE': { bg: '#1a2e2a', border: '#34d399', text: '#6ee7b7', badge: '#059669' },
  'INDOPACOM': { bg: '#2e1a1e', border: '#f43f5e', text: '#fb7185', badge: '#be123c' },
  'CENTCOM': { bg: '#2e251a', border: '#d97706', text: '#fbbf24', badge: '#92400e' },
  'EUCOM': { bg: '#1a1e2e', border: '#6366f1', text: '#818cf8', badge: '#4338ca' },
  'SPACECOM': { bg: '#1e1a2e', border: '#a855f7', text: '#c084fc', badge: '#7c3aed' },
};

const getServiceColor = (service) => serviceColors[service] || { bg: '#1a1a2e', border: '#6b7280', text: '#9ca3af', badge: '#374151' };

const statusConfig = {
  'not-engaged': { label: 'Not Engaged', color: '#1a1a2e', border: '#2d2d44', textColor: '#6b7280' },
  'contacted': { label: 'Contacted', color: '#1e3a5f', border: '#2563eb', textColor: '#60a5fa' },
  'engaged': { label: 'Engaged', color: '#1a2e1a', border: '#16a34a', textColor: '#4ade80' },
  'deployed': { label: 'Deployed', color: '#2e1a2e', border: '#a855f7', textColor: '#c084fc' },
  'contract': { label: 'Under Contract', color: '#1a2e2e', border: '#06b6d4', textColor: '#22d3ee' },
  'on-ice': { label: 'On Ice', color: '#1e293b', border: '#475569', textColor: '#94a3b8' },
};

const kanbanColumns = ['contacted', 'engaged', 'deployed', 'contract', 'on-ice'];

const usersData = [
  {
    "id": "unit-0",
    "name": "3rd BCT/1st Armored Division (Spectre Platoon)",
    "service": "Army",
    "componentType": "Brigade Combat Team",
    "location": "Fort Bliss, TX",
    "mission": "Task-organized SIGINT/EW formation integrating TEWS and Prophet systems for tactical EW operations",
    "systems": "TEWS, Prophet Enhanced",
    "notes": "Created innovative 'Spectre Platoon' model for integrated SIGINT/EW",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-1",
    "name": "3rd Armored BCT/4th Infantry Division",
    "service": "Army",
    "componentType": "Brigade Combat Team",
    "location": "Fort Carson, CO",
    "mission": "CEMA operations supporting armored maneuver; demonstrated excellence in European operations and NTC rotations",
    "systems": "TLS-BCT, Prophet Enhanced",
    "notes": "2023 AOC EW Excellence Award winner",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-2",
    "name": "1st Stryker BCT/4th Infantry Division",
    "service": "Army",
    "componentType": "Brigade Combat Team",
    "location": "Fort Carson, CO",
    "mission": "First unit to receive modernized ground SIGINT/EW capability; Stryker-integrated EW operations",
    "systems": "TLS-BCT (first fielding)",
    "notes": "Pathfinder unit for TLS-BCT integration",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-3",
    "name": "1st Multi-Domain Task Force",
    "service": "Army",
    "componentType": "Multi-Domain Task Force",
    "location": "JBLM, WA",
    "mission": "Anti-A2/AD operations combining long-range fires with intelligence, cyber, EW, information, and space capabilities for INDOPACOM",
    "systems": "TLS-EAB, Multi-Domain Effects Battalion",
    "notes": "Primary Pacific theater MDTF",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-4",
    "name": "2nd Multi-Domain Task Force",
    "service": "Army",
    "componentType": "Multi-Domain Task Force",
    "location": "Fort Drum, NY / Europe",
    "mission": "EUCOM-focused multi-domain operations integrating EW with fires and cyber for European theater",
    "systems": "TLS-EAB, 3rd Bn/12th FA",
    "notes": "56th MDC subordinate; rotational Europe presence",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-5",
    "name": "3rd Multi-Domain Task Force",
    "service": "Army",
    "componentType": "Multi-Domain Task Force",
    "location": "JBLM, WA / Hawaii",
    "mission": "Deep sensing and multi-domain effects for Indo-Pacific theater operations",
    "systems": "TLS-EAB",
    "notes": "Secondary Pacific MDTF",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-6",
    "name": "201st Expeditionary MI Brigade",
    "service": "Army",
    "componentType": "Expeditionary MI Brigade",
    "location": "JBLM, WA",
    "mission": "Corps-level SIGINT/EW support to I Corps; deploys expeditionary MI battalions for theater operations",
    "systems": "Prophet Enhanced, tactical SIGINT systems",
    "notes": "~650 Soldiers; 109th/502nd EMI Battalions",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-7",
    "name": "504th Expeditionary MI Brigade",
    "service": "Army",
    "componentType": "Expeditionary MI Brigade",
    "location": "Fort Cavazos, TX",
    "mission": "Corps-level SIGINT/EW support to III Corps; rotational deployments to EUCOM",
    "systems": "Prophet Enhanced, 163rd IEW Battalion assets",
    "notes": "163rd IEW Battalion with Prophet Enhanced",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-8",
    "name": "525th Expeditionary MI Brigade",
    "service": "Army",
    "componentType": "Expeditionary MI Brigade",
    "location": "Fort Liberty, NC",
    "mission": "Global response force SIGINT/EW support to XVIII Airborne Corps",
    "systems": "Prophet Enhanced, 302nd IEW Battalion assets",
    "notes": "Rapid deployment capability",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-9",
    "name": "66th MI Brigade",
    "service": "Army",
    "componentType": "Theater MI Brigade (INSCOM)",
    "location": "Wiesbaden, Germany",
    "mission": "Theater-level multi-discipline intelligence including SIGINT for EUCOM/USAREUR",
    "systems": "Theater SIGINT systems",
    "notes": "Primary European theater MI",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-10",
    "name": "500th MI Brigade",
    "service": "Army",
    "componentType": "Theater MI Brigade (INSCOM)",
    "location": "Schofield Barracks, HI",
    "mission": "Theater-level SIGINT and multi-discipline intelligence for INDOPACOM",
    "systems": "Theater SIGINT systems",
    "notes": "Primary Indo-Pacific MI",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-11",
    "name": "501st MI Brigade",
    "service": "Army",
    "componentType": "Theater MI Brigade (INSCOM)",
    "location": "Korea",
    "mission": "Theater-level SIGINT and intelligence support to US Forces Korea",
    "systems": "Theater SIGINT systems",
    "notes": "Peninsula-focused operations",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-12",
    "name": "513th MI Brigade",
    "service": "Army",
    "componentType": "Theater MI Brigade (INSCOM)",
    "location": "Fort Eisenhower, GA",
    "mission": "Theater-level SIGINT support to CENTCOM and SOUTHCOM operations",
    "systems": "Theater SIGINT systems",
    "notes": "Dual CCMD support",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-13",
    "name": "704th MI Brigade",
    "service": "Army",
    "componentType": "Theater MI Brigade (INSCOM)",
    "location": "Fort Meade, MD",
    "mission": "National SIGINT support; primary Army interface with NSA",
    "systems": "National SIGINT systems",
    "notes": "NSA partnership; national-level SIGINT",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-14",
    "name": "470th MI Brigade",
    "service": "Army",
    "componentType": "Theater MI Brigade (INSCOM)",
    "location": "Fort Sam Houston, TX",
    "mission": "Theater-level intelligence and SIGINT for SOUTHCOM",
    "systems": "Theater SIGINT systems",
    "notes": "Latin America/Caribbean focus",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-15",
    "name": "207th MI Brigade",
    "service": "Army",
    "componentType": "Theater MI Brigade (INSCOM)",
    "location": "Vicenza, Italy",
    "mission": "Theater-level intelligence and SIGINT support to AFRICOM",
    "systems": "Theater SIGINT systems",
    "notes": "Africa-focused operations",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-16",
    "name": "780th MI Brigade (Cyber)",
    "service": "Army",
    "componentType": "Cyber/SIGINT Brigade",
    "location": "Fort Meade, MD",
    "mission": "Only operational offensive cyberspace brigade in the Army; integrates SIGINT with cyber operations",
    "systems": "Offensive cyber tools, SIGINT integration",
    "notes": "Army's premier cyber/SIGINT unit",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-17",
    "name": "781st MI Battalion (Cyber)",
    "service": "Army",
    "componentType": "Cyber Battalion",
    "location": "Fort Meade, MD",
    "mission": "Offensive cyber operations with SIGINT integration",
    "systems": "Offensive cyber capabilities",
    "notes": "Subordinate to 780th MI BDE",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-18",
    "name": "782nd MI Battalion (Cyber)",
    "service": "Army",
    "componentType": "Cyber Battalion",
    "location": "Fort Eisenhower, GA",
    "mission": "Offensive cyber operations; detachments in Texas and Hawaii",
    "systems": "Offensive cyber capabilities",
    "notes": "Geographically distributed",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-19",
    "name": "11th Cyber Battalion",
    "service": "Army",
    "componentType": "Expeditionary Cyber Battalion",
    "location": "Fort Eisenhower, GA",
    "mission": "First scalable expeditionary cyber/EW capability; deploys Expeditionary CEMA Teams (ECTs)",
    "systems": "ECT equipment, tactical cyber/EW",
    "notes": "5 ECTs; deployed to Europe pre-2022",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-20",
    "name": "Theater Information Advantage Detachment (USARPAC)",
    "service": "Army",
    "componentType": "Theater CEMA Element",
    "location": "Pacific Theater",
    "mission": "65-person team synchronizing information capabilities including EW at theater level",
    "systems": "Theater information systems",
    "notes": "First TIAD; activated Oct 2025",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-21",
    "name": "US Army Cyber Center of Excellence",
    "service": "Army",
    "componentType": "Training Command",
    "location": "Fort Eisenhower, GA",
    "mission": "Force modernization proponent for Cyberspace Operations, Signal, and EW; trains ~22,000 annually",
    "systems": "Training systems, TLS simulators",
    "notes": "MOSs: 17A, 17B, 17E, 35N/P/S",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-22",
    "name": "US Army Intelligence Center of Excellence",
    "service": "Army",
    "componentType": "Training Command",
    "location": "Fort Huachuca, AZ",
    "mission": "SIGINT training through 111th MI Brigade; 304th MI Bn operates SEMA training",
    "systems": "Prophet trainers, SEMA aircraft",
    "notes": "309th MI Bn for SIGINT training",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-23",
    "name": "1LT John R. Fox Multi-Domain Ops Non-Kinetic Range",
    "service": "Army",
    "componentType": "Training Range",
    "location": "Fort Huachuca, AZ",
    "mission": "Army's first dedicated EW training range complex",
    "systems": "EW training emitters, threat replication",
    "notes": "Opened 2022",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-24",
    "name": "55th Wing",
    "service": "Air Force",
    "componentType": "Reconnaissance Wing",
    "location": "Offutt AFB, NE",
    "mission": "Largest and most diverse reconnaissance fleet in ACC; operates all RC-135 variants for SIGINT",
    "systems": "RC-135V/W Rivet Joint (17), RC-135S Cobra Ball (3), RC-135U Combat Sent (2)",
    "notes": "46 aircraft, 13 models",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-25",
    "name": "82nd Reconnaissance Squadron",
    "service": "Air Force",
    "componentType": "Forward SIGINT Squadron",
    "location": "Kadena AB, Japan",
    "mission": "Forward-deployed RC-135 operations for Indo-Pacific SIGINT collection",
    "systems": "RC-135V/W Rivet Joint",
    "notes": "Pacific theater focus",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-26",
    "name": "95th Reconnaissance Squadron",
    "service": "Air Force",
    "componentType": "Forward SIGINT Squadron",
    "location": "RAF Mildenhall, UK",
    "mission": "Forward-deployed RC-135 operations for European theater SIGINT collection",
    "systems": "RC-135V/W Rivet Joint",
    "notes": "EUCOM/Russia focus",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-27",
    "name": "55th OG Detachment 1",
    "service": "Air Force",
    "componentType": "Forward SIGINT Detachment",
    "location": "Eielson AFB, AK",
    "mission": "Arctic RC-135 operations; established July 2023 for high-north collection",
    "systems": "RC-135V/W Rivet Joint",
    "notes": "Arctic/Russia focus; newest det",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-28",
    "name": "55th Electronic Combat Group",
    "service": "Air Force",
    "componentType": "Electronic Combat Group",
    "location": "Davis-Monthan AFB, AZ",
    "mission": "EC-130H Compass Call electronic attack operations; transitioning to EA-37B",
    "systems": "EC-130H Compass Call, EA-37B (incoming)",
    "notes": "Platform transition underway",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-29",
    "name": "41st Electronic Combat Squadron",
    "service": "Air Force",
    "componentType": "Electronic Combat Squadron",
    "location": "Davis-Monthan AFB, AZ",
    "mission": "Only remaining operational EC-130H squadron; airborne electronic attack",
    "systems": "EC-130H Compass Call (4 aircraft)",
    "notes": "13-person crews; linguists aboard",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-30",
    "name": "480th ISR Wing",
    "service": "Air Force",
    "componentType": "ISR Wing",
    "location": "JB Langley-Eustis, VA",
    "mission": "Globally networked ISR operations; leads AF Distributed Common Ground System",
    "systems": "DCGS, processing nodes",
    "notes": "6,000+ Airmen",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-31",
    "name": "DGS-1",
    "service": "Air Force",
    "componentType": "Distributed Ground Station",
    "location": "Fort Eisenhower, GA / Langley",
    "mission": "DCGS processing for CENTCOM, EUCOM, AFRICOM, SOCOM",
    "systems": "DCGS processing systems",
    "notes": "Multi-CCMD support",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-32",
    "name": "DGS-2",
    "service": "Air Force",
    "componentType": "Distributed Ground Station",
    "location": "Beale AFB, CA",
    "mission": "U-2 and Global Hawk ISR processing",
    "systems": "DCGS, high-altitude ISR processing",
    "notes": "Specialized high-alt platforms",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-33",
    "name": "DGS-3",
    "service": "Air Force",
    "componentType": "Distributed Ground Station",
    "location": "Osan AB, Korea",
    "mission": "7th Air Force AOR ISR processing",
    "systems": "DCGS processing systems",
    "notes": "Korea peninsula focus",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-34",
    "name": "DGS-4",
    "service": "Air Force",
    "componentType": "Distributed Ground Station",
    "location": "JB Pearl Harbor-Hickam, HI",
    "mission": "Pacific theater ISR processing",
    "systems": "DCGS processing systems",
    "notes": "INDOPACOM support",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-35",
    "name": "DGS-5",
    "service": "Air Force",
    "componentType": "Distributed Ground Station",
    "location": "Ramstein AB, Germany",
    "mission": "EUCOM, AFRICOM, CENTCOM ISR processing",
    "systems": "DCGS processing systems",
    "notes": "European hub",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-36",
    "name": "70th ISR Wing",
    "service": "Air Force",
    "componentType": "Cryptologic Wing",
    "location": "Fort Meade, MD",
    "mission": "Only AF wing directly supporting NSA cryptologic intelligence; 6,200 Total Force across 23 squadrons",
    "systems": "NSA SIGINT systems",
    "notes": "28 worldwide locations",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-37",
    "name": "543rd ISR Group",
    "service": "Air Force",
    "componentType": "Regional SIGINT Group",
    "location": "JBSA-Lackland (Medina Annex), TX",
    "mission": "Commands Regional SIGINT Operations Centers",
    "systems": "RSOC systems",
    "notes": "Subordinate to 70th ISR Wing",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-38",
    "name": "350th Spectrum Warfare Wing",
    "service": "Air Force",
    "componentType": "EW Wing",
    "location": "Eglin AFB, FL",
    "mission": "First AF EW-focused wing; provides EW reprogramming, M&S, assessments for 70+ US and foreign systems",
    "systems": "EW reprogramming systems, threat libraries",
    "notes": "Activated June 2021",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-39",
    "name": "350th Spectrum Warfare Group",
    "service": "Air Force",
    "componentType": "EW Group",
    "location": "Eglin AFB, FL",
    "mission": "Fighter and bomber mission data file development",
    "systems": "Mission data files, threat databases",
    "notes": "Tactical aircraft EW support",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-40",
    "name": "850th Spectrum Warfare Group",
    "service": "Air Force",
    "componentType": "EW Assessment Group",
    "location": "Eglin AFB, FL",
    "mission": "Combat Shield EW assessments",
    "systems": "EW assessment systems",
    "notes": "Operational testing",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-41",
    "name": "950th Spectrum Warfare Group",
    "service": "Air Force",
    "componentType": "EW Software Group",
    "location": "Robins AFB, GA",
    "mission": "Software-based EW capabilities development",
    "systems": "EW software systems",
    "notes": "Software-defined EW focus",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-42",
    "name": "67th Cyberspace Wing",
    "service": "Air Force",
    "componentType": "Cyberspace Wing",
    "location": "JBSA-Lackland, TX",
    "mission": "Principal AF offensive cyber operations unit with EW/SIGINT intersection",
    "systems": "Offensive cyber tools",
    "notes": "5 subordinate groups",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-43",
    "name": "315th Network Warfare Squadron",
    "service": "Air Force",
    "componentType": "Network Warfare Squadron",
    "location": "Fort Meade, MD",
    "mission": "Offensive cyber operations with NSA coordination",
    "systems": "Offensive cyber tools",
    "notes": "Subordinate to 67th CW",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-44",
    "name": "688th Cyberspace Wing",
    "service": "Air Force",
    "componentType": "Cyberspace Wing",
    "location": "JBSA-Lackland, TX",
    "mission": "Defensive cyber and network operations",
    "systems": "Defensive cyber tools",
    "notes": "Network defense focus",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-45",
    "name": "Space Delta 3 (Mission Delta 3)",
    "service": "Space Force",
    "componentType": "EW Delta",
    "location": "Peterson SFB, CO",
    "mission": "Space Force EW; satellite communications spectrum defense with ~650 personnel",
    "systems": "Counter Communications System Block 10.2, Bounty Hunter",
    "notes": "Ground-based SATCOM jamming",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-46",
    "name": "4th Electromagnetic Warfare Squadron",
    "service": "Space Force",
    "componentType": "EW Squadron",
    "location": "Peterson SFB, CO",
    "mission": "Space-based EW operations",
    "systems": "CCS, Bounty Hunter",
    "notes": "Subordinate to DEL 3",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-47",
    "name": "5th Electromagnetic Warfare Squadron",
    "service": "Space Force",
    "componentType": "EW Squadron",
    "location": "Peterson SFB, CO",
    "mission": "Space-based EW operations",
    "systems": "CCS, Bounty Hunter",
    "notes": "Subordinate to DEL 3",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-48",
    "name": "16th Electromagnetic Warfare Squadron",
    "service": "Space Force",
    "componentType": "EW Squadron",
    "location": "Peterson SFB, CO",
    "mission": "Space-based EW operations",
    "systems": "CCS, Bounty Hunter",
    "notes": "Subordinate to DEL 3",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-49",
    "name": "23rd Electromagnetic Warfare Squadron",
    "service": "Space Force",
    "componentType": "EW Squadron",
    "location": "Peterson SFB, CO",
    "mission": "Space-based EW operations",
    "systems": "CCS, Bounty Hunter",
    "notes": "Subordinate to DEL 3",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-50",
    "name": "National Space Intelligence Center",
    "service": "Space Force",
    "componentType": "Intelligence Center",
    "location": "Wright-Patterson AFB, OH",
    "mission": "National/military space intelligence; space and counter-space analysis",
    "systems": "Space SIGINT analysis systems",
    "notes": "Space threat analysis",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-51",
    "name": "20th Fighter Wing",
    "service": "Air Force",
    "componentType": "Fighter Wing (SEAD)",
    "location": "Shaw AFB, SC",
    "mission": "F-16CJ Block 50/52 SEAD/DEAD operations with HARM Targeting System",
    "systems": "F-16CJ, AGM-88 HARM, HTS",
    "notes": "55th/77th/79th Fighter Squadrons",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-52",
    "name": "157th Fighter Squadron (ANG)",
    "service": "Air Force",
    "componentType": "Fighter Squadron (SEAD)",
    "location": "McEntire JNGB, SC",
    "mission": "ANG F-16CJ SEAD capability",
    "systems": "F-16CJ, AGM-88 HARM",
    "notes": "South Carolina ANG",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-53",
    "name": "Surface Warfare EW Community (DDG/CG fleet)",
    "service": "Navy",
    "componentType": "Surface Warfare",
    "location": "Fleet-wide",
    "mission": "Surface ship EW operators managing AN/SLQ-32 and SEWIP upgrades across DDGs, CGs, CVNs, amphibs",
    "systems": "AN/SLQ-32, SEWIP Block 2/3",
    "notes": "SEWIP Block 3 adds electronic attack",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-54",
    "name": "USS Pinckney (DDG-91)",
    "service": "Navy",
    "componentType": "Guided Missile Destroyer",
    "location": "San Diego, CA",
    "mission": "First ship to receive SEWIP Block 3 electronic attack capability",
    "systems": "SEWIP Block 3 (AN/SLQ-32(V)7)",
    "notes": "SEWIP Block 3 pathfinder",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-55",
    "name": "Cryptologic Warfare Group SIX",
    "service": "Navy",
    "componentType": "Cryptologic Warfare Group",
    "location": "Fort Meade, MD",
    "mission": "CTF 1060; provides trained IW officers and cryptologic enlisted for SIGINT, IO, cyber",
    "systems": "NSA SIGINT systems",
    "notes": "Fleet cryptologic support",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-56",
    "name": "NIOC Hawaii",
    "service": "Navy",
    "componentType": "Navy Information Operations Command",
    "location": "Wahiawa, Oahu, HI",
    "mission": "CTF 1070; Indo-Pacific SIGINT/cyber operations; 2,000+ personnel",
    "systems": "SIGINT collection/processing",
    "notes": "Largest NIOC",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-57",
    "name": "NIOC Texas",
    "service": "Navy",
    "componentType": "Navy Information Operations Command",
    "location": "JBSA-Lackland, TX",
    "mission": "CTF 1040; cryptologic operations",
    "systems": "SIGINT systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-58",
    "name": "NIOC Georgia",
    "service": "Navy",
    "componentType": "Navy Information Operations Command",
    "location": "Fort Eisenhower, GA",
    "mission": "CTF 1050; NSA/CSS Georgia coordination",
    "systems": "SIGINT systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-59",
    "name": "NIOC Colorado",
    "service": "Navy",
    "componentType": "Navy Information Operations Command",
    "location": "Buckley SFB, CO",
    "mission": "CTF 1080; space and signals intelligence",
    "systems": "Space SIGINT systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-60",
    "name": "NIOC Misawa",
    "service": "Navy",
    "componentType": "Navy Information Operations Command",
    "location": "Misawa, Japan",
    "mission": "CTG 1000.3; Pacific theater SIGINT",
    "systems": "SIGINT collection systems",
    "notes": "Forward Pacific",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-61",
    "name": "NIOC Menwith Hill",
    "service": "Navy",
    "componentType": "Navy Information Operations Command",
    "location": "UK",
    "mission": "CTG 1000.1; European theater SIGINT",
    "systems": "SIGINT collection systems",
    "notes": "Forward Europe",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-62",
    "name": "Cyber Group-One (CG-1)",
    "service": "Navy",
    "componentType": "Operational Cyber Command",
    "location": "Wahiawa, HI",
    "mission": "First operational cyber command in Indo-Pacific; oversees Cyber Mission Forces in theater",
    "systems": "Cyber/SIGINT systems",
    "notes": "Established August 2025",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-63",
    "name": "Information Warfare Commanders (IWC) - CSG staffs",
    "service": "Navy",
    "componentType": "Strike Group Staff",
    "location": "Fleet-wide (CSGs)",
    "mission": "Post-command O-6 integrating ~400 IW personnel across N-2, N-6, N-9/N-39, METOC in Carrier Strike Groups",
    "systems": "CSG IW systems",
    "notes": "Key EW/SIGINT integration node",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-64",
    "name": "IWRON Two (Pilot Program)",
    "service": "Navy",
    "componentType": "Information Warfare Squadron",
    "location": "Norfolk, VA",
    "mission": "~70 sailors; 48-month pilot to operationalize IW with elements from CSG staff, intel, cyber, NIOCs, oceanography",
    "systems": "IW integration systems",
    "notes": "Established December 2025",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-65",
    "name": "Naval Information Warfighting Development Center (NIWDC)",
    "service": "Navy",
    "componentType": "Training/Doctrine Center",
    "location": "Norfolk, VA",
    "mission": "IWC and IW community training and tactics development",
    "systems": "IW training systems",
    "notes": "IWC pipeline",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-66",
    "name": "VAQ-129 'Vikings'",
    "service": "Navy",
    "componentType": "EA-18G FRS",
    "location": "NAS Whidbey Island, WA",
    "mission": "Fleet Replacement Squadron training all EA-18G Growler crews",
    "systems": "EA-18G Growler",
    "notes": "Training squadron",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-67",
    "name": "VAQ-130 'Zappers'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Carrier-deployable electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "CVW assigned",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-68",
    "name": "VAQ-131 'Lancers'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Expeditionary electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "Expeditionary",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-69",
    "name": "VAQ-132 'Scorpions'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Expeditionary electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "Expeditionary",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-70",
    "name": "VAQ-133 'Wizards'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Carrier-deployable electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "CVW assigned",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-71",
    "name": "VAQ-134 'Garudas'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Expeditionary electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "Expeditionary",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-72",
    "name": "VAQ-135 'Black Ravens'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Expeditionary electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "Expeditionary",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-73",
    "name": "VAQ-136 'Gauntlets'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Carrier-deployable electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "CVW assigned",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-74",
    "name": "VAQ-137 'Rooks'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Carrier-deployable electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "CVW assigned",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-75",
    "name": "VAQ-138 'Yellowjackets'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Expeditionary electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "Expeditionary",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-76",
    "name": "VAQ-139 'Cougars'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Carrier-deployable electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "CVW assigned",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-77",
    "name": "VAQ-140 'Patriots'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Carrier-deployable electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "CVW assigned",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-78",
    "name": "VAQ-141 'Shadowhawks'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "MCAS Iwakuni, Japan",
    "mission": "Forward-deployed expeditionary electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "Only forward-deployed VAQ",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-79",
    "name": "VAQ-142 'Gray Wolves'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Carrier-deployable electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "CVW assigned",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-80",
    "name": "VAQ-144 'Main Battery'",
    "service": "Navy",
    "componentType": "EA-18G Squadron",
    "location": "NAS Whidbey Island, WA",
    "mission": "Carrier-deployable electronic attack squadron",
    "systems": "EA-18G Growler",
    "notes": "CVW assigned",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-81",
    "name": "VPU-2 'Wizards'",
    "service": "Navy",
    "componentType": "Special Projects Patrol Squadron",
    "location": "NAS Jacksonville, FL",
    "mission": "Modified P-8A Poseidon with non-standard SIGINT sensors; absorbing VQ-1 mission",
    "systems": "P-8A Poseidon (modified)",
    "notes": "SIGINT mission transition",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-82",
    "name": "VUP-19 'Big Red'",
    "service": "Navy",
    "componentType": "Unmanned Patrol Squadron",
    "location": "NAS Jacksonville, FL",
    "mission": "MQ-4C Triton operations; first unmanned patrol squadron (established 2016)",
    "systems": "MQ-4C Triton",
    "notes": "Unmanned SIGINT/ISR",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-83",
    "name": "P-8A Poseidon Squadrons (VP community)",
    "service": "Navy",
    "componentType": "Maritime Patrol",
    "location": "Various (Jacksonville, Whidbey)",
    "mission": "AN/ALQ-263 ASW SIGINT payload under Increment 3 Block 2 upgrades",
    "systems": "P-8A Poseidon, AN/ALQ-263",
    "notes": "Fleet-wide SIGINT upgrade",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-84",
    "name": "Center for Information Warfare Training (CIWT)",
    "service": "Navy",
    "componentType": "Training Command",
    "location": "NAS Pensacola Corry Station, FL",
    "mission": "'Cradle of Cryptology'; trains ~26,000 students annually across ~200 courses",
    "systems": "IW training systems",
    "notes": "Primary Navy IW training",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-85",
    "name": "IWTC Corry Station",
    "service": "Navy",
    "componentType": "Training Center",
    "location": "NAS Pensacola, FL",
    "mission": "CTT/CTR/CTM 'A' and 'C' schools",
    "systems": "Cryptologic training systems",
    "notes": "Enlisted cryptologic training",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-86",
    "name": "IWTC Virginia Beach",
    "service": "Navy",
    "componentType": "Training Center",
    "location": "Virginia Beach, VA",
    "mission": "CTT, ET, IS, IT training",
    "systems": "IW training systems",
    "notes": "East coast IW training",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-87",
    "name": "IWTC San Diego",
    "service": "Navy",
    "componentType": "Training Center",
    "location": "San Diego, CA",
    "mission": "West coast IW training",
    "systems": "IW training systems",
    "notes": "West coast IW training",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-88",
    "name": "IWTC Monterey",
    "service": "Navy",
    "componentType": "Training Center",
    "location": "Monterey, CA",
    "mission": "CTI linguist training at Defense Language Institute",
    "systems": "Language training",
    "notes": "Linguist pipeline",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-89",
    "name": "1st Radio Battalion",
    "service": "Marine Corps",
    "componentType": "Radio Battalion",
    "location": "Camp Pendleton, CA",
    "mission": "Tactical SIGINT and EW for I MEF; supports 11th, 13th, 15th MEUs",
    "systems": "MEWSS (LAV-EW), Prophet, tactical SIGINT",
    "notes": "I MIG subordinate",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-90",
    "name": "2nd Radio Battalion",
    "service": "Marine Corps",
    "componentType": "Radio Battalion",
    "location": "Camp Lejeune, NC",
    "mission": "Tactical SIGINT and EW for II MEF; supports 22nd, 24th, 26th MEUs",
    "systems": "MEWSS (LAV-EW), Prophet, tactical SIGINT",
    "notes": "II MIG subordinate",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-91",
    "name": "3rd Radio Battalion",
    "service": "Marine Corps",
    "componentType": "Radio Battalion",
    "location": "Kaneohe Bay, HI",
    "mission": "Tactical SIGINT and EW for III MEF; supports 31st MEU",
    "systems": "MEWSS (LAV-EW), Prophet, tactical SIGINT",
    "notes": "III MIG subordinate",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-92",
    "name": "I MEF Information Group (I MIG)",
    "service": "Marine Corps",
    "componentType": "MEF Information Group",
    "location": "Camp Pendleton, CA",
    "mission": "Information operations coordination for I MEF including EW, SIGINT, cyber, IO, MISO",
    "systems": "MIG systems",
    "notes": "1st Radio Bn, 1st Intel Bn, 9th Comm Bn",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-93",
    "name": "II MEF Information Group (II MIG)",
    "service": "Marine Corps",
    "componentType": "MEF Information Group",
    "location": "Camp Lejeune, NC",
    "mission": "Information operations coordination for II MEF including EW, SIGINT, cyber, IO, MISO",
    "systems": "MIG systems",
    "notes": "2nd Radio Bn, 2nd Intel Bn, 8th Comm Bn",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-94",
    "name": "III MEF Information Group (III MIG)",
    "service": "Marine Corps",
    "componentType": "MEF Information Group",
    "location": "Camp Hansen, Okinawa",
    "mission": "Information operations coordination for III MEF including EW, SIGINT, cyber, IO, MISO",
    "systems": "MIG systems",
    "notes": "3rd Radio Bn, 3rd Intel Bn",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-95",
    "name": "3rd Marine Littoral Regiment",
    "service": "Marine Corps",
    "componentType": "Marine Littoral Regiment",
    "location": "MCB Hawaii",
    "mission": "Force Design 2030 unit for EABO with enhanced SIGINT, cyber, IO capabilities; received NMESIS and MADIS",
    "systems": "NMESIS, MADIS, organic SIGINT",
    "notes": "Redesignated March 2022",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-96",
    "name": "12th Marine Littoral Regiment",
    "service": "Marine Corps",
    "componentType": "Marine Littoral Regiment",
    "location": "Okinawa, Japan",
    "mission": "Forming MLR with 12th Littoral Anti-Air Battalion activated December 2024",
    "systems": "MADIS, organic SIGINT",
    "notes": "12th LAAB activated Dec 2024",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-97",
    "name": "LAV-EW / MEWSS Units (Radio Battalions)",
    "service": "Marine Corps",
    "componentType": "Ground EW Element",
    "location": "Various (Pendleton, Lejeune, Hawaii)",
    "mission": "LAV-based stationary and OTM EW operations using CESAS II; deployed on amphibs",
    "systems": "LAV-EW with CESAS II",
    "notes": "Deployed on USS Bataan Jan 2023",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-98",
    "name": "L-MADIS Units",
    "service": "Marine Corps",
    "componentType": "Counter-UAS Element",
    "location": "Various",
    "mission": "Counter-UAS capability on MRZR all-terrain vehicles",
    "systems": "L-MADIS on MRZR",
    "notes": "Distributed C-UAS",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-99",
    "name": "MADIS Units (3rd LAAB)",
    "service": "Marine Corps",
    "componentType": "Air Defense Element",
    "location": "MCB Hawaii",
    "mission": "Short-range air defense on JLTVs; first fielded December 2024",
    "systems": "MADIS on JLTV",
    "notes": "Fielded Dec 2024",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-100",
    "name": "VMU-1",
    "service": "Marine Corps",
    "componentType": "Unmanned Aerial Vehicle Squadron",
    "location": "Yuma, AZ",
    "mission": "MQ-9A Reaper operations with advanced SIGINT sensors",
    "systems": "MQ-9A Reaper",
    "notes": "UAS SIGINT capability",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-101",
    "name": "VMU-3",
    "service": "Marine Corps",
    "componentType": "Unmanned Aerial Vehicle Squadron",
    "location": "Kaneohe Bay, HI",
    "mission": "MQ-9A Reaper operations; achieved IOC August 2023",
    "systems": "MQ-9A Reaper",
    "notes": "IOC August 2023",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-102",
    "name": "Intrepid Tiger II Users (AV-8B, F/A-18, KC-130J, UH-1Y, MV-22B)",
    "service": "Marine Corps",
    "componentType": "Airborne EW",
    "location": "Various",
    "mission": "AN/ALQ-231 Intrepid Tiger II precision EW jammer pods across multiple platforms",
    "systems": "AN/ALQ-231 Intrepid Tiger II",
    "notes": "First MV-22B mount June 2021",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-103",
    "name": "Marine Cryptologic Support Battalion",
    "service": "Marine Corps",
    "componentType": "Strategic SIGINT Battalion",
    "location": "Quantico, VA",
    "mission": "~550 Marines (26XX SIGINT) partnered with NSA at 8+ US and 5 overseas locations",
    "systems": "NSA SIGINT systems",
    "notes": "Part of MCIA",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-104",
    "name": "Intelligence Support Activity (ISA)",
    "service": "SOCOM",
    "componentType": "Tier 1 SIGINT/HUMINT Unit",
    "location": "Fort Liberty, NC",
    "mission": "JSOC's primary HUMINT and SIGINT unit; operational prep for Delta/DEVGRU; ~300 personnel",
    "systems": "Tactical and airborne SIGINT",
    "notes": "Historical names: CENTRA SPIKE, GRAY FOX",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-105",
    "name": "193rd Special Operations Wing",
    "service": "SOCOM",
    "componentType": "Special Operations Wing",
    "location": "Harrisburg ANG Base, PA",
    "mission": "Former EC-130J Commando Solo; transitioning to MC-130J for infiltration/exfiltration",
    "systems": "MC-130J Commando II (transitioning)",
    "notes": "PSYOP/EW capability retired Sep 2024",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-106",
    "name": "U-28A Draco Squadrons (319th/34th/318th SOS)",
    "service": "SOCOM",
    "componentType": "Special Operations Squadron",
    "location": "Various (Hurlburt, Cannon)",
    "mission": "30+ modified PC-12 for tactical ISR with remote SIGINT; transitioning to OA-1K Sky Warden",
    "systems": "U-28A Draco, OA-1K (incoming)",
    "notes": "Being replaced by 2029",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-107",
    "name": "AC-130J Ghostrider Units (4th/73rd SOS)",
    "service": "SOCOM",
    "componentType": "Special Operations Squadron",
    "location": "Hurlburt Field, FL",
    "mission": "Gunship with EW self-protection suite; planned EW Bus upgrade (Block 20+)",
    "systems": "AC-130J, AN/ALQ-172 DECM, LAIRCM",
    "notes": "EW self-protection focus",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-108",
    "name": "160th SOAR (Night Stalkers)",
    "service": "SOCOM",
    "componentType": "Special Operations Aviation Regiment",
    "location": "Fort Campbell, KY",
    "mission": "SOF aviation with advanced EW suites, IR countermeasures; developing new A2/AD EW capabilities",
    "systems": "MH-60M, MH-47G, AH/MH-6 EW suites",
    "notes": "Active A2/AD EW development",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-109",
    "name": "Support Operations Teams-Alpha (SOT-A)",
    "service": "SOCOM",
    "componentType": "SF SIGINT Teams",
    "location": "Various (SF Groups)",
    "mission": "Low-level tactical SIGINT teams deploying with ODAs for comms intercept and DF",
    "systems": "Man-portable SIGINT systems",
    "notes": "One per SF Group",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-110",
    "name": "75th Ranger Regiment MI Battalion CEMA Company",
    "service": "SOCOM",
    "componentType": "Ranger CEMA Element",
    "location": "Fort Moore, GA",
    "mission": "Integrates cyber, EW, SIGINT, technical surveillance for Ranger multi-domain ops",
    "systems": "Tactical cyber/EW/SIGINT",
    "notes": "Established May 2017",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-111",
    "name": "DEVGRU Black Squadron",
    "service": "SOCOM",
    "componentType": "SOF Intelligence Element",
    "location": "Virginia Beach, VA",
    "mission": "~100 members; AFO including clandestine intel and special reconnaissance",
    "systems": "Multi-source intel systems",
    "notes": "Advance Force Operations",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-112",
    "name": "NSWG-10 Mission Support Center",
    "service": "SOCOM",
    "componentType": "SOF ISR Support",
    "location": "Various",
    "mission": "SOF ISR through specialized intel, surveillance, reconnaissance, and POE capabilities",
    "systems": "SOF ISR systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-113",
    "name": "SOCS-SIGINT/EW (MARSOC)",
    "service": "SOCOM",
    "componentType": "MARSOC SIGINT/EW",
    "location": "Camp Lejeune, NC",
    "mission": "Deploys at every MARSOF echelon using JTWS man-portable SIGINT backpacks",
    "systems": "JTWS backpack SIGINT",
    "notes": "Direction finding, comms analysis",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-114",
    "name": "Cyber National Mission Force (CNMF)",
    "service": "CYBERCOM",
    "componentType": "Sub-Unified Command",
    "location": "Fort Meade, MD",
    "mission": "2,000+ personnel across 39 joint cyber teams in 6 task forces; defends against nation-state cyber threats with SIGINT integration",
    "systems": "Offensive/defensive cyber tools",
    "notes": "Elevated to sub-unified cmd Dec 2022",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-115",
    "name": "CNMF AI Task Force",
    "service": "CYBERCOM",
    "componentType": "AI Integration Element",
    "location": "Fort Meade, MD",
    "mission": "AI integration for cyber operations",
    "systems": "AI/ML cyber tools",
    "notes": "Established July 2024",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-116",
    "name": "Army Cyber Command (ARCYBER)",
    "service": "Army",
    "componentType": "Service Cyber Component",
    "location": "Fort Eisenhower, GA",
    "mission": "Army component to CYBERCOM; employs ECTs through 11th Cyber Bn; CEMA doctrine proponent",
    "systems": "Army cyber/CEMA systems",
    "notes": "FM 3-12 CEMA doctrine",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-117",
    "name": "Fleet Cyber Command / 10th Fleet",
    "service": "Navy",
    "componentType": "Service Cyber Component",
    "location": "Fort Meade, MD",
    "mission": "Navy Service Cryptologic Component to NSA/CSS; full spectrum cyber, EW, IO, SIGINT",
    "systems": "Navy cyber/SIGINT systems",
    "notes": "16,000+ personnel",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-118",
    "name": "16th Air Force (Air Forces Cyber)",
    "service": "Air Force",
    "componentType": "Service Cyber Component",
    "location": "JBSA-Lackland, TX",
    "mission": "AF component to CYBERCOM and NSA; leads AF SIGINT integration",
    "systems": "AF cyber/ISR systems",
    "notes": "Information Warfare NAF",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-119",
    "name": "Marine Forces Cyberspace Command",
    "service": "Marine Corps",
    "componentType": "Service Cyber Component",
    "location": "Fort Meade, MD",
    "mission": "~800 personnel including MC Cyberspace Warfare Group for OCO",
    "systems": "Marine cyber systems",
    "notes": "Company L, MCSB",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-120",
    "name": "DOD Cyber Defense Command (DCDC)",
    "service": "CYBERCOM",
    "componentType": "Sub-Unified Command",
    "location": "Fort Meade, MD",
    "mission": "Coordinates DODIN defense; requires understanding of adversary SIGINT/EW capabilities",
    "systems": "Defensive cyber systems",
    "notes": "Elevated to sub-unified cmd May 2025",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-121",
    "name": "National Mission Teams (CMF)",
    "service": "CYBERCOM",
    "componentType": "Cyber Mission Teams",
    "location": "Various",
    "mission": "13 teams defending nation against cyberattacks with direct NSA SIGINT support",
    "systems": "Cyber/SIGINT integration tools",
    "notes": "NSA direct support",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-122",
    "name": "Combat Mission Teams (CMF)",
    "service": "CYBERCOM",
    "componentType": "Cyber Mission Teams",
    "location": "Various",
    "mission": "27 teams supporting CCMD operations integrated with EW/IO planning",
    "systems": "Cyber/EW integration tools",
    "notes": "CCMD assigned",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-123",
    "name": "Cyber Protection Teams (CMF)",
    "service": "CYBERCOM",
    "componentType": "Cyber Mission Teams",
    "location": "Various",
    "mission": "68 teams defending priority DoD networks with EW awareness",
    "systems": "Defensive cyber tools",
    "notes": "Network defense",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-124",
    "name": "Joint Electromagnetic Spectrum Operations Center (JEC)",
    "service": "STRATCOM",
    "componentType": "Joint EMSO Center",
    "location": "Offutt AFB, NE",
    "mission": "Heart of DoD EMSO; coordinates electromagnetic spectrum operations across DoD",
    "systems": "EMSO C2 systems",
    "notes": "Activated July 2023",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-125",
    "name": "Joint Electronic Warfare Center (JEWC)",
    "service": "Joint",
    "componentType": "Joint EW Center",
    "location": "JBSA-Lackland, TX",
    "mission": "Joint EW doctrine, training, CCMD operational support, EM OPFOR replication",
    "systems": "EW training/doctrine systems",
    "notes": "OPFOR capability",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-126",
    "name": "Joint Center for Electromagnetic Readiness (JCER)",
    "service": "Joint",
    "componentType": "Joint Readiness Center",
    "location": "Nellis AFB, NV",
    "mission": "JEMSO readiness assessment",
    "systems": "Readiness assessment tools",
    "notes": "Red Flag integration",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-127",
    "name": "Joint Spectrum Center (JSC)",
    "service": "Joint",
    "componentType": "Spectrum Management Center",
    "location": "Annapolis, MD",
    "mission": "DoD 'Center of Excellence' for spectrum ops; 190 personnel, $94M budget; EMBM program",
    "systems": "Spectrum management systems",
    "notes": "Supports 10+ CCMDs",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-128",
    "name": "INDOPACOM JEMSOC / J2",
    "service": "Joint",
    "componentType": "CCMD EW/Intel Staff",
    "location": "Makalapa, HI",
    "mission": "EMS Coordinating Authority and intelligence fusion for Indo-Pacific; China/DPRK focus",
    "systems": "JEMSOC systems",
    "notes": "NSA/CSS Hawaii integration",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-129",
    "name": "EUCOM JEMSOC / JAC Molesworth",
    "service": "Joint",
    "componentType": "CCMD EW/Intel Staff",
    "location": "RAF Molesworth, UK",
    "mission": "EMS Coordinating Authority and intelligence fusion for European theater; Russia focus",
    "systems": "JEMSOC systems",
    "notes": "NATO integration",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-130",
    "name": "CENTCOM JEMSOC / J2",
    "service": "Joint",
    "componentType": "CCMD EW/Intel Staff",
    "location": "MacDill AFB, FL",
    "mission": "EMS Coordinating Authority and intelligence fusion for Middle East/Central Asia",
    "systems": "JEMSOC systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-131",
    "name": "AFRICOM JEMSOC / J2",
    "service": "Joint",
    "componentType": "CCMD EW/Intel Staff",
    "location": "Stuttgart, Germany",
    "mission": "EMS Coordinating Authority and intelligence fusion for Africa; CT and partner capacity",
    "systems": "JEMSOC systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-132",
    "name": "NORTHCOM/NORAD JEMSOC / J2",
    "service": "Joint",
    "componentType": "CCMD EW/Intel Staff",
    "location": "Peterson SFB, CO",
    "mission": "EMS Coordinating Authority for homeland defense; dual-national (US-Canada)",
    "systems": "JEMSOC systems",
    "notes": "Binational command",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-133",
    "name": "SPACECOM Deputy J3 for IW",
    "service": "Joint",
    "componentType": "CCMD IW Staff",
    "location": "Peterson SFB, CO",
    "mission": "Space domain information warfare coordination",
    "systems": "Space IW systems",
    "notes": "Established April 2022",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-134",
    "name": "NSA Colorado (NSAC)",
    "service": "NSA",
    "componentType": "Regional Cryptologic Center",
    "location": "Buckley SFB, CO",
    "mission": "Overhead SIGINT, ELINT analysis",
    "systems": "National SIGINT systems",
    "notes": "Space-based focus",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-135",
    "name": "NSA Georgia (NSAG)",
    "service": "NSA",
    "componentType": "Regional Cryptologic Center",
    "location": "Fort Eisenhower, GA",
    "mission": "Europe, Middle East, North Africa SIGINT; up to 4,000 capacity",
    "systems": "National SIGINT systems",
    "notes": "Major expansion complete",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-136",
    "name": "NSA Hawaii (NSAH)",
    "service": "NSA",
    "componentType": "Regional Cryptologic Center",
    "location": "Wahiawa, Oahu, HI",
    "mission": "Asia-Pacific SIGINT; primary INDOPACOM support",
    "systems": "National SIGINT systems",
    "notes": "Pacific primary",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-137",
    "name": "NSA Texas (NSAT)",
    "service": "NSA",
    "componentType": "Regional Cryptologic Center",
    "location": "Medina Annex, Lackland, TX",
    "mission": "Foreign SIGINT, cybersecurity",
    "systems": "National SIGINT systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-138",
    "name": "China Lake Ranges (NAWCWD)",
    "service": "Navy",
    "componentType": "Test Range",
    "location": "California",
    "mission": "Navy's principal Electronic Combat Range; 1.1M+ acres; threat systems, HWIL testing",
    "systems": "Threat emitters, HWIL labs",
    "notes": "Largest Navy range",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-139",
    "name": "Point Mugu Sea Range (NAWCWD)",
    "service": "Navy",
    "componentType": "Test Range",
    "location": "California",
    "mission": "World's largest instrumented over-water range; expandable to 220,000 sq miles",
    "systems": "Maritime EW test systems",
    "notes": "Over-water EW testing",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-140",
    "name": "White Sands Missile Range - Center for Countermeasures",
    "service": "Army",
    "componentType": "Test Range",
    "location": "New Mexico",
    "mission": "ECM/ECCM testing; 3,200+ sq miles",
    "systems": "Countermeasures test systems",
    "notes": "Joint use",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-141",
    "name": "Eglin AFB Ranges",
    "service": "Air Force",
    "componentType": "Test Range",
    "location": "Florida",
    "mission": "350th SWW testing, Gulf Range maritime EW",
    "systems": "EW test systems",
    "notes": "Gulf maritime testing",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-142",
    "name": "Electronic Proving Ground",
    "service": "Army",
    "componentType": "Test Range",
    "location": "Fort Huachuca, AZ",
    "mission": "Army ground EW systems testing",
    "systems": "Ground EW test systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "unit-143",
    "name": "Nevada Test and Training Range (NTTR)",
    "service": "Air Force",
    "componentType": "Test Range",
    "location": "Nevada",
    "mission": "12,000+ sq miles; contested EMS environment for Red Flag",
    "systems": "Threat emitters, EW environment",
    "notes": "Red Flag primary range",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  }
];

const buyersData = [
  {
    "id": "org-0",
    "name": "Electronic Warfare",
    "organization": "OUSD ASD(A)",
    "service": "OSD",
    "category": "Electronic Warfare",
    "description": "Platform and Weapon Portfolio Management - Electronic Warfare division",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-1",
    "name": "Cyber Warfare",
    "organization": "OUSD ASD(A)",
    "service": "OSD",
    "category": "Cyber/EW",
    "description": "Platform and Weapon Portfolio Management - Cyber Warfare division",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-2",
    "name": "Command Control Communication Computers (C4) and Missile Defense",
    "organization": "OUSD ASD(A)",
    "service": "OSD",
    "category": "C4ISR",
    "description": "Strategic Space and Intelligence Portfolio Management",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-3",
    "name": "Nuclear Command and Control and Communications",
    "organization": "OUSD ASD(A)",
    "service": "OSD",
    "category": "C2",
    "description": "Strategic communications and nuclear C2",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-4",
    "name": "Chief Digital and Artificial Intelligence Office (CDAO)",
    "organization": "OSD (R&E)",
    "service": "OSD",
    "category": "AI/Autonomy",
    "description": "Tradewinds acquisition ecosystem for AI/ML",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-5",
    "name": "Integrated Non-Kinetic and Electronic Warfare",
    "organization": "OSD (R&E) MDA",
    "service": "OSD",
    "category": "Electronic Warfare",
    "description": "Advanced Capabilities Office - EW integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-6",
    "name": "Command Control Battle Management Communications (C2BMC)",
    "organization": "OSD (R&E) MDA",
    "service": "OSD",
    "category": "C4ISR",
    "description": "Decision dominance and C2",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-7",
    "name": "ISR Enterprise Capabilities",
    "organization": "OSD (I&S)",
    "service": "OSD",
    "category": "ISR",
    "description": "Intelligence and Security Programs",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-8",
    "name": "Battlespace Awareness & Security Programs",
    "organization": "OSD (I&S)",
    "service": "OSD",
    "category": "ISR",
    "description": "Intelligence and Security Programs",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-9",
    "name": "Technical Collection",
    "organization": "OSD (I&S)",
    "service": "OSD",
    "category": "SIGINT",
    "description": "Collection and Special Programs",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-10",
    "name": "Artificial Intelligence and Machine Learning (AI/ML)",
    "organization": "DIU",
    "service": "OSD",
    "category": "AI/Autonomy",
    "description": "Defense Innovation Unit technology portfolio",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-11",
    "name": "Autonomy",
    "organization": "DIU",
    "service": "OSD",
    "category": "Autonomy",
    "description": "Defense Innovation Unit autonomous systems portfolio",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-12",
    "name": "Replicator 2",
    "organization": "DIU",
    "service": "OSD",
    "category": "Autonomy",
    "description": "Autonomous systems replication program (now reports to SOCOM DAWG)",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-13",
    "name": "Cyber and Telecommunications",
    "organization": "DIU",
    "service": "OSD",
    "category": "Cyber/RF",
    "description": "Defense Innovation Unit cyber portfolio",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-14",
    "name": "Space",
    "organization": "DIU",
    "service": "OSD",
    "category": "Space/RF",
    "description": "Defense Innovation Unit space portfolio",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-15",
    "name": "Defense Information Systems Agency",
    "organization": "DISA",
    "service": "OSD",
    "category": "C4ISR",
    "description": "Information systems and networks",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-16",
    "name": "Directorate for Science & Technology",
    "organization": "DIA",
    "service": "OSD",
    "category": "Intelligence",
    "description": "Defense Intelligence Agency S&T",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-17",
    "name": "Directorate for Operations",
    "organization": "DIA",
    "service": "OSD",
    "category": "Intelligence",
    "description": "Defense Intelligence Agency operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-18",
    "name": "Information Innovation Office (I2O)",
    "organization": "DARPA",
    "service": "DARPA",
    "category": "AI/Autonomy/Cyber",
    "description": "Information technology and autonomy research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-19",
    "name": "Microsystems Technology Office",
    "organization": "DARPA",
    "service": "DARPA",
    "category": "RF/Electronics",
    "description": "Microsystems and RF technology",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-20",
    "name": "Strategic Technology Office",
    "organization": "DARPA",
    "service": "DARPA",
    "category": "Multi-domain",
    "description": "Strategic technology development",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-21",
    "name": "Tactical Technology Office",
    "organization": "DARPA",
    "service": "DARPA",
    "category": "Autonomy/ISR",
    "description": "Tactical systems and autonomy",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-22",
    "name": "Defense Sciences Office",
    "organization": "DARPA",
    "service": "DARPA",
    "category": "Advanced Tech",
    "description": "Foundational science research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-23",
    "name": "Cyber Electronic Warfare And Information Dominance",
    "organization": "Army RCCTO",
    "service": "Army",
    "category": "Electronic Warfare",
    "description": "Rapid Capabilities and Critical Technologies Office",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-24",
    "name": "Selective Propagation APS Radar (SPAR)",
    "organization": "Army RCCTO",
    "service": "Army",
    "category": "RF/Radar",
    "description": "Advanced radar systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-25",
    "name": "Directed Energy Project Office",
    "organization": "Army RCCTO",
    "service": "Army",
    "category": "Directed Energy",
    "description": "High energy laser and directed energy",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-26",
    "name": "Intelligence Directorate",
    "organization": "Army G-2",
    "service": "Army",
    "category": "Intelligence",
    "description": "Army staff intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-27",
    "name": "INSCOM Army Intelligence and Security Command",
    "organization": "Army G-2",
    "service": "Army",
    "category": "SIGINT/Intelligence",
    "description": "Army intelligence and security",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-28",
    "name": "Army Counterintelligence Command",
    "organization": "Army G-2",
    "service": "Army",
    "category": "Intelligence",
    "description": "Counterintelligence operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-29",
    "name": "Foreign Intelligence Directorate (DAMI-FI)",
    "organization": "Army G-2",
    "service": "Army",
    "category": "Intelligence",
    "description": "Foreign intelligence collection",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-30",
    "name": "Office of Emerging Technology (OET)",
    "organization": "Army G-6",
    "service": "Army",
    "category": "Emerging Tech",
    "description": "Network and emerging technology",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-31",
    "name": "Networks and C4 Services and Integration (NC4SI)",
    "organization": "Army G-6",
    "service": "Army",
    "category": "C4ISR",
    "description": "Network integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-32",
    "name": "Cybersecurity Integration and Synchronization (CIS)",
    "organization": "Army G-6",
    "service": "Army",
    "category": "Cyber",
    "description": "Cybersecurity integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-33",
    "name": "Capability Program Executive Intelligence Electronic Warfare & Sensor",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "EW/ISR/SIGINT",
    "description": "Primary Army EW acquisition organization",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-34",
    "name": "PM Cyber and Space (PM C&S)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Cyber/Space",
    "description": "Cyber and space systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-35",
    "name": "Information Warfare Cyber Infrastructure (IWCI)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Cyber",
    "description": "Information warfare infrastructure",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-36",
    "name": "Information Warfare Cyber Development (IWCD)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Cyber",
    "description": "Cyber development programs",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-37",
    "name": "SAVANT CATALYST (SC)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Cyber/AI",
    "description": "Advanced cyber analytics",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-38",
    "name": "PM Defensive Cyber Operations (PM DCO)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Cyber",
    "description": "Defensive cyber operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-39",
    "name": "Cyber Analytics and Detection (CAD)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Cyber/AI",
    "description": "Cyber analytics platform",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-40",
    "name": "Cyber Platforms and Systems (CPS)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Cyber",
    "description": "Cyber platforms",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-41",
    "name": "PM Electronic Warfare and Cyber (PM EW&C)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Electronic Warfare",
    "description": "Primary Army EW program office",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-42",
    "name": "Electronic Attack (EA)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Electronic Warfare",
    "description": "Electronic attack systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-43",
    "name": "Electronic Warfare Integration (EWI)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Electronic Warfare",
    "description": "EW integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-44",
    "name": "Strategic Spectrum Warfare (SSW)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Spectrum/EW",
    "description": "Strategic spectrum operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-45",
    "name": "Terrestrial Spectrum Warfare (TSW)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Spectrum/EW",
    "description": "Ground-based spectrum warfare",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-46",
    "name": "PM Intelligence Systems and Analytics (PM IS&A)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Intelligence/AI",
    "description": "Intelligence systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-47",
    "name": "Data and Analytics",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "AI/Data",
    "description": "Data analytics for intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-48",
    "name": "Intelligence Systems",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "ISR",
    "description": "Intelligence collection systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-49",
    "name": "Project Linchpin",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Intelligence",
    "description": "Intelligence integration project",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-50",
    "name": "Joint Tactical Terminal (JTT)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "SIGINT",
    "description": "Tactical SIGINT terminal",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-51",
    "name": "PM Positioning Navigation and Timing (PM PNT)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "PNT/RF",
    "description": "PNT systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-52",
    "name": "Dismounted PNT",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "PNT",
    "description": "Soldier PNT systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-53",
    "name": "PNT Modernization",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "PNT",
    "description": "PNT modernization programs",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-54",
    "name": "PM Sensors Aerial Intelligence (PM SAI)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "ISR/Sensors",
    "description": "Aerial ISR sensors",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-55",
    "name": "Aerial Enhanced Radars Optics and Sensors (AEROS)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Radar/Sensors",
    "description": "Aerial sensor systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-56",
    "name": "Medium Altitude Reconnaissance and Surveillance System (MARSS)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "ISR",
    "description": "MARSS platform",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-57",
    "name": "Multi-Domain Sensing System (MDSS)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "ISR/Multi-domain",
    "description": "Multi-domain sensing",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-58",
    "name": "Tactical Exploitation of National Capabilities (TENCAP)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "ISR/SIGINT",
    "description": "National-tactical integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-59",
    "name": "PM Terrestrial Sensors (PM TS)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Sensors/RF",
    "description": "Ground sensor systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-60",
    "name": "Aerostats",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "ISR/RF",
    "description": "Aerostat sensor platforms",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-61",
    "name": "Combat Terrain Information System (CTIS)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "ISR",
    "description": "Terrain information systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-62",
    "name": "Force Protection Systems (FPS)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Sensors/C-UAS",
    "description": "Force protection sensors",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-63",
    "name": "Ground Sensors (GS)",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Sensors/RF",
    "description": "Ground sensor systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-64",
    "name": "IEW&S Integration Directorate",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Integration",
    "description": "EW/ISR integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-65",
    "name": "Open Architecture and Standards",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Architecture",
    "description": "Open architecture for EW/ISR",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-66",
    "name": "Digital Testing and Engineering",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "Digital Engineering",
    "description": "Digital engineering for EW",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-67",
    "name": "Command Control Communications and Network",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "C4",
    "description": "C4 integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-68",
    "name": "NGC2",
    "organization": "CPE IEW&S",
    "service": "Army",
    "category": "C2",
    "description": "Next generation command and control",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-69",
    "name": "PM Cyber Test and Training",
    "organization": "PM CT2",
    "service": "Army",
    "category": "Cyber",
    "description": "Cyber training and test systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-70",
    "name": "Persistent Cyber Training Environment (PCTE)",
    "organization": "PM CT2",
    "service": "Army",
    "category": "Cyber",
    "description": "Cyber training environment",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-71",
    "name": "IEWTPT",
    "organization": "PM CT2",
    "service": "Army",
    "category": "EW Training",
    "description": "IEW training platform",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-72",
    "name": "Army Threat Systems Program EW",
    "organization": "PM CT2",
    "service": "Army",
    "category": "EW Training",
    "description": "EW threat simulation",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-73",
    "name": "C5ISR Center",
    "organization": "DEVCOM",
    "service": "Army",
    "category": "C5ISR",
    "description": "Command Control Comms Computers Cyber Intel Surveillance Reconnaissance",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-74",
    "name": "Army Research Laboratory (ARL)",
    "organization": "DEVCOM",
    "service": "Army",
    "category": "Research",
    "description": "Foundational research including RF/EW",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-75",
    "name": "Aviation & Missile Center",
    "organization": "DEVCOM",
    "service": "Army",
    "category": "Aviation/Missiles",
    "description": "Aviation and missile research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-76",
    "name": "Artificial Intelligence Integration Center (AI2C)",
    "organization": "Army AFC",
    "service": "Army",
    "category": "AI",
    "description": "AI integration center",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-77",
    "name": "Intelligence Capability Development Integration Directorate",
    "organization": "Army AFC",
    "service": "Army",
    "category": "Intelligence",
    "description": "Intelligence capability development",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-78",
    "name": "Cyber Capability Development And Integration Directorate",
    "organization": "Army AFC",
    "service": "Army",
    "category": "Cyber",
    "description": "Cyber capability development",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-79",
    "name": "Air and Missile Defense Cross-Functional Team",
    "organization": "Army AFC",
    "service": "Army",
    "category": "AMD",
    "description": "Air and missile defense modernization",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-80",
    "name": "Command and Control Cross-Functional Team",
    "organization": "Army AFC",
    "service": "Army",
    "category": "C2",
    "description": "C2 modernization",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-81",
    "name": "Army Multi-Domain Targeting Center (AMTC)",
    "organization": "Army AFC",
    "service": "Army",
    "category": "Multi-domain",
    "description": "Multi-domain targeting",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-82",
    "name": "Intelligence Center of Excellence (ICoE)",
    "organization": "T2COM",
    "service": "Army",
    "category": "Intelligence",
    "description": "Intelligence training and doctrine",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-83",
    "name": "Cyber Center of Excellence (CSoE)",
    "organization": "T2COM",
    "service": "Army",
    "category": "Cyber",
    "description": "Cyber training and doctrine",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-84",
    "name": "Space and Missile Defense Center of Excellence (SMDCoE)",
    "organization": "T2COM",
    "service": "Army",
    "category": "Space/AMD",
    "description": "Space and missile defense training",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-85",
    "name": "The Army Intelligence Battle Lab (IBL)",
    "organization": "T2COM",
    "service": "Army",
    "category": "Intelligence",
    "description": "Intelligence battle lab",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-86",
    "name": "Global Tactical Edge Acquisition Directorate",
    "organization": "G-TEAD",
    "service": "Army",
    "category": "Acquisition",
    "description": "Tactical edge systems acquisition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-87",
    "name": "Cyber Directorate",
    "organization": "G-TEAD",
    "service": "Army",
    "category": "Cyber",
    "description": "Cyber acquisition support",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-88",
    "name": "Army Communications-Electronics Command",
    "organization": "CECOM",
    "service": "Army",
    "category": "C4ISR",
    "description": "Communications-electronics support",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-89",
    "name": "Navy Rapid Capabilities Office (NRCO)",
    "organization": "Secretary of the Navy",
    "service": "Navy",
    "category": "Rapid Acquisition",
    "description": "Navy rapid capabilities",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-90",
    "name": "PEO Robotic and Autonomous Systems",
    "organization": "Secretary of the Navy",
    "service": "Navy",
    "category": "Autonomy",
    "description": "Robotic and autonomous systems acquisition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-91",
    "name": "N2/N6 Information Warfare and Director of Naval Intelligence",
    "organization": "OPNAV",
    "service": "Navy",
    "category": "Information Warfare",
    "description": "Navy information warfare",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-92",
    "name": "N2/N6I Warfighting Integration",
    "organization": "OPNAV",
    "service": "Navy",
    "category": "Integration",
    "description": "IW warfighting integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-93",
    "name": "N2/N6T Strategic Integration",
    "organization": "OPNAV",
    "service": "Navy",
    "category": "Integration",
    "description": "Strategic IW integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-94",
    "name": "N9IZ Robotic Autonomous Systems Group",
    "organization": "OPNAV",
    "service": "Navy",
    "category": "Autonomy",
    "description": "Autonomous systems requirements",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-95",
    "name": "N9W Digital Warfare Office",
    "organization": "OPNAV",
    "service": "Navy",
    "category": "Digital Warfare",
    "description": "Digital warfare requirements",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-96",
    "name": "ONI Intelligence Directorate",
    "organization": "Office of Naval Intelligence",
    "service": "Navy",
    "category": "Intelligence",
    "description": "Naval intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-97",
    "name": "Farragut Technical Analysis Center",
    "organization": "Office of Naval Intelligence",
    "service": "Navy",
    "category": "Intelligence",
    "description": "Technical analysis",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-98",
    "name": "Kennedy Maritime Analysis Center",
    "organization": "Office of Naval Intelligence",
    "service": "Navy",
    "category": "Intelligence",
    "description": "Maritime intelligence analysis",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-99",
    "name": "Hopper Global Communications Center",
    "organization": "Office of Naval Intelligence",
    "service": "Navy",
    "category": "Communications",
    "description": "Global communications",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-100",
    "name": "Navy Information Forces",
    "organization": "NAVIFOR",
    "service": "Navy",
    "category": "Information Warfare",
    "description": "Navy information forces command",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-101",
    "name": "Naval Information Warfighting Development Center (NIWDC)",
    "organization": "NAVIFOR",
    "service": "Navy",
    "category": "Information Warfare",
    "description": "IW development center",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-102",
    "name": "Code 31 - C5ISRT",
    "organization": "ONR",
    "service": "Navy",
    "category": "C5ISR",
    "description": "Command Control Computing Communications Cyber Intelligence Surveillance Reconnaissance Targeting",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-103",
    "name": "Division 311 - Mathematics Computer and Information Sciences",
    "organization": "ONR",
    "service": "Navy",
    "category": "Computing/AI",
    "description": "Computer and information sciences research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-104",
    "name": "Division 312 - Electronics Sensors and Network Research",
    "organization": "ONR",
    "service": "Navy",
    "category": "RF/Sensors",
    "description": "Electronics and sensors research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-105",
    "name": "Division 313 - Applications and Transitions",
    "organization": "ONR",
    "service": "Navy",
    "category": "Transitions",
    "description": "Technology transition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-106",
    "name": "Code 32 - Ocean Battlespace Sensing",
    "organization": "ONR",
    "service": "Navy",
    "category": "Sensors/ISR",
    "description": "Ocean sensing research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-107",
    "name": "Code 35 Division 353 - Directed Energy Programs",
    "organization": "ONR",
    "service": "Navy",
    "category": "Directed Energy",
    "description": "Directed energy research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-108",
    "name": "NRL",
    "organization": "Naval Research Laboratory",
    "service": "Navy",
    "category": "Research",
    "description": "Navy research laboratory",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-109",
    "name": "NAVWAR PEO Command Control Communications Computers and Intelligence",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "C4I",
    "description": "Primary Navy C4I acquisition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-110",
    "name": "Project Overmatch",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "Integration",
    "description": "Navy network integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-111",
    "name": "PMA/PMW-101 Multifunctional Information Distribution System",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "Data Links",
    "description": "MIDS and tactical data links",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-112",
    "name": "MIDS Joint Tactical Radio System (JTRS)",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "RF/Comms",
    "description": "Joint tactical radio",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-113",
    "name": "Advanced Tactical Data Links",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "Data Links",
    "description": "Advanced data links",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-114",
    "name": "Link 16 Waveform programs",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "RF/Comms",
    "description": "Link 16 programs",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-115",
    "name": "PMW 120 Battlespace Awareness & Information Operations",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "ISR",
    "description": "Battlespace awareness",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-116",
    "name": "Ships Signal Exploitation Equipment (SSEE)",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "SIGINT",
    "description": "Shipboard SIGINT",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-117",
    "name": "Horizon",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "ISR",
    "description": "ISR system",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-118",
    "name": "Distributed Common Ground System-Navy (DCGS-N)",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "ISR",
    "description": "Navy DCGS",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-119",
    "name": "Littoral Battlespace Sensing - Unmanned Undersea Vehicles (LBS-UUV)",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "Autonomy/ISR",
    "description": "Autonomous undersea sensing",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-120",
    "name": "Electromagnetic Maneuver Warfare Integrated Fires (EMWIF)",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "EW/Fires",
    "description": "Electromagnetic maneuver warfare",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-121",
    "name": "PMW 130 Cybersecurity Program Office",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "Cyber",
    "description": "Navy cybersecurity",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-122",
    "name": "PMW 150 Naval Command and Control Systems",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "C2",
    "description": "Naval C2 systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-123",
    "name": "PMW 160 Tactical Networks",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "Networks",
    "description": "Tactical networking",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-124",
    "name": "CANES Consolidated Afloat Networks and Enterprise Services",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "Networks",
    "description": "Afloat networks",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-125",
    "name": "PMW/A 170 Communications & GPS Navigation",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "RF/PNT",
    "description": "Communications and GPS",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-126",
    "name": "PMW 770 Undersea Communications and Integration",
    "organization": "PEO C4I",
    "service": "Navy",
    "category": "Comms",
    "description": "Undersea communications",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-127",
    "name": "PEO Unmanned Aviation and Strike Weapons",
    "organization": "PEO U&W",
    "service": "Navy",
    "category": "Autonomy",
    "description": "Unmanned aviation acquisition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-128",
    "name": "PMA-262 Persistent Maritime Unmanned Aircraft Systems",
    "organization": "PEO U&W",
    "service": "Navy",
    "category": "Autonomy/ISR",
    "description": "MQ-4C Triton and persistent UAS",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-129",
    "name": "PMA-263 Navy and Marine Small Tactical Unmanned Air Systems",
    "organization": "PEO U&W",
    "service": "Navy",
    "category": "Autonomy",
    "description": "Small tactical UAS",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-130",
    "name": "PMA-266 Multi-Mission Tactical UAS",
    "organization": "PEO U&W",
    "service": "Navy",
    "category": "Autonomy",
    "description": "MQ-9A Reaper and tactical UAS",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-131",
    "name": "PMA-268 Unmanned Carrier Aviation",
    "organization": "PEO U&W",
    "service": "Navy",
    "category": "Autonomy",
    "description": "Carrier-based unmanned aviation",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-132",
    "name": "Unmanned Carrier Aviation Mission Control System (UMCS)",
    "organization": "PEO U&W",
    "service": "Navy",
    "category": "Autonomy/C2",
    "description": "Unmanned carrier aviation C2",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-133",
    "name": "PMA-281 Strike Planning and Execution Systems",
    "organization": "PEO U&W",
    "service": "Navy",
    "category": "C2",
    "description": "Strike planning systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-134",
    "name": "CCS Unmanned System Common Control System",
    "organization": "PEO U&W",
    "service": "Navy",
    "category": "Autonomy/C2",
    "description": "Common unmanned control system",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-135",
    "name": "PMA 234 Airborne Electronic Attack Systems",
    "organization": "PEO Tactical Aircraft",
    "service": "Navy",
    "category": "Electronic Warfare",
    "description": "Electronic attack systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-136",
    "name": "Next Generation Jammer",
    "organization": "PEO Tactical Aircraft",
    "service": "Navy",
    "category": "Electronic Warfare",
    "description": "NGJ electronic attack pod",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-137",
    "name": "ALQ-231 Intrepid Tiger Pod",
    "organization": "PEO Tactical Aircraft",
    "service": "Navy",
    "category": "Electronic Warfare",
    "description": "Intrepid Tiger EW pod",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-138",
    "name": "PMA 265 F/A-18 and EA-18G Program Office",
    "organization": "PEO Tactical Aircraft",
    "service": "Navy",
    "category": "EW/Aviation",
    "description": "EA-18G Growler program",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-139",
    "name": "PMA-272 Advanced Tactical Aircraft Protection Systems",
    "organization": "PEO Tactical Aircraft",
    "service": "Navy",
    "category": "Electronic Warfare",
    "description": "Aircraft protection systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-140",
    "name": "Integrated Defensive Electronic Countermeasures (IDECM)",
    "organization": "PEO Tactical Aircraft",
    "service": "Navy",
    "category": "Electronic Warfare",
    "description": "Defensive EW countermeasures",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-141",
    "name": "PMA-209 Air Combat Electronics",
    "organization": "PEO Tactical Aircraft",
    "service": "Navy",
    "category": "Avionics",
    "description": "Combat avionics and electronics",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-142",
    "name": "Sensors Low Probability of Intercept Altimeter (LPIA)",
    "organization": "PEO Tactical Aircraft",
    "service": "Navy",
    "category": "Sensors/RF",
    "description": "LPI sensors",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-143",
    "name": "PEO Digital and Enterprise Services",
    "organization": "PEO Digital",
    "service": "Navy",
    "category": "Digital",
    "description": "Digital services acquisition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-144",
    "name": "Joint Worldwide Intelligence Communication System (JWICS) Modernization",
    "organization": "PEO Digital",
    "service": "Navy",
    "category": "Intelligence",
    "description": "JWICS modernization",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-145",
    "name": "Joint Deployable Intelligence Support System (JDISS)",
    "organization": "PEO Digital",
    "service": "Navy",
    "category": "Intelligence",
    "description": "Deployable intel systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-146",
    "name": "Global Command and Control System (GCCS) I3",
    "organization": "PEO Digital",
    "service": "Navy",
    "category": "C2",
    "description": "GCCS integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-147",
    "name": "Tactical Communications and Electronic Warfare Systems",
    "organization": "Marine Corps",
    "service": "Marine Corps",
    "category": "EW/Comms",
    "description": "Marine EW and tactical comms",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-148",
    "name": "DC I Information",
    "organization": "Marine Corps",
    "service": "Marine Corps",
    "category": "Information Warfare",
    "description": "Marine information warfare",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-149",
    "name": "Command Control Communications and Computers (IC4)",
    "organization": "Marine Corps",
    "service": "Marine Corps",
    "category": "C4",
    "description": "Marine C4 systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-150",
    "name": "Intelligence Division",
    "organization": "Marine Corps",
    "service": "Marine Corps",
    "category": "Intelligence",
    "description": "Marine intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-151",
    "name": "Information Operations Center",
    "organization": "Marine Corps",
    "service": "Marine Corps",
    "category": "Information Ops",
    "description": "Marine information operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-152",
    "name": "Marine Air Ground Task Force Command & Control System",
    "organization": "PMM 202",
    "service": "Marine Corps",
    "category": "C2",
    "description": "MAGTF C2",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-153",
    "name": "Air Battle Management & Sensor Netting (ABM&SN)",
    "organization": "PMM 202",
    "service": "Marine Corps",
    "category": "C2/Sensors",
    "description": "Air battle management and sensor integration",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-154",
    "name": "Expeditionary Radars (PM EXR)",
    "organization": "PMM 203",
    "service": "Marine Corps",
    "category": "Radar/RF",
    "description": "Marine expeditionary radars",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-155",
    "name": "Ground Based Air Defense (PM GBAD)",
    "organization": "PMM 208",
    "service": "Marine Corps",
    "category": "AMD/Sensors",
    "description": "Marine air defense",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-156",
    "name": "Marine Air Defense Integrated System (MADIS)",
    "organization": "PMM 208",
    "service": "Marine Corps",
    "category": "C-UAS/AMD",
    "description": "Counter-UAS and air defense",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-157",
    "name": "Light Marine Air Defense Integrated System (L-MADIS)",
    "organization": "PMM 208",
    "service": "Marine Corps",
    "category": "C-UAS",
    "description": "Light counter-UAS system",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-158",
    "name": "Intelligence Systems and Cyberspace Operations (PM INTEL CO)",
    "organization": "PMM 211",
    "service": "Marine Corps",
    "category": "Intelligence/Cyber",
    "description": "Marine intel and cyber",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-159",
    "name": "Distributed Common Ground System-Marine Corps",
    "organization": "PMM 211",
    "service": "Marine Corps",
    "category": "ISR",
    "description": "Marine DCGS",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-160",
    "name": "Family of Integrated Targeting and Exploitation",
    "organization": "PMM 211",
    "service": "Marine Corps",
    "category": "ISR/Targeting",
    "description": "Targeting systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-161",
    "name": "Marine Corps Cyberspace Operations",
    "organization": "PMM 211",
    "service": "Marine Corps",
    "category": "Cyber",
    "description": "Marine cyber operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-162",
    "name": "Marine Corps Warfighting Laboratory (MCWL)",
    "organization": "MCCDC",
    "service": "Marine Corps",
    "category": "Research",
    "description": "Marine warfighting lab",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-163",
    "name": "Marine Corps Warfighting Laboratory Rapid Capabilities Office",
    "organization": "MCCDC",
    "service": "Marine Corps",
    "category": "Rapid Acquisition",
    "description": "Marine rapid capabilities",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-164",
    "name": "A2 Intelligence AF/A2",
    "organization": "Air Force",
    "service": "Air Force",
    "category": "Intelligence",
    "description": "Air Force intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-165",
    "name": "AF/A2-A6O Intelligence Surveillance and Reconnaissance",
    "organization": "Air Force",
    "service": "Air Force",
    "category": "ISR",
    "description": "Air Force ISR",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-166",
    "name": "A6 Warfighter Communications and Cyber Systems AF/A6",
    "organization": "Air Force",
    "service": "Air Force",
    "category": "Cyber/Comms",
    "description": "Air Force communications and cyber",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-167",
    "name": "Chief Data and AI Office (CND)",
    "organization": "Air Force",
    "service": "Air Force",
    "category": "AI/Data",
    "description": "Air Force data and AI office",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-168",
    "name": "Chief Information Security Officer (CNZ)",
    "organization": "Air Force",
    "service": "Air Force",
    "category": "Cyber",
    "description": "Air Force CISO",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-169",
    "name": "Space Development Agency (SDA)",
    "organization": "Air Force",
    "service": "Air Force",
    "category": "Space/RF",
    "description": "Space Development Agency",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-170",
    "name": "PEO Command Control Communications (C3) and Battle Management",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "C3BM",
    "description": "Air Force C3 and battle management",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-171",
    "name": "Advanced Battle Management System (ABMS)",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "C2/Integration",
    "description": "Advanced battle management",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-172",
    "name": "Aerial Networks Division",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Networks/RF",
    "description": "Aerial networking",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-173",
    "name": "Command Control Intelligence Surveillance and Reconnaissance (C2ISR)",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "C2ISR",
    "description": "C2ISR systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-174",
    "name": "Kessel Run",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Software/AI",
    "description": "Software factory",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-175",
    "name": "PEO Electronic Systems Directorate (HB)",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Electronics",
    "description": "Electronic systems acquisition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-176",
    "name": "Electronics Warfare",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Electronic Warfare",
    "description": "Air Force EW systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-177",
    "name": "Force Protection",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Force Protection",
    "description": "Force protection systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-178",
    "name": "Combat Avionics",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Avionics",
    "description": "Combat avionics systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-179",
    "name": "Theater Battle Control",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "C2",
    "description": "Theater battle control",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-180",
    "name": "PEO Cyber and Networks Directorate (HN)",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Cyber/Networks",
    "description": "Cyber and networks acquisition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-181",
    "name": "Cryptologic & Cyber Systems Division",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Crypto/Cyber",
    "description": "Cryptologic and cyber systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-182",
    "name": "C3I Infrastructure Division",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "C3I",
    "description": "C3I infrastructure",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-183",
    "name": "C3I&N Special Programs Division",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Special Programs",
    "description": "Special C3I programs",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-184",
    "name": "PEO Intelligence Surveillance and Reconnaissance and SOF Directorate (WI)",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "ISR",
    "description": "ISR systems acquisition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-185",
    "name": "High Altitude ISR Systems",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "ISR",
    "description": "High altitude ISR",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-186",
    "name": "Medium Altitude UAS",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Autonomy/ISR",
    "description": "Medium altitude unmanned systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-187",
    "name": "ISR Sensors and FMS",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Sensors",
    "description": "ISR sensors",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-188",
    "name": "E-3 AWACS and Wedgetail",
    "organization": "AFLCMC",
    "service": "Air Force",
    "category": "Radar/C2",
    "description": "Airborne warning and control",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-189",
    "name": "PEO Nuclear Command Control & Comms Integration Directorate (NC3)",
    "organization": "AFNWC",
    "service": "Air Force",
    "category": "NC3",
    "description": "Nuclear C3",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-190",
    "name": "Sensors Directorate (RY)",
    "organization": "AFRL",
    "service": "Air Force",
    "category": "Sensors/RF",
    "description": "Sensor research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-191",
    "name": "Directed Energy Directorate (RD)",
    "organization": "AFRL",
    "service": "Air Force",
    "category": "Directed Energy",
    "description": "Directed energy research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-192",
    "name": "Information Directorate (RI)",
    "organization": "AFRL",
    "service": "Air Force",
    "category": "Information/AI",
    "description": "Information technology research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-193",
    "name": "Integrated Capabilities Directorate (RS)",
    "organization": "AFRL",
    "service": "Air Force",
    "category": "Integration",
    "description": "Integrated capabilities research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-194",
    "name": "Space Vehicles Directorate (RV)",
    "organization": "AFRL",
    "service": "Air Force",
    "category": "Space",
    "description": "Space vehicle research",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-195",
    "name": "AFWERX (RG)",
    "organization": "AFWERX",
    "service": "Air Force",
    "category": "Innovation",
    "description": "Air Force innovation hub",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-196",
    "name": "S-2 Intelligence",
    "organization": "Space Force",
    "service": "Space Force",
    "category": "Intelligence",
    "description": "Space Force intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-197",
    "name": "S-6 Cyber and Data",
    "organization": "Space Force",
    "service": "Space Force",
    "category": "Cyber/Data",
    "description": "Space Force cyber",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-198",
    "name": "PEO Space Rapid Capabilities Office",
    "organization": "Space Force",
    "service": "Space Force",
    "category": "Rapid Acquisition",
    "description": "Space rapid capabilities",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-199",
    "name": "Delta 2 - Space Domain Awareness",
    "organization": "Space Force",
    "service": "Space Force",
    "category": "Space/ISR",
    "description": "Space domain awareness",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-200",
    "name": "Delta 3 - Space Electromagnetic Warfare",
    "organization": "Space Force",
    "service": "Space Force",
    "category": "Electronic Warfare",
    "description": "Space EW operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-201",
    "name": "Delta 4 - Missile Warning",
    "organization": "Space Force",
    "service": "Space Force",
    "category": "Sensors/ISR",
    "description": "Missile warning operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-202",
    "name": "Delta 6 - Cyberspace Warfare",
    "organization": "Space Force",
    "service": "Space Force",
    "category": "Cyber",
    "description": "Space cyberspace operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-203",
    "name": "Space Delta 7 - ISR and Targeting",
    "organization": "Space Force",
    "service": "Space Force",
    "category": "ISR",
    "description": "Space ISR and targeting",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-204",
    "name": "Delta 8 - Satellite Communications",
    "organization": "Space Force",
    "service": "Space Force",
    "category": "SATCOM/RF",
    "description": "Satellite communications",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-205",
    "name": "Delta 9 - Orbital Warfare",
    "organization": "Space Force",
    "service": "Space Force",
    "category": "Space",
    "description": "Orbital warfare operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-206",
    "name": "PEO Space Sensing (SSC/SN)",
    "organization": "SSC",
    "service": "Space Force",
    "category": "Sensors/Space",
    "description": "Space sensing acquisition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-207",
    "name": "Space Sensing System Delta 84",
    "organization": "SSC",
    "service": "Space Force",
    "category": "Sensors",
    "description": "Space sensing systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-208",
    "name": "Space Domain Awareness (SDA) System Delta 85",
    "organization": "SSC",
    "service": "Space Force",
    "category": "ISR",
    "description": "Space domain awareness systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-209",
    "name": "Sensing and Targeting (SBST) System Delta 810",
    "organization": "SSC",
    "service": "Space Force",
    "category": "Sensors/Targeting",
    "description": "Space sensing and targeting",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-210",
    "name": "Space Delta 831 - Positioning Navigation and Timing (PNT)",
    "organization": "SSC",
    "service": "Space Force",
    "category": "PNT/RF",
    "description": "Space PNT",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-211",
    "name": "PEO Domain Awareness and Combat Power (CP)",
    "organization": "SSC",
    "service": "Space Force",
    "category": "Space/EW",
    "description": "Domain awareness and combat power",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-212",
    "name": "Electromagnetic Warfare Systems Delta",
    "organization": "SSC",
    "service": "Space Force",
    "category": "Electronic Warfare",
    "description": "Space EW systems acquisition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-213",
    "name": "Defense Cyber Ops Advanced Global Capabilities",
    "organization": "SSC",
    "service": "Space Force",
    "category": "Cyber",
    "description": "Advanced cyber capabilities",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-214",
    "name": "Orbital Warfare Acquisition Delta",
    "organization": "SSC",
    "service": "Space Force",
    "category": "Space",
    "description": "Orbital warfare acquisition",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-215",
    "name": "Space Surveillance and Reconnaissance",
    "organization": "SSC",
    "service": "Space Force",
    "category": "ISR",
    "description": "Space surveillance",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-216",
    "name": "PEO Battle Management Command Control & Comms (BMC3I)",
    "organization": "SSC",
    "service": "Space Force",
    "category": "C3",
    "description": "Space battle management",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-217",
    "name": "Battlespace Awareness",
    "organization": "SSC",
    "service": "Space Force",
    "category": "ISR",
    "description": "Space battlespace awareness",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-218",
    "name": "Rapid Resilient Command and Control",
    "organization": "SSC",
    "service": "Space Force",
    "category": "C2",
    "description": "Rapid resilient C2",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-219",
    "name": "Global Mission Data Dominance",
    "organization": "SSC",
    "service": "Space Force",
    "category": "Data",
    "description": "Mission data dominance",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-220",
    "name": "PEO Military Comms & Positioning Navigation and Timing (MCPNT)",
    "organization": "SSC",
    "service": "Space Force",
    "category": "Comms/PNT",
    "description": "Military comms and PNT",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-221",
    "name": "Protected TACTICAL SATCOM (PTS)",
    "organization": "SSC",
    "service": "Space Force",
    "category": "SATCOM/RF",
    "description": "Protected tactical SATCOM",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-222",
    "name": "Wideband Satellite Communications",
    "organization": "SSC",
    "service": "Space Force",
    "category": "SATCOM/RF",
    "description": "Wideband SATCOM",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-223",
    "name": "Narrowband Satellite Communications",
    "organization": "SSC",
    "service": "Space Force",
    "category": "SATCOM/RF",
    "description": "Narrowband SATCOM",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-224",
    "name": "Protected Satellite Communications",
    "organization": "SSC",
    "service": "Space Force",
    "category": "SATCOM/RF",
    "description": "Protected SATCOM",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-225",
    "name": "Ground-Based Electro-Optical Deep Space Surveillance",
    "organization": "SSC",
    "service": "Space Force",
    "category": "ISR/Sensors",
    "description": "Ground-based space surveillance",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-226",
    "name": "Global Positioning System",
    "organization": "SSC",
    "service": "Space Force",
    "category": "PNT/RF",
    "description": "GPS operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-227",
    "name": "SOF-ATL Defense Autonomous Warfare Group (DAWG)",
    "organization": "SOCOM",
    "service": "SOCOM",
    "category": "Autonomy",
    "description": "SOCOM autonomous warfare",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-228",
    "name": "SOCOM Science and Technology Directorate",
    "organization": "SOCOM",
    "service": "SOCOM",
    "category": "S&T",
    "description": "SOCOM science and technology",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-229",
    "name": "J-6 Communications Command Control and Computer (C4)",
    "organization": "SOCOM",
    "service": "SOCOM",
    "category": "C4",
    "description": "SOCOM C4",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-230",
    "name": "Directorate of Enterprise Information Systems (SOF DIR-EIS)",
    "organization": "SOCOM",
    "service": "SOCOM",
    "category": "Information Systems",
    "description": "SOCOM information systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-231",
    "name": "C4IAS - Command Control Communications Computers Automation and Information",
    "organization": "SOCOM",
    "service": "SOCOM",
    "category": "C4I",
    "description": "SOCOM C4I systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-232",
    "name": "C2ISR-T - Command and Control Intelligence Surveillance Reconnaissance-Transport",
    "organization": "SOCOM",
    "service": "SOCOM",
    "category": "C2ISR",
    "description": "SOCOM C2ISR transport",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-233",
    "name": "SOCRATES - SOC Research Analysis and Threat Information",
    "organization": "SOCOM",
    "service": "SOCOM",
    "category": "Intelligence",
    "description": "SOCOM threat analysis",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-234",
    "name": "SOF PEO Fixed Wing",
    "organization": "PEO-FW",
    "service": "SOCOM",
    "category": "Aviation",
    "description": "SOCOM fixed wing aircraft",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-235",
    "name": "Airborne ISR & Non-standard Aviation Division",
    "organization": "PEO-FW",
    "service": "SOCOM",
    "category": "ISR",
    "description": "SOCOM airborne ISR",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-236",
    "name": "Emerging Technology Division",
    "organization": "PEO-FW",
    "service": "SOCOM",
    "category": "Emerging Tech",
    "description": "SOCOM emerging tech",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-237",
    "name": "SOF PEO Digital Applications",
    "organization": "PEO-SDA",
    "service": "SOCOM",
    "category": "Digital",
    "description": "SOCOM digital applications",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-238",
    "name": "SOF Digital Ecosystem",
    "organization": "PEO-SDA",
    "service": "SOCOM",
    "category": "Digital",
    "description": "SOF digital ecosystem",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-239",
    "name": "SOF PEO Tactical Information Systems",
    "organization": "PEO-TIS",
    "service": "SOCOM",
    "category": "Information Systems",
    "description": "SOCOM tactical information systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-240",
    "name": "SOF PEO Special Operations Forces Warrior",
    "organization": "PEO-SW",
    "service": "SOCOM",
    "category": "Warrior Systems",
    "description": "SOCOM warrior systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-241",
    "name": "SOF PEO Maritime",
    "organization": "PEO-M",
    "service": "SOCOM",
    "category": "Maritime",
    "description": "SOCOM maritime systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-242",
    "name": "Undersea Systems",
    "organization": "PEO-M",
    "service": "SOCOM",
    "category": "Undersea/Autonomy",
    "description": "SOCOM undersea systems",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-243",
    "name": "J2 - Intelligence Directorate",
    "organization": "INDOPACOM",
    "service": "INDOPACOM",
    "category": "Intelligence",
    "description": "INDOPACOM intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-244",
    "name": "J6 - Command Control Communications and Cyber Directorate",
    "organization": "INDOPACOM",
    "service": "INDOPACOM",
    "category": "C4/Cyber",
    "description": "INDOPACOM C4 and cyber",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-245",
    "name": "J2 - Intelligence",
    "organization": "CENTCOM",
    "service": "CENTCOM",
    "category": "Intelligence",
    "description": "CENTCOM intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-246",
    "name": "J6 Cyber",
    "organization": "CENTCOM",
    "service": "CENTCOM",
    "category": "Cyber",
    "description": "CENTCOM cyber",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-247",
    "name": "Office of the Chief Technology Officer",
    "organization": "CENTCOM",
    "service": "CENTCOM",
    "category": "Technology",
    "description": "CENTCOM CTO",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-248",
    "name": "J2 Intelligence",
    "organization": "EUCOM",
    "service": "EUCOM",
    "category": "Intelligence",
    "description": "EUCOM intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-249",
    "name": "J6 Cyber Command Control Communications",
    "organization": "EUCOM",
    "service": "EUCOM",
    "category": "C4/Cyber",
    "description": "EUCOM C4 and cyber",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-250",
    "name": "J2 - Intelligence",
    "organization": "STRATCOM",
    "service": "STRATCOM",
    "category": "Intelligence",
    "description": "STRATCOM intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-251",
    "name": "Joint Electromagnetic Spectrum Operations (JEMSO)",
    "organization": "STRATCOM",
    "service": "STRATCOM",
    "category": "Spectrum/EW",
    "description": "Joint spectrum operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-252",
    "name": "Joint Electromagnetic Operations Center (JEC)",
    "organization": "STRATCOM",
    "service": "STRATCOM",
    "category": "EW/Spectrum",
    "description": "Joint EM operations center",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-253",
    "name": "NEC - Nuclear Command Control and Communications (NC3) Enterprise Center",
    "organization": "STRATCOM",
    "service": "STRATCOM",
    "category": "NC3",
    "description": "NC3 enterprise center",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-254",
    "name": "J2 Director of Intelligence",
    "organization": "SPACECOM",
    "service": "SPACECOM",
    "category": "Intelligence",
    "description": "SPACECOM intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-255",
    "name": "J6 - Digital Superiority Directorate",
    "organization": "SPACECOM",
    "service": "SPACECOM",
    "category": "Digital/Cyber",
    "description": "SPACECOM digital superiority",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-256",
    "name": "Army Space & Missile Defense Command",
    "organization": "SPACECOM",
    "service": "SPACECOM",
    "category": "Space/AMD",
    "description": "Army space component",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-257",
    "name": "Navy Space Command",
    "organization": "SPACECOM",
    "service": "SPACECOM",
    "category": "Space",
    "description": "Navy space component",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-258",
    "name": "CYBERCOM Headquarters Staff",
    "organization": "CYBERCOM",
    "service": "CYBERCOM",
    "category": "Cyber",
    "description": "US Cyber Command",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-259",
    "name": "J2 Intelligence",
    "organization": "CYBERCOM",
    "service": "CYBERCOM",
    "category": "Cyber/Intel",
    "description": "CYBERCOM intelligence",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-260",
    "name": "J3 Operations",
    "organization": "CYBERCOM",
    "service": "CYBERCOM",
    "category": "Cyber",
    "description": "CYBERCOM operations",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-261",
    "name": "J-6 Command Control Communications & Computers/Cyber",
    "organization": "CYBERCOM",
    "service": "CYBERCOM",
    "category": "C4/Cyber",
    "description": "CYBERCOM C4",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-262",
    "name": "Office of Artificial Intelligence and Quantum (AIQ)",
    "organization": "DOE",
    "service": "DOE",
    "category": "AI/Quantum",
    "description": "DOE AI and quantum office",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-263",
    "name": "National Quantum Information Science Research Centers",
    "organization": "DOE",
    "service": "DOE",
    "category": "Quantum",
    "description": "Quantum research centers",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-264",
    "name": "Quantum Science Center (QSC)",
    "organization": "DOE",
    "service": "DOE",
    "category": "Quantum",
    "description": "Oak Ridge quantum center",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-265",
    "name": "Quantum Systems Accelerator (QSA)",
    "organization": "DOE",
    "service": "DOE",
    "category": "Quantum",
    "description": "Lawrence Berkeley quantum center",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-266",
    "name": "SCEC - Sensors Communications and Electronics Consortium",
    "organization": "OTA Consortium",
    "service": "Consortium",
    "category": "Sensors/RF",
    "description": "Sensors and electronics OTA",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-267",
    "name": "C5 - Consortium C4ISR and cyber technology sectors",
    "organization": "OTA Consortium",
    "service": "Consortium",
    "category": "C4ISR/Cyber",
    "description": "C4ISR and cyber OTA",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-268",
    "name": "S2MARTS - Strategic & Spectrum Missions Advanced Resilient Trusted Systems",
    "organization": "OTA Consortium",
    "service": "Consortium",
    "category": "Spectrum",
    "description": "Strategic spectrum OTA",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-269",
    "name": "NSC - National Spectrum Consortium",
    "organization": "OTA Consortium",
    "service": "Consortium",
    "category": "Spectrum/RF",
    "description": "National spectrum OTA",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-270",
    "name": "IWRP - Information Warfare Research Project Consortium",
    "organization": "OTA Consortium",
    "service": "Consortium",
    "category": "Information Warfare",
    "description": "IW research OTA",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-271",
    "name": "SpEC - Space Enterprise Consortium",
    "organization": "OTA Consortium",
    "service": "Consortium",
    "category": "Space",
    "description": "Space enterprise OTA",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  },
  {
    "id": "org-272",
    "name": "UTIC - Undersea Technology Innovation Consortium",
    "organization": "OTA Consortium",
    "service": "Consortium",
    "category": "Undersea",
    "description": "Undersea technology OTA",
    "notes": "",
    "poc": "",
    "status": "not-engaged",
    "lastContact": null
  }
];

export default function CustomerEngagementHeatmap() {
  const [mode, setMode] = useState('users');
  const [units, setUnits] = useState(usersData);
  const [orgs, setOrgs] = useState(buyersData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState({});
  const [viewMode, setViewMode] = useState('list');
  const [showAddModal, setShowAddModal] = useState(false);

  const data = mode === 'users' ? units : orgs;
  const setData = mode === 'users' ? setUnits : setOrgs;

  const services = useMemo(() => [...new Set(data.map(d => d.service))].sort(), [data]);
  const categories = useMemo(() => mode === 'buyers' ? [...new Set(orgs.map(o => o.category))].sort() : [], [orgs, mode]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      const matchesService = filterService === 'all' || item.service === filterService;
      const matchesCategory = mode === 'users' || filterCategory === 'all' || item.category === filterCategory;
      const searchFields = mode === 'users' 
        ? [item.name, item.location, item.componentType, item.mission]
        : [item.name, item.organization, item.category, item.description];
      const matchesSearch = searchQuery === '' || 
        searchFields.some(f => f && f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesService && matchesSearch && matchesCategory;
    });
  }, [data, filterStatus, filterService, filterCategory, searchQuery, mode]);

  const groupedData = useMemo(() => {
    const groups = {};
    filteredData.forEach(item => {
      const key = item.service;
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return groups;
  }, [filteredData]);

  const stats = useMemo(() => {
    const total = data.length;
    const engaged = data.filter(d => ['engaged', 'deployed', 'contract'].includes(d.status)).length;
    const pipeline = data.filter(d => d.status === 'contacted').length;
    return { total, engaged, pipeline };
  }, [data]);

  const updateItem = (itemId, updates) => {
    setData(prev => prev.map(item => item.id === itemId ? { ...item, ...updates, lastContact: new Date().toISOString().split('T')[0] } : item));
  };

  const addItem = (newItem) => {
    const id = `${mode === 'users' ? 'unit' : 'org'}-custom-${Date.now()}`;
    setData(prev => [...prev, { ...newItem, id, status: 'not-engaged', lastContact: null }]);
  };

  const deleteItem = (itemId) => {
    setData(prev => prev.filter(item => item.id !== itemId));
    setSelectedItem(null);
  };

  const UserCard = ({ item, compact = false }) => {
    const svc = getServiceColor(item.service);
    const st = statusConfig[item.status];
    const isCustom = item.id.startsWith('unit-custom');
    
    if (compact) {
      return (
        <div onClick={() => setSelectedItem(item)} style={{
          background: svc.bg, border: `1px solid ${svc.border}`,
          borderRadius: '6px', padding: '10px 12px', cursor: 'pointer', marginBottom: '8px',
        }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' }}>{item.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '9px', color: svc.text, background: svc.badge, padding: '2px 6px', borderRadius: '3px' }}>{item.service}</span>
            <span style={{ fontSize: '10px', color: '#64748b' }}>{item.location}</span>
          </div>
          {item.poc && <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}><User size={10} />{item.poc}</div>}
        </div>
      );
    }
    
    return (
      <div onClick={() => setSelectedItem(item)} style={{
        background: `linear-gradient(135deg, ${svc.bg} 0%, ${st.color} 100%)`,
        border: `1px solid ${svc.border}`, borderLeft: `4px solid ${svc.border}`,
        borderRadius: '8px', padding: '14px 16px', cursor: 'pointer', transition: 'all 0.2s ease', position: 'relative',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${svc.border}33`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
        {isCustom && <div style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '8px', background: '#2563eb', color: 'white', padding: '2px 6px', borderRadius: '3px' }}>CUSTOM</div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' }}>{item.name}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.componentType}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', marginLeft: '12px', marginTop: isCustom ? '16px' : '0' }}>
            <span style={{ fontSize: '9px', fontWeight: '600', color: svc.text, background: svc.badge, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>{item.service}</span>
            <span style={{ fontSize: '9px', color: st.textColor, background: `${st.border}33`, padding: '2px 6px', borderRadius: '3px' }}>{st.label}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '11px' }}><MapPin size={10} />{item.location}</div>
        {item.poc && <div style={{ marginTop: '6px', fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><User size={10} />{item.poc}</div>}
        {item.notes && <div style={{ marginTop: '8px', fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', borderTop: '1px solid #334155', paddingTop: '8px' }}>{item.notes}</div>}
      </div>
    );
  };

  const BuyerCard = ({ item, compact = false }) => {
    const svc = getServiceColor(item.service);
    const st = statusConfig[item.status];
    const isCustom = item.id.startsWith('org-custom');
    
    if (compact) {
      return (
        <div onClick={() => setSelectedItem(item)} style={{
          background: svc.bg, border: `1px solid ${svc.border}`,
          borderRadius: '6px', padding: '10px 12px', cursor: 'pointer', marginBottom: '8px',
        }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' }}>{item.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '9px', color: svc.text, background: svc.badge, padding: '2px 6px', borderRadius: '3px' }}>{item.service}</span>
            <span style={{ fontSize: '10px', color: '#64748b' }}>{item.organization}</span>
          </div>
          {item.poc && <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}><User size={10} />{item.poc}</div>}
        </div>
      );
    }
    
    return (
      <div onClick={() => setSelectedItem(item)} style={{
        background: `linear-gradient(135deg, ${svc.bg} 0%, ${st.color} 100%)`,
        border: `1px solid ${svc.border}`, borderLeft: `4px solid ${svc.border}`,
        borderRadius: '8px', padding: '14px 16px', cursor: 'pointer', transition: 'all 0.2s ease', position: 'relative',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${svc.border}33`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
        {isCustom && <div style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '8px', background: '#f59e0b', color: 'white', padding: '2px 6px', borderRadius: '3px' }}>CUSTOM</div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' }}>{item.name}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.organization}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', marginLeft: '12px', marginTop: isCustom ? '16px' : '0' }}>
            <span style={{ fontSize: '9px', fontWeight: '600', color: svc.text, background: svc.badge, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>{item.service}</span>
            <span style={{ fontSize: '9px', color: st.textColor, background: `${st.border}33`, padding: '2px 6px', borderRadius: '3px' }}>{st.label}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '11px', marginBottom: '6px' }}><Building2 size={10} />{item.category}</div>
        {item.poc && <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><User size={10} />{item.poc}</div>}
        {item.notes && <div style={{ marginTop: '8px', fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', borderTop: '1px solid #334155', paddingTop: '8px' }}>{item.notes}</div>}
      </div>
    );
  };

  const ItemCard = ({ item, compact = false }) => {
    return mode === 'users' ? <UserCard item={item} compact={compact} /> : <BuyerCard item={item} compact={compact} />;
  };

  const UserModal = ({ item, onClose }) => {
    const [notes, setNotes] = useState(item.notes || '');
    const [status, setStatus] = useState(item.status);
    const [poc, setPoc] = useState(item.poc || '');
    const svc = getServiceColor(item.service);
    const isCustom = item.id.startsWith('unit-custom');
    const save = () => { updateItem(item.id, { status, notes, poc }); onClose(); };
    
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
        <div style={{ background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)', border: `1px solid ${svc.border}`, borderRadius: '16px', padding: '28px', width: '600px', maxHeight: '90vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: '600', color: svc.text, background: svc.badge, padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase' }}>{item.service}</span>
                {isCustom && <span style={{ fontSize: '10px', fontWeight: '600', color: 'white', background: '#2563eb', padding: '4px 10px', borderRadius: '4px' }}>CUSTOM</span>}
              </div>
              <h3 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700', margin: '0 0 4px 0' }}>{item.name}</h3>
              <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{item.componentType}</p>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
          </div>
          
          <div style={{ marginBottom: '20px', padding: '16px', background: '#1e293b', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', marginBottom: '12px' }}><MapPin size={14} />{item.location}</div>
            {item.mission && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Mission</div>
                <p style={{ color: '#cbd5e1', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>{item.mission}</p>
              </div>
            )}
            {item.systems && (
              <div style={{ paddingTop: '12px', borderTop: '1px solid #334155' }}>
                <span style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Systems: </span>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>{item.systems}</span>
              </div>
            )}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '8px', textTransform: 'uppercase' }}>Point of Contact</label>
            <input value={poc} onChange={e => setPoc(e.target.value)} placeholder="Name, title, email, phone..." style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px' }} />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '10px', textTransform: 'uppercase' }}>Engagement Status</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <button key={key} onClick={() => setStatus(key)} style={{ background: status === key ? cfg.color : '#0f172a', border: `2px solid ${status === key ? cfg.textColor : '#334155'}`, borderRadius: '8px', padding: '12px', color: status === key ? cfg.textColor : '#64748b', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>{cfg.label}</button>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '10px', textTransform: 'uppercase' }}>Notes & Intelligence</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add engagement notes, next steps, observations..." style={{ width: '100%', minHeight: '100px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '14px', color: '#f1f5f9', fontSize: '13px', resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={save} style={{ flex: 1, background: `linear-gradient(135deg, ${svc.border}, ${svc.badge})`, border: 'none', borderRadius: '8px', padding: '14px', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Check size={18} />Save</button>
            {isCustom && <button onClick={() => deleteItem(item.id)} style={{ padding: '14px 24px', background: '#7f1d1d', border: 'none', borderRadius: '8px', color: '#fca5a5', fontSize: '14px', cursor: 'pointer' }}>Delete</button>}
            <button onClick={onClose} style={{ padding: '14px 24px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const BuyerModal = ({ item, onClose }) => {
    const [notes, setNotes] = useState(item.notes || '');
    const [status, setStatus] = useState(item.status);
    const [poc, setPoc] = useState(item.poc || '');
    const svc = getServiceColor(item.service);
    const isCustom = item.id.startsWith('org-custom');
    const save = () => { updateItem(item.id, { status, notes, poc }); onClose(); };
    
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
        <div style={{ background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)', border: `1px solid ${svc.border}`, borderRadius: '16px', padding: '28px', width: '600px', maxHeight: '90vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: '600', color: svc.text, background: svc.badge, padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase' }}>{item.service}</span>
                <span style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8', background: '#334155', padding: '4px 10px', borderRadius: '4px' }}>{item.category}</span>
                {isCustom && <span style={{ fontSize: '10px', fontWeight: '600', color: 'white', background: '#f59e0b', padding: '4px 10px', borderRadius: '4px' }}>CUSTOM</span>}
              </div>
              <h3 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700', margin: '0 0 4px 0' }}>{item.name}</h3>
              <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{item.organization}</p>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
          </div>
          
          <div style={{ marginBottom: '20px', padding: '16px', background: '#1e293b', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Description</div>
            <p style={{ color: '#cbd5e1', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>{item.description}</p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '8px', textTransform: 'uppercase' }}>Point of Contact</label>
            <input value={poc} onChange={e => setPoc(e.target.value)} placeholder="Name, title, email, phone..." style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px' }} />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '10px', textTransform: 'uppercase' }}>Engagement Status</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <button key={key} onClick={() => setStatus(key)} style={{ background: status === key ? cfg.color : '#0f172a', border: `2px solid ${status === key ? cfg.textColor : '#334155'}`, borderRadius: '8px', padding: '12px', color: status === key ? cfg.textColor : '#64748b', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>{cfg.label}</button>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '10px', textTransform: 'uppercase' }}>Notes & Intelligence</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add engagement notes, next steps, observations..." style={{ width: '100%', minHeight: '100px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '14px', color: '#f1f5f9', fontSize: '13px', resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={save} style={{ flex: 1, background: `linear-gradient(135deg, ${svc.border}, ${svc.badge})`, border: 'none', borderRadius: '8px', padding: '14px', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Check size={18} />Save</button>
            {isCustom && <button onClick={() => deleteItem(item.id)} style={{ padding: '14px 24px', background: '#7f1d1d', border: 'none', borderRadius: '8px', color: '#fca5a5', fontSize: '14px', cursor: 'pointer' }}>Delete</button>}
            <button onClick={onClose} style={{ padding: '14px 24px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const ItemModal = ({ item, onClose }) => {
    return mode === 'users' ? <UserModal item={item} onClose={onClose} /> : <BuyerModal item={item} onClose={onClose} />;
  };

  const AddUnitModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({ name: '', service: 'Army', componentType: '', location: '', mission: '', systems: '', notes: '', poc: '' });
    const handleSubmit = () => { if (!formData.name || !formData.location) return; onAdd(formData); onClose(); };
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
        <div style={{ background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)', border: '1px solid #2563eb', borderRadius: '16px', padding: '28px', width: '560px', maxHeight: '85vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><Plus size={24} style={{ color: '#2563eb' }} />Add Custom Unit</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Unit Name *</label><input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="e.g., 1st BCT/82nd Airborne" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px' }} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Service *</label><select value={formData.service} onChange={e => setFormData(p => ({ ...p, service: e.target.value }))} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px', cursor: 'pointer' }}>{Object.keys(serviceColors).map(s => <option key={s} value={s}>{s}</option>)}</select></div>
              <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Component Type</label><input value={formData.componentType} onChange={e => setFormData(p => ({ ...p, componentType: e.target.value }))} placeholder="e.g., Brigade Combat Team" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px' }} /></div>
            </div>
            <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Location *</label><input value={formData.location} onChange={e => setFormData(p => ({ ...p, location: e.target.value }))} placeholder="e.g., Fort Liberty, NC" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px' }} /></div>
            <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Point of Contact</label><input value={formData.poc} onChange={e => setFormData(p => ({ ...p, poc: e.target.value }))} placeholder="Name, title, contact info..." style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px' }} /></div>
            <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Mission Description</label><textarea value={formData.mission} onChange={e => setFormData(p => ({ ...p, mission: e.target.value }))} placeholder="Describe the unit's EW/SIGINT mission..." rows={3} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' }} /></div>
            <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Key Systems/Platforms</label><input value={formData.systems} onChange={e => setFormData(p => ({ ...p, systems: e.target.value }))} placeholder="e.g., TLS-BCT, Prophet Enhanced" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px' }} /></div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button onClick={handleSubmit} disabled={!formData.name || !formData.location} style={{ flex: 1, background: formData.name && formData.location ? 'linear-gradient(135deg, #2563eb, #1e40af)' : '#334155', border: 'none', borderRadius: '8px', padding: '14px', color: 'white', fontSize: '14px', fontWeight: '600', cursor: formData.name && formData.location ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Plus size={18} />Add Unit</button>
            <button onClick={onClose} style={{ padding: '14px 24px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const AddOrgModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({ name: '', organization: '', service: 'OSD', category: 'Electronic Warfare', description: '', notes: '', poc: '' });
    const handleSubmit = () => { if (!formData.name || !formData.organization) return; onAdd(formData); onClose(); };
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
        <div style={{ background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)', border: '1px solid #f59e0b', borderRadius: '16px', padding: '28px', width: '560px', maxHeight: '85vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><Building2 size={24} style={{ color: '#f59e0b' }} />Add Organization</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Program/Office Name *</label><input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="e.g., PM Electronic Warfare & Cyber" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px' }} /></div>
            <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Parent Organization *</label><input value={formData.organization} onChange={e => setFormData(p => ({ ...p, organization: e.target.value }))} placeholder="e.g., CPE IEW&S" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px' }} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Service/Agency</label><select value={formData.service} onChange={e => setFormData(p => ({ ...p, service: e.target.value }))} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px', cursor: 'pointer' }}>{Object.keys(serviceColors).map(s => <option key={s} value={s}>{s}</option>)}</select></div>
              <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Category</label><input value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} placeholder="e.g., Electronic Warfare" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px' }} /></div>
            </div>
            <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Point of Contact</label><input value={formData.poc} onChange={e => setFormData(p => ({ ...p, poc: e.target.value }))} placeholder="Name, title, contact info..." style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px' }} /></div>
            <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase' }}>Description</label><textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} placeholder="Describe the program/office mission and focus areas..." rows={3} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' }} /></div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button onClick={handleSubmit} disabled={!formData.name || !formData.organization} style={{ flex: 1, background: formData.name && formData.organization ? 'linear-gradient(135deg, #f59e0b, #b45309)' : '#334155', border: 'none', borderRadius: '8px', padding: '14px', color: 'white', fontSize: '14px', fontWeight: '600', cursor: formData.name && formData.organization ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Plus size={18} />Add Organization</button>
            <button onClick={onClose} style={{ padding: '14px 24px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const AddModal = ({ onClose, onAdd }) => mode === 'users' ? <AddUnitModal onClose={onClose} onAdd={onAdd} /> : <AddOrgModal onClose={onClose} onAdd={onAdd} />;

  const KanbanBoard = () => {
    const columnItems = useMemo(() => {
      const cols = {};
      kanbanColumns.forEach(status => { cols[status] = filteredData.filter(item => item.status === status); });
      return cols;
    }, [filteredData]);
    const handleDragStart = (e, item) => { e.dataTransfer.setData('itemId', item.id); };
    const handleDrop = (e, newStatus) => { e.preventDefault(); const itemId = e.dataTransfer.getData('itemId'); if (itemId) updateItem(itemId, { status: newStatus }); };
    const handleDragOver = (e) => { e.preventDefault(); };

    return (
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
        {kanbanColumns.map(status => {
          const cfg = statusConfig[status];
          const columnData = columnItems[status] || [];
          return (
            <div key={status} onDrop={(e) => handleDrop(e, status)} onDragOver={handleDragOver} style={{ minWidth: '280px', maxWidth: '280px', background: '#0f172a', borderRadius: '12px', border: `1px solid ${cfg.border}`, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '14px 16px', borderBottom: `1px solid ${cfg.border}`, background: cfg.color, borderRadius: '12px 12px 0 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ color: cfg.textColor, fontSize: '13px', fontWeight: '600', margin: 0 }}>{cfg.label}</h3>
                  <span style={{ background: `${cfg.textColor}22`, color: cfg.textColor, padding: '3px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' }}>{columnData.length}</span>
                </div>
              </div>
              <div style={{ padding: '12px', flex: 1, minHeight: '200px', maxHeight: '500px', overflowY: 'auto' }}>
                {columnData.map(item => (<div key={item.id} draggable onDragStart={(e) => handleDragStart(e, item)} style={{ cursor: 'grab' }}><ItemCard item={item} compact /></div>))}
                {columnData.length === 0 && (<div style={{ padding: '20px', textAlign: 'center', color: '#475569', fontSize: '12px', border: '2px dashed #334155', borderRadius: '8px' }}>Drop {mode === 'users' ? 'units' : 'orgs'} here</div>)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a12', color: '#e5e5e5', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');`}</style>
      
      <header style={{ background: 'linear-gradient(180deg, #0f0f1a 0%, #0a0a12 100%)', borderBottom: '1px solid #1a1a2e', padding: '20px 32px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <Zap size={24} style={{ color: '#2563eb' }} />
              <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, background: 'linear-gradient(135deg, #e5e5e5, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DoD Engagement</h1>
            </div>
            <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>Distributed Spectrum · {mode === 'users' ? `${stats.total} User Units` : `${stats.total} Buyer Organizations`}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', background: '#1a1a2e', borderRadius: '8px', padding: '4px', border: '1px solid #2d2d44' }}>
              <button onClick={() => { setMode('users'); setFilterService('all'); setFilterCategory('all'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: mode === 'users' ? 'linear-gradient(135deg, #2563eb, #1e40af)' : 'transparent', border: 'none', borderRadius: '6px', color: mode === 'users' ? 'white' : '#6b7280', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}><Users size={16} />Users</button>
              <button onClick={() => { setMode('buyers'); setFilterService('all'); setFilterCategory('all'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: mode === 'buyers' ? 'linear-gradient(135deg, #f59e0b, #b45309)' : 'transparent', border: 'none', borderRadius: '6px', color: mode === 'buyers' ? 'white' : '#6b7280', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}><ShoppingCart size={16} />Buyers</button>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ background: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '8px', padding: '10px 16px', textAlign: 'center' }}><div style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase' }}>Total</div><div style={{ fontSize: '20px', fontWeight: '700', color: '#e5e5e5', fontFamily: '"JetBrains Mono"' }}>{stats.total}</div></div>
              <div style={{ background: '#1e3a5f', border: '1px solid #2563eb', borderRadius: '8px', padding: '10px 16px', textAlign: 'center' }}><div style={{ color: '#60a5fa', fontSize: '10px', textTransform: 'uppercase' }}>Pipeline</div><div style={{ fontSize: '20px', fontWeight: '700', color: '#60a5fa', fontFamily: '"JetBrains Mono"' }}>{stats.pipeline}</div></div>
              <div style={{ background: '#1a2e1a', border: '1px solid #16a34a', borderRadius: '8px', padding: '10px 16px', textAlign: 'center' }}><div style={{ color: '#4ade80', fontSize: '10px', textTransform: 'uppercase' }}>Engaged</div><div style={{ fontSize: '20px', fontWeight: '700', color: '#4ade80', fontFamily: '"JetBrains Mono"' }}>{stats.engaged}</div></div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px', maxWidth: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
            <input placeholder={mode === 'users' ? "Search units..." : "Search programs..."} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', background: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '6px', padding: '10px 12px 10px 38px', color: '#e5e5e5', fontSize: '13px' }} />
          </div>
          <select value={filterService} onChange={e => setFilterService(e.target.value)} style={{ background: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '6px', padding: '10px 12px', color: '#e5e5e5', fontSize: '13px', cursor: 'pointer' }}>
            <option value="all">All {mode === 'users' ? 'Services' : 'Agencies'}</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {mode === 'buyers' && (
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ background: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '6px', padding: '10px 12px', color: '#e5e5e5', fontSize: '13px', cursor: 'pointer' }}>
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ background: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '6px', padding: '10px 12px', color: '#e5e5e5', fontSize: '13px', cursor: 'pointer' }}>
            <option value="all">All Statuses</option>
            {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <div style={{ display: 'flex', background: '#1a1a2e', borderRadius: '6px', padding: '4px', border: '1px solid #2d2d44' }}>
            <button onClick={() => setViewMode('list')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: viewMode === 'list' ? '#2563eb' : 'transparent', border: 'none', borderRadius: '4px', color: viewMode === 'list' ? 'white' : '#6b7280', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}><List size={14} />List</button>
            <button onClick={() => setViewMode('kanban')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: viewMode === 'kanban' ? '#2563eb' : 'transparent', border: 'none', borderRadius: '4px', color: viewMode === 'kanban' ? 'white' : '#6b7280', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}><Kanban size={14} />Pipeline</button>
          </div>
          <button onClick={() => setShowAddModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: mode === 'users' ? 'linear-gradient(135deg, #2563eb, #1e40af)' : 'linear-gradient(135deg, #f59e0b, #b45309)', border: 'none', borderRadius: '6px', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}><Plus size={16} />{mode === 'users' ? 'Add Unit' : 'Add Org'}</button>
        </div>
      </header>

      <main style={{ padding: '24px 32px' }}>
        {viewMode === 'kanban' && <KanbanBoard />}
        {viewMode === 'list' && (
          Object.entries(groupedData).sort(([a], [b]) => a.localeCompare(b)).map(([group, items]) => {
            const svc = getServiceColor(group);
            const isExpanded = expandedGroups[group] !== false;
            const engaged = items.filter(item => ['engaged', 'deployed', 'contract'].includes(item.status)).length;
            return (
              <div key={group} style={{ marginBottom: '16px' }}>
                <button onClick={() => setExpandedGroups(p => ({ ...p, [group]: !isExpanded }))} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', background: svc.bg, border: `1px solid ${svc.border}`, borderRadius: '8px', padding: '14px 18px', cursor: 'pointer', marginBottom: isExpanded ? '12px' : '0' }}>
                  {isExpanded ? <ChevronDown size={18} style={{ color: svc.text }} /> : <ChevronRight size={18} style={{ color: svc.text }} />}
                  <div style={{ flex: 1, textAlign: 'left' }}><h3 style={{ color: '#f1f5f9', fontSize: '14px', fontWeight: '600', margin: 0 }}>{group}</h3></div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{items.length} {mode === 'users' ? 'units' : 'programs'}</span>
                    <span style={{ fontSize: '12px', color: engaged > 0 ? '#4ade80' : '#6b7280' }}>{engaged} engaged</span>
                    <div style={{ width: '60px', height: '6px', background: '#1a1a2e', borderRadius: '3px', overflow: 'hidden' }}><div style={{ height: '100%', width: `${(engaged / items.length) * 100}%`, background: svc.border, borderRadius: '3px' }} /></div>
                  </div>
                </button>
                {isExpanded && (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '12px', paddingLeft: '12px' }}>{items.map(item => <ItemCard key={item.id} item={item} />)}</div>)}
              </div>
            );
          })
        )}
      </main>

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      {showAddModal && <AddModal onClose={() => setShowAddModal(false)} onAdd={addItem} />}
    </div>
  );
}
