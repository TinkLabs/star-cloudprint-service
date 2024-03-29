import express from 'express';
import wrapAsync from 'express-wrap-async';
import redis from '../database/redis';


const router = express.Router();


// middleware
router.use(wrapAsync(async function (req, res, next) {
    const mac = req.body.printerMAC || req.query.mac;

    if (mac) {
        res.locals.mac = mac.toUpperCase();
        await redis.setAsync(`printer.alive.${res.locals.mac}`, 1, 'EX', 10);
    }

    next();
}));


// POST /server
router.post('/', wrapAsync(async function (req, res) {
    if (res.locals.mac) {
        const jobs = await redis.lrangeAsync(`printer.jobs.${res.locals.mac}`, 0, 0);

        if (jobs && jobs.length) {
            return res.json({
                jobReady: true,
                mediaTypes: ['image/jpeg'],
            });
        }
    }

    res.json({
        jobReady: false,
    });
}));


// GET /server
router.get('/', wrapAsync(async function (req, res) {
    if (res.locals.mac) {
        const jobs = await redis.lrangeAsync(`printer.jobs.${res.locals.mac}`, 0, 0);

        if (jobs && jobs.length) {
            const contentBase64 = jobs[0];
            const contentBuffer = Buffer.from(contentBase64, 'base64');

            return res.type('image/jpeg').send(contentBuffer);
        }
    }

    res.status(404).send('No Jobs!');
}));


// DELETE /server
router.delete('/', wrapAsync(async function (req, res) {
    if (res.locals.mac) {
        await redis.lpop(`printer.jobs.${res.locals.mac}`);
    }

    res.send('Done!');
}));


export default router;
