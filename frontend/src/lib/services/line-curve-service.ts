import type { Line, Polyline } from "$lib/types";
import * as THREE from "three";

export function displayLine(line: Line, scene: THREE.Scene, color: THREE.Color = new THREE.Color(0x000000)): void {
    const material = new THREE.LineBasicMaterial({ color: color });

    // Check if line.data is in the expected format or needs conversion
    let pointsArray;
    if ('start' in line.data && 'end' in line.data) {
        // Convert start/end format to an array of points
        pointsArray = [new THREE.Vector3(...line.data.start), new THREE.Vector3(...line.data.end)];
    } else {
        // Assume line.data is already in the correct format
        pointsArray = (line.data as [number, number, number][]).map(point => new THREE.Vector3(...point));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(pointsArray);
    const lineObject = new THREE.Line(geometry, material);
    scene.add(lineObject);
}

export function displayPolyline(polyline: Polyline, scene: THREE.Scene, color: THREE.Color = new THREE.Color(0x000000)): void {

    const material = new THREE.LineBasicMaterial({ color: color });

    const pointsArray = polyline.data.points.map(point => new THREE.Vector3(...point));

    const geometry = new THREE.BufferGeometry().setFromPoints(pointsArray);
    const lineObject = new THREE.Line(geometry, material);
    scene.add(lineObject);
}