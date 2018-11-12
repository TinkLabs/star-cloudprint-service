const page = require('webpage').create();
const system = require('system');
const from = system.args[1];
const to = system.args[2];


page.open(from, function() {
    page.render(to);
    phantom.exit();
});
