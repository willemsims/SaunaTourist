// Import with require
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Function to convert string to slug
function toSlug(text) {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

try {
  // Define the Excel file path
  const excelFilePath = path.join(__dirname, '../data/sauna-data.xlsx');
  console.log(`Looking for Excel file at: ${excelFilePath}`);
  
  // Check if the Excel file exists
  if (!fs.existsSync(excelFilePath)) {
    console.error(`ERROR: Excel file not found at ${excelFilePath}`);
    process.exit(1);
  }
  
  // Load the Excel file
  console.log('Loading Excel file...');
  const workbook = XLSX.readFile(excelFilePath);
  
  // Get the first worksheet
  const sheetName = workbook.SheetNames[0];
  console.log(`Using worksheet: ${sheetName}`);
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const data = XLSX.utils.sheet_to_json(worksheet);
  console.log(`Loaded ${data.length} rows from Excel`);
  
  // Filter out rows with missing required data
  const validData = data.filter(row => 
    row.name && row.city && row.province && row.country
  );
  
  if (validData.length < data.length) {
    console.warn(`Warning: Filtered out ${data.length - validData.length} rows with missing required data`);
  }
  
  // Extract unique provinces
  const uniqueProvinces = validData
    .map(row => row.province)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
  
  console.log(`Found ${uniqueProvinces.length} unique provinces: ${uniqueProvinces.join(', ')}`);
  
  const provinces = uniqueProvinces.map(provinceName => {
    const provinceSlug = toSlug(provinceName);
    const provinceSaunas = validData.filter(row => row.province === provinceName);
    
    // Extract unique cities
    const uniqueCities = provinceSaunas
      .map(row => row.city)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
    
    return {
      name: provinceName,
      slug: provinceSlug,
      cityCount: uniqueCities.length,
      saunaCount: provinceSaunas.length
    };
  });
  
  // Extract cities
  const cities = [];
  uniqueProvinces.forEach(provinceName => {
    const provinceSlug = toSlug(provinceName);
    const provinceSaunas = validData.filter(row => row.province === provinceName);
    
    // Extract unique cities
    const uniqueCities = provinceSaunas
      .map(row => row.city)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
    
    uniqueCities.forEach(cityName => {
      const citySlug = toSlug(cityName);
      const citySaunas = provinceSaunas.filter(row => row.city === cityName);
      
      cities.push({
        name: cityName,
        slug: citySlug,
        province: provinceName,
        provinceSlug: provinceSlug,
        saunaCount: citySaunas.length
      });
    });
  });
  
  console.log(`Processed ${cities.length} cities`);
  
  // Transform sauna data
  const saunas = validData.map(row => {
    const citySlug = toSlug(row.city);
    const provinceSlug = toSlug(row.province);
    
    return {
      name: row.name,
      city: row.city,
      citySlug: citySlug,
      province: row.province,
      provinceSlug: provinceSlug,
      country: row.country,
      
      // Optional fields - only include if they exist
      ...(row.street && { street: row.street }),
      ...(row.postalCode && { postalCode: row.postalCode }),
      ...(row.phone && { phone: row.phone }),
      ...(row.website && { website: row.website }),
      ...(row.email && { email: row.email }),
      ...(row.latitude && { latitude: parseFloat(row.latitude) }),
      ...(row.longitude && { longitude: parseFloat(row.longitude) }),
      ...(row.description && { description: row.description }),
      ...(row.rating && { rating: parseFloat(row.rating) }),
      ...(row.reviewCount && { reviewCount: parseInt(row.reviewCount) }),
      ...(row.images && { images: [row.images].flat().filter(Boolean) })
    };
  });
  
  console.log(`Processed ${saunas.length} saunas`);
  
  // Create data directory if it doesn't exist
  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
    console.log(`Created data directory at ${dataDir}`);
  }
  
  // Write to JSON files
  fs.writeFileSync(
    path.join(dataDir, 'provinces.json'),
    JSON.stringify(provinces, null, 2)
  );
  
  fs.writeFileSync(
    path.join(dataDir, 'cities.json'),
    JSON.stringify(cities, null, 2)
  );
  
  fs.writeFileSync(
    path.join(dataDir, 'saunas.json'),
    JSON.stringify(saunas, null, 2)
  );
  
  console.log(`Successfully wrote JSON files to ${dataDir}:`);
  console.log(`- provinces.json (${provinces.length} provinces)`);
  console.log(`- cities.json (${cities.length} cities)`);
  console.log(`- saunas.json (${saunas.length} saunas)`);
  
} catch (error) {
  console.error('Error processing Excel file:');
  console.error(error);
  process.exit(1);
} 