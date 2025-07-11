"use client";

import {
    fetchProductSales,
    fetchRevenueByLocation,
    fetchRevenueOverTime,
} from "@/lib/mock";
import { useEffect, useState } from "react";
import {
    ErrorType,
    ProductSalesResType,
    RevenueByLocationResType,
    RevenueOverTimeResType,
} from "@/const/type";

import { LineChart } from "./line-chart";
import { BarChart } from "./bar-chart";
import { PieChart } from "./pie-chart";
import { endOfDay, startOfDay, format, isAfter } from "date-fns";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

const initFromDate = startOfDay(new Date());
const initToDate = endOfDay(new Date());

export default function Dashboard() {
    const [revenueOverTime, setRevenueOverTime] = useState<
        RevenueOverTimeResType[] | null
    >(null);
    const [productSales, setProductSales] = useState<
        ProductSalesResType[] | null
    >(null);
    const [revenueByLocation, setRevenueByLocation] = useState<
        RevenueByLocationResType[] | null
    >(null);
    const [errors, setErrors] = useState<{
        time?: ErrorType;
        sales?: ErrorType;
        location?: ErrorType;
    }>({});

    const [fromDate, setFromDate] = useState(initFromDate);
    const [toDate, setToDate] = useState(initToDate);

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const time = await fetchRevenueOverTime({ fromDate, toDate });
                setRevenueOverTime(time);
            } catch (err) {
                const error = err as ErrorType;
                toast.error(error.message);
                setErrors((prev) => ({ ...prev, time: error }));
            }
        };

        const fetchSales = async () => {
            try {
                const sla = await fetchProductSales();
                setProductSales(sla);
            } catch (err) {
                const error = err as ErrorType;
                toast.error(error.message);
                setErrors((prev) => ({ ...prev, sales: error }));
            }
        };

        const fetchLocation = async () => {
            try {
                const loc = await fetchRevenueByLocation();
                setRevenueByLocation(loc);
            } catch (err) {
                const error = err as ErrorType;
                toast.error(error.message);
                setErrors((prev) => ({ ...prev, location: error }));
            }
        };

        fetchRevenue();
        fetchSales();
        fetchLocation();
    }, [fromDate, toDate]);

    const resetDateFilter = () => {
        setFromDate(initFromDate);
        setToDate(initToDate);
    };

    return (
        <div className="p-4 flex flex-col items-center gap-10 mt-2">
            <div className="w-[80%]">
                <div className="flex flex-wrap gap-2 xl:justify-center mb-2">
                    <div className="flex items-center">
                        <span className="mr-2">Từ</span>
                        <Input
                            type="datetime-local"
                            placeholder="Từ ngày"
                            className="text-sm"
                            value={format(fromDate, "yyyy-MM-dd HH:mm").replace(
                                " ",
                                "T"
                            )}
                            onChange={(event) =>
                                setFromDate(new Date(event.target.value))
                            }
                        />
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2">Đến</span>
                        <Input
                            type="datetime-local"
                            placeholder="Đến ngày"
                            value={format(toDate, "yyyy-MM-dd HH:mm").replace(
                                " ",
                                "T"
                            )}
                            onChange={(event) => {
                                if (
                                    isAfter(
                                        new Date(event.target.value),
                                        initToDate
                                    )
                                ) {
                                    toast.error(
                                        "Xin vui lòng chọn ngày bé hơn hoặc bằng ngày hiện tại !"
                                    );
                                    return;
                                }
                                setToDate(new Date(event.target.value));
                            }}
                        />
                    </div>
                    <Button
                        className="md:ml-auto xl:ml-0"
                        variant={"outline"}
                        onClick={resetDateFilter}
                    >
                        Reset
                    </Button>
                </div>
                <LineChart chartData={revenueOverTime} errors={errors.time} />
            </div>
            <div className="w-[80%]">
                <BarChart chartData={productSales} errors={errors.sales} />
            </div>
            <div className="w-[80%]">
                <PieChart
                    chartData={revenueByLocation}
                    errors={errors.location}
                />
            </div>
        </div>
    );
}
