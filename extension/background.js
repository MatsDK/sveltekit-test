chrome.runtime.onMessage.addListener(
	function (request, sender, onSuccess) {
		console.log("running check")
		fetch(" http://127.0.0.1:5173/api/auth/session", {
			mode: 'cors',
		})
			.then(response => response.json())
			.then((session) => {
				onSuccess(session)
				// if (Object.keys(session).length > 0) {
				// 	onSuccess(session)
				// } else {
				// 	onSuccess(null)
				// }
			})
			.catch(err => {
				console.error(err);
				onSuccess(null)
			})

		return true;  // Will respond asynchronously.
	}
);