// lib/mock.ts
import {
    RevenueOverTimeResType,
    ProductSalesResType,
    RevenueByLocationResType,
} from "@/const/type";
import { format } from "date-fns";

// export function fetchRevenueOverTime(): Promise<RevenueOverTimeResType[]> {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth(); // 0-based (0 = January)

//     const data = Array.from({ length: 30 }, (_, i) => {
//         const day = i + 1;
//         const date = new Date(year, month, day);
//         return {
//             date: format(date, "yyyy-MM-dd"), // → ví dụ: "2025-07-01"
//             revenue: Math.floor(Math.random() * 10_000_000) + 1_000_000,
//         };
//     });

//     return new Promise((resolve) => {
//         setTimeout(() => resolve(data), 1000);
//     });
// }

export function fetchRevenueOverTime({
    fromDate,
    toDate,
}: {
    fromDate: Date;
    toDate: Date;
}): Promise<RevenueOverTimeResType[]> {
    const start = new Date(fromDate);
    const end = new Date(toDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffDays =
        Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
        1;

    const data = Array.from({ length: diffDays }, (_, i) => {
        const date = new Date(start);
        date.setDate(start.getDate() + i);

        return {
            date: format(date, "yyyy-MM-dd"),
            revenue: Math.floor(Math.random() * 10_000_000) + 1_000_000,
        };
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                reject({
                    message: "Mock API lỗi: fetchRevenueOverTime",
                    source: fetchRevenueOverTime,
                });
            } else {
                resolve(data);
            }
        }, 1000);
    });
}

export function fetchProductSales(): Promise<ProductSalesResType[]> {
    const products = [
        "Cà Phê Sữa",
        "Cà Phê Đen",
        "Trà Đào",
        "Bạc Sỉu",
        "Sinh Tố Dâu",
        "Nước Ép Cam",
    ];

    const data = products.map((name) => ({
        name,
        sales: Math.floor(Math.random() * 1500) + 100,
    }));

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                reject({
                    message: "Mock API lỗi: fetchProductSales",
                    source: fetchProductSales,
                });
            } else {
                resolve(data);
            }
        }, 1000);
    });
}

export function fetchRevenueByLocation(): Promise<RevenueByLocationResType[]> {
    const branches = [
        "Quận 1, TPHCM",
        "Quận 3, TPHCM",
        "Thủ Đức, TPHCM",
        "Bình Thạnh, TPHCM",
        "Hà Nội",
        "Đà Nẵng",
    ];

    const data = branches.map((location) => ({
        location,
        revenue: Math.floor(Math.random() * 200_000_000) + 50_000_000,
    }));

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                reject({
                    message: "Mock API lỗi: fetchRevenueByLocation",
                    source: fetchRevenueByLocation,
                });
            } else {
                resolve(data);
            }
        }, 1000);
    });
}
