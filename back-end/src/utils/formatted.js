export const formatted = (conversation) => {
  const updatedParticipants = conversation.participants.map((p) => ({
    ...p.userId,
  }));

  return {
    ...conversation,
    participants: updatedParticipants,
  };
};
