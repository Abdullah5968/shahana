import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Zara Embroidered Lawn 3-Piece",
        description: "Elegant embroidered lawn suit, perfect for everyday elegance.",
        price: 6500,
        salePrice: null,
        category: "Ready to Wear",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Pink"],
        sku: "SHZ-001",
        stock: 25,
        featured: true,
        isNew: true,
        onSale: false,
      },
      {
        name: "Alina Printed Stitched Kurti",
        description: "Comfortable printed cotton kurti for daily wear.",
        price: 4200,
        salePrice: 3200,
        category: "Ready to Wear",
        sizes: ["S", "M", "L"],
        colors: ["Orange"],
        sku: "SHZ-002",
        stock: 40,
        featured: false,
        isNew: true,
        onSale: true,
      },
      {
        name: "Noor Chiffon Formal Dress",
        description: "Premium chiffon formal dress for special occasions.",
        price: 9800,
        salePrice: null,
        category: "Formal Wear",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Purple"],
        sku: "SHZ-003",
        stock: 15,
        featured: true,
        isNew: false,
        onSale: false,
      },
      {
        name: "Sana Cotton Unstitched Suit",
        description: "High-quality unstitched cotton fabric suit.",
        price: 3500,
        salePrice: 2800,
        category: "Unstitched",
        sizes: ["Free Size"],
        colors: ["Teal"],
        sku: "SHZ-004",
        stock: 60,
        featured: false,
        isNew: false,
        onSale: true,
      },
    ],
  });

  console.log("Seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });