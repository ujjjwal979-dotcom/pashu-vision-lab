import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, Paperclip, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m PashuMitra AI Assistant. I can help you with cattle breeding, health management, feeding practices, and government schemes. What would you like to know?',
      timestamp: new Date(),
      suggestions: [
        'Best feeding practices for dairy cattle',
        'Common cattle diseases and prevention',
        'Government subsidies for cattle farmers',
        'How to improve milk yield?'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const mockResponses = {
    feeding: "For optimal cattle feeding:\n\n1. **Dry Matter Intake**: Provide 3-4% of body weight daily\n2. **Balanced Diet**: 18-20% crude protein for lactating cows\n3. **Fresh Water**: 30-50 liters per day per animal\n4. **Minerals**: Provide salt and mineral supplements\n5. **Timing**: Feed 2-3 times daily at regular intervals\n\nWould you like specific feed formulations for different cattle types?",
    
    health: "Common cattle diseases and prevention:\n\n**Mastitis**\n- Maintain clean milking environment\n- Use proper milking technique\n- Regular udder health checks\n\n**Foot & Mouth Disease**\n- Vaccination every 6 months\n- Quarantine new animals\n- Disinfect equipment\n\n**Parasites**\n- Regular deworming schedule\n- Clean water sources\n- Rotational grazing\n\nWould you like more details about any specific disease?",
    
    schemes: "Government schemes for cattle farmers:\n\n**National Livestock Mission**\n- Subsidies for cattle purchase\n- Support for feed and fodder development\n\n**Rashtriya Gokul Mission**\n- Indigenous breed development\n- AI services and breeding support\n\n**Dairy Processing & Infrastructure Development Fund**\n- Milk processing infrastructure\n- Cold chain development\n\nShall I help you with application procedures for any scheme?",
    
    yield: "To improve milk yield:\n\n1. **Nutrition**: Balanced feed with adequate protein and energy\n2. **Breeding**: Use high genetic merit bulls\n3. **Health**: Regular health monitoring and vaccination\n4. **Comfort**: Proper housing and ventilation\n5. **Milking**: Consistent milking schedule (2-3 times daily)\n6. **Water**: Always available clean, fresh water\n\nCurrent average yield can be improved by 15-20% with proper management. Would you like a customized feeding plan?",
    
    default: "I understand you're asking about cattle management. Could you please be more specific? I can help with:\n\n• Breeding and genetics\n• Health and disease management\n• Feeding and nutrition\n• Government schemes and subsidies\n• Milk production optimization\n• Housing and infrastructure\n\nWhat specific area would you like to explore?"
  };

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('feed') || lowerInput.includes('nutrition') || lowerInput.includes('diet')) {
      return mockResponses.feeding;
    } else if (lowerInput.includes('health') || lowerInput.includes('disease') || lowerInput.includes('sick')) {
      return mockResponses.health;
    } else if (lowerInput.includes('scheme') || lowerInput.includes('subsidy') || lowerInput.includes('government')) {
      return mockResponses.schemes;
    } else if (lowerInput.includes('milk') || lowerInput.includes('yield') || lowerInput.includes('production')) {
      return mockResponses.yield;
    } else {
      return mockResponses.default;
    }
  };

  const getSuggestions = (response: string): string[] => {
    if (response.includes('feeding')) {
      return ['Feed formulation for Jersey cows', 'Seasonal feeding adjustments', 'Cost-effective feed options'];
    } else if (response.includes('disease')) {
      return ['Vaccination schedule', 'Emergency vet contacts', 'Disease prevention checklist'];
    } else if (response.includes('scheme')) {
      return ['How to apply for subsidies?', 'Required documents', 'Application deadlines'];
    } else if (response.includes('yield')) {
      return ['Breeding for higher yield', 'Milking equipment recommendations', 'Record keeping for milk production'];
    } else {
      return ['Tell me about cattle breeds', 'Best practices for new farmers', 'Market prices for cattle'];
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        suggestions: getSuggestions(response)
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const clearChat = () => {
    setMessages([messages[0]]); // Keep only the welcome message
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Chatbot</h1>
          <p className="text-muted-foreground">Get expert advice on cattle farming and management</p>
        </div>
        <Button variant="outline" onClick={clearChat}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear Chat
        </Button>
      </div>

      <Card className="h-[70vh] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            PashuMitra AI Assistant
            <Badge variant="secondary" className="ml-auto">Online</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[70%] ${message.type === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-7"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {message.type === 'user' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-secondary">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2 mt-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Ask me anything about cattle farming..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                  <Paperclip className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                  <Mic className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}