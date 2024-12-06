const Redis = require('ioredis');

// Create a new Redis client
const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

// Subscribe to a Redis channel
redis.subscribe('garage-event', (err, count) => {
  if (err) {
    console.error('Error subscribing to channel:', err);
    return;
  }

  console.log(`Subscribed to ${count} channels`);

  // Listen for messages on the subscribed channel
  redis.on('message', (channel, message) => {
    //console.log(`Received message from channel ${channel}: ${message}`);
  });
});