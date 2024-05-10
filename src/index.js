var src_default = {
  async fetch(request, env, ctx) {
    let response
    if(request.cf.botManagement.score < 30) {
          const httpbin = new URL("http://httpbin.org/get");
          const bot = new Request(httpbin, request);
          let response = await fetch(bot);
          return response
       }
       else {
          request = new Request(request)
          response = await fetch(request, {
            cf: {
              resolveOverride: "omniscientsystems.net",
            },
          })
          return response
       }
  }
};
export {
  src_default as default
};
