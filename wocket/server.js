console.log ("Good day to you!");

const http = require('http');
const https = require('https');
const { parse } = require('url');
const next = require('next');
const WebSocketServer = require('ws').Server;
const child_process = require('child_process');
const url = require('url');
const fs = require('fs');
const moment = require('moment');

const port = parseInt(process.env.PORT, 10) || 3000;
const host = process.env.HOST || '0.0.0.0';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const cert = process.env.CERT_FILE ? fs.readFileSync(process.env.CERT_FILE) : undefined;
const key = process.env.KEY_FILE ? fs.readFileSync(process.env.KEY_FILE) : undefined;
const transcode = process.env.SMART_TRANSCODE || true;
let now = moment.now();

const options = {
  cert,
  key
};

console.log ("Launching the server code in server.js");
try{
app.prepare().then(() => {
  const server = (cert ? https : http).createServer(options,(req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    handle(req, res, parsedUrl);
  }).listen(port, host, err => {
    if (err) {
      console.log ("oh no... what the heck?");
    }
    console.log(`> Ready on port ${port}`);
  });


  const wss = new WebSocketServer({
    server: server
  });

  wss.on('connection', (ws, req) => {
    console.log('Streaming socket connected');
    console.log('Hello from Cloudy City.');

    console.log('Setting parameters.');

    const queryString = url.parse(req.url).search;
    const params = new URLSearchParams(queryString);
    const baseUrl = params.get('url');
    const key = params.get('key');
    const video = params.get('video');
    const audio = params.get('audio');

    console.log(`Parameters set.`);

    const rtmpUrl = `${baseUrl}/${key}`;

    console.log(`Streaming to RTMP ingest URL : ${rtmpUrl}`)

    const videoCodec = video === 'h264' && !transcode ? 
      [ '-c:v', 'copy'] :
      // video codec config: low latency, adaptive bitrate
      ['-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'zerolatency', '-vf', 'scale=w=-2:0'];

    const audioCodec = audio === 'aac' && !transcode ? 
      [ '-c:a', 'copy'] :
      // audio codec config: sampling frequency (11025, 22050, 44100, 48000), bitrate 64 kbits
      ['-c:a', 'aac', '-ar', '48000', '-b:a', '64k'];

      const ffmpeg = child_process.spawn('ffmpeg', [
      '-i','-',

      //force to overwrite
      '-y',

      // used for audio sync
      '-use_wallclock_as_timestamps', '1',
      '-async', '1',

      ...videoCodec,

      ...audioCodec,
      //'-filter_complex', 'aresample=44100', // resample audio to 44100Hz, needed if input is not 44100
      //'-strict', 'experimental',
      '-bufsize', '1000',
      '-f', 'flv',

      //force to timeout
      // This is not a GOOD idea for a timeout, because if the frames are not coming in
      // ffmpeg will just sit here and wait for frames... so a timer is better outside of this.
      '-t', process.env.TIMEOUT_LIVE_STREAM_SECONDS ?? 300, // Timeout setting in ENV of Docker container, default 5 minute

      rtmpUrl
    ]);

    // Kill the WebSocket connection if ffmpeg dies.
    ffmpeg.on('close', (code, signal) => {
      console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
      ws.terminate();
    });

    // Handle STDIN pipe errors by logging to the console.
    // These errors most commonly occur when FFmpeg closes and there is still
    // data to write.f If left unhandled, the server will crash.
    ffmpeg.stdin.on('error', (e) => {
      console.log(`FFmpeg STDIN Error`, e);
    });

    // FFmpeg outputs all of its messages to STDERR. Let's log them to the console.
    ffmpeg.stderr.on('data', (data) => {
      ws.send(`ffmpeg got some data`);
      console.log(`FFmpeg STDERR:`, data.toString());
    });

    ws.on('message', msg => {
      if (Buffer.isBuffer(msg)) {
        console.log(`this is some video data`);
        ffmpeg.stdin.write(msg);
      } else {
        console.log(msg);
      }
    });

    ws.on('close', e => {
      console.log(`bummer man, that stream got closed, whats up with that?`);
      ffmpeg.kill('SIGINT');
    });
  });
})}catch (err) {
  console.error(`ERROR: Failed to start the server:`);
  console.error(err);
};