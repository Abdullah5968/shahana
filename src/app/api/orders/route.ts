import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function generateOrderNumber() {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `SH-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      customerName,
      phone,
      email,
      province,
      city,
      area,
      address,
      postalCode,
      notes,
      items,
    } = body;

    if (!customerName || !phone || !province || !city || !area || !address) {
      return NextResponse.json(
        { error: "Missing required customer information." },
        { status: 400 }
      );
    }

    const phoneRegex = /^03[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid Pakistani phone number." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    let subtotal = 0;
    const orderItemsData = [];

    for (const cartItem of items) {
      const product = await prisma.product.findUnique({
        where: { id: cartItem.id },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${cartItem.id}` },
          { status: 400 }
        );
      }

      if (product.stock < cartItem.quantity) {
        return NextResponse.json(
          { error: `Not enough stock for ${product.name}.` },
          { status: 400 }
        );
      }

      const realPrice = product.salePrice ?? product.price;
      subtotal += realPrice * cartItem.quantity;

      orderItemsData.push({
        productId: product.id,
        name: product.name,
        size: cartItem.size,
        price: realPrice,
        quantity: cartItem.quantity,
      });
    }

    const shipping = subtotal >= 5000 ? 0 : 200;
    const total = subtotal + shipping;

    const orderNumber = generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        phone,
        email: email || null,
        province,
        city,
        area,
        address,
        postalCode: postalCode || null,
        notes: notes || null,
        paymentMethod: "COD",
        subtotal,
        shipping,
        total,
        status: "Pending",
        items: {
          create: orderItemsData,
        },
      },
    });

    for (const cartItem of items) {
      await prisma.product.update({
        where: { id: cartItem.id },
        data: { stock: { decrement: cartItem.quantity } },
      });
    }
    try {
      await fetch(
        `https://api.textbee.dev/api/v1/gateway/devices/${process.env.TEXTBEE_DEVICE_ID}/send-sms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.TEXTBEE_API_KEY!,
          },
          body: JSON.stringify({
            recipients: [process.env.ADMIN_PHONE],
            message: `New SHAHANA Order ${order.orderNumber}\nCustomer: ${customerName}\nPhone: ${phone}\nTotal: PKR ${total}\nCity: ${city}\nPayment: COD`,
          }),
        }
      );
    } catch (smsError) {
      console.error("SMS notification failed:", smsError);
    }
    return NextResponse.json({ orderNumber: order.orderNumber });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Something went wrong while placing your order." },
      { status: 500 }
    );
  }
}