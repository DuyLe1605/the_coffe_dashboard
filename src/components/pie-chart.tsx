"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart as PC, LabelList } from "recharts";

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
import { chartColors, ErrorType, RevenueByLocationResType } from "@/const/type";
import { Skeleton } from "./ui/skeleton";

export const description = "A pie chart with a label";

const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
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
    Color6: {
        label: "Color6",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

export function PieChart({
    chartData,
    errors,
}: {
    chartData: RevenueByLocationResType[] | null;
    errors: ErrorType | undefined;
}) {
    const chartDataFilled =
        chartData &&
        chartData.map((data, index) => {
            const calcIndex = index % 6;
            return { ...data, fill: chartColors[calcIndex] };
        });
    console.log(chartData);
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Tỷ trọng Doanh thu theo Chi nhánh</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 ">
                {errors?.source && (
                    <div className="aspect-[2/1] w-full border rounded-xl flex items-center justify-center">
                        <p className="md:text-2xl text-red-500 ">
                            {errors.message}
                        </p>
                    </div>
                )}

                {errors?.source === undefined && chartDataFilled === null && (
                    <Skeleton className="w-[230px] mx-auto  aspect-square rounded-full relative" />
                )}

                {errors?.source === undefined && chartDataFilled !== null && (
                    <ChartContainer
                        config={chartConfig}
                        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto  max-h-[300px] pb-0"
                    >
                        <PC>
                            <ChartTooltip
                                content={<ChartTooltipContent hideLabel />}
                            />

                            <Pie
                                data={chartDataFilled}
                                dataKey="revenue"
                                label={({ name, _value, _percent }) => name}
                                nameKey="location"
                            />
                        </PC>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Tỷ trọng Doanh thu theo Chi nhánh
                    <TrendingUp className="h-4 w-4" />
                </div>

                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}
