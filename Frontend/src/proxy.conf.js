const Proxy_Config = [
    {
        context: [
            '/api',
        ],
        target: "http://localhost:4200",
        secure: false,
        pathRewrite: {
            "^/": ""
        }
    }
]

module.exports = Proxy_Config;