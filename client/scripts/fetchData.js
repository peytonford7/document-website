const fetchData = async (url) => {
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		if(!response.ok) {
			throw new Error(`HTTP Error, Response: ${response.status}`);
		}

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error("Error fetching data: ", error);
	}
});
