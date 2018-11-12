import express from 'express';
import wrapAsync from 'express-wrap-async';
import redis from '../database/redis';
import html2image from '../utils/html2image';


const router = express.Router();


// middleware
router.use(wrapAsync(async function (req, res, next) {
    const mac = req.query.mac || req.body.mac;

    if (mac) {
        res.locals.mac = mac.toLowerCase().split(',');
    }

    next();
}));


// GET /check
router.get('/check', wrapAsync(async function (req, res) {
    if (res.locals.mac) {
        let alive = {};

        for (let i = 0; i < res.locals.mac.length; i++) {
            alive[res.locals.mac[i]] = !!(await redis.getAsync(`${res.locals.mac[i]}.alive`));
        }

        return res.json(alive);
    }

    res.json({
        success: false,
    });
}));


// POST /print
router.post('/print', wrapAsync(async function (req, res) {
    if (res.locals.mac && req.body.html) {
        const contentBuffer = await html2image(req.body.html);
        const contentBase64 = Buffer.from(contentBuffer, 'binary').toString('base64');

        for (let i = 0; i < res.locals.mac.length; i++) {
            await redis.rpushAsync(`${res.locals.mac[i]}.jobs`, contentBase64);
        }

        return res.json({
            success: true,
        });
    }

    res.json({
        success: false,
    });
}));


export default router;
