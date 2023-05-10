const Exchange = require('atbot-ex')

global.ex = null
const needPassEx = ['okx']
global.exInfo = null
async function get_exchange(ctx) {
	if (!global.exInfo) {
		ctx.body = {
			ret: -1
		}
		return
	}
	ctx.body = {
		ret: 0,
		data: {
			name: global.exInfo.name,
			key: global.exInfo.key
		}
	}
}
async function update_exchange(ctx) {
	const name = ctx.request.body.name
	const key = ctx.request.body.key
	const secret = ctx.request.body.secret
	const pass = ctx.request.body.pass
	if (!name || !key || !secret || (!pass && needPassEx.indexOf(name) >= 0)) {
		ctx.body = {
			ret: -1
		}
		return
	}
	global.exInfo = null
	try {
		global.ex = Exchange.create(name, key, secret, pass)
		global.exInfo = {
			name: name,
			key: key
		}
	} catch (e) {
		// console.log(e)
	}
	// console.log('update_exchange:', name, key, secret, pass)
	ctx.body = {
		ret: 0
	}
}

async function tv(ctx) {
	if (!ex) {
		ctx.body = {
	        ret: -1
	    }
	    return
	}
    const config = ctx.request.body
    if (config.accType == 'spot') {
    	const res = await ex.postSpotOrder(config.symbol, config.action == 'open' ? 1 : 2, 4, config.amount, config.price)
    	// console.log('postSpotOrder:', res)
    	ctx.body = {
	    	ret: res.result ? 0 : -1,
	    	data: res.data
	    }
	    return
    }
    if (config.accType == 'usdt') {
    	const res = await ex.postSwapOrder(config.symbol, config.action == 'open' ? (config.side == 'long' ? 1 : 2) : (config.side == 'long' ? 2 : 1), 4, config.amount, config.price, false, null, false, config.side.toUpperCase())
    	// console.log('postSwapOrder:', res)
    	ctx.body = {
	    	ret: res.result ? 0 : -1,
	    	data: res.data
	    }
	    return
    }
    ctx.body = {
    	ret: 0
    }
}

async function get_spot_balance(ctx) {
	if (!ex) {
		ctx.body = {
	        ret: -1
	    }
	    return
	}
	const res = await ex.getSpotAccount()
	// console.log('get_spot_balance: ', res)
    ctx.body = {
    	ret: 0,
    	data: res
    }
}

async function get_u_balance(ctx) {
	if (!ex) {
		ctx.body = {
	        ret: -1
	    }
	    return
	}
	const res = await ex.getUBalance()
	// console.log('get_u_balance: ', res)
    ctx.body = {
    	ret: 0,
    	data: res
    }
}

async function get_u_account(ctx) {
	if (!ex) {
		ctx.body = {
	        ret: -1
	    }
	    return
	}
	const res = await ex.getUAccount()
	// console.log('get_u_account: ', res)
    ctx.body = {
    	ret: 0,
    	data: res
    }
}

async function get_u_prices(ctx) {
	if (!ex) {
		ctx.body = {
	        ret: -1
	    }
	    return
	}
	const res = await ex.getUPrices()
	// console.log('get_u_prices: ', res)
    ctx.body = {
    	ret: 0,
    	data: res
    }
}

async function get_spot_prices(ctx) {
	if (!ex) {
		ctx.body = {
	        ret: -1
	    }
	    return
	}
	const res = await ex.getSpotPrices()
	// console.log('get_spot_prices: ', res)
    ctx.body = {
    	ret: 0,
    	data: res
    }
}

module.exports = {
	get_exchange,
	update_exchange,
    tv,
    get_spot_balance,
    get_u_balance,
    get_u_account,
    get_u_prices,
    get_spot_prices
};
