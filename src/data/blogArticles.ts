import { BlogArticle } from '../types';

export const blogArticles: Record<string, BlogArticle> = {
  costs: {
    id: 'costs',
    title: '5 Hidden Costs to Watch Out for When Renting in Abuja',
    category: 'Renting Guide',
    categorySlug: 'guides',
    readTime: '4 min read',
    date: 'May 2026',
    author: 'RentABJ Advisory Team',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    tags: 'costs fees legal caution money budget agreement commission service charge generator',
    excerpt:
      'Beyond the annual rent, legal fees, agency commissions, and service charge deposits can catch renters off guard. Here is what to budget for.',
    content: `
      <p>When planning to rent a home in Abuja, many prospective tenants only consider the base annual rent quoted by the landlord or agent. However, unexpected initial fees can add up to 20%–35% more onto your move-in budget.</p>
      
      <h3>1. Legal and Agreement Fees</h3>
      <p>In Abuja, legal fees for drafting the tenancy agreement typically range between 5% to 10% of the annual rent. This covers the attorney drafting and vetting the tenancy terms between you and the property owner.</p>
      
      <h3>2. Agency Commission</h3>
      <p>Real estate agency fees also typically range from 10% in standard transactions. Ensure you work with verified, registered professionals like RentABJ Homes so you receive transparent receipts and guaranteed representation.</p>
      
      <h3>3. Caution / Damages Deposit</h3>
      <p>Most modern landlords and serviced estates require a refundable caution deposit (ranging between ₦100,000 to ₦300,000 or 10% of the rent) to safeguard against damages to fittings, walls, or unpaid utility bills upon exit.</p>
      
      <h3>4. Service Charges & Generator Levies</h3>
      <p>If you are renting in gated estates in Katampe, Jahi, Gwarinpa, or Wuse, confirm what the estate service charge covers. Some service charges include 24/7 security, waste disposal, and estate streetlights, while central power generator fueling might be billed separately on a metered or monthly contribution basis.</p>

      <h3>5. Pre-Paid Electricity Meter Setup</h3>
      <p>Always inspect whether the apartment has an independent pre-paid meter or if it shares a postpaid AEDC bill with neighboring units. Having your own pre-paid meter avoids disputes and unexpected prior debt.</p>
    `,
  },
  'gwarinpa-vs-jahi': {
    id: 'gwarinpa-vs-jahi',
    title: 'Living in Gwarinpa vs. Jahi: Which District Suits Your Lifestyle?',
    category: 'Neighborhoods',
    categorySlug: 'neighborhoods',
    readTime: '5 min read',
    date: 'April 2026',
    author: 'RentABJ Neighborhood Desk',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    tags: 'gwarinpa jahi location estate commute cbd traffic maitama expressway',
    excerpt:
      'Detailed comparison of infrastructure, daily commutes to Central Business District, and rental value between two top Abuja hubs.',
    content: `
      <p>Choosing the right district in Abuja often comes down to work commute, family amenities, and your budget. Two of the most sought-after rental destinations in the Federal Capital Territory are Gwarinpa and Jahi.</p>

      <h3>Gwarinpa: The Self-Sustaining Commercial Hub</h3>
      <p>As one of West Africa's largest residential estates, Gwarinpa has everything right within reach: supermarkets (like NEXT Cash & Carry nearby), top schools, pharmacies, dining spots, and gyms along 1st, 3rd, and 4th Avenue.</p>
      <ul>
        <li><strong>Pros:</strong> Vibrant community, endless convenience, wide variety of duplexes and flats.</li>
        <li><strong>Consideration:</strong> Peak-hour traffic along the Kubwa expressway corridor.</li>
      </ul>

      <h3>Jahi: Modern Estates & Strategic Central Location</h3>
      <p>Positioned right beside Katampe and Mabushi, Jahi has seen a boom in modern mini-estates, contemporary terraces, and luxury apartments. It sits closer to the Central Business District (CBD) and Maitama.</p>
      <ul>
        <li><strong>Pros:</strong> Fast commute into Central Abuja (under 12 minutes off-peak), newly built contemporary architectures, serene residential pockets.</li>
        <li><strong>Consideration:</strong> Certain newly developed access roads are still undergoing ongoing municipal paving.</li>
      </ul>

      <h3>Which One Should You Pick?</h3>
      <p>If you value proximity to the CBD and newer architectural finishes, Jahi is a prime choice. If you prefer a bustling, fully established neighborhood where you never need to leave the estate for groceries or services, Gwarinpa is hard to beat.</p>
    `,
  },
  checklist: {
    id: 'checklist',
    title: 'Checklist: What to Inspect Before Paying for an Apartment in Abuja',
    category: 'Tenant Advisory',
    categorySlug: 'legal',
    readTime: '6 min read',
    date: 'March 2026',
    author: 'RentABJ Property Inspection Unit',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    tags: 'inspection checklist electricity aedc water dampness security reception meter',
    excerpt:
      'From water pressure and electricity metering to dampness and security gate protocols—do not make payment until you check these items.',
    content: `
      <p>Before transferring rent to any landlord or managing agent, an in-person, detailed inspection is essential. Here is RentABJ Homes' recommended checklist to safeguard your hard-earned money:</p>

      <h3>1. Water Supply & Pumping Setup</h3>
      <p>Turn on the kitchen taps, shower heads, and flush the toilets. Ask: Is there a dedicated borehole, public water, or water truck tanker supply? Is the overhead water tank automated?</p>

      <h3>2. Electricity & AEDC Debt Status</h3>
      <p>Ask for the meter number and verify with the Abuja Electricity Distribution Company (AEDC) that the meter has no accumulated debt left behind by the previous occupant.</p>

      <h3>3. Ceiling and Wall Dampness</h3>
      <p>Check the edges of ceilings and bathroom walls for damp stains, mildew, or peeling paint—especially if viewing during dry season, as these may reveal leakages during Abuja’s heavy rainy seasons.</p>

      <h3>4. Security Protocols</h3>
      <p>Examine estate gate entry policies, street lighting, and window burglar bars. A gated compound within a manned estate provides double-layered peace of mind.</p>

      <h3>5. Cell Network Reception</h3>
      <p>Check your phone's cellular network and mobile data signal in every room of the property. Strong network connectivity is critical for working from home and everyday communications.</p>
    `,
  },
  'katampe-guide': {
    id: 'katampe-guide',
    title: "Why Katampe Main & Katampe Extension are Abuja's Fast-Rising Hotspots",
    category: 'Neighborhoods',
    categorySlug: 'neighborhoods',
    readTime: '5 min read',
    date: 'February 2026',
    author: 'RentABJ Neighborhood Desk',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop',
    tags: 'katampe dawaki lifecamp hills serenity maitama luxury duplex penthouses views',
    excerpt:
      'Perched on the hills with panoramic city views, Katampe offers luxury modern duplexes just minutes from Maitama.',
    content: `
      <p>Perched high on the rolling hills overlooking Maitama and the inner Abuja valleys, Katampe has rapidly evolved into one of the most exclusive and peaceful residential havens in the FCT.</p>

      <h3>1. Distinction Between Katampe Main & Extension</h3>
      <p>Katampe Main sits directly adjacent to Maitama along the Murtala Mohammed Expressway, while Katampe Extension offers newly designed gated communities with modern infrastructure, diplomatic residences, and sweeping city vistas.</p>

      <h3>2. Architectural Quality</h3>
      <p>Most properties in Katampe are newly completed contemporary 4-bedroom terraces, fully detached duplexes with penthouses, and high-spec serviced apartments with underground cabling and perimeter electric fencing.</p>

      <h3>3. Accessibility</h3>
      <p>Reaching Maitama, Wuse 2, or the Central Business District typically takes under 10 minutes without the gridlock common in satellite suburbs.</p>
    `,
  },
  'market-outlook': {
    id: 'market-outlook',
    title: 'Abuja Rental Market Outlook 2026: Trends & Price Projections',
    category: 'Market Trends',
    categorySlug: 'market',
    readTime: '4 min read',
    date: 'January 2026',
    author: 'RentABJ Market Intelligence',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89ab11?q=80&w=1200&auto=format&fit=crop',
    tags: 'trends price budget 2026 abuja rentals inflation solar inverter karsana dawaki',
    excerpt:
      'What renters should anticipate in 2026 across emerging corridors like Karsana, Dawaki, and Kubwa.',
    content: `
      <p>As Abuja's urban population continues to expand with professionals and families relocating from across Nigeria, the rental landscape has shown notable patterns:</p>

      <h3>1. Surge in Demand for 2-Bedroom Flats</h3>
      <p>Two-bedroom apartments in locations like Karsana, Dawaki, and Lifecamp continue to see the highest occupancy velocity due to balanced pricing and favorable estate amenities.</p>

      <h3>2. Demand for Independent Energy Backups</h3>
      <p>Tenants increasingly prioritize homes with dedicated inverter wiring or solar hybrid setups to cushion against fluctuating grid power and fuel costs.</p>

      <h3>3. Growth Along the Outer Northern Expressway</h3>
      <p>Continuous road expansion has made areas like Kubwa and Karsana viable alternatives for families seeking spacious compounds at roughly half the rental rates of inner-city districts.</p>
    `,
  },
  'tenant-rights': {
    id: 'tenant-rights',
    title: 'Tenant Rights in the FCT: What Your Landlord Can & Cannot Do',
    category: 'Tenant Advisory',
    categorySlug: 'legal',
    readTime: '5 min read',
    date: 'December 2025',
    author: 'RentABJ Legal Advisory',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    tags: 'agreement rights quit notice deposit refund landlord recovery premises fct legal',
    excerpt:
      'Key legal protections under Abuja recovery of premises laws regarding eviction notices, rent increases, and privacy.',
    content: `
      <p>Navigating tenancy relationships requires knowledge of your lawful rights under applicable recovery of premises statutes in the Federal Capital Territory:</p>

      <h3>1. Statutory Notice Periods</h3>
      <p>Unless expressly agreed otherwise in a valid written contract, annual tenants are generally entitled to a 6-month notice to quit prior to the expiration of their tenancy.</p>

      <h3>2. Right to Quiet Enjoyment</h3>
      <p>Once rent is paid, landlords or caretakers are not legally permitted to enter your residence unannounced without reasonable advance notice and consent.</p>

      <h3>3. Arbitrary Rent Increases</h3>
      <p>Landlords cannot unilaterally raise rent midway through an existing tenancy tenure without mutual negotiation or timely prior notice.</p>
    `,
  },
};

export const blogArticlesList: BlogArticle[] = Object.values(blogArticles);
