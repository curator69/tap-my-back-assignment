import { useState } from "react";

interface KudoFilterProps {
  onFilterChange: (filters: { category: string; dateRange: string }) => void;
}

const KudoFilter = ({ onFilterChange }: KudoFilterProps) => {
  const [category, setCategory] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const handleChange = (key: string, value: string) => {
    if (key === "category") setCategory(value);
    if (key === "dateRange") setDateRange(value);
    onFilterChange({ category, dateRange });
  };

  return (
    <div className="flex gap-4 mb-6">
      <select
        value={category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="border rounded px-3 py-2 text-black"
      >
        <option value="all">All Categories</option>
        <option value="Helpful">Helpful</option>
        <option value="Teamwork">Teamwork</option>
        <option value="Innovation">Innovation</option>
        <option value="Leadership">Leadership</option>
      </select>

      <select
        value={dateRange}
        onChange={(e) => handleChange("dateRange", e.target.value)}
        className="border rounded px-3 py-2 text-black"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>
  );
};

export default KudoFilter;
