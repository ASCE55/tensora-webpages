import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/PageHeader';
import { EmptyState } from '../../components/EmptyState';

export const Messages = () => {
  const { messages, employees, sendMessage } = useData();
  const { currentUser, role } = useAuth();

  const [activeConvId, setActiveConvId] = useState(messages[0]?.id || null);
  const [inputText, setInputText] = useState('');

  const activeConv = messages.find(m => m.id === activeConvId) || messages[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;

    sendMessage(activeConv.id, role === 'admin' ? 'ADMIN' : currentUser?.id || 'USER', inputText.trim());
    setInputText('');
  };

  return (
    <div>
      <PageHeader
        title="Internal Comms & Messaging"
        subtitle="Direct communication channel between management and engineering leads."
      />

      {messages.length === 0 ? (
        <div className="tensora-card p-5 text-center">
          <EmptyState
            icon="bi-chat-square-dots"
            title="No Active Chat Channels"
            description="When team members and administrators exchange messages, conversations will appear in this centralized hub."
          />
        </div>
      ) : (
        <div className="chat-container">
          {/* Conversations Sidebar */}
          <div className="chat-sidebar">
            <div className="p-3 border-bottom border-secondary border-opacity-25">
              <h6 className="text-white mb-0 font-display">Active Channels</h6>
            </div>
            <div className="chat-list">
              {messages.map(conv => (
                <div
                  key={conv.id}
                  className={`chat-user-item ${conv.id === activeConvId ? 'active' : ''}`}
                  onClick={() => setActiveConvId(conv.id)}
                >
                  <img
                    src={conv.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                    alt={conv.conversationWith}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-blue)' }}
                  />
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-white fw-semibold small">{conv.conversationWith}</span>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>{conv.lastTime}</span>
                    </div>
                    <div className="text-muted text-truncate small" style={{ fontSize: '0.78rem' }}>
                      {conv.lastMessage}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Conversation View */}
          <div className="chat-main">
            {activeConv ? (
              <>
                {/* Header */}
                <div className="p-3 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={activeConv.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                      alt={activeConv.conversationWith}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="text-white fw-bold">{activeConv.conversationWith}</div>
                      <div className="text-muted small">{activeConv.role} • <span className="text-success">● Active</span></div>
                    </div>
                  </div>
                  <span className="badge bg-dark border border-secondary text-info font-mono">{activeConv.userId}</span>
                </div>

                {/* Messages Flow */}
                <div className="chat-messages">
                  {activeConv.chatHistory?.map(msg => {
                    const isMe = (role === 'admin' && msg.senderId === 'ADMIN') || (role !== 'admin' && msg.senderId !== 'ADMIN');

                    return (
                      <div
                        key={msg.id}
                        className={`message-bubble ${isMe ? 'outgoing' : 'incoming'}`}
                      >
                        <div className="mb-1">{msg.text}</div>
                        <div className={`text-end ${isMe ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '0.68rem' }}>
                          {msg.time}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input Area */}
                <div className="p-3 border-top border-secondary border-opacity-25">
                  <Form onSubmit={handleSendMessage} className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      placeholder="Type an operational update or directive..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    <button type="submit" className="btn btn-tensora-primary">
                      <i className="bi bi-send-fill"></i>
                    </button>
                  </Form>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                Select a conversation to begin chatting.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
