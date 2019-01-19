const express     = require('express');
const bodyParser  = require('body-parser');

const router      = express.Router();

//router middleware
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//routes
router.get('/', (req, res) => {
  res.send('main web route');
});

// router.get('/users' ,(req, res) => {
//     res.send('users web route');
// })
// router.post('/users' ,(req, res) => {
//     res.send('users web route');
// })

router.route('/users')
    .get( (req, res) => {
        res.send('users web route');
    })
    .post( (req, res) => {
        res.send('users POST web route');
    });

router.route('/places')
    .get( (req, res) => {
        res.send('places web route');
    })
    .post( (req, res) => {
        res.send('places POST web route');
    });

//router.get('/users', (req, res) => {
//  res.send('users web route');
//});

module.exports = router;
