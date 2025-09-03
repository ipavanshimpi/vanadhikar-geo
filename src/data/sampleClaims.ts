export interface Document {
  type: 'FORM_A' | 'SKETCH_MAP' | 'EVIDENCE_DOC';
  status: 'verified' | 'georeferenced' | 'processed' | 'pending';
  confidence: number;
}

export interface TimelineEntry {
  stage: string;
  date: string;
  officer: string;
}

export interface Claim {
  claim_id: string;
  claimant_name: string;
  father_name: string;
  village: string;
  district: string;
  state: string;
  claim_type: 'IFR' | 'CR' | 'CFR';
  area_acres: number;
  filing_date: string;
  status: 'FILED_AT_GS' | 'VERIFIED_BY_FRC' | 'PENDING_AT_SDLC' | 'APPROVED_BY_DLC' | 'REJECTED';
  status_date: string;
  gram_sabha: string;
  tribe: string;
  coordinates: [number, number];
  confidence_score: number;
  documents: Document[];
  timeline: TimelineEntry[];
}

export const sampleClaims: Claim[] = [
  {
    claim_id: "FRA/MP/BTL/2024/001567",
    claimant_name: "श्रीमती गीता वर्मा",
    father_name: "स्वर्गीय राम सिंह वर्मा",
    village: "खेरमाई",
    district: "बैतूल",
    state: "मध्य प्रदेश",
    claim_type: "IFR",
    area_acres: 2.5,
    filing_date: "2024-03-15",
    status: "APPROVED_BY_DLC",
    status_date: "2024-08-22",
    gram_sabha: "खेरमाई ग्राम सभा",
    tribe: "गोंड",
    coordinates: [77.8945, 21.9078],
    confidence_score: 0.94,
    documents: [
      { type: "FORM_A", status: "verified", confidence: 0.96 },
      { type: "SKETCH_MAP", status: "georeferenced", confidence: 0.89 },
      { type: "EVIDENCE_DOC", status: "processed", confidence: 0.92 }
    ],
    timeline: [
      { stage: "FILED_AT_GS", date: "2024-03-15", officer: "Sarpanch" },
      { stage: "VERIFIED_BY_FRC", date: "2024-04-02", officer: "FRC Secretary" },
      { stage: "PENDING_AT_SDLC", date: "2024-04-15", officer: "Patwari" },
      { stage: "APPROVED_BY_DLC", date: "2024-08-22", officer: "District Collector" }
    ]
  },
  {
    claim_id: "FRA/MP/BTL/2024/001568",
    claimant_name: "श्री रामेश्वर प्रसाद",
    father_name: "स्वर्गीय भैरव प्रसाद",
    village: "बरगांव",
    district: "बैतूल",
    state: "मध्य प्रदेश",
    claim_type: "CFR",
    area_acres: 15.2,
    filing_date: "2024-02-20",
    status: "PENDING_AT_SDLC",
    status_date: "2024-09-01",
    gram_sabha: "बरगांव ग्राम सभा",
    tribe: "भील",
    coordinates: [77.9234, 21.8567],
    confidence_score: 0.87,
    documents: [
      { type: "FORM_A", status: "verified", confidence: 0.94 },
      { type: "SKETCH_MAP", status: "pending", confidence: 0.78 },
      { type: "EVIDENCE_DOC", status: "processed", confidence: 0.89 }
    ],
    timeline: [
      { stage: "FILED_AT_GS", date: "2024-02-20", officer: "Sarpanch" },
      { stage: "VERIFIED_BY_FRC", date: "2024-03-15", officer: "FRC Secretary" },
      { stage: "PENDING_AT_SDLC", date: "2024-09-01", officer: "SDLC" }
    ]
  },
  {
    claim_id: "FRA/MP/SEO/2024/001234",
    claimant_name: "श्री अजय कुमार",
    father_name: "श्री सुरेश कुमार",
    village: "पिपरिया",
    district: "सिवनी",
    state: "मध्य प्रदेश",
    claim_type: "IFR",
    area_acres: 1.8,
    filing_date: "2024-04-10",
    status: "VERIFIED_BY_FRC",
    status_date: "2024-08-15",
    gram_sabha: "पिपरिया ग्राम सभा",
    tribe: "गोंड",
    coordinates: [79.4567, 22.1234],
    confidence_score: 0.91,
    documents: [
      { type: "FORM_A", status: "verified", confidence: 0.93 },
      { type: "SKETCH_MAP", status: "georeferenced", confidence: 0.88 },
      { type: "EVIDENCE_DOC", status: "pending", confidence: 0.85 }
    ],
    timeline: [
      { stage: "FILED_AT_GS", date: "2024-04-10", officer: "Sarpanch" },
      { stage: "VERIFIED_BY_FRC", date: "2024-08-15", officer: "FRC Secretary" }
    ]
  },
  {
    claim_id: "FRA/TR/WTL/2024/000456",
    claimant_name: "श्रीमती सुनीता देबी",
    father_name: "स्वर्गीय मोहन लाल",
    village: "अमतली",
    district: "वेस्ट त्रिपुरा",
    state: "त्रिपुरा",
    claim_type: "CR",
    area_acres: 0.8,
    filing_date: "2024-01-25",
    status: "FILED_AT_GS",
    status_date: "2024-01-25",
    gram_sabha: "अमतली ग्राम सभा",
    tribe: "त्रिपुरी",
    coordinates: [91.3456, 23.7890],
    confidence_score: 0.76,
    documents: [
      { type: "FORM_A", status: "pending", confidence: 0.82 },
      { type: "SKETCH_MAP", status: "pending", confidence: 0.71 },
      { type: "EVIDENCE_DOC", status: "pending", confidence: 0.75 }
    ],
    timeline: [
      { stage: "FILED_AT_GS", date: "2024-01-25", officer: "Sarpanch" }
    ]
  },
  {
    claim_id: "FRA/OD/MYU/2024/002345",
    claimant_name: "श्री बिजय कुमार साहू",
    father_name: "श्री हरि साहू",
    village: "कोरापुट",
    district: "मयूरभंज",
    state: "ओडिशा",
    claim_type: "IFR",
    area_acres: 3.2,
    filing_date: "2024-05-08",
    status: "REJECTED",
    status_date: "2024-09-02",
    gram_sabha: "कोरापुट ग्राम सभा",
    tribe: "संथाल",
    coordinates: [86.7234, 21.9456],
    confidence_score: 0.68,
    documents: [
      { type: "FORM_A", status: "verified", confidence: 0.79 },
      { type: "SKETCH_MAP", status: "pending", confidence: 0.54 },
      { type: "EVIDENCE_DOC", status: "pending", confidence: 0.71 }
    ],
    timeline: [
      { stage: "FILED_AT_GS", date: "2024-05-08", officer: "Sarpanch" },
      { stage: "VERIFIED_BY_FRC", date: "2024-06-12", officer: "FRC Secretary" },
      { stage: "REJECTED", date: "2024-09-02", officer: "District Collector" }
    ]
  }
];