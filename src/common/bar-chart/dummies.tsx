import { IBarChartData } from ".";

export const dummiesBarChartData = (): IBarChartData => {
  const data: IBarChartData = [];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  days.forEach((day) => {
    data.push({
      name: day,
      value: Math.floor(Math.random() * 10_000_000) + 1_000_000, // Random value between 10_000 -> 100_000
    });
  });

  return data;
};
