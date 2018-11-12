import Promise from 'bluebird';
import redis from 'redis';


Promise.promisifyAll(redis);


const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {
    retry_strategy: (options) => {
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
        }

        if (options.attempt > 50) {
            return new Error('Retry attempts ended');
        }

        return Math.min(options.attempt * 100, 3000);
    },
});


client.select(process.env.REDIS_DATABASE);


client.on('connect', () => {
    console.log('Redis is connected.');
});

client.on('reconnecting', (error) => {
    console.error(error);
});

client.on('error', (error) => {
    console.error(error);
});


export default client;
