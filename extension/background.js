chrome.runtime.onMessage.addListener((request, sender, onSuccess) => {
	fetch('http://127.0.0.1:5173/auth/session', {
		credentials: 'same-origin',
	})
		.then((response) => response.json())
		.then((session) => {
			if (Object.keys(session).length > 0) {
				onSuccess(session)
			} else {
				onSuccess(null)
			}
		})
		.catch((err) => {
			console.error(err)
			onSuccess(null)
		})

	return true // Will respond asynchronously.
})