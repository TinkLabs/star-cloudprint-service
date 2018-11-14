import express from 'express';
import wrapAsync from 'express-wrap-async';
import Promise from 'bluebird';
import {zipObject} from 'lodash/array';
import redis from '../database/redis';
import html2image from '../utils/html2image';


const router = express.Router();


// middleware
router.use(wrapAsync(async function (req, res, next) {
    const mac = req.query.mac || req.body.mac;

    if (mac) {
        res.locals.mac = mac.split(',');
    }

    next();
}));


// GET /check
router.get('/check', wrapAsync(async function (req, res) {
    if (res.locals.mac) {
        return res.json({
            success: true,
            results: zipObject(
                res.locals.mac,
                await Promise.map(res.locals.mac, async (mac) => !!(await redis.getAsync(`printer.alive.${mac.toUpperCase()}`))),
            ),
        });
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

        await Promise.map(res.locals.mac, (mac) => redis.rpushAsync(`printer.jobs.${mac.toUpperCase()}`, contentBase64));

        return res.json({
            success: true,
        });
    }

    res.json({
        success: false,
    });
}));


export default router;
