import express from 'express';
import wrapAsync from 'express-wrap-async';
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
        let results = {};

        for (let i = 0; i < res.locals.mac.length; i++) {
            results[res.locals.mac[i]] = await redis.existsAsync(`printer.alive.${res.locals.mac[i].toUpperCase()}`);
        }

        return res.json({
            success: true,
            results,
        });
    }

    res.json({
        success: false,
    });
}));


// POST /print
router.post('/print', wrapAsync(async function (req, res) {
    if (res.locals.mac && req.body.html) {
        const number = parseInt(req.body.number) || 1;
        const contentBuffer = await html2image(req.body.html);
        const contentBase64 = Buffer.from(contentBuffer, 'binary').toString('base64');

        for (let i = 0; i < res.locals.mac.length; i++) {
            for (let y = 0; y < number; y++) {
                await redis.rpushAsync(`printer.jobs.${res.locals.mac[i].toUpperCase()}`, contentBase64);
            }
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
