import { defineCollection, z } from 'astro:content';

// ── Primitives ──────────────────────────────────────────

const priceSchema = z.object({
  amount: z.number(),
  currency: z.enum(['USD', 'PEN']),
  includesIGV: z.boolean(),
  unit: z.enum(['rollo', 'unidad', 'caja', 'metros', 'par']),
});

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  role: z.enum(['main', 'gallery', 'box']),
});

const downloadSchema = z.object({
  label: z.string(),
  url: z.string(),
  type: z.enum(['datasheet', 'manual', 'specs', 'certificate']),
});

const specRowSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const keyFeatureSchema = z.object({
  icon: z.string(),
  label: z.string(),
  value: z.string(),
});

const breadcrumbSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  schemaOrg: z.object({
    name: z.string(),
    description: z.string(),
    brand: z.string(),
    sku: z.string(),
    mpn: z.string().optional(),
    offers: z.object({
      price: z.number(),
      priceCurrency: z.enum(['USD', 'PEN']),
      availability: z.enum(['InStock', 'OutOfStock', 'PreOrder']),
      seller: z.string(),
    }),
  }),
});

// ── Category-specific ───────────────────────────────────

const cableSchema = z.object({
  cableCategory: z.enum(['cat5e', 'cat6', 'cat6a', 'cat7', 'fibra-multimodo', 'fibra-monomodo']),
  jacket: z.enum(['CMR', 'CMP', 'CM', 'LSZH', 'OUTDOOR']),
  awg: z.union([z.literal(23), z.literal(24), z.literal(26)]),
  rollLength: z.number(),
  rollUnit: z.enum(['ft', 'm']),
  pairs: z.union([z.literal(4), z.literal(25)]),
  conductorType: z.enum(['solido', 'multifilar']),
  nominalPropagationSpeed: z.string(),
  voltage: z.string(),
  operatingTemp: z.string(),
  storageTemp: z.string(),
  color: z.array(z.string()).optional(),
  standards: z.array(z.string()),
  applications: z.array(z.string()),
  partNumber: z.string().optional(),
});

const connectorSubSchema = z.object({
  cableCategory: z.enum(['cat5e', 'cat6', 'cat6a', 'cat7', 'fibra-multimodo', 'fibra-monomodo']),
  ports: z.number().optional(),
  conductorType: z.enum(['solido', 'multifilar', 'ambos']).optional(),
  shielded: z.boolean().optional(),
  rackUnits: z.number().optional(),
});

const patchCordSchema = z.object({
  cableCategory: z.enum(['cat5e', 'cat6', 'cat6a', 'cat7', 'fibra-multimodo', 'fibra-monomodo']),
  lengthMeters: z.number(),
  connectorType: z.enum(['RJ45', 'SC-SC', 'SC-LC', 'LC-LC']),
  jacket: z.enum(['CMR', 'CMP', 'CM', 'LSZH', 'OUTDOOR']).optional(),
  fiberMode: z.enum(['multimodo', 'monomodo']).optional(),
  fiberSpec: z.enum(['50/125', '9/125']).optional(),
});

// ── Collections ─────────────────────────────────────────

const products = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    sku: z.string(),
    name: z.string(),
    shortDescription: z.string(),
    brand: z.string(),
    category: z.enum([
      'cable-utp', 'cable-fibra',
      'conector-rj45', 'jack', 'patch-panel',
      'patch-cord', 'patch-cord-fibra',
      'ordenador', 'switch', 'access-point', 'antena', 'router',
    ]),
    price: priceSchema,
    inStock: z.boolean(),
    isNew: z.boolean().optional(),
    images: z.array(imageSchema),
    breadcrumb: z.array(breadcrumbSchema),
    downloads: z.array(downloadSchema).optional(),
    relatedProducts: z.array(z.string()).optional(),
    seo: seoSchema,
    cable: cableSchema.optional(),
    connector: connectorSubSchema.optional(),
    patchCord: patchCordSchema.optional(),
    keyFeatures: z.array(keyFeatureSchema).optional(),
    specTable: z.array(specRowSchema).optional(),
    longDescription: z.string().optional(),
  }),
});

const site = defineCollection({
  type: 'data',
  schema: z.object({
    siteName: z.string(),
    siteUrl: z.string(),
    logo: z.string(),
    tagline: z.string(),
    contact: z.object({
      phone: z.array(z.string()),
      mobile: z.array(z.string()),
      email: z.array(z.string()),
      whatsapp: z.string(),
      address: z.string().optional(),
      hours: z.object({
        weekdays: z.string(),
        saturday: z.string(),
      }),
    }),
    brands: z.array(z.object({
      name: z.string(),
      slug: z.string(),
      logo: z.string(),
      href: z.string(),
    })),
    mainNav: z.array(z.object({
      label: z.string(),
      href: z.string(),
      children: z.array(z.object({
        label: z.string(),
        href: z.string(),
      })).optional(),
    })),
  }),
});

export const collections = { products, site };
