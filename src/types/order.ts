import type { Product, ProductImage } from "./product.ts";

interface OrderItemInput {
    productSizeId: number;
    quantity: number;
}

export interface CreateOrderRequest {
    items: OrderItemInput[];
    recipientName: string;
    recipientPhone: string;
    zipCode: string;
    address1: string;
    address2: string;
    gatePassword?: string;
    deliveryRequest?: string;
    paymentMethod: string;
}

export interface ConfirmOrderRequest {
    paymentKey: string;
    orderId: string;
    amount: number;
}

export enum OrderStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    RETURN_REQUESTED = "RETURN_REQUESTED",
    RETURN_COMPLETED = "RETURN_COMPLETED"
}

export interface OrderItem {
    id: number;
    price: number;
    quantity: number;
    productSize: OrderProductSize;
}

export interface OrderProductSize {
    id: number;
    size: string;
    productColor: OrderProductColor;
}

export interface OrderProductColor {
    id: number;
    colorName: string;
    product: Product;
    images: ProductImage[];
}

export interface OrderPayment {
    amount: number;
    method: string;
    status: string;
}

export interface Order {
    id: number;
    orderNumber: string;
    recipientName: string;
    status: OrderStatus;
    totalAmount: number;
    createdAt: string;
    zipCode: string;
    address1: string;
    address2: string;
    gatePassword?: string;
    deliveryRequest?: string;

    items: OrderItem[];
    payment?: OrderPayment;
}