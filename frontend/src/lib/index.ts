import { json } from "@sveltejs/kit";

// place files you want to import through the `$lib` alias in this folder.
export async function fetchData() {
    const point = { x: 1, y: 2, z: 3 };
    const response = await fetch('http://localhost:8000/base/point', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(point)
    });
    const data = await response.json();
    data.point = JSON.parse(data.point);  // Parse the stringified JSON
    return data;
}