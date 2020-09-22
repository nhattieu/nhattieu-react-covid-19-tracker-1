import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const Chart = ({ data, valueCountry, nameCountry }) => {

	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchDailyData());
		};
		fetchAPI();
	}, []);

	const lineChart = () => {
		let result = "";

		if (dailyData.length !== 0) {
			result = (
				<div>
					<Line
						data={{
							labels: dailyData.map((date) => date.reportDate),
							datasets: [
								{
									data: dailyData.map(
										(date) => date.confirmed.total
									),
									label: "Infected",
									borderColor: "rgb(0, 0, 255)",
								},
								{
									data: dailyData.map(
										(date) => date.deaths.total
									),
									label: "Deaths",
									borderColor: "rgb(255, 0, 0)",
									backgroundColor: "rgba(255, 0, 0, 0.5)",
								},
							],
						}}
					/>
				</div>
			);
		}
		return result;
	};

	const barChart = () => {
		let result = "";
		if (data.confirmed) {
			result = (
				<div>
					<Bar
						data={{
							labels: ["Infected", "Recovered", "Deaths"],
							datasets: [
								{
									label: "People",
									backgroundColor: [
										"rgb(0, 0, 255, 0.5)",
										"rgb(0, 255, 0, 0.5)",
										"rgb(255, 0, 0, 0.5)",
									],
									data: [
										data.confirmed.value,
										data.recovered.value,
										data.deaths.value,
										data.lastUpdate,
									],
								},
							],
						}}
						options={{
							legend: {display: true},
							title: {
								display: true,
								text: `Current state in ${nameCountry}`,
							},
						}}
					/>
				</div>
			);
		}

		return result;
	};

	return (
		<div className={styles.container}>
			{!valueCountry || valueCountry === "global" ? lineChart() : barChart()}
		</div>
	);
};

export default Chart;
