// can change to logging to a file if have time

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorHandler(err, req, res, next) {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);
  // Respond to the client with an error message
  if (process.env.NODE_ENV !== 'production') {
    res.status(500).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: 'Internal Server Error' });
}
