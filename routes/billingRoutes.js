const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req,res) => {
        // console.log(req.body);
        const charge = await stripe.charges.create({
            description: '$5 for 5 credits',
            amount:500,
            currency:'inr',
            source: req.body.id
        });
        console.log(charge);
        req.user.credits +=5;
        const user = await req.user.save();

        res.send(user);
    });
};