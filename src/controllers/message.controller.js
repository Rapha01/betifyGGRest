const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { messageService } = require('../services');

const createMessage = catchAsync(async (req, res) => {
  console.log(req.user.id,req.body);
  const message = await messageService.createMessage(req.user.id,req.body);
  res.status(httpStatus.CREATED).send(message);
});

const getMessages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['gameId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await messageService.queryMessages(filter, options);
  // add user to result NEXT
  res.send(result);
});

const getMessage = catchAsync(async (req, res) => {
  const message = await messageService.getMessageById(req.params.messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
  }
  message.server = messageServer[0];
  
  res.send(message);
});

const updateMessage = catchAsync(async (req, res) => {
  const message = await messageService.updateMessageById(req.params.messageId, req.body);
  res.send(message);
});

const deleteMessage = catchAsync(async (req, res) => {
  await messageService.deleteMessageById(req.params.messageId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
};