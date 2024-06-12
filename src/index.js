export default {
    async fetch(request, env, ctx) {
		let resp = new Response();
        let { readable, writable } = new TransformStream();
        let writer = writable.getWriter();
        const textEncoder = new TextEncoder();

        const city = request.cf.city;
        const state = request.cf.region;
        const location = city.concat(", ", state);
        const question = "Write me a short whimsical shakespearean poem about "
        const questionWithLocation = question.concat(location);

        const asyncWrite = async () => {
            const answer = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
                prompt: questionWithLocation,
                stream: true
            });
            const reader = answer.getReader();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunkString = new TextDecoder().decode(value).slice(6);
                const chunkJson = JSON.parse(chunkString);
                await writer.write(textEncoder.encode(chunkJson?.response));
            }
            return writer.close();
        };

        ctx.waitUntil(asyncWrite());

        resp = new Response(readable, {
            headers: { 'content-type': 'text/event-stream' },
        });

        return resp;
    },
};
