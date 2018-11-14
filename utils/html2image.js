import util from 'util';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import {now} from 'lodash/date';
import {uniqueId} from 'lodash/util';
import cmd from 'node-cmd';


const fsReadFile = util.promisify(fs.readFile);
const fsWriteFile = util.promisify(fs.writeFile);
const fsUnlink = util.promisify(fs.unlink);
const cmdGet = Promise.promisify(cmd.get, {multiArgs: true, context: cmd});


export default async function html2image(html) {
    const id = uniqueId(now() + '-');
    const script = path.join(__dirname, '..', 'scripts', 'html2image.js');
    const from = path.join(__dirname, '..', 'tmp', `${id}.html`);
    const to = path.join(__dirname, '..', 'tmp', `${id}.jpg`);

    await fsWriteFile(from, html, 'utf8');
    await cmdGet(`phantomjs --disk-cache=true --max-disk-cache-size=204800 ${script} ${from} ${to}`);

    const image = await fsReadFile(to);

    await fsUnlink(from);
    await fsUnlink(to);

    return image;
}
