// const/type.ts

export interface RevenueOverTimeResType {
    date: string;
    revenue: number;
}

export interface ProductSalesResType {
    name: string;
    sales: number;
}

export interface RevenueByLocationResType {
    location: string;
    revenue: number;
}

export const chartColors = [
    "var(--color-Color1)",
    "var(--color-Color2)",
    "var(--color-Color3)",
    "var(--color-Color4)",
    "var(--color-Color5)",
    "var(--color-Color6)",
] as const;

export interface ErrorType {
    message: string;
    source: string;
}
