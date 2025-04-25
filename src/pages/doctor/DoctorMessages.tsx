
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/dashboard/Sidebar";
import { Bell, Send, Paperclip, Search, Phone, Video } from "lucide-react";

export default function DoctorMessages() {
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState("");
  
  const chats = [
    { id: 0, name: "John Smith", role: "Patient", avatar: "JS", unread: 3, lastMessage: "Thank you doctor", lastTime: "10:30 AM" },
    { id: 1, name: "Emma Wilson", role: "Patient", avatar: "EW", unread: 0, lastMessage: "Yes, I'll do that", lastTime: "Yesterday" },
    { id: 2, name: "Michael Brown", role: "Patient", avatar: "MB", unread: 0, lastMessage: "When should I take the medicine?", lastTime: "Monday" }
  ];
  
  const messages = [
    { id: 1, sender: "doctor", content: "Good morning! How are you feeling today?", time: "9:30 AM" },
    { id: 2, sender: "patient", content: "Much better, thank you doctor!", time: "9:32 AM" },
    { id: 3, sender: "doctor", content: "That's great to hear! Any side effects?", time: "9:35 AM" },
  ];
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="doctor" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Messages</h1>
            <p className="text-sm text-gray-500">Chat with your patients</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-health-red rounded-full"></span>
            </Button>
          </div>
        </header>
        
        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
            <div className="p-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input 
                  placeholder="Search patients..." 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <div 
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`p-4 border-b border-gray-200 cursor-pointer ${activeChat === chat.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-health-blue text-white flex items-center justify-center mr-3">
                      <span className="font-medium">{chat.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.lastTime}</span>
                      </div>
                      <p className="text-xs text-gray-500">{chat.role}</p>
                      <p className="text-sm truncate text-gray-600">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="ml-2 bg-health-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              {activeChat !== undefined && chats[activeChat] && (
                <>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-health-blue text-white flex items-center justify-center mr-3">
                      <span className="font-medium">{chats[activeChat].avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{chats[activeChat].name}</h3>
                      <p className="text-xs text-gray-500">{chats[activeChat].role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'doctor' ? 'justify-end' : ''}`}
                  >
                    <div 
                      className={`max-w-[75%] rounded-lg p-3 ${
                        msg.sender === 'doctor' 
                          ? 'bg-health-blue text-white rounded-br-none' 
                          : 'bg-white border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <span className={`text-xs mt-1 block ${msg.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Button type="button" variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input 
                  placeholder="Type a message..." 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1" 
                />
                <Button type="submit" size="icon" className="bg-health-blue hover:bg-health-blue-dark">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
