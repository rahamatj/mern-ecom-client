const mode = "dev";

function config() {
    let cfg = []

    cfg["dev"] = {
        API_URL: "http://localhost:3001",
    }

    cfg["prod"] = {
        API_URL: "https://72.60.219.158:3001",
    }

    return cfg[mode];
}

export default config