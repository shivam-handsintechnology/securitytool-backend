class RateLimiter {
    constructor(maxRequests, windowSize) {
        this.maxRequests = maxRequests;
        this.windowSize = windowSize;
        this.requests = new Map(); // Using a Map to store requests with keys as IP addresses
    }
    allowRequest(ip) {
        const now = Date.now();
        const ipRequests = this.requests.get(ip) || [];
        // Remove expired requests from the window
        const validRequests = ipRequests.filter(req => req >= now - this.windowSize);
        if (validRequests.length < this.maxRequests) {
            // Add the current request timestamp to the window
            ipRequests.push(now);
            this.requests.set(ip, ipRequests);
            return true;
        } else {
            return false;
        }
    }
}
module.exports = RateLimiter;
// const rateLimiter = new RateLimiter(10, 60 * 1000)