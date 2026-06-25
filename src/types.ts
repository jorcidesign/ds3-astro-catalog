import type { CollectionEntry } from 'astro:content';

export type SiteData = CollectionEntry<'site'>['data'];
export type ProductData = CollectionEntry<'products'>['data'];
export type ProductImage = ProductData['images'][number];
export type KeyFeature = NonNullable<ProductData['keyFeatures']>[number];
export type SpecRow = NonNullable<ProductData['specTable']>[number];
export type DownloadFile = NonNullable<ProductData['downloads']>[number];
export type BreadcrumbItem = ProductData['breadcrumb'][number];
export type NavItem = SiteData['mainNav'][number];
export type SubNavItem = NonNullable<NavItem['children']>[number];
export type BrandEntry = SiteData['brands'][number];
export type ProductEntry = CollectionEntry<'products'>;
export type SiteEntry = CollectionEntry<'site'>;
