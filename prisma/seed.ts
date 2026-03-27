import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  // Réinitialiser les séquences d'ID à 1
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE products_id_seq RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE orders_id_seq RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE order_items_id_seq RESTART WITH 1`);

  // Produits
  const [clavier, souris, ecran, casque, webcam, hub] = await Promise.all([
    prisma.product.create({ data: { name: "Clavier Mécanique RGB", description: "Switches Cherry MX", price: 89.99, stock: 25 } }),
    prisma.product.create({ data: { name: "Souris Sans Fil", description: "Ergonomique, 16000 DPI", price: 34.99, stock: 50 } }),
    prisma.product.create({ data: { name: "Écran 27 pouces 4K", description: "Dalle IPS, 60Hz", price: 349.99, stock: 10 } }),
    prisma.product.create({ data: { name: "Casque Bluetooth", description: "Réduction de bruit", price: 129.99, stock: 30 } }),
    prisma.product.create({ data: { name: "Webcam HD 1080p", description: "Autofocus, micro", price: 49.99, stock: 40 } }),
    prisma.product.create({ data: { name: "Hub USB-C 7-en-1", description: "HDMI, USB 3.0, SD", price: 39.99, stock: 60 } }),
  ]);

  // Commandes
  const order1 = await prisma.order.create({
    data: { customerEmail: "alice@test.com", status: "pending", total: 0 },
  });
  await prisma.orderItem.createMany({ data: [
    { orderId: order1.id, productId: clavier.id, quantity: 2, unitPrice: 89.99 },
    { orderId: order1.id, productId: souris.id, quantity: 1, unitPrice: 34.99 },
  ]});

  const order2 = await prisma.order.create({
    data: { customerEmail: "bob@test.com", status: "pending", total: 0 },
  });
  await prisma.orderItem.createMany({ data: [
    { orderId: order2.id, productId: ecran.id, quantity: 1, unitPrice: 349.99 },
    { orderId: order2.id, productId: casque.id, quantity: 3, unitPrice: 129.99 },
    { orderId: order2.id, productId: hub.id, quantity: 2, unitPrice: 39.99 },
  ]});

  const order3 = await prisma.order.create({
    data: { customerEmail: "charlie@test.com", status: "paid", total: 214.97 },
  });
  await prisma.orderItem.createMany({ data: [
    { orderId: order3.id, productId: clavier.id, quantity: 1, unitPrice: 89.99 },
    { orderId: order3.id, productId: webcam.id, quantity: 1, unitPrice: 49.99 },
    { orderId: order3.id, productId: souris.id, quantity: 1, unitPrice: 34.99 },
    { orderId: order3.id, productId: hub.id, quantity: 1, unitPrice: 39.99 },
  ]});

  console.log("Seed terminé : 6 produits + 3 commandes !");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());