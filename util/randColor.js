module.exports = function randColor() {
	const colors = [4359668, 14369847, 16036864, 1023320];
	return colors[Math.floor(Math.random() * 4)];
};
