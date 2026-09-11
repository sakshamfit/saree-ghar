/* ═══════════════════════════════════════════════
   products — the single source of product truth,
   built from the brand's own asset folders (the
   seven saree types supplied on 2026-09-07).
   Every surface — listings, product pages, search,
   cart, checkout — reads from this file.

   PENDING REAL DATA (clearly marked, not invented):
   · price      — only Mangalagiri (₹3,400) appears
     in the supplied files; every other price is a
     placeholder with priceConfirmed:false
   · bestSeller — a provisional selection; adjust
   · reviews    — structure ready, no fake reviews
   ═══════════════════════════════════════════════ */

const P = 'assets/products/';

/* helper: expand image stems into {full, card} pairs */
function media(id, stems, videos = []) {
  return {
    images: stems.map((s) => `${P}${id}/${s}.jpg`),
    cards: stems.map((s) => `${P}${id}/${s}-card.jpg`),
    videos: videos.map((v) => ({
      src: `${P}${id}/${v}.mp4`,
      poster: `${P}${id}/${v}-poster.jpg`,
    })),
  };
}

/* ── the seven collections (sarees by origin/type) ── */

/* Landing/cover images are the brand's own curated entry visuals —
   they are NEVER product photos, and product galleries never use them.
   Types without a supplied cover yet fall back to a product card
   (pending: lotus-sequin, sunflower-mul-cotton). */

export const TYPES = [
  {
    key: 'kota-doria',
    name: { en: 'Kota Doria', te: 'కోటా డోరియా' },
    cover: 'assets/img/origin/kota.jpg',
    blurb: {
      en: 'Featherlight khat-weave kotas, embroidered with cross-stitch roses and finished in crochet lace.',
      te: 'గాలంత తేలికైన కోటా నేత — క్రాస్-స్టిచ్ గులాబీలు, లేస్ అంచు.',
    },
    video: `${P}_collections/kota-doria.mp4`,
    poster: `${P}_collections/kota-doria-poster.jpg`,
  },
  {
    key: 'lotus-embroidery',
    name: { en: 'Lotus Embroidery', te: 'లోటస్ కుట్టుపని' },
    cover: 'assets/img/origin/lotus.jpg',
    blurb: {
      en: 'Soft mul cotton scattered with hand-embroidered lotus blooms.',
      te: 'మృదువైన మల్ కాటన్‌పై చేతి కుట్టుపని పద్మాలు.',
    },
  },
  {
    key: 'lotus-sequin',
    name: { en: 'Lotus Sequin', te: 'లోటస్ సీక్విన్' },
    cover: null,   /* awaiting the brand's landing image */
    blurb: {
      en: 'Lotus motifs lit with sequin shimmer on deep-toned drapes.',
      te: 'సీక్విన్ మెరుపుతో లోటస్ అల్లికల చీరలు.',
    },
  },
  {
    key: 'tulip-mul-cotton',
    name: { en: 'Tulip Mul Cotton', te: 'తులిప్ మల్ కాటన్' },
    cover: 'assets/img/origin/tulip.jpg',
    blurb: {
      en: 'Quiet pastel muls with embroidered tulips and tasselled edges.',
      te: 'తులిప్ కుట్టుపని, కుచ్చుల అంచుల లేత రంగుల మల్ చీరలు.',
    },
  },
  {
    key: 'sunflower-mul-cotton',
    name: { en: 'Sunflower Mul Cotton', te: 'సన్‌ఫ్లవర్ మల్ కాటన్' },
    cover: null,   /* awaiting the brand's landing image */
    blurb: {
      en: 'Sunlit mul cottons blooming with embroidered sunflowers.',
      te: 'సూర్యకాంతి పూల కుట్టుపనితో మల్ కాటన్ చీరలు.',
    },
  },
  {
    key: 'partywear',
    name: { en: 'Partywear', te: 'పార్టీవేర్' },
    cover: 'assets/img/origin/partywear.jpg',
    blurb: {
      en: 'Crush chiffons carrying bold, multicolour embroidered garden borders.',
      te: 'రంగుల పూల అంచులతో మెరిసే పార్టీవేర్ చీరలు.',
    },
  },
  {
    key: 'mangalagiri',
    name: { en: 'Mangalagiri', te: 'మంగళగిరి' },
    cover: 'assets/img/origin/mangalagiri.jpg',
    blurb: {
      en: 'Silk-finish Mangalagiri drapes in scallop-edged garden florals.',
      te: 'పూల ప్రింట్, స్కాలప్ అంచుల మంగళగిరి చీరలు.',
    },
    video: `${P}_collections/mangalagiri.mp4`,
    poster: `${P}_collections/mangalagiri-poster.jpg`,
  },
];

/* the brand's Shop-by-Colour profile images (landing section 4).
   Orange and black have sarees but no supplied profile image yet —
   they render as swatch tiles until one arrives. */
export const COLOUR_COVERS = {
  red: 'assets/img/shade/red.jpg',
  green: 'assets/img/shade/green.jpg',
  yellow: 'assets/img/shade/yellow.jpg',
  blue: 'assets/img/shade/blue.jpg',
  pink: 'assets/img/shade/pink.jpg',
  purple: 'assets/img/shade/purple.jpg',
  neutrals: 'assets/img/shade/neutrals.jpg',
};

/* ── the products (from the supplied assets — one record each) ── */

const KOTA_FABRIC = { en: 'Kota Doria cotton-silk, khat weave', te: 'కోటా డోరియా కాటన్-సిల్క్ నేత' };
const KOTA_CRAFT = { en: 'Cross-stitch floral embroidery, crochet-lace hem', te: 'క్రాస్-స్టిచ్ పూల కుట్టుపని, లేస్ అంచు' };
const MUL_FABRIC = { en: 'Feather-light mul cotton', te: 'గాలంత తేలిక మల్ కాటన్' };

export const PRODUCTS = [
  /* ── Kota Doria — nine colourways (the brand's own range grid) ── */
  {
    id: 'kota-rani-pink', sareeType: 'kota-doria', colour: 'pink',
    price: 3150, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('kota-rani-pink', ['01', '02']),
    name: { en: 'Rani Pink Kota Doria', te: 'రాణి పింక్ కోటా డోరియా' },
    desc: {
      en: 'The signature rani pink of the kota range — rose vines in cross-stitch over a featherlight weave, edged in gold zari and pink lace, paired with a pink ikat blouse.',
      te: 'రాణి పింక్ కోటా — గులాబీ తీగల కుట్టుపని, బంగారు జరీ, పింక్ లేస్ అంచు, ఇకత్ జాకెట్‌తో.',
    },
    fabric: KOTA_FABRIC, craft: KOTA_CRAFT,
  },
  {
    id: 'kota-peach', sareeType: 'kota-doria', colour: 'orange',
    price: 3150, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('kota-peach', ['01', '02', '03']),
    name: { en: 'Peach Blossom Kota Doria', te: 'పీచ్ బ్లాసమ్ కోటా డోరియా' },
    desc: {
      en: 'Warm peach kota strewn with rose sprays, hemmed in deep red lace — photographed with its floral blouse pairing.',
      te: 'వెచ్చని పీచ్ కోటా — గులాబీ పూలు, ఎరుపు లేస్ అంచు, జత జాకెట్‌తో.',
    },
    fabric: KOTA_FABRIC, craft: KOTA_CRAFT,
  },
  {
    id: 'kota-lavender', sareeType: 'kota-doria', colour: 'purple',
    price: 3150, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('kota-lavender', ['01']),
    name: { en: 'Lavender Kota Doria', te: 'లావెండర్ కోటా డోరియా' },
    desc: {
      en: 'A lilac kota carrying a violet garden border in cross-stitch, finished with deep purple lace.',
      te: 'లిలాక్ కోటా — ఊదా పూల అంచు కుట్టుపని, పర్పుల్ లేస్.',
    },
    fabric: KOTA_FABRIC, craft: KOTA_CRAFT,
  },
  {
    id: 'kota-pistachio', sareeType: 'kota-doria', colour: 'green',
    price: 3150, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('kota-pistachio', ['01', '02', '03']),
    name: { en: 'Pistachio Kota Doria', te: 'పిస్తా కోటా డోరియా' },
    desc: {
      en: 'Pistachio green kota with pink rose clusters and a rose-pink lace hem — shown with its magenta blouse pairing.',
      te: 'పిస్తా కోటా — గులాబీ పూల గుత్తులు, పింక్ లేస్, మెజెంటా జాకెట్‌తో.',
    },
    fabric: KOTA_FABRIC, craft: KOTA_CRAFT,
  },
  {
    id: 'kota-salmon', sareeType: 'kota-doria', colour: 'pink',
    price: 3150, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('kota-salmon', ['01', '02', '03']),
    name: { en: 'Salmon Rose Kota Doria', te: 'సాల్మన్ రోజ్ కోటా డోరియా' },
    desc: {
      en: 'Salmon pink kota with tulip-and-rose embroidery, deep red lace, and a dark floral blouse pairing.',
      te: 'సాల్మన్ పింక్ కోటా — తులిప్-గులాబీ కుట్టుపని, ఎరుపు లేస్.',
    },
    fabric: KOTA_FABRIC, craft: KOTA_CRAFT,
  },
  {
    id: 'kota-red', sareeType: 'kota-doria', colour: 'red',
    price: 3150, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('kota-red', ['01', '02', '03']),
    name: { en: 'Crimson Kota Doria', te: 'క్రిమ్సన్ కోటా డోరియా' },
    desc: {
      en: 'Deep crimson kota with tonal rose embroidery over a gold zari border and lace hem.',
      te: 'ముదురు ఎరుపు కోటా — గులాబీ కుట్టుపని, బంగారు జరీ అంచు.',
    },
    fabric: KOTA_FABRIC, craft: KOTA_CRAFT,
  },
  {
    id: 'kota-black', sareeType: 'kota-doria', colour: 'black',
    price: 3150, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('kota-black', ['01', '02', '03']),
    name: { en: 'Midnight Black Kota Doria', te: 'మిడ్‌నైట్ బ్లాక్ కోటా డోరియా' },
    desc: {
      en: 'Black kota lit by pink rose vines, silver zari, and a rose lace hem — with a pink rose-print blouse pairing.',
      te: 'నల్ల కోటా — పింక్ గులాబీ తీగలు, వెండి జరీ, రోజ్ లేస్.',
    },
    fabric: KOTA_FABRIC, craft: KOTA_CRAFT,
  },
  {
    id: 'kota-lemon', sareeType: 'kota-doria', colour: 'yellow',
    price: 3150, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('kota-lemon', ['01', '02', '03']),
    name: { en: 'Lemon Peacock Kota Doria', te: 'లెమన్ పీకాక్ కోటా డోరియా' },
    desc: {
      en: 'Lemon yellow kota with an embroidered peacock-and-tree tableau and a white lace hem.',
      te: 'లేత పసుపు కోటా — నెమలి-చెట్టు కుట్టుపని, తెల్ల లేస్ అంచు.',
    },
    fabric: KOTA_FABRIC, craft: KOTA_CRAFT,
  },
  {
    id: 'kota-dark-green', sareeType: 'kota-doria', colour: 'green',
    price: 3150, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: true, rating: null, reviews: [],
    ...media('kota-dark-green', ['01', '02'], ['video01']),
    name: { en: 'Forest Green Kota Doria', te: 'ఫారెస్ట్ గ్రీన్ కోటా డోరియా' },
    desc: {
      en: 'Forest green kota scattered with pink roses over gold zari and a rani lace hem.',
      te: 'ముదురు ఆకుపచ్చ కోటా — పింక్ గులాబీలు, జరీ, రాణి లేస్.',
    },
    fabric: KOTA_FABRIC, craft: KOTA_CRAFT,
  },

  /* ── Lotus Embroidery ── */
  {
    id: 'lotus-embroidery-green', sareeType: 'lotus-embroidery', colour: 'green',
    price: 2850, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: true, rating: null, reviews: [],
    ...media('lotus-embroidery-green', ['01', '02'], ['video01']),
    name: { en: 'Pistachio Lotus Embroidery', te: 'పిస్తా లోటస్ కుట్టుపని' },
    desc: {
      en: 'Pistachio mul cotton scattered with hand-embroidered magenta lotuses, styled with a magenta blouse and tasselled edge.',
      te: 'పిస్తా మల్ కాటన్‌పై మెజెంటా పద్మాల చేతి కుట్టుపని, కుచ్చుల అంచు.',
    },
    fabric: { en: 'Soft mul cotton', te: 'మృదువైన మల్ కాటన్' },
    craft: { en: 'Hand-embroidered lotus motifs, tasselled pallu', te: 'చేతి కుట్టుపని పద్మాలు, కుచ్చుల పల్లు' },
  },

  /* ── Lotus Sequin ── */
  {
    id: 'lotus-sequin-navy', sareeType: 'lotus-sequin', colour: 'blue',
    price: 3250, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: true, rating: null, reviews: [],
    ...media('lotus-sequin-navy', ['01', '02', '03'], ['video01']),
    name: { en: 'Navy Lotus Sequin', te: 'నేవీ లోటస్ సీక్విన్' },
    desc: {
      en: 'Navy drape blooming with multicolour lotus embroidery and sequin shimmer — paired with a sunshine yellow blouse.',
      te: 'నేవీ చీరపై రంగుల లోటస్ కుట్టుపని, సీక్విన్ మెరుపు — పసుపు జాకెట్‌తో.',
    },
    fabric: { en: 'Soft mul cotton', te: 'మృదువైన మల్ కాటన్' },
    craft: { en: 'Multicolour lotus embroidery with sequin work, tassels', te: 'రంగుల లోటస్ కుట్టుపని, సీక్విన్ వర్క్' },
  },
  {
    id: 'lotus-sequin-teal', sareeType: 'lotus-sequin', colour: 'green',
    price: 3250, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('lotus-sequin-teal', ['01']),
    name: { en: 'Teal Lotus Sequin', te: 'టీల్ లోటస్ సీక్విన్' },
    desc: {
      en: 'Deep teal ground carrying rose-pink lotus embroidery with sequin light.',
      te: 'ముదురు టీల్‌పై గులాబీ లోటస్ కుట్టుపని, సీక్విన్ మెరుపు.',
    },
    fabric: { en: 'Soft mul cotton', te: 'మృదువైన మల్ కాటన్' },
    craft: { en: 'Lotus embroidery with sequin work', te: 'లోటస్ కుట్టుపని, సీక్విన్ వర్క్' },
  },

  /* ── Tulip Mul Cotton ── */
  {
    id: 'tulip-sky-blue', sareeType: 'tulip-mul-cotton', colour: 'blue',
    price: 2750, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('tulip-sky-blue', ['01', '02', '03']),
    name: { en: 'Sky Blue Tulip Mul', te: 'స్కై బ్లూ తులిప్ మల్' },
    desc: {
      en: 'Sky blue mul with violet tulip embroidery and teal tassels — photographed in the Saree Ghar studio arch.',
      te: 'స్కై బ్లూ మల్ — ఊదా తులిప్ కుట్టుపని, టీల్ కుచ్చులు.',
    },
    fabric: MUL_FABRIC,
    craft: { en: 'Tulip embroidery, tasselled edge', te: 'తులిప్ కుట్టుపని, కుచ్చుల అంచు' },
  },
  {
    id: 'tulip-sage', sareeType: 'tulip-mul-cotton', colour: 'green',
    price: 2750, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: true, rating: null, reviews: [],
    ...media('tulip-sage', ['01', '02'], ['video01']),
    name: { en: 'Sage Tulip Mul', te: 'సేజ్ తులిప్ మల్' },
    desc: {
      en: 'Sage green mul with quiet tulip motifs and teal tassels, draped in the Saree Ghar studio arch.',
      te: 'సేజ్ గ్రీన్ మల్ — తులిప్ అల్లికలు, టీల్ కుచ్చులు.',
    },
    fabric: MUL_FABRIC,
    craft: { en: 'Tulip embroidery, tasselled edge', te: 'తులిప్ కుట్టుపని, కుచ్చుల అంచు' },
  },

  /* ── Sunflower Mul Cotton ── */
  {
    id: 'sunflower-red', sareeType: 'sunflower-mul-cotton', colour: 'red',
    price: 2750, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: true, rating: null, reviews: [],
    ...media('sunflower-red', ['01', '02', '03'], ['video01', 'video02']),
    name: { en: 'Scarlet Sunflower Mul', te: 'స్కార్లెట్ సన్‌ఫ్లవర్ మల్' },
    desc: {
      en: 'Scarlet mul cotton blooming with embroidered sunflowers, finished with tassels — shown draped and styled.',
      te: 'ఎరుపు మల్ కాటన్‌పై సన్‌ఫ్లవర్ కుట్టుపని, కుచ్చుల అంచు.',
    },
    fabric: MUL_FABRIC,
    craft: { en: 'Sunflower embroidery, tasselled pallu', te: 'సన్‌ఫ్లవర్ కుట్టుపని, కుచ్చుల పల్లు' },
  },
  {
    id: 'sunflower-sky-blue', sareeType: 'sunflower-mul-cotton', colour: 'blue',
    price: 2750, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('sunflower-sky-blue', ['01', '02']),
    name: { en: 'Sky Sunflower Mul', te: 'స్కై సన్‌ఫ్లవర్ మల్' },
    desc: {
      en: 'Sky blue mul carrying golden sunflower embroidery — worn with a navy blouse.',
      te: 'స్కై బ్లూ మల్‌పై బంగారు సన్‌ఫ్లవర్ కుట్టుపని.',
    },
    fabric: MUL_FABRIC,
    craft: { en: 'Sunflower embroidery, tasselled pallu', te: 'సన్‌ఫ్లవర్ కుట్టుపని, కుచ్చుల పల్లు' },
  },
  {
    id: 'sunflower-pink', sareeType: 'sunflower-mul-cotton', colour: 'pink',
    price: 2750, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('sunflower-pink', ['01']),
    name: { en: 'Rose Sunflower Mul', te: 'రోజ్ సన్‌ఫ్లవర్ మల్' },
    desc: {
      en: 'Rose pink mul with sunflower embroidery, photographed with its sky and scarlet sisters.',
      te: 'రోజ్ పింక్ మల్ — సన్‌ఫ్లవర్ కుట్టుపని.',
    },
    fabric: MUL_FABRIC,
    craft: { en: 'Sunflower embroidery, tasselled pallu', te: 'సన్‌ఫ్లవర్ కుట్టుపని, కుచ్చుల పల్లు' },
  },

  /* ── Partywear ── */
  {
    id: 'partywear-lime', sareeType: 'partywear', colour: 'green',
    price: 3650, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: true, rating: null, reviews: [],
    ...media('partywear-lime', ['01', '02'], ['video01']),
    name: { en: 'Lime Blossom Partywear', te: 'లైమ్ బ్లాసమ్ పార్టీవేర్' },
    desc: {
      en: 'Lime crush chiffon with a bold multicolour embroidered garden border and scalloped hem.',
      te: 'లైమ్ షిఫాన్ — రంగుల పూల అంచు, స్కాలప్ హెమ్.',
    },
    fabric: { en: 'Crush chiffon', te: 'క్రష్ షిఫాన్' },
    craft: { en: 'Multicolour floral embroidered border, scalloped hem', te: 'రంగుల పూల కుట్టుపని అంచు' },
  },
  {
    id: 'partywear-navy', sareeType: 'partywear', colour: 'blue',
    price: 3650, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('partywear-navy', ['01']),
    name: { en: 'Navy Bloom Partywear', te: 'నేవీ బ్లూమ్ పార్టీవేర్' },
    desc: {
      en: 'Navy crush chiffon carrying a vivid embroidered garden border.',
      te: 'నేవీ షిఫాన్ — రంగుల పూల కుట్టుపని అంచు.',
    },
    fabric: { en: 'Crush chiffon', te: 'క్రష్ షిఫాన్' },
    craft: { en: 'Multicolour floral embroidered border, scalloped hem', te: 'రంగుల పూల కుట్టుపని అంచు' },
  },
  {
    id: 'partywear-rose', sareeType: 'partywear', colour: 'pink',
    price: 3650, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('partywear-rose', ['01']),
    name: { en: 'Rose Bloom Partywear', te: 'రోజ్ బ్లూమ్ పార్టీవేర్' },
    desc: {
      en: 'Rose pink crush chiffon with the signature multicolour embroidered border.',
      te: 'రోజ్ పింక్ షిఫాన్ — రంగుల పూల అంచు.',
    },
    fabric: { en: 'Crush chiffon', te: 'క్రష్ షిఫాన్' },
    craft: { en: 'Multicolour floral embroidered border, scalloped hem', te: 'రంగుల పూల కుట్టుపని అంచు' },
  },
  {
    id: 'partywear-sage', sareeType: 'partywear', colour: 'green',
    price: 3650, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('partywear-sage', ['01']),
    name: { en: 'Sage Bloom Partywear', te: 'సేజ్ బ్లూమ్ పార్టీవేర్' },
    desc: {
      en: 'Sage green crush chiffon with a garden of embroidered blooms along the border.',
      te: 'సేజ్ షిఫాన్ — పూల కుట్టుపని అంచు.',
    },
    fabric: { en: 'Crush chiffon', te: 'క్రష్ షిఫాన్' },
    craft: { en: 'Multicolour floral embroidered border, scalloped hem', te: 'రంగుల పూల కుట్టుపని అంచు' },
  },
  {
    id: 'partywear-lilac', sareeType: 'partywear', colour: 'purple',
    price: 3650, priceConfirmed: false, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('partywear-lilac', ['01']),
    name: { en: 'Lilac Bloom Partywear', te: 'లిలాక్ బ్లూమ్ పార్టీవేర్' },
    desc: {
      en: 'Lilac crush chiffon with the multicolour embroidered garden border.',
      te: 'లిలాక్ షిఫాన్ — రంగుల పూల అంచు.',
    },
    fabric: { en: 'Crush chiffon', te: 'క్రష్ షిఫాన్' },
    craft: { en: 'Multicolour floral embroidered border, scalloped hem', te: 'రంగుల పూల కుట్టుపని అంచు' },
  },

  /* ── Mangalagiri (price ₹3,400 — stated in the brand's own video) ── */
  {
    id: 'mangalagiri-blush', sareeType: 'mangalagiri', colour: 'pink',
    price: 3400, priceConfirmed: true, availability: 'to-order',
    newArrival: true, bestSeller: true, rating: null, reviews: [],
    ...media('mangalagiri-blush', ['01', '02', '03'], ['video01']),
    name: { en: 'Blush Garden Mangalagiri', te: 'బ్లష్ గార్డెన్ మంగళగిరి' },
    desc: {
      en: 'Blush pink silk-finish Mangalagiri in garden florals, edged with a teal scalloped border — worn with a teal blouse.',
      te: 'బ్లష్ పింక్ మంగళగిరి — పూల ప్రింట్, టీల్ స్కాలప్ అంచు.',
    },
    fabric: { en: 'Silk-finish Mangalagiri weave', te: 'సిల్క్-ఫినిష్ మంగళగిరి నేత' },
    craft: { en: 'Garden floral print, scalloped border', te: 'పూల ప్రింట్, స్కాలప్ అంచు' },
  },
  {
    id: 'mangalagiri-rose-green', sareeType: 'mangalagiri', colour: 'pink',
    price: 3400, priceConfirmed: true, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('mangalagiri-rose-green', ['01', '02']),
    name: { en: 'Rose & Fern Mangalagiri', te: 'రోజ్ & ఫెర్న్ మంగళగిరి' },
    desc: {
      en: 'A rose pink drape meeting a fern green floral border — a two-tone Mangalagiri pairing.',
      te: 'రోజ్ పింక్ + ఫెర్న్ గ్రీన్ పూల అంచు — రెండు రంగుల మంగళగిరి.',
    },
    fabric: { en: 'Silk-finish Mangalagiri weave', te: 'సిల్క్-ఫినిష్ మంగళగిరి నేత' },
    craft: { en: 'Garden floral print, scalloped border', te: 'పూల ప్రింట్, స్కాలప్ అంచు' },
  },
  {
    id: 'mangalagiri-blue', sareeType: 'mangalagiri', colour: 'blue',
    price: 3400, priceConfirmed: true, availability: 'to-order',
    newArrival: true, bestSeller: false, rating: null, reviews: [],
    ...media('mangalagiri-blue', ['01']),
    name: { en: 'Sky & Sunshine Mangalagiri', te: 'స్కై & సన్‌షైన్ మంగళగిరి' },
    desc: {
      en: 'Sky blue florals meeting a sunshine yellow border — a fresh two-tone Mangalagiri.',
      te: 'స్కై బ్లూ పూలు, పసుపు అంచు — రెండు రంగుల మంగళగిరి.',
    },
    fabric: { en: 'Silk-finish Mangalagiri weave', te: 'సిల్క్-ఫినిష్ మంగళగిరి నేత' },
    craft: { en: 'Garden floral print, scalloped border', te: 'పూల ప్రింట్, స్కాలప్ అంచు' },
  },
];

/* slugs mirror ids (clean, stable product routes: product.html?p=<slug>) */
for (const p of PRODUCTS) p.slug = p.id;

/* colours actually present in the catalog, in display order */
const COLOUR_ORDER = ['red', 'pink', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'neutrals'];
export const COLOURS = COLOUR_ORDER.filter((c) => PRODUCTS.some((p) => p.colour === c));

export function productById(id) {
  return PRODUCTS.find((p) => p.id === id || p.slug === id) || null;
}

export function productsByColour(colour) {
  return PRODUCTS.filter((p) => p.colour === colour);
}

export function productsByType(type) {
  return PRODUCTS.filter((p) => p.sareeType === type);
}

export function typeByKey(key) {
  return TYPES.find((t) => t.key === key) || null;
}

export function newArrivals() { return PRODUCTS.filter((p) => p.newArrival); }
export function bestSellers() { return PRODUCTS.filter((p) => p.bestSeller); }

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return PRODUCTS.filter((p) => {
    const type = typeByKey(p.sareeType);
    return p.name.en.toLowerCase().includes(q) ||
      p.name.te.includes(q) ||
      p.colour.includes(q) ||
      p.sareeType.replace(/-/g, ' ').includes(q) ||
      (type && (type.name.en.toLowerCase().includes(q) || type.name.te.includes(q))) ||
      p.desc.en.toLowerCase().includes(q);
  });
}

export function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN');
}
