const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const serverRoot = path.join(__dirname, '..', 'build'); //This can be changed to public, the build is optimized.

app.use(express.static(serverRoot));

app.get('*', (req, res) => {
   res.sendFile(path.join(serverRoot, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`server is running....`);
});