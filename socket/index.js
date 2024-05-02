app.use(express.static('public'));

// Serve the static site from the 'public' directory
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
