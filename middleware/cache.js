const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL || 'redis://localhost:6379'); // Connect to Redis

client.on('error', (err) => {
  console.error('Redis error: ', err);
});

// Middleware to check cache before querying the database
const cache = (req, res, next) => {
  const { lang } = req.query;
  const cacheKey = `faq:${lang || 'en'}`; // Cache key based on the language or default to 'en'

  // Check if the data is available in the Redis cache
  client.get(cacheKey, (err, data) => {
    if (err) {
      console.error('Error fetching from Redis:', err);
      return next(); // Proceed to the next middleware if Redis query fails
    }

    if (data) {
      // If data is found in cache, return it as the response
      console.log('Cache hit');
      return res.json(JSON.parse(data));
    }

    // If data is not in the cache, proceed to fetch it from the database
    console.log('Cache miss');
    next();
  });
};

// Middleware to store data in cache after fetching it from the DB
const c
