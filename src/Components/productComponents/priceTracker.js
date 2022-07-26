import React from "react";
// eslint-disable-next-line
import { Line as LineJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const ar = localStorage.getItem("ar");
const dark = localStorage.getItem("darkMode");

const PriceTracker = (props) => {
  if (document.getElementById("canvas")) {
    var canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(135, 67, 255, 0.6)");
    gradient.addColorStop(1, "rgba(135, 67, 255, 0.1)");
  }

  return (
    <div
      className={`product-price-tracker-container  ${
        props.storeType === "offline" ? "collapsed" : ""
      }`}
    >
      {props.prices.length === 1 && (
        <div className={`tracker-message ${ar ? "ar" : ""}`}>
          {ar
            ? "لا يوجد تغير في سعر هذا المنتج"
            : "There is no price changing in this product"}
        </div>
      )}
      <h2 className={ar ? "ar" : ""}>
        {ar ? "متتبع الأسعار" : "Price tracker"}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </h2>
      <div className={`product-price-tracker ${ar ? "ar" : ""}`}>
        <Line
          id="canvas"
          data={{
            labels: [
              ...props.prices.map((p) =>
                new Date(p.created_at).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              ),
            ],
            datasets: [
              {
                label: ar ? "السعر" : "Price",
                data: [...props.prices.map((p) => p.price)],
              },
            ],
          }}
          width={200}
          height={400}
          options={{
            animations: {
              tension: {
                duration: 2000,
                easing: "linear",
                from: 0.4,
                to: 0,
                loop: true,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            tension: 0.3,
            borderColor: "rgba(135, 67, 255, 1)",
            borderWidth: 2,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#ff4f04",
            pointBorderWidth: 6,
            fill: true,
            backgroundColor: gradient,
            font: {
              weight: 600,
            },
            scales: {
              y: {
                ticks: {
                  color: dark ? "#bbb" : "#101010",
                  font: {
                    size: 18,
                    family: ar ? "cairo" : "raleway",
                  },
                },
                position: ar ? "right" : "left",
                grid: {
                  color: dark ? "rgba(255,255,255,0.1)" : "#e9e9e9",
                },
              },
              x: {
                ticks: {
                  color: dark ? "#bbb" : "#101010",
                  font: {
                    size: 12,
                    family: ar ? "cairo" : "raleway",
                  },
                },
                reverse: ar ? true : false,
                grid: {
                  color: dark ? "rgba(255,255,255,0.1)" : "#e9e9e9",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PriceTracker;
