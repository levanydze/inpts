"use server";

let intervalId: NodeJS.Timeout | undefined; // Variable to hold the interval ID

export async function getClients() {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(
      "https://raw.githubusercontent.com/levanydze/restaurant2024support/main/clients2.json",
      { cache: "no-store" }
    );
    // throw new Error("loading error");
    const data = await response.json();

    if (intervalId) {
      clearInterval(intervalId);
    }

    // fetch menus every 100000 milliseconds (100 second)
    intervalId = setInterval(getClients, 100000);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
