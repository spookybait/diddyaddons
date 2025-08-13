
export function getDoors() {
	// east west
	for (let dx = -25; dx > -186; dx += -32) {
		for (let dz = -41; dz > -202; dz += -32) {
			if (checkDoor(dx, dz)) return [true, dx, dz]
		}
	}

	// north south
	for (let dx = -41; dx > -202; dx += -32) {
		for (let dz = -25; dz > -186; dz += -32) {
			if (checkDoor(dx, dz)) return [true, dx, dz]
			
		}
	}
}
export function getMiddleofBlood(x, z) {
		for (let m = -1; m < 2; m += 2) {
			let mm = m*2
			if (World.getBlockAt(x, 74, z + mm).type.getRegistryName() === "minecraft:nether_brick") {
				return [x, z + (m*15.5)]
			} else if (World.getBlockAt(x + mm, 74, z).type.getRegistryName() === "minecraft:nether_brick") {
				return [x + (m*15.5), z]
			}
		}
}

export function checkDoor(x, z) {
		let block = World.getBlockAt(x, 70, z)
		if (block.type.getRegistryName() !== "minecraft:stained_hardened_clay") return false;
		if (block.getMetadata() != 14) return false;
		return true;
}
