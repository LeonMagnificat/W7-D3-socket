let onlineUsers = [];

export const newConnectionHandler = (newClient) => {
  console.log("NEW CONNECTION:", newClient.id);

  newClient.emit("welcome", { message: `Hello ${newClient.id}` });
  newClient.on("setUsername", (payload) => {
    console.log(payload);
    onlineUsers.push({ username: payload.username, socketId: newClient.id });
    console.log(onlineUsers);
  });

  newClient.emit("loggedIn", onlineUsers);

  newClient.broadcast.emit("updateOnlineUsersList", onlineUsers);
};

//  onlineUsers.push({ userID: FE, token..., socketId: newClient.id });
