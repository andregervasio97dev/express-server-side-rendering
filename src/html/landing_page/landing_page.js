function ready(fn) {
	if (document.readyState !== 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(() => {
	document.getElementById("refresh-button").addEventListener("click", () => {
		location.reload();
	});
});
