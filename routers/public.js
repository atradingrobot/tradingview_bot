'use strict';

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const manageCtr = require('../controller/manage');

router.get('/web/manage/api/exchange', manageCtr.get_exchange);
router.post('/web/manage/api/exchange', manageCtr.update_exchange);
router.post('/web/public/api/webhook/tv', manageCtr.tv);
router.get('/web/manage/api/spot/balance', manageCtr.get_spot_balance);
router.get('/web/manage/api/spot/prices', manageCtr.get_spot_prices);
router.get('/web/manage/api/usdt/balance', manageCtr.get_u_balance);
router.get('/web/manage/api/usdt/position', manageCtr.get_u_account);
router.get('/web/manage/api/usdt/prices', manageCtr.get_u_prices);

module.exports = router;
