class Router {
  constructor() {
    this.routes = [];
  }

  add(method, url, handler) {
    this.routes.push({ method, url, handler });
  }

  get(url, handler) {
    this.add("GET", url, handler);
  }

  post(url, handler) {
    this.add("POST", url, handler);
  }

  put(url, handler) {
    this.add("PUT", url, handler);
  }

  delete(url, handler) {
    this.add("DELETE", url, handler);
  }

  async handle(req, res) {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const route = this.routes
      .filter((registeredRoute) => registeredRoute.method === method)
      .map((registeredRoute) => ({
        ...registeredRoute,
        params: this.extractParams(registeredRoute.url, path)
      }))
      .find((registeredRoute) => registeredRoute.params);

    if (route) {
      req.params = route.params;
      let body = '';
      for await (const chunk of req) {
        body += chunk.toString();
      }
      req.body = body;
      await route.handler(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Rota não encontrada" }));
    }
  }

  extractParams(routeUrl, requestPath) {
    const routeParts = routeUrl.split('/').filter(Boolean);
    const requestParts = requestPath.split('/').filter(Boolean);

    if (routeParts.length !== requestParts.length) {
      return null;
    }

    return routeParts.reduce((params, routePart, index) => {
      const requestPart = requestParts[index];

      if (!params) {
        return null;
      }

      if (routePart.startsWith(':')) {
        params[routePart.slice(1)] = decodeURIComponent(requestPart);
        return params;
      }

      return routePart === requestPart ? params : null;
    }, {});
  }
}

export default Router;
