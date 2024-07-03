function analyzeSessionAndSignature(sessionId, signature) {
    // Attempt to decode the session ID and signature
    function tryDecode(str) {
        try {
            return atob(str);
        } catch {
            return str; // Return original if not base64
        }
    }

    const decodedSession = tryDecode(sessionId);
    const decodedSignature = tryDecode(signature);

    console.log('Session ID:', sessionId);
    console.log('Decoded Session ID:', decodedSession);
    console.log('Signature:', signature);
    console.log('Decoded Signature:', decodedSignature);

    // Analyze the structure
    console.log('Session ID length:', sessionId.length);
    console.log('Signature length:', signature.length);

    // Check if it might be JSON
    try {
        const jsonSession = JSON.parse(decodedSession);
        console.log('Session appears to be JSON:', jsonSession);
    } catch {
        console.log('Session is not valid JSON');
    }

    // Look for common patterns
    const possibleTimestamp = decodedSession.match(/\d{10,13}/);
    if (possibleTimestamp) {
        console.log('Possible timestamp found:', possibleTimestamp[0]);
    }

    // You might add more analysis here based on expected patterns
}

// Usage
const sessionId = 'cRq5hrwHfJr_V696h9AwBiorh00GZnYU';
const signature = '9qiSYNIiByzOOdaYYOXcWlbWYuRCoZB4CC3Q2NWi\Ts';
analyzeSessionAndSignature(sessionId, signature);