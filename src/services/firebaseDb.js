/**
 * Firebase Realtime Database helpers for admin panel.
 * Same DB as Flutter app: products, categories, orders, users, merchants, offers.
 */
import { ref, get, set, update, remove, onValue, push } from "firebase/database";
import { db } from "../firebase";

// Products
export const productsRef = () => ref(db, "products");
export const productRef = (id) => ref(db, `products/${id}`);

export async function getProducts() {
  const snap = await get(productsRef());
  if (!snap.exists()) return [];
  const data = snap.val();
  return Object.entries(data).map(([id, v]) => ({ id, ...v }));
}

export function watchProducts(callback) {
  return onValue(productsRef(), (snap) => {
    if (!snap.exists()) return callback([]);
    const data = snap.val();
    callback(Object.entries(data).map(([id, v]) => ({ id, ...v })));
  });
}

export async function addProduct(product) {
  const newRef = push(ref(db, "products"));
  const id = newRef.key;
  await set(newRef, { ...product, createdAt: Date.now() });
  return id;
}

export async function updateProduct(id, product) {
  await update(ref(db, `products/${id}`), product);
}

export async function deleteProduct(id) {
  await remove(ref(db, `products/${id}`));
}

// Categories
export const categoriesRef = () => ref(db, "categories");
export const categoryRef = (id) => ref(db, `categories/${id}`);

export async function getCategories() {
  const snap = await get(categoriesRef());
  if (!snap.exists()) return [];
  const data = snap.val();
  return Object.entries(data).map(([id, v]) => ({ id, ...v }));
}

export async function addCategory(cat) {
  const newRef = push(ref(db, "categories"));
  const id = newRef.key;
  await set(newRef, { ...cat, createdAt: Date.now() });
  return id;
}

export async function updateCategory(id, cat) {
  await update(ref(db, `categories/${id}`), cat);
}

export async function deleteCategory(id) {
  await remove(ref(db, `categories/${id}`));
}

// Orders
export const ordersRef = () => ref(db, "orders");

export async function getOrders() {
  const snap = await get(ordersRef());
  if (!snap.exists()) return [];
  const data = snap.val();
  return Object.entries(data).map(([id, v]) => ({ id, ...v }));
}

export function watchOrders(callback) {
  return onValue(ordersRef(), (snap) => {
    if (!snap.exists()) return callback([]);
    const data = snap.val();
    callback(Object.entries(data).map(([id, v]) => ({ id, ...v })));
  });
}

export async function updateOrderStatus(orderId, status) {
  await update(ref(db, `orders/${orderId}`), {
    status,
    updatedAt: Date.now(),
  });
}

// Users (for admin user management)
export const usersRef = () => ref(db, "users");
export const userRef = (uid) => ref(db, `users/${uid}`);

export async function getUser(uid) {
  const snap = await get(userRef(uid));
  if (!snap.exists()) return null;
  return { id: uid, ...snap.val() };
}

export async function getUsers() {
  const snap = await get(usersRef());
  if (!snap.exists()) return [];
  const data = snap.val();
  return Object.entries(data).map(([id, v]) => ({ id, ...v }));
}

export function watchUsers(callback) {
  return onValue(usersRef(), (snap) => {
    if (!snap.exists()) return callback([]);
    const data = snap.val();
    callback(Object.entries(data).map(([id, v]) => ({ id, ...v })));
  });
}

export async function updateUser(uid, data) {
  await update(ref(db, `users/${uid}`), { ...data, updatedAt: Date.now() });
}

// Merchants
export const merchantsRef = () => ref(db, "merchants");

export async function getMerchants() {
  const snap = await get(merchantsRef());
  if (!snap.exists()) return [];
  const data = snap.val();
  return Object.entries(data).map(([id, v]) => ({ id, ...v }));
}

export function watchMerchants(callback) {
  return onValue(merchantsRef(), (snap) => {
    if (!snap.exists()) return callback([]);
    const data = snap.val();
    callback(Object.entries(data).map(([id, v]) => ({ id, ...v })));
  });
}
