import { supabase } from './supabase';
import { PropertyRequestData } from '../types';

// ─── LEADS ────────────────────────────────────────────────────────────────────

export interface Lead extends PropertyRequestData {
  id?: string;
  status: 'new' | 'contacted' | 'closed';
  created_at?: string;
}

export async function saveLead(data: PropertyRequestData): Promise<string> {
  const { data: row, error } = await supabase
    .from('leads')
    .insert({
      full_name: data.fullName,
      phone_number: data.phoneNumber,
      preferred_location: data.preferredLocation,
      property_type: data.propertyType,
      annual_budget: data.annualBudget,
      move_in_date: data.moveInDate || null,
      requirements: data.requirements || null,
      status: 'new',
    })
    .select('id')
    .single();

  if (error) throw error;
  return row.id;
}

export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    fullName: row.full_name,
    phoneNumber: row.phone_number,
    preferredLocation: row.preferred_location,
    propertyType: row.property_type,
    annualBudget: row.annual_budget,
    moveInDate: row.move_in_date ?? '',
    requirements: row.requirements ?? '',
    status: row.status as Lead['status'],
    created_at: row.created_at,
  }));
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<void> {
  const { error } = await supabase.from('leads').update({ status }).eq('id', id);
  if (error) throw error;
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) throw error;
}

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────

export interface SiteSettings {
  phone?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  businessHoursWeekdays?: string;
  businessHoursSaturday?: string;
  businessHoursSunday?: string;
  maintenanceMode?: boolean;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'siteConfig')
    .maybeSingle();

  if (error) throw error;
  return (data?.value as SiteSettings) ?? {};
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const { error } = await supabase
    .from('settings')
    .upsert({ key: 'siteConfig', value: settings, updated_at: new Date().toISOString() });

  if (error) throw error;
}

// ─── BLOG ARTICLES ────────────────────────────────────────────────────────────

export interface ArticleDoc {
  id?: string;
  title: string;
  category: string;
  categorySlug: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  tags: string;
  content: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getArticles(): Promise<ArticleDoc[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    categorySlug: row.category_slug,
    readTime: row.read_time,
    date: row.date,
    author: row.author ?? '',
    excerpt: row.excerpt ?? '',
    image: row.image ?? '',
    tags: row.tags ?? '',
    content: row.content ?? '',
    published: row.published ?? false,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
}

export async function saveArticle(
  data: Omit<ArticleDoc, 'id' | 'created_at' | 'updated_at'>
): Promise<string> {
  const { data: row, error } = await supabase
    .from('articles')
    .insert({
      title: data.title,
      category: data.category,
      category_slug: data.categorySlug,
      read_time: data.readTime,
      date: data.date,
      author: data.author,
      excerpt: data.excerpt,
      image: data.image,
      tags: data.tags,
      content: data.content,
      published: data.published,
    })
    .select('id')
    .single();

  if (error) throw error;
  return row.id;
}

export async function updateArticle(id: string, data: Partial<ArticleDoc>): Promise<void> {
  const { error } = await supabase
    .from('articles')
    .update({
      ...(data.title && { title: data.title }),
      ...(data.category && { category: data.category }),
      ...(data.categorySlug && { category_slug: data.categorySlug }),
      ...(data.readTime && { read_time: data.readTime }),
      ...(data.date && { date: data.date }),
      ...(data.author !== undefined && { author: data.author }),
      ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
      ...(data.image !== undefined && { image: data.image }),
      ...(data.tags !== undefined && { tags: data.tags }),
      ...(data.content !== undefined && { content: data.content }),
      ...(data.published !== undefined && { published: data.published }),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw error;
}

// ─── PROPERTIES ───────────────────────────────────────────────────────────────

export interface PropertyDoc {
  id?: string;
  title: string;
  location: string;
  price: string;
  period: string;
  bedrooms: string;
  description: string;
  image: string;
  tag: string;
  whatsappMessage: string;
  available: boolean;
  created_at?: string;
}

export async function getProperties(): Promise<PropertyDoc[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    location: row.location,
    price: row.price,
    period: row.period,
    bedrooms: row.bedrooms,
    description: row.description ?? '',
    image: row.image ?? '',
    tag: row.tag ?? '',
    whatsappMessage: row.whatsapp_message ?? '',
    available: row.available ?? true,
    created_at: row.created_at,
  }));
}

export async function saveProperty(
  data: Omit<PropertyDoc, 'id' | 'created_at'>
): Promise<string> {
  const { data: row, error } = await supabase
    .from('properties')
    .insert({
      title: data.title,
      location: data.location,
      price: data.price,
      period: data.period,
      bedrooms: data.bedrooms,
      description: data.description,
      image: data.image,
      tag: data.tag,
      whatsapp_message: data.whatsappMessage,
      available: data.available,
    })
    .select('id')
    .single();

  if (error) throw error;
  return row.id;
}

export async function updateProperty(id: string, data: Partial<PropertyDoc>): Promise<void> {
  const { error } = await supabase
    .from('properties')
    .update({
      ...(data.title !== undefined && { title: data.title }),
      ...(data.location !== undefined && { location: data.location }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.period !== undefined && { period: data.period }),
      ...(data.bedrooms !== undefined && { bedrooms: data.bedrooms }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.image !== undefined && { image: data.image }),
      ...(data.tag !== undefined && { tag: data.tag }),
      ...(data.whatsappMessage !== undefined && { whatsapp_message: data.whatsappMessage }),
      ...(data.available !== undefined && { available: data.available }),
    })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteProperty(id: string): Promise<void> {
  const { error } = await supabase.from('properties').delete().eq('id', id);
  if (error) throw error;
}

// ─── VISITOR ANALYTICS ────────────────────────────────────────────────────────

export interface PageViewItem {
  id: string;
  path: string;
  referrer: string;
  device: string;
  browser: string;
  session_id: string;
  created_at: string;
}

export interface VisitorStats {
  totalViews: number;
  todayViews: number;
  weekViews: number;
  totalUnique: number;
  todayUnique: number;
  weekUnique: number;
  topPages: { path: string; count: number }[];
  sources: { source: string; count: number; percentage: number }[];
  devices: { device: string; count: number; percentage: number }[];
  recentVisits: PageViewItem[];
}

export async function recordPageView(data: {
  path: string;
  referrer?: string;
  device?: string;
  browser?: string;
  sessionId?: string;
}): Promise<void> {
  try {
    await supabase.from('page_views').insert({
      path: data.path,
      referrer: data.referrer || 'Direct',
      device: data.device || 'Desktop',
      browser: data.browser || 'Unknown',
      session_id: data.sessionId || 'anonymous',
    });
  } catch (err) {
    // Fail silently so visitor experience is never interrupted
    console.debug('Analytics record error:', err);
  }
}

export async function getVisitorStats(): Promise<VisitorStats> {
  const { data, error } = await supabase
    .from('page_views')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(2000);

  if (error) {
    console.warn('Visitor stats error (table may need creation):', error);
    return {
      totalViews: 0,
      todayViews: 0,
      weekViews: 0,
      totalUnique: 0,
      todayUnique: 0,
      weekUnique: 0,
      topPages: [],
      sources: [],
      devices: [],
      recentVisits: [],
    };
  }

  const items: PageViewItem[] = data || [];
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

  const todayItems = items.filter((i) => new Date(i.created_at).getTime() >= startOfToday);
  const weekItems = items.filter((i) => new Date(i.created_at).getTime() >= sevenDaysAgo);

  const totalSessions = new Set(items.map((i) => i.session_id)).size;
  const todaySessions = new Set(todayItems.map((i) => i.session_id)).size;
  const weekSessions = new Set(weekItems.map((i) => i.session_id)).size;

  // Top Pages
  const pageMap: Record<string, number> = {};
  items.forEach((i) => {
    const p = i.path || '/';
    pageMap[p] = (pageMap[p] || 0) + 1;
  });
  const topPages = Object.entries(pageMap)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Sources
  const sourceMap: Record<string, number> = {};
  items.forEach((i) => {
    const s = i.referrer || 'Direct / Bookmarks';
    sourceMap[s] = (sourceMap[s] || 0) + 1;
  });
  const totalSources = items.length || 1;
  const sources = Object.entries(sourceMap)
    .map(([source, count]) => ({
      source,
      count,
      percentage: Math.round((count / totalSources) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Devices
  const deviceMap: Record<string, number> = { Mobile: 0, Desktop: 0, Tablet: 0 };
  items.forEach((i) => {
    const d = i.device || 'Desktop';
    deviceMap[d] = (deviceMap[d] || 0) + 1;
  });
  const totalDev = items.length || 1;
  const devices = Object.entries(deviceMap).map(([device, count]) => ({
    device,
    count,
    percentage: Math.round((count / totalDev) * 100),
  }));

  return {
    totalViews: items.length,
    todayViews: todayItems.length,
    weekViews: weekItems.length,
    totalUnique: totalSessions,
    todayUnique: todaySessions,
    weekUnique: weekSessions,
    topPages,
    sources,
    devices,
    recentVisits: items.slice(0, 8),
  };
}

