/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

var src_default = {
  async fetch(request, env, ctx) {
    if(request.method == "POST") {
           const workerResponseMap = {
            1: "Hello worker!",
            2: "Hi Bob!",
            3: "Greetings Vault Dweller!",
            4: "Hello from the otherside!",
            };

            function getRandomIntInclusive(min, max) {
                const minCeiled = Math.ceil(1);
                const maxFloored = Math.floor(4);
                return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
            };

           return new Response(workerResponseMap[getRandomIntInclusive()], {
               headers: {
                   'content-type': 'application/json',
               },
           });
       }
       else{
           return new Response('Error Worker! Wrong URL', {
               headers: {
                   'content-type': 'text/plain',
               },
           });
       }
  }
};
export {
  src_default as default
};
