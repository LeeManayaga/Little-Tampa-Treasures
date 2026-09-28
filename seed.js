require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connected to Render database...');

    // Create the items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        tags TEXT[],
        price INTEGER,
        address TEXT
      );
    `);
    console.log('Table created successfully.');

    // Insert all 11 locations
    await client.query(`
      INSERT INTO items (title, description, image, tags, price, address) VALUES
      ('Birdettes', 'An eclectic craft and gathering space featuring painted bird murals, vintage furniture, and a central table stacked with magazines and art supplies.', './pics/birdettes.webp', ARRAY['craft', 'cafe'], 2, '2710 N Florida Ave, Tampa, FL 33602'),
      ('Blooming Floral Cafe', 'A beautifully decorated cafe featuring a blue piano, ornate floral decor, and a mirror inscribed with the phrase "live life in full bloom".', './pics/blooming_floral_cafe.webp', ARRAY['cafe'], 2, '4408 N Florida Ave, Tampa, FL 33603'),
      ('Bottom of the Bin', 'A dedicated storefront offering secondhand art and craft supplies, a local art showcase, and creative classes.', './pics/bottom_of_the_bin.webp', ARRAY['craft', 'thrifting'], 1, '9444 Seminole Blvd, Seminole, FL 33772'),
      ('Elevenses', 'A cozy bakery and coffee shop operating out of a charming two-story white building with a colorful pastel sign.', './pics/elevenses.webp', ARRAY['cafe', 'desserts'], 2, '1001 E Columbus Dr, Tampa, FL 33605'),
      ('Felicitous (on 51st)', 'A relaxed coffee and tea house featuring purple walls, eclectic vintage furniture, and a laid-back atmosphere.', './pics/felicitous.webp', ARRAY['cafe'], 1, '11706 N 51st St, Tampa, FL 33617'),
      ('Rey Liquidation', 'A retail liquidation store packed with industrial shelving holding home goods, small kitchen appliances, and toys.', './pics/rey_liquidation.webp', ARRAY['thrifting'], 1, '6912 Harney Rd, Tampa, FL 33617'),
      ('Scraporium', 'A specialized craft supply store heavily stocked with a wide variety of colorful scrapbooking paper and crafting tools.', './pics/scraporium.png', ARRAY['craft', 'thrifting'], 2, '16518 N Florida Ave, Lutz, FL 33549'),
      ('Sew Pinellas', 'A bright pink sewing studio equipped with multiple sewing machines set up on large work tables for classes or open workshops.', './pics/sew_pinellas.webp', ARRAY['craft'], 2, '5601 Haines Rd N Front Building, St. Petersburg, FL 33714'),
      ('The Milkshake Bar', 'A dessert destination serving extravagant, over-the-top milkshakes loaded with toppings like miniature cookies and whipped cream.', './pics/the_milkshake_bar.webp', ARRAY['desserts'], 3, '13168 N Dale Mabry Hwy Unit 30, Tampa, FL 33618'),
      ('You Do The Dishes', 'A vibrant paint-your-own-pottery studio featuring extensive wooden shelves stocked with unpainted ceramic mugs, bowls, and figures.', './pics/you_do_the_dishes.webp', ARRAY['craft', 'cafe'], 2, '15357 Amberly Dr, Tampa, FL 33647'),
      ('Ice Screamin', 'An ice cream destination serving loaded waffle cone desserts topped with whipped cream, cookie crumbles, and caramel drizzle against a vibrant pop-art background.', './pics/ice_screamin.webp', ARRAY['desserts'], 2, '14933 Bruce B Downs Blvd, Tampa, FL 33613');
    `);
    console.log('All data inserted successfully!');

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await client.end();
  }
}

seedDatabase();