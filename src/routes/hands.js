const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync(
  __dirname + '/../proto/fingers.proto',
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const proto = grpc.loadPackageDefinition(packageDef).fingers;

const client = new proto.FingerDetector(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

router.post('/', upload.single('image'), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const imageBuffer = req.file.buffer;

  const call = client.StreamFrames();

  let responded = false;

  // timeout de seguridad (evita streams colgados)
  const timeout = setTimeout(() => {
    if (!responded) {
      responded = true;
      call.cancel();
      return res.status(504).json({ error: 'gRPC timeout' });
    }
  }, 3000);

  call.write({
    image_data: imageBuffer,
    client_id: "node-gateway"
  });

  call.end();

  call.on('data', (response) => {

    if (responded) return;

    responded = true;

    clearTimeout(timeout);

    res.json({
      left: response.left_hand,
      right: response.right_hand,
      total: response.total,
      hands: response.hands_detected
    });

    call.cancel(); // importante cerrar stream
  });

  call.on('error', (err) => {

    if (responded) return;

    responded = true;

    clearTimeout(timeout);

    console.error("gRPC error:", err);

    res.status(500).json({ error: 'gRPC error' });

  });

});

module.exports = router;