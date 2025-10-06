const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sample messages array (in-memory storage for MVP)
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

app.get('/new', (req, res) => {
  res.render('form', { title: 'New Message' });
});

app.get('/message/:id', (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages[messageId];
  
  if (!message) {
    return res.status(404).send('Message not found');
  }
  
  res.render('message', { title: 'Message Details', message: message, messageId: messageId });
});

app.post('/message/:id/delete', (req, res) => {
  const messageId = parseInt(req.params.id);
  
  if (messageId >= 0 && messageId < messages.length) {
    messages.splice(messageId, 1);
  }
  
  res.redirect('/');
});

app.post('/new', (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date()
  });
  res.redirect('/');
});

app.post('/clear', (req, res) => {
  messages.length = 0; // Clear all messages
  res.redirect('/');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;