export type PatchShape = 'square' | 'round' | 'strip';
export type PatchEdition = 'standard' | 'nighttime' | 'clear';

export interface ShadeOption {
  id: string;
  name: string;
  code: string;
  hex: string;
  undertone: string;
}

export interface PatchLayerSpec {
  id: string;
  index: number;
  name: string;
  chemicalSpec: string;
  thicknessOrMetric: string;
  role: string;
  details: string;
  explodeOffset: [number, number, number];
  accentColor: string;
}

export interface ActiveIngredient {
  id: string;
  name: string;
  sourceForm: string;
  mechanism: string;
  clinicalBenefit: string;
}

export interface TargetAudience {
  id: string;
  segment: string;
  ageRange?: string;
  primaryNeed: string;
  applicationNote: string;
}

export interface ShapeCategory {
  id: PatchShape;
  title: string;
  subtitle: string;
  variants: {
    sizeLabel: string;
    dimension: string;
    useCase: string;
  }[];
}

export const PRODUCT_META = {
  brand: 'PureCover',
  subtitle: 'Scar-Cover Patch',
  origin: 'Korea Office · New Product Development Proposal',
  tagline: 'Turning unmet needs into a practical new product.',
  heroHeadline: 'Invisible Scar Recovery. Engineered to Move Like Skin.',
  heroDescription:
    'An ultra-thin 0.10mm medical-grade silicone scar-cover patch combining breathable polyurethane, mineral UV defense, makeup-ready matte micro-spheres, and targeted skin-restoring actives.',
  totalThickness: '0.10 mm',
  puFilmThickness: '10–25 microns',
  shadeCount: 6,
};

export const SHADE_OPTIONS: ShadeOption[] = [
  { id: 'shade-1', name: 'Porcelain Ivory', code: 'CI-01', hex: '#F3D8C6', undertone: 'Fair Neutral' },
  { id: 'shade-2', name: 'Warm Sand', code: 'CI-02', hex: '#E7BFA5', undertone: 'Light Warm' },
  { id: 'shade-3', name: 'Natural Beige', code: 'CI-03', hex: '#D8A686', undertone: 'Light-Medium' },
  { id: 'shade-4', name: 'Honey Ochre', code: 'CI-04', hex: '#C28966', undertone: 'Medium Golden' },
  { id: 'shade-5', name: 'Warm Sienna', code: 'CI-05', hex: '#9E6647', undertone: 'Tan Neutral' },
  { id: 'shade-6', name: 'Deep Umber', code: 'CI-06', hex: '#6F442E', undertone: 'Rich Deep' },
];

export const PATCH_LAYERS: PatchLayerSpec[] = [
  {
    id: 'matte-uv-shield',
    index: 1,
    name: 'Matte Micro-Sphere & Mineral UV Surface',
    chemicalSpec: 'Silica / Polymethylsilsesquioxane + Non-Nano ZnO & TiO₂',
    thicknessOrMetric: 'Non-Nano Physical Filter',
    role: 'Shine-Free Makeup Grip & UVA/UVB Block',
    details:
      'Silica micro-spheres eliminate surface shine and create micro-grip so concealer and foundation apply smoothly on top, while non-nano Zinc Oxide and Titanium Dioxide physically block UVA/UVB rays to prevent scar hyperpigmentation.',
    explodeOffset: [0, 1.35, 0],
    accentColor: '#7A0C18',
  },
  {
    id: 'pu-pigment-film',
    index: 2,
    name: 'Shade-Matched Polyurethane Carrier Film',
    chemicalSpec: 'Ultra-Thin PU Membrane + Iron Oxides (CI 77491, 77492, 77499)',
    thicknessOrMetric: '10–25 microns',
    role: 'Flexible, Waterproof & Breathable Matrix',
    details:
      'An ultra-thin 10–25 micron polyurethane membrane that flexes naturally with facial and body movement, infused with red, yellow, and black iron oxides across 6 complexions for seamless optical blending.',
    explodeOffset: [0, 0.82, 0],
    accentColor: '#9E2A38',
  },
  {
    id: 'active-microcapsules',
    index: 3,
    name: 'Bio-Active Encapsulated Infusion Layer',
    chemicalSpec: 'Madecassoside, Niacinamide B3, THD Vitamin C, Bisabolol, Tocopherol',
    thicknessOrMetric: 'Body-Heat Activated',
    role: 'Targeted Scar Remodeling & Calming',
    details:
      'Pure dry-powder Madecassoside calms redness without destabilizing the silicone matrix, paired with heat-rupturing micro-encapsulated Niacinamide B3, pH-neutral oil-soluble Vitamin C, chamomile Bisabolol, and antioxidant Vitamin E.',
    explodeOffset: [0, 0.28, 0],
    accentColor: '#B84A39',
  },
  {
    id: 'silicone-gel-core',
    index: 4,
    name: 'Medical-Grade Silicone Gel Core',
    chemicalSpec: 'Polydimethylsiloxane / Dimethicone Crosspolymer',
    thicknessOrMetric: '0.10 mm Total Profile',
    role: 'Hypoallergenic Hydration & Painless Removal',
    details:
      'Provides gentle, hypoallergenic adhesion that locks in optimal scar hydration and lifts off cleanly without trauma or sticky glue residue—safe even for sensitive pediatric skin.',
    explodeOffset: [0, -0.28, 0],
    accentColor: '#8C3B45',
  },
  {
    id: 'elastomer-border',
    index: 5,
    name: 'Soft Silicone Elastomer Edge Seal',
    chemicalSpec: 'Reinforced Medical Silicone Elastomer',
    thicknessOrMetric: 'Perimeter Lock',
    role: 'Waterproof Multi-Day Edge Retention',
    details:
      'Reinforces perimeter adhesion around the entire patch contour to prevent premature lifting during showers, sweat, and outdoor wear without causing mechanical skin irritation.',
    explodeOffset: [0, -0.82, 0],
    accentColor: '#691E28',
  },
  {
    id: 'pet-release-liner',
    index: 6,
    name: 'Fluoropolymer-Coated PET Release Liner',
    chemicalSpec: 'Fluoropolymer-Coated Polyethylene Terephthalate',
    thicknessOrMetric: 'Peel-Off Carrier',
    role: 'Sterile Adhesive Protection & Easy Application',
    details:
      'Protects the medical-grade silicone adhesive layer prior to application and releases smoothly without stretching the ultra-thin 10–25 micron PU carrier film.',
    explodeOffset: [0.32, -1.42, -0.24],
    accentColor: '#524446',
  },
];

export const ACTIVE_INGREDIENTS: ActiveIngredient[] = [
  {
    id: 'madecassoside',
    name: 'Madecassoside (Purified Centella Asiatica)',
    sourceForm: 'Pure Dry Powder Form',
    mechanism:
      'Incorporated as a pure dry powder rather than a liquid extract so it blends smoothly without destabilizing the silicone matrix.',
    clinicalBenefit:
      'Calms visible redness, reduces localized inflammation, and accelerates fresh tissue recovery.',
  },
  {
    id: 'niacinamide',
    name: 'Micro-Encapsulated Niacinamide (Vitamin B3)',
    sourceForm: 'Body-Heat Sensitive Micro-Shells',
    mechanism:
      'Encapsulated in microscopic shells engineered to rupture gently when warmed by natural body heat upon skin contact.',
    clinicalBenefit:
      'Evens surrounding skin tone and strengthens the compromised epidermal barrier.',
  },
  {
    id: 'vitamin-c',
    name: 'Tetrahexyldecyl Ascorbate (Oil-Soluble Vitamin C)',
    sourceForm: 'pH-Neutral Lipid-Soluble Ester',
    mechanism:
      'Unlike water-soluble L-ascorbic acid—which breaks down under occlusion—this pH-neutral ester remains stable and non-irritating inside silicone.',
    clinicalBenefit:
      'Reduces brown hyperpigmentation and stimulates healthy collagen remodeling.',
  },
  {
    id: 'bisabolol',
    name: 'Bisabolol (Chamomile-Derived)',
    sourceForm: 'Oil-Soluble Botanical Active',
    mechanism:
      'Naturally oil-soluble soothing molecule commonly trusted in baby care that integrates seamlessly into the silicone matrix.',
    clinicalBenefit:
      'Relieves itching, irritation, and post-procedure surface discomfort.',
  },
  {
    id: 'tocopherol',
    name: 'Tocopherol (Vitamin E)',
    sourceForm: 'Lipophilic Antioxidant Stabilizer',
    mechanism:
      'Protects delicate healing tissue from environmental oxidative stress while helping stabilize the crosspolymer gel structure.',
    clinicalBenefit:
      'Softens and conditions maturing scar tissue while preserving gel integrity.',
  },
];

export const TARGET_AUDIENCES: TargetAudience[] = [
  {
    id: 'post-surgery',
    segment: 'Post-Procedure & Cosmetic Surgery Patients',
    ageRange: 'Ages 20–50',
    primaryNeed: 'Invisible, UV-protected coverage over healing incisions',
    applicationNote:
      'Ideal for rhinoplasty, eyelid surgery, and mole removal to prevent sun-induced darkening while allowing makeup wear on top.',
  },
  {
    id: 'acne-blemish',
    segment: 'Acne & Blemish Sufferers',
    ageRange: 'Teens & Adults',
    primaryNeed: 'Ultra-thin 0.10mm matte patch invisible under concealer',
    applicationNote:
      'Eliminates the thick, glossy ring of traditional hydrocolloid patches with a shine-free silica finish.',
  },
  {
    id: 'children',
    segment: 'Children (Kids)',
    ageRange: 'Pediatric Sensitive Skin',
    primaryNeed: 'Gentle, painless removal on facial scrapes and minor cuts',
    applicationNote:
      'Medical-grade silicone gel adheres securely yet peels off painlessly without leaving sticky glue residue.',
  },
  {
    id: 'outdoor-everyday',
    segment: 'Everyday Accident & Outdoor Use',
    ageRange: 'Active Lifestyles',
    primaryNeed: 'Waterproof, sun-safe protection on exposed skin',
    applicationNote:
      'Shields minor burns, nicks, and sports scrapes against water and UVA/UVB exposure.',
  },
];

export const SHAPE_CATEGORIES: ShapeCategory[] = [
  {
    id: 'round',
    title: 'Round (Dots & Circles)',
    subtitle: 'Precision spot coverage for focal marks and circular grazes',
    variants: [
      { sizeLabel: 'Small', dimension: '12 mm', useCase: 'Pinpoint acne marks, mole removal, minor nicks' },
      { sizeLabel: 'Medium', dimension: '35 mm', useCase: 'Coin-sized facial blemishes and localized burns' },
      { sizeLabel: 'Large', dimension: 'Broad Circular', useCase: 'Knee/elbow sports grazes and wide body scars' },
    ],
  },
  {
    id: 'square',
    title: 'Square (Pad Sheet)',
    subtitle: 'Versatile trim-to-fit sheets for flat or contoured surfaces',
    variants: [
      { sizeLabel: 'Compact Pad', dimension: '30 mm', useCase: 'Compact surgical sites and localized trauma' },
      { sizeLabel: 'Medium Pad', dimension: 'Mid-Format', useCase: 'Facial/neck regions and mid-sized abrasions' },
      { sizeLabel: 'Full Sheet', dimension: 'Full-Coverage', useCase: 'Back, thigh, or custom-cut anatomical shapes' },
    ],
  },
  {
    id: 'strip',
    title: 'Strip (Rectangular)',
    subtitle: 'Linear architecture engineered for surgical incision lines',
    variants: [
      { sizeLabel: 'Compact Strip', dimension: 'Narrow Linear', useCase: 'Finger wounds, eyelid incisions, narrow cuts' },
      { sizeLabel: 'Long Strip', dimension: 'Extended Linear', useCase: 'Thyroid surgery, appendectomy, orthopedic incisions' },
      { sizeLabel: 'Extra-Long Strip', dimension: 'Full-Length Linear', useCase: 'C-section scars, tummy tuck, major limb incisions' },
    ],
  },
];