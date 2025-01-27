import { handle } from "../../hooks.server";

let videoDecoder = null;
let frameCache = [];
let frameRate = 30;
let chunkSize = 2;
let currentTimestamp = 0;

const init = {
    output: handleFrame,
    error: handleError
};

const config = {
    codec: 'vp09',
    codedWidth: 640,
    codedHeight: 480,
};

function handleFrame(frame) {
    frameCache.push(frame);
    // self.postMessage({ type: 'frame', data: frame }, [frame]);
}
function handleError(e) {
    self.postMessage({ type: 'error', data: e });
    console.error(e);
}



self.onmessage = async (e) => {
    const { type, data } = e.data;

    if (type === 'init') {
        const { supported } = await VideoDecoder.isConfigSupported(config);
        if (supported) {
            const decoder = new VideoDecoder(init);
            decoder.configure(config);
        } else {
            console.error('VideoDecoder not supported');
        }
    }
    else if (type === 'decode') {
        if (!decoder) {
            const error = new Error('Decode Failed. Decoder not initialized');
            self.postMessage({ type: 'error', data: error });
            console.error(error);
            return;
        }
        const { frame, timestamp } = data;
        decoder.decode(frame, timestamp);
    }
    else if (type === 'close') {
        if (!decoder) {
            const error = new Error('Close Failed. Decoder not initialized');
            self.postMessage({ type: 'error', data: error });
            console.error(error);
            return;
        }
        decoder.close();
    }
};