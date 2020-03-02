function initPrinter() {
  my.ix.startMonitorPrinter({
    success: r => {
      console.log("start success");
      my.ix.queryPrinter({
        success: r => {
          console.log(r);
          my.ix.onMonitorPrinter(r => {
            console.log("received data:" + r);
          });
        },
        fail: r => {
          console.log(JSON.stringify(r));
        }
      });
    },
    fail: r => {
      console.log("start fail, errorCode:" + r.error);
    }
  });
}
function closePrinter() {
  my.ix.offMonitorPrinter({
    success: r => {
      console.log("off success");
    },
    fail: r => {
      console.log("off fail, errorCode:" + r.error);
    }
  });
}
function printOrder(data) {
  data = {
    departmentName: "珠海工行",
    serialNumber: "1959608002001001",
    orderTime: "2020-01-14 00:00:00",
    qrcodeUrl: null,
    totalPrice: 3.0,
    totalQuantity: 0,
    products: [],
    deliveryAddress: "国安家大学科技园1楼厕所",
    name: "汪志阳",
    phone: "13636457701",
    paymentChannel: "微信"
  };
  my.ix.printerStatus({
    success: r => {
      my.ix.printer({
        cmds: [
          {
            cmd: "addSelectPrintModes",
            args: ["FONTA", "ON", "ON", "ON", "OFF"]
          },
          { cmd: "addSelectJustification", args: ["CENTER"] },
          { cmd: "addText", args: ["结账单"] },
          { cmd: "addPrintAndLineFeed", args: [] },
          { cmd: "addPrintAndFeedLines", args: ["1"] },
          {
            cmd: "addSelectPrintModes",
            args: ["FONTA", "OFF", "ON", "ON", "OFF"]
          },
          { cmd: "addSelectJustification", args: ["CENTER"] },
          { cmd: "addText", args: [data.departmentName] },
          { cmd: "addPrintAndLineFeed", args: [] },
          { cmd: "addPrintAndFeedLines", args: ["1"] },
          {
            cmd: "addSelectPrintModes",
            args: ["FONTB", "OFF", "OFF", "OFF", "OFF"]
          },
          { cmd: "addSelectJustification", args: ["LEFT"] },
          { cmd: "addText", args: ["下单时间:" + data.orderTime] },
          { cmd: "addPrintAndLineFeed", args: [] },
          {
            cmd: "addSelectPrintModes",
            args: ["FONTB", "OFF", "OFF", "OFF", "OFF"]
          },
          { cmd: "addSelectJustification", args: ["LEFT"] },
          { cmd: "addText", args: ["订单编号:" + data.serialNumber] },
          { cmd: "addPrintAndLineFeed", args: [] },
          {
            cmd: "addSelectPrintModes",
            args: ["FONTB", "OFF", "OFF", "OFF", "OFF"]
          },
          { cmd: "addSelectJustification", args: ["LEFT"] },
          { cmd: "addText", args: ["收货地址:" + data.deliveryAddress] },
          { cmd: "addPrintAndLineFeed", args: [] },
          {
            cmd: "addSelectPrintModes",
            args: ["FONTB", "OFF", "OFF", "OFF", "OFF"]
          },
          { cmd: "addSelectJustification", args: ["LEFT"] },
          { cmd: "addText", args: ["收货人:" + data.name + " " + data.phone] },
          { cmd: "addPrintAndLineFeed", args: [] },
          {
            cmd: "addSelectPrintModes",
            args: ["FONTB", "OFF", "OFF", "OFF", "OFF"]
          },
          { cmd: "addSelectJustification", args: ["LEFT"] },
          { cmd: "addText", args: ["品项"] },
          { cmd: "addHorTab", args: [] },
          { cmd: "addText", args: ["数量"] },
          { cmd: "addHorTab", args: [] },
          { cmd: "addText", args: ["金额"] },
          { cmd: "addPrintAndLineFeed", args: [] },
          {
            cmd: "addSelectPrintModes",
            args: ["FONTB", "OFF", "OFF", "OFF", "OFF"]
          },
          { cmd: "addSelectJustification", args: ["LEFT"] },
          { cmd: "addText", args: ["合计"] },
          { cmd: "addHorTab", args: [] },
          { cmd: "addText", args: [data.totalQuantity] },
          { cmd: "addHorTab", args: [] },
          { cmd: "addText", args: [data.totalPrice] },
          { cmd: "addPrintAndLineFeed", args: [] },
          {
            cmd: "addSelectPrintModes",
            args: ["FONTB", "OFF", "OFF", "OFF", "OFF"]
          },
          { cmd: "addSelectJustification", args: ["LEFT"] },
          { cmd: "addText", args: ["应收"] },
          { cmd: "addHorTab", args: [] },
          { cmd: "addText", args: [data.totalPrice] },
          { cmd: "addPrintAndLineFeed", args: [] },
          {
            cmd: "addSelectPrintModes",
            args: ["FONTB", "OFF", "OFF", "OFF", "OFF"]
          },
          { cmd: "addSelectJustification", args: ["LEFT"] },
          {
            cmd: "addText",
            args: [data.paymentChannel + "支付 " + data.totalPrice]
          },
          { cmd: "addPrintAndLineFeed", args: [] },
          { cmd: "addPrintAndFeedLines", args: ["1"] },
          {
            cmd: "addSelectPrintModes",
            args: ["FONTB", "OFF", "OFF", "OFF", "OFF"]
          },
          { cmd: "addSelectJustification", args: ["CENTER"] },
          { cmd: "addText", args: ["谢谢光临，欢迎再次惠顾！"] },
          { cmd: "addPrintAndLineFeed", args: [] }
        ],
        success: r => {
          console.log("success");
        },
        fail: r => {
          console.log("fail, errorCode:" + r.error);
        }
      });
    },
    fail: r => {
      console.log(r);
    }
  });
}

export default {
  initPrinter,
  closePrinter,
  printOrder
}
