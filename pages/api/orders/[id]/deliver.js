import nc from "next-connect";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";
import onError from "../../../../utils/error";
import { isAuth } from "../../../../utils/auth";

const handler = nc({
  onError,
});
handler.use(isAuth);
handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.send({ message: "سفارش تحویل داده شد", order: deliveredOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "سفارشی یافت نشد" });
  }
});

export default handler;
