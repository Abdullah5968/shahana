import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import PrintReceiptButton from "@/components/PrintReceiptButton";

export default async function AdminOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ivory p-8">
      <div className="flex items-center justify-between mb-6 no-print">
        <Link href="/admin" className="text-sm text-maroon">
          ← Back to Dashboard
        </Link>
        <PrintReceiptButton />
      </div>

      <div id="receipt" className="bg-white border border-gray-200 p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-2xl font-serif tracking-widest text-maroon">SHAHANA</p>
          <p className="text-xs text-gray-500 mt-1">Premium Pakistani Women Fashion</p>
        </div>

        <div className="flex justify-between text-sm mb-6">
          <span className="text-gray-500">Order Number</span>
          <span className="font-medium text-charcoal">{order.orderNumber}</span>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <p className="text-xs text-gray-500 mb-2">Deliver To</p>
          <p className="text-charcoal">{order.customerName}</p>
          <p className="text-charcoal">{order.phone}</p>
          <p className="text-charcoal mt-1">
            {order.address}, {order.area}, {order.city}, {order.province}
          </p>
          {order.postalCode && <p className="text-charcoal">Postal: {order.postalCode}</p>}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 mb-3">Items</p>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-charcoal py-1">
              <span>{item.name} ({item.size}) x{item.quantity}</span>
              <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4 space-y-1">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>PKR {order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span>PKR {order.shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-medium text-charcoal border-t border-gray-200 pt-2 mt-2">
            <span>Total</span>
            <span>PKR {order.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-6 text-center text-xs text-gray-500">
          <p>Payment Method: Cash on Delivery</p>
          <p className="mt-2">Thank you for shopping with SHAHANA</p>
        </div>
      </div>
    </div>
  );
}