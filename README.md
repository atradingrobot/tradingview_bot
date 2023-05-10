# TradingView Alert Robot(警报机器人)
TradingView是一款强大的图表工具，可以使用pine编写各类指标和策略，并提供回测功能。
但TradingView并不支持直接帮你开平仓
本项目可接收TradingView的Webhook（警报），并根据指令进行现货买卖或合约开平仓

# 安装教程（请自行购买服务器）
## 以centos 7.6为例
1、安装git
```
yum install git -y
```

2、安装nodejs
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
source ~/.bashrc
nvm install 14.15.1
npm i pm2 -g
```

3、拉取代码
```
git clone https://github.com/atradingrobot/tradingview_bot.git
```

4、安装依赖
```
cd tradingview_bot
npm i
```

5、启动机器人
```
pm2 start main.js --name bot
```

6、查看机器人日志，看是否监听端口成功，
```
pm2 logs bot
```

7、安装完毕后，机器人默认会监听在80端口，并运行在后台，此时可访问前面页面进行配置：http://你的ip/index.html

## 其它命令
- 停止机器人
```
pm2 stop bot
```

- 重启机器人
```
pm2 restart bot
```

# 使用步骤
1、点击配置交易所按钮，填写交易所配置，其中Key、Secret在交易所API创建后获得。Okx交易所则额外多了Passphrase
2、配置交易所后，会自动显示合约帐户信息、合约持仓信息、现货帐户币种信息
3、点击配置TradingView警报，选择好要开平仓的币种等信息，此时会生成相应的警报消息，把Webhook URL和警报消息分别复制到TradingView的警报中。
4、当TradingView发出警报时，机器人会自动进行对应的操作
5、在配置TradingView警报界面中，点击实盘请求，页面会模拟TradingView发出警报，可达到测试的效果。也可通过此功能操作帐户交易

# 常见问题
1、端口已被占用
答：TradingView要求警报只有在80端口，因此机器人默认监听在80端口。因此请先把80端口的程序停掉

2、实盘请求时报错
答：每个交易所报错可能不同，但一般是因为数量未达到交易所限制的最小数量限制。可到交易所中尝试每个币的最小数量限制

3、配置交易所后，不显示帐户信息
答：在生成交易所API，请注意勾选现货、合约、钱包等读写权限，建议填写IP白名单。

4、数量(币)与数量(张)的区别
答：合约中，除币安外，API开仓是按张开仓，不同币种一张合约对应的数量是不同的，可到交易所中开仓尝试。