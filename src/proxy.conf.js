const PROXY_CONFIG = [
    {
        context: [
            "/users/*",
            "/trips/*",
            "/trips",
            "/users",
            "/trips/",
            "/users/current"
        ],
        target: "http://surftrips-backend.herokuapp.com",
        secure: false
    }
]

module.exports = PROXY_CONFIG;