export default {
	async fetch(request, env, ctx) {
		const response = await fetch(request.url);
		const newResponse = new Response(response.body, response);
		let userID_Header = request.headers.get('UserID');
		let userID_Token = await env.UserProfile_KV.get(userID_Header);
    	const requestURL = new URL(request.url);
		const path = requestURL.pathname + requestURL.search;

		if (path == '/profile') {
			newResponse.headers.append("Auth-Token", userID_Token);
			return newResponse;
 	 	}
		else{
			return new Response('Error Worker! No UserID!', {
				headers: {
					'content-type': 'text/plain',
				},
			});
		}
	}
}
