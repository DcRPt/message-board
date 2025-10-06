const express = require('express');
const path = require('path');
const { kv } = require('@vercel/kv');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to get messages from KV
async function getMessages() {
  try {
    const messages = await kv.get('messages');
    return messages || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

// Helper function to set messages in KV
async function setMessages(messages) {
  try {
    await kv.set('messages', messages);
  } catch (error) {
    console.error('Error saving messages:', error);
  }
}

// Routes
app.get('/', async (req, res) => {
  const messages = await getMessages();
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

app.get('/new', (req, res) => {
  res.render('form', { title: 'New Message' });
});

app.get('/message/:id', async (req, res) => {
  const messageId = parseInt(req.params.id);
  const messages = await getMessages();
  const message = messages[messageId];
  
  if (!message) {
    return res.status(404).send('Message not found');
  }
  
  res.render('message', { title: 'Message Details', message: message, messageId: messageId });
});

app.post('/message/:id/delete', async (req, res) => {
  const messageId = parseInt(req.params.id);
  const messages = await getMessages();
  
  if (messageId >= 0 && messageId < messages.length) {
    messages.splice(messageId, 1);
    await setMessages(messages);
  }
  
  res.redirect('/');
});

app.post('/new', async (req, res) => {
  const { messageUser, messageText } = req.body;
  const messages = await getMessages();
  
  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date().toISOString() // Store as ISO string for consistency
  });
  
  await setMessages(messages);
  res.redirect('/');
});

app.post('/clear', async (req, res) => {
  await setMessages([]); // Clear all messages
  res.redirect('/');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;