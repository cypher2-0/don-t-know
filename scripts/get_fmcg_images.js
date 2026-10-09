const https = require('https');
const fs = require('fs');
const path = require('path');

// Let's test searching DuckDuckGo images or Bing images for packaging
async function getDDGImage(query) {
  const url = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&f=,,,type:photo,&p=1`;
  return new Promise((resolve) => {
    https.get('https://duckduckgo.com/?q=' + encodeURIComponent(query), {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const tokenMatch = html.match(/vqd=([\d-]+)/) || html.match(/vqd="([^"]+)"/);
        if (!tokenMatch) return resolve(null);
        const vqd = tokenMatch[1];
        https.get(`https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}`, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        }, (res2) => {
          let jsonStr = '';
          res2.on('data', chunk => jsonStr += chunk);
          res2.on('end', () => {
            try {
              const data = JSON.parse(jsonStr);
              if (data.results && data.results.length > 0) {
                // Return first 5 image URLs
                resolve(data.results.slice(0, 5).map(r => r.image));
              } else {
                resolve(null);
              }
            } catch (e) {
              resolve(null);
            }
          });
        });
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const queries = {
    'atta': 'Aashirvaad Shudh Chakki Atta 5kg packet packet cover',
    'rice': 'India Gate Basmati Rice 1kg packet packet cover',
    'oil': 'Fortune Sunlite Sunflower Oil 1L pouch packet',
    'bread': 'Harvest Gold White Bread 400g packet packaging',
    'sourdough': 'The Bakers Dozen Sourdough packet packaging',
    'bhujia': 'Haldirams Aloo Bhujia packet packaging',
    'choco-fills': 'Sunfeast Dark Fantasy Choco Fills packet box'
  };

  for (const [key, q] of Object.entries(queries)) {
    console.log(`Searching for: ${q}`);
    const imgs = await getDDGImage(q);
    console.log(`${key}:`, imgs);
  }
}

main();
