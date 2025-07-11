"use client";

import { TrendingUp } from "lucide-react";
import {
    CartesianGrid,
    Line,
    LineChart as LC,
    XAxis,
    YAxis,
    Label,
} from "recharts";

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
import { ErrorType, RevenueOverTimeResType } from "@/const/type";
import { Skeleton } from "./ui/skeleton";

export const description = "A line chart with a label";

const chartConfig = {
    revenue: {
        label: "Doanh thu",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

export function LineChart({
    chartData,
    errors,
}: {
    chartData: RevenueOverTimeResType[] | null;
    errors: ErrorType | undefined;
}) {
    const formattedData =
        chartData &&
        chartData.map((data) => ({
            day: new Date(data.date).getDate(),
            revenue: data.revenue,
        }));
    console.log(errors, typeof errors);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Doanh thu theo thời gian</CardTitle>
                <CardDescription>
                    Hiển thị xu hướng tăng/giảm doanh thu
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

                {errors?.source === undefined && !formattedData && (
                    <>
                        <Skeleton className="aspect-[1.85/1] w-full" />
                        <Skeleton className="mx-auto h-3 mt-2 w-10" />
                    </>
                )}
                {errors?.source === undefined && formattedData && (
                    <ChartContainer config={chartConfig} className="">
                        <LC
                            accessibilityLayer
                            data={formattedData}
                            margin={{
                                top: 20,
                                left: 12,
                                right: 12,
                                bottom: 30,
                            }}
                        >
                            <CartesianGrid vertical={true} />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                width={48}
                                tickFormatter={(value) => {
                                    if (value >= 1_000_000) {
                                        return (
                                            (value / 1_000_000)
                                                .toFixed(1)
                                                .replace(/\.0$/, "") + "m"
                                        );
                                    }
                                    return value.toString();
                                }}
                            />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value}
                            >
                                <Label
                                    value="Ngày"
                                    offset={-10}
                                    position="insideBottom"
                                    className="text-muted text-xs font-semibold mt-4"
                                />
                            </XAxis>
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        indicator="line"
                                        hideLabel
                                    />
                                }
                            />
                            <Line
                                dataKey="revenue"
                                type="natural"
                                stroke="var(--color-revenue)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-revenue)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            ></Line>
                        </LC>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    TDoanh thu theo thời gian
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Hiển thị xu hướng tăng/giảm doanh thu
                </div>
            </CardFooter>
        </Card>
    );
}
