"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart as BC, CartesianGrid, LabelList, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { chartColors, ErrorType, ProductSalesResType } from "../const/type";
import { Skeleton } from "./ui/skeleton";

const chartData2 = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
];

const chartConfig = {
    sales: {
        label: "Sản phẩm",
        color: "var(--chart-1)",
    },
    Color1: {
        label: " Color2",
        color: "var(--chart-1)",
    },
    Color2: {
        label: "Color2",
        color: "var(--chart-2)",
    },
    Color3: {
        label: "Color3",
        color: "var(--chart-3)",
    },
    Color4: {
        label: "Color4",
        color: "var(--chart-4)",
    },
    Color5: {
        label: "Color5",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;

export function BarChart({
    chartData,
    errors,
}: {
    chartData: ProductSalesResType[] | null;
    errors: ErrorType | undefined;
}) {
    const chartDataFilled =
        chartData &&
        chartData.map((data, index) => {
            const calcIndex = index % 5;
            return { ...data, fill: chartColors[calcIndex] };
        });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Doanh số theo Sản phẩm</CardTitle>
                <CardDescription>
                    So sánh doanh số giữa các sản phẩm bán chạy nhất.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {errors?.source && (
                    <div className="aspect-[1.78/1] w-full border rounded-xl flex items-center justify-center">
                        <p className="md:text-2xl text-red-500 ">
                            {errors.message}
                        </p>
                    </div>
                )}

                {errors?.source === undefined && !chartDataFilled && (
                    <Skeleton className="aspect-[1.78/1] w-full" />
                )}

                {errors?.source === undefined && chartDataFilled && (
                    <ChartContainer config={chartConfig}>
                        <BC
                            accessibilityLayer
                            data={chartDataFilled}
                            margin={{
                                top: 20,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar
                                dataKey="sales"
                                fill="var(--color-sales)"
                                radius={8}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BC>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Doanh số theo Sản phẩm
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    ShSo sánh doanh số giữa các sản phẩm bán chạy nhất.
                </div>
            </CardFooter>
        </Card>
    );
}
